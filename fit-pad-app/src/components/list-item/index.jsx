import { Text } from 'react-native-paper'
import { COLORS } from '@constants'
import { ListButton } from '../list-button'

export function ListItem({ onPress = () => {}, index, children }) {
  return (
    <ListButton
      backgroundColor={
        index % 2 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW
      }
      onPress={onPress}
    >
      <Text variant='bodyLarge'>{children}</Text>
    </ListButton>
  )
}
