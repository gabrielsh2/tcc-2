import { Dimensions } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { COLORS } from '@constants'
import { useDate } from '@providers'
import {
  CALENDAR_LOCALE,
  CALENDAR_LOCALE_CONFIG,
  CALENDAR_THEME,
} from '../../constants'
import { DayCalendar } from '../day-calendar'

LocaleConfig.locales[CALENDAR_LOCALE] = CALENDAR_LOCALE_CONFIG

LocaleConfig.defaultLocale = CALENDAR_LOCALE

export function AppCalendar() {
  const { selectedDate, setSelectedDate, setSelectedMonth, agendas } = useDate()
  const screenWidth = Dimensions.get('window').width

  function handleDayPress(day) {
    setSelectedDate(day.dateString)
  }

  function handleMonthChange({ month }) {
    setSelectedMonth(month)
  }

  function mapAgendasMarks() {
    return agendas.reduce(
      (mappedAgendas, currentAgenda) => ({
        ...mappedAgendas,
        [currentAgenda.registerDate]: {
          marked: true,
          dotColor: COLORS.PRIMARY_COLOR,
          moodEmoji: currentAgenda.moodEmoji,
        },
      }),
      {}
    )
  }

  return (
    <Calendar
      onDayPress={handleDayPress}
      onMonthChange={handleMonthChange}
      markedDates={{ ...mapAgendasMarks() }}
      style={{ width: screenWidth * 0.9 }}
      date={selectedDate}
      showSixWeeks
      dayComponent={(props) => (
        <DayCalendar {...props} selectedDate={selectedDate} />
      )}
      theme={CALENDAR_THEME}
      enableSwipeMonths
    />
  )
}
