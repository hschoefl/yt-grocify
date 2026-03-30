import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

import { useAuth, useSignUp } from "@clerk/expo";
import { useState } from "react";

const EMAIL = process.env.EXPO_PUBLIC_EMAIL || "";
const PASSWORD = process.env.EXPO_PUBLIC_PASSWORD || "";

// define the schema for zod validation
const signUpSchema = z.object({
  email: z.email("Please enter a valid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

// create a type for the form data based on the zod schema
type SignUpFields = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [code, setCode] = useState<string>("");
  console.log("Enter signup screen...");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: EMAIL,
      password: PASSWORD,
    },
  });

  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();

  // wenn wir onSignIn in handleSubmit wrappen, dann bekommen wir die Formulardaten als Argument (data) übergeben, wenn der Button gedrückt wird
  const onSignUp = async (data: SignUpFields) => {
    console.log(data);

    const { error: signUpError } = await signUp.password({
      emailAddress: data.email,
      password: data.password,
    });

    if (signUpError) {
      console.error("Sign up error:", signUpError);
      return;
    }

    if (!signUpError) {
      console.log("Sign up successful!");
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        console.error("Failed to send verification code:", sendError);
      }
    }
  };
  // end of onSignUp

  // const handleVerify = async () => {
  //   const { error: verifyError } = await signUp.verifications.verifyEmailCode({
  //     code,
  //   });

  //   if (verifyError) {
  //     console.error("Verification error:", verifyError);

  //     if (verifyError.code === "verification_code_expired") {
  //       console.log("Verification code expired. Resending code...");
  //       const { error: resendError } =
  //         await signUp.verifications.sendEmailCode();
  //       if (resendError) {
  //         console.error("Failed to resend verification code:", resendError);
  //       } else {
  //         console.log("Verification code resent successfully!");
  //       }
  //     }
  //     if (signUp.status === "complete") {
  //       await signUp.finalize({
  //         // Redirect the user to the home page after signing up
  //         navigate: ({ session, decorateUrl }) => {
  //           if (session?.currentTask) {
  //             // Handle pending session tasks
  //             // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
  //             console.log(session?.currentTask);
  //             return;
  //           }

  //           const url = decorateUrl("/");
  //           if (url.startsWith("http")) {
  //             window.location.href = url;
  //           } else {
  //             router.push(url as Href);
  //           }
  //         },
  //       });
  //     } else {
  //       // Check why the sign-up is not complete
  //       console.error("Sign-up attempt not complete:", signUp);
  //     }
  //   }
  // };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      // Check why the sign-up is not complete
      console.error("Sign-up attempt not complete:", signUp);
    }
  };
  // end of handleVerify

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    // console.log("Status: ", signUp.status);
    // console.log("Unverified Fields", signUp.unverifiedFields);
    // console.log("Missing Fields", signUp.missingFields);
    console.log("Must show verification code view");

    // in this case we have to enter the verification code that was sent to the email address, so we show a message to the user
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.codeText}>
          Please enter the verification code sent to your email address.
        </Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Verification Code"
          keyboardType="number-pad"
          style={styles.codeInput}
        />
        <CustomButton onPress={handleVerify} buttonText="Verify Code" />
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Create an account</Text>

      <View style={styles.inputContainer}>
        <CustomTextInput
          control={control}
          name="email"
          placeholder="Email"
          autoFocus
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
        />

        <CustomTextInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {/* wir müssen unser onSignIn in handle Submit wrappen, weil handleSubmit die Formulardaten validiert */}
      <CustomButton onPress={handleSubmit(onSignUp)} buttonText="Sign Up" />

      <Link href="/(auth)/sign-in">
        <Text style={{ color: "blue", marginTop: 20, textAlign: "center" }}>
          Already have an account? Sign in
        </Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  inputContainer: {
    gap: 5,
  },
  codeText: {
    textAlign: "center",
    marginTop: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
