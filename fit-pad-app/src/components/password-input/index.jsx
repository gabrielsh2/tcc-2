import { AppInput } from '../app-input'
import { useState } from 'react'
import { TextInput } from 'react-native-paper'

export function PasswordInput({ autocomplete, onChange, inputRef, value }) {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <AppInput
      label='Senha'
      autocomplete={autocomplete}
      secureTextEntry={hidePassword}
      onChange={onChange}
      inputRef={inputRef}
      value={value}
      right={
        <TextInput.Icon
          icon={hidePassword ? 'eye' : 'eye-off'}
          onPress={() => setHidePassword(!hidePassword)}
        />
      }
    />
  )
}
