import { AppButton, AppText } from '@components'
import { COLORS } from '@constants'
import { TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import styled from 'styled-components/native'

export const MealContainer = styled(View)`
  gap: 5px;
  width: 100%;
`

export const MealHeader = styled(View)`
  flex-direction: row;
  gap: 5px;
  width: 100%;
  background-color: ${({ index }) =>
    index % 2 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW};
  padding: 5px;
  padding-left: ${({ paddingLeft }) => paddingLeft || '5px'};
  border-radius: 5px;
  align-items: center;
`

export const MealItemContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 5px;
  padding: 5px;
`

export const ObservationsContainer = styled(View)`
  gap: 5px;
  width: 100%;
  margin-top: 40px;
`

export const ObservationsLabel = styled(View)`
  width: 100%;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: ${COLORS.SECONDARY_BLUE};
`

export const ActionsContainer = styled(View)`
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
  margin-bottom: 30px;
  width: 100%;
`

export const HeaderActions = styled(View)`
  flex-direction: row;
`

export const StyledAdd = styled(IconButton)`
  background-color: ${COLORS.SECONDARY_BLUE};
`

export const StyledRemove = styled(IconButton)`
  background-color: ${COLORS.LIGHT_GRAY};
`

export const StyledCheck = styled(IconButton)`
  background-color: ${COLORS.PRIMARY_LIGHT};
  margin-left: auto;
`

export const MealItemText = styled(AppText)`
  padding-left: 15px;
`

export const BottomItems = styled(View)`
  gap: 25px;
  margin-top: auto;
  width: 100%;
`

export const StyledButton = styled(TouchableOpacity)`
  width: 120px;
`
