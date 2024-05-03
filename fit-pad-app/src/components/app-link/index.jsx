import { StyledLink } from './styles'

export function AppLink({ href = '', children }) {
  return <StyledLink href={href}>{children}</StyledLink>
}
