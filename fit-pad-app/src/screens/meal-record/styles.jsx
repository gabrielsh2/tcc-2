import { COLORS } from '@constants'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import styled from 'styled-components/native'

export const MealsContainer = styled(View)`
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`

export const MealItemsContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 15px;
`

export const ActionsContainer = styled(View)`
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
  margin-bottom: 30px;
`

export const StyledAdd = styled(IconButton)`
  background-color: ${COLORS.SECONDARY_BLUE};
`

export const StyledRemove = styled(IconButton)`
  background-color: ${COLORS.LIGHT_GRAY};
`
