import { StyledText } from './styles'

export function AppText({
  variant = 'bodyLarge',
  textAlign = 'left',
  children,
}) {
  return (
    <StyledText variant={variant} textAlign={textAlign}>
      {children}
    </StyledText>
  )
}
