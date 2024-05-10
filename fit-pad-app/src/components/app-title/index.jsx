import { AppText } from '../app-text'

export function AppTitle({ children }) {
  return (
    <AppText variant='headlineLarge' textAlign='center'>
      {children}
    </AppText>
  )
}
