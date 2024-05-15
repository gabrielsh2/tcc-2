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
  right,
  blurOnSubmit = true,
  multiline = false,
  style,
  placeholder,
  contentStyle,
  onContentSizeChange,
  render,
}) {
  return (
    <StyledTextInput
      onContentSizeChange={onContentSizeChange}
      autocomplete={autocomplete}
      inputMode={inputMode}
      label={label}
      onChangeText={onChange}
      value={value}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      onSubmitEditing={onSubmitEditing}
      ref={inputRef}
      secureTextEntry={secureTextEntry}
      right={right}
      multiline={multiline}
      style={style}
      placeholder={placeholder}
      contentStyle={contentStyle}
      render={render}
    />
  )
}
