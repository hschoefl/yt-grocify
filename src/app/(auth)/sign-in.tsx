import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { useSignIn } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { z } from "zod";

const EMAIL = process.env.EXPO_PUBLIC_EMAIL || "";
const PASSWORD = process.env.EXPO_PUBLIC_PASSWORD || "";

// define the schema for zod validation
const signInSchema = z.object({
  email: z.email("Please enter a valid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

// create a type for the form data based on the zod schema
type SignInFields = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: EMAIL,
      password: PASSWORD,
    },
  });

  const { signIn } = useSignIn();

  // const { signIn } = useAuth();

  // wenn wir onSignIn in handleSubmit wrappen, dann bekommen wir die Formulardaten als Argument (data) übergeben, wenn der Button gedrückt wird
  const onSignIn = async (data: SignInFields) => {
    console.log("sign in with", data);

    const { error: signInError } = await signIn.password({
      identifier: data.email,
      password: data.password,
    });

    if (signInError) {
      // console.error("Sign in error:", signInError?.message);
      console.log("Sign in error", signInError);
      return;
    }

    if (signIn.status === "complete") {
      console.log("Sign in successful!");
      await signIn.finalize({
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
      console.log("Sign in failed:", signIn.status);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Sign in</Text>

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
        />
      </View>

      {/* wir müssen unser onSignIn in handle Submit wrappen, weil handleSubmit die Formulardaten validiert */}
      <CustomButton onPress={handleSubmit(onSignIn)} buttonText="Sign in" />

      <Link href="/(auth)/sign-up">
        <Text style={{ color: "blue", marginTop: 20, textAlign: "center" }}>
          Don't have an account? Sign up
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
});
