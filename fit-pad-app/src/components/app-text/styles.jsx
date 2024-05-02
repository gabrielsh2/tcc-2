import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

export const StyledText = styled(Text)`
  text-align: ${({ textAlign }) => textAlign};
  width: 100%;
`
