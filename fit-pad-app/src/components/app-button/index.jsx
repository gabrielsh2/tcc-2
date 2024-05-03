import { ActivityIndicator } from 'react-native-paper'
import { StyledPressable, StyledText, style } from './styles'
import { COLORS } from '@constants'

export function AppButton({ onPress, isLoading = false, children }) {
  return (
    <StyledPressable
      style={style.button}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.WHITE} />
      ) : (
        <StyledText variant='bodyLarge'>{children}</StyledText>
      )}
    </StyledPressable>
  )
}
