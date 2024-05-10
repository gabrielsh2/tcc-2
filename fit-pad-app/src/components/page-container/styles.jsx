import { COLORS } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    padding: 20,
  },
})
