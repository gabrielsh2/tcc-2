import { COLORS } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    padding: 20,
  },
})
