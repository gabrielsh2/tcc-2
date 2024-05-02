import { StyledTextInput } from './styles'

export function AppInput({
  label = '',
  onChange,
  value,
  autocomplete,
  inputMode,
  inputRef,
  onSubmitEditing,
  secureTextEntry = false,
  returnKeyType,
}) {
  return (
    <StyledTextInput
      autocomplete={autocomplete}
      inputMode={inputMode}
      label={label}
      onChangeText={onChange}
      value={value}
      returnKeyType={returnKeyType}
      blurOnSubmit={returnKeyType !== 'next'}
      onSubmitEditing={onSubmitEditing}
      ref={inputRef}
      secureTextEntry={secureTextEntry}
    />
  )
}
