import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

type CustomButtonProps = {
  // hier können spezielle Custom Props stehen, die von den PressableProps abweichen bzw. nicht vorhanden sind
  buttonText: string
} & PressableProps

const CustomButton = ({ buttonText, ...props }: CustomButtonProps) => {
  return (
    <Pressable {...props} style={[styles.button]}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4353fd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
})
