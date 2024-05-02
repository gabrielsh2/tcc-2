import { COLORS, SNACKBAR_THEME } from '@constants'
import { StyledSnackbar } from './styles'

export function AppSnackbar({
  visible = false,
  onDismiss = () => {},
  theme = SNACKBAR_THEME.ERROR,
  children,
}) {
  return (
    <StyledSnackbar
      visible={visible}
      onDismiss={onDismiss}
      customTheme={theme}
      action={{
        label: 'Limpar',
        onPress: onDismiss,
        textColor: COLORS.WHITE,
      }}
    >
      {children}
    </StyledSnackbar>
  )
}
