import { List } from 'react-native-paper'
import { StyledAccordion } from './styles'

export function AppSelect({
  options = [],
  selected = '',
  title = '',
  onPress,
}) {
  return (
    <StyledAccordion title={selected || title}>
      {options.map((option, index) => (
        <List.Item
          key={index}
          title={option?.label}
          onPress={() => onPress(option)}
        />
      ))}
    </StyledAccordion>
  )
}
