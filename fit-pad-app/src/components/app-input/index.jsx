import { COLORS } from '@constants'
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
  width = '100%',
  customStyle,
  readOnly = false,
  onPress,
  activeUnderlineColor,
}) {
  return (
    <StyledTextInput
      activeUnderlineColor={activeUnderlineColor}
      onPress={onPress}
      readOnly={readOnly}
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
      style={[style, customStyle]}
      placeholder={placeholder}
      contentStyle={contentStyle}
      render={render}
      width={width}
    />
  )
}
