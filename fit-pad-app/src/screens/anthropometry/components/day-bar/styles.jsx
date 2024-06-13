import { COLORS } from '@constants'
import { View } from 'react-native'
import styled from 'styled-components/native'

export const StyledView = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.PRIMARY_COLOR};
  border-radius: 5px;
`
