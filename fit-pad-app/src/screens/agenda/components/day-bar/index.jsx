import { IconButton } from 'react-native-paper'
import { AppText } from '@components'
import { useAgenda } from '@providers'
import {
  formatDateToDisplay,
  getTomorrowString,
  getYesterdayString,
} from '@utils'
import { COLORS } from '@constants'
import { StyledView } from './styles'

export function DayBar() {
  const { selectedDate, setSelectedDate } = useAgenda()

  return (
    <StyledView>
      <IconButton
        icon='menu-left'
        iconColor={COLORS.WHITE}
        onPress={() => setSelectedDate(getYesterdayString(selectedDate))}
      />
      <AppText fullWidth={false} color={COLORS.WHITE}>
        {formatDateToDisplay(selectedDate)}
      </AppText>
      <IconButton
        icon='menu-right'
        iconColor={COLORS.WHITE}
        onPress={() => setSelectedDate(getTomorrowString(selectedDate))}
      />
    </StyledView>
  )
}
