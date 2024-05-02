import { Snackbar } from 'react-native-paper'
import styled from 'styled-components/native'

export const StyledSnackbar = styled(Snackbar)`
  background-color: ${({ customTheme }) => customTheme.background};
  color: ${({ customTheme }) => customTheme.color};
  border-radius: 15px;
`
