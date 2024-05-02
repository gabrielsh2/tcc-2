import { RadioButton, Text } from 'react-native-paper'
import { AppText } from '../app-text'
import { StyledRadioItem, StyledView } from './styles'

export function AppRadio({ options = [], value = '', title = '', onPress }) {
  return (
    <>
      <AppText>{title}</AppText>
      <RadioButton.Group
        onValueChange={(value) => onPress(value)}
        value={value}
      >
        <StyledView>
          {options.map((option, index) => (
            <StyledRadioItem
              key={index}
              label={option?.label}
              value={option?.value}
            />
          ))}
        </StyledView>
      </RadioButton.Group>
    </>
  )
}
