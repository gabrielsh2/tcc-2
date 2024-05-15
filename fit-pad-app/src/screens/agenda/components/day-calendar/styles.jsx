import { StyleSheet } from 'react-native'
import { COLORS } from '@constants'

export const style = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  base: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 16,
  },
  text: {
    fontSize: 20,
    color: COLORS.TEXT_COLOR,
  },
  disabledText: {
    color: COLORS.DISABLED_COLOR,
  },
  todayText: {
    color: COLORS.PRIMARY_COLOR,
  },
  selectedText: {
    color: COLORS.WHITE,
  },
  dot: {
    width: 4,
    height: 4,
    marginBottom: 1,
    marginHorizontal: 1,
    borderRadius: 2,
    opacity: 0,
  },
  visibleDot: {
    opacity: 1,
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  selectedDot: {
    backgroundColor: COLORS.WHITE,
  },
})
