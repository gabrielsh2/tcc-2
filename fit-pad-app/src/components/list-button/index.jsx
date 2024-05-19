import { ActivityIndicator } from 'react-native-paper'
import { COLORS } from '@constants'
import { StyledPressable, customStyle } from './styles'

export function ListButton({
  onPress = () => {},
  backgroundColor = COLORS.PRIMARY_LIGHT,
  children,
  style,
  isLoading = false,
  disabled = false,
}) {
  return (
    <StyledPressable
      onPress={onPress}
      style={[style, customStyle.button]}
      backgroundColor={backgroundColor}
      disabled={isLoading || disabled}
    >
      {isLoading ? <ActivityIndicator animating={isLoading} /> : children}
    </StyledPressable>
  )
}
