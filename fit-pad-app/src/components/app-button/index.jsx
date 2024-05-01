import { StyledButton } from './styles'

export function AppButton({ mode = 'contained', onPress, children }) {
  return (
    <StyledButton mode={mode} onPress={onPress}>
      {children}
    </StyledButton>
  )
}
