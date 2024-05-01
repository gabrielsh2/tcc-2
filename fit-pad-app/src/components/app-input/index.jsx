import { StyledTextInput } from './styles'

export function AppInput({ label = '', onChange, value }) {
  return <StyledTextInput label={label} onChangeText={onChange} value={value} />
}
