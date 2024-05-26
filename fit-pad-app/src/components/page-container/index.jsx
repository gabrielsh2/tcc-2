import { ScrollView, View } from 'react-native'
import { styles } from './styles'

export function PageContainer({ children }) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='handled'
    >
      {children}
    </ScrollView>
  )
}
