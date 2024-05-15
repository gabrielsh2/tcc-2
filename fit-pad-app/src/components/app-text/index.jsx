import { COLORS } from '@constants'
import { StyledText } from './styles'

export function AppText({
  variant = 'bodyLarge',
  textAlign = 'left',
  color = COLORS.TEXT_COLOR,
  children,
  style,
  fullWidth = true,
}) {
  return (
    <StyledText
      variant={variant}
      textAlign={textAlign}
      style={style}
      fullWidth={fullWidth}
      color={color}
    >
      {children}
    </StyledText>
  )
}
