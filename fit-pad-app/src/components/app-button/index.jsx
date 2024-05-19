import { ActivityIndicator } from 'react-native-paper'
import { COLORS } from '@constants'
import { StyledPressable, StyledText, style } from './styles'

export function AppButton({
  onPress,
  isLoading = false,
  disabled = false,
  children,
}) {
  return (
    <StyledPressable
      style={style.button}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.WHITE} />
      ) : (
        <StyledText variant='bodyLarge'>{children}</StyledText>
      )}
    </StyledPressable>
  )
}
