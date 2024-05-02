import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import styled from 'styled-components/native'
import { COLORS } from '@constants'

export const StyledRadioItem = styled(RadioButton.Item)`
  background-color: ${COLORS.WHITE};
  border-radius: 5px;
  width: 100%;
  height: 60px;
`

export const StyledView = styled(View)`
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
