import { ScrollView } from 'react-native'
import { styles } from './styles'
export function PageContainer({ children }) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  )
}
