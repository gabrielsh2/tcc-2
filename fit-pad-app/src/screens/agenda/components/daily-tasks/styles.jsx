import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '@constants'

export const StyledView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ButtonsContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
`

export const StatusContainer = styled(View)`
  background-color: ${COLORS.WHITE};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`
