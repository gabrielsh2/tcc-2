import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import { AppInput } from '../app-input'

export function AppTextArea({ onChange, value, inputRef, readOnly = false }) {
  return (
    <AppInput
      placeholder='Escreva mais aqui...'
      onChange={onChange}
      inputRef={inputRef}
      blurOnSubmit={false}
      value={value}
      multiline
      readOnly={readOnly}
      render={(props) => <AutoGrowingTextInput {...props} />}
    />
  )
}
