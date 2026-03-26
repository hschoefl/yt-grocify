import CustomButton from '@/components/CustomButton'
import CustomTextInput from '@/components/CustomTextInput'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'

export default function Index() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: 'abc@info.org',
    },
  })

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // wenn wir onSignIn in handleSubmit wrappen, dann bekommen wir die Formulardaten als Argument (data) übergeben, wenn der Button gedrückt wird
  const onSignIn = (data: any) => {
    console.log('sign in with', data)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Sign in</Text>

      <Controller
        control={control} // ist quasie die ganze Form, die wir mit useForm() erstellt haben
        name='email'
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={{ backgroundColor: 'red' }}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <CustomTextInput
        placeholder='Email'
        autoFocus
        autoCapitalize='none'
        keyboardType='email-address'
        autoComplete='email'
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        // style={{ backgroundColor: "red" }}
      />

      <CustomTextInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* wir müssen unser onSignIn in handle Submit wrappen, weil handleSubmit die Formulardaten validiert */}
      <CustomButton onPress={handleSubmit(onSignIn)} buttonText='Sign in' />

      <StatusBar style='auto' />
    </KeyboardAvoidingView>
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
})
