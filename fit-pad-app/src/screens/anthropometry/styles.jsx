import { View } from 'react-native'
import styled from 'styled-components/native'

export const AnthropometryListContainer = styled(View)`
  gap: 5px;
  width: 100%;
`

export const AnthropometryItem = styled(View)`
  flex-direction: row;
  padding: 5px 10px;
  justify-content: space-between;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  flex-wrap: wrap;
  width: 100%;
`

export const StyledContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
