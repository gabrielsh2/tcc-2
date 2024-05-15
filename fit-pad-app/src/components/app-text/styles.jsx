import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

export const StyledText = styled(Text)`
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ color }) => color};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
`
