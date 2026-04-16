import { useAuth } from '@/providers/AuthProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'expo-image'
import { useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import Fontisto from '@expo/vector-icons/Fontisto'
import { useRouter } from 'expo-router'

const EMAIL = process.env.EXPO_PUBLIC_EMAIL || ''
const PASSWORD = process.env.EXPO_PUBLIC_PASSWORD || ''

// define the schema for zod validation
const signInSchema = z.object({
  email: z.email('Please enter a valid email address!'),
  password: z.string().min(8, 'Password must be at least 8 characters long!'),
})

// create a type for the form data based on the zod schema
type SignInFields = z.infer<typeof signInSchema>

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
  })

  const router = useRouter()

  // const { signIn } = useSignIn();

  const { signIn } = useAuth()

  // wenn wir onSignIn in handleSubmit wrappen, dann bekommen wir die Formulardaten als Argument (data) übergeben, wenn der Button gedrückt wird
  const onSignIn = (data: SignInFields) => {
    console.log('sign in with', data)

    // const { error: signInError } = await signIn.password({
    //   identifier: data.email,
    //   password: data.password,
    // });

    // if (signInError) {
    //   console.error("Sign in error:", signInError?.message);
    //   return;
    // }
    signIn()
    router.replace('/(tabs)')
  }

  return (
    <SafeAreaView className='flex-1 bg-primary dark:bg-secondary'>
      <View className='absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40' />
      <View className='absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35' />
      <View className='px-6 pt-4'>
        <Text className='text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground'>
          Grocify
        </Text>
        <Text className='mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75'>
          Plan smarter. Shop happier.
        </Text>
        <View className='mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3'>
          <Image
            source={require('@/assets/images/auth.png')}
            style={{ width: '100%', height: 300 }}
            contentFit='contain'
          />
        </View>
      </View>
      <View className='mt-8 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6'>
        <View className='self-center rounded-full bg-secondary px-3 py-1'>
          <Text className='text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground'>
            Welcome Back
          </Text>
        </View>
        <Text className='mt-2 text-center text-sm leading-6 text-muted-foreground'>
          Just press SignIn to jump into your personalized grocery experience.
        </Text>
        <View className='mt-6'>
          <Pressable
            onPress={handleSubmit(onSignIn)}
            className='rmb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90'
          >
            <Fontisto name='email' size={24} color='black' />
            <Text className='ml-3 flex-1 text-lg font-semibold text-card-foreground'>
              Fake Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
  },

  inputContainer: {
    gap: 5,
  },
})
