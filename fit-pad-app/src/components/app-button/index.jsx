import { StyledPressable, StyledText, style } from './styles'

export function AppButton({ onPress, children }) {
  return (
    <StyledPressable style={style.button} onPress={onPress}>
      <StyledText variant='bodyLarge'>{children}</StyledText>
    </StyledPressable>
  )
}
