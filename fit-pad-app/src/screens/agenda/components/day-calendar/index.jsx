import { TouchableOpacity, View } from 'react-native'
import { AppText } from '@components'
import { style } from './styles'

export function DayCalendar({
  date,
  state,
  marking = {},
  onPress,
  selectedDate,
}) {
  const { moodEmoji, marked } = marking
  const isDisabled = state === 'disabled'
  const isSelected = date.dateString === selectedDate
  const isToday = state === 'today'

  function getContainerStyle() {
    const styles = [style.base]

    if (isSelected) {
      styles.push(style.selected)
    }

    return styles
  }

  function getTextStyle() {
    const styles = [style.text]

    if (isSelected) {
      styles.push(style.selectedText)
    } else if (isDisabled) {
      styles.push(style.disabledText)
    } else if (isToday) {
      styles.push(style.todayText)
    }

    return styles
  }

  function getDotStyle() {
    const styles = [style.dot]

    if (marked) {
      styles.push(style.visibleDot)

      if (isSelected) styles.push(style.selectedDot)
    }

    return styles
  }

  function renderText() {
    return (
      <AppText
        allowFontScaling={false}
        style={getTextStyle()}
        textAlign='center'
      >
        {moodEmoji || date.day}
      </AppText>
    )
  }

  function renderMarking() {
    return <View style={getDotStyle()} />
  }

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      disabled={isSelected}
      onPress={() => onPress(date)}
      accessible
      accessibilityRole={isDisabled ? undefined : 'button'}
    >
      {renderText()}
      {renderMarking()}
    </TouchableOpacity>
  )
}
