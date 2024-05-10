import { COLORS } from '@constants'
import { StyledPressable, StyledText, style } from './styles'

export function ListButton({ onPress = () => {}, index, children }) {
  return (
    <StyledPressable
      style={style.button}
      backgroundColor={
        index % 2 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW
      }
      onPress={onPress}
    >
      <StyledText variant='bodyLarge'>{children}</StyledText>
    </StyledPressable>
  )
}
