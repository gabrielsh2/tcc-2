import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '@constants'

export const customStyle = StyleSheet.create({
  button: {
    elevation: 6,
  },
})

export const SubstitutionListItem = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${COLORS.SECONDARY_BLUE};
  padding: 5px 20px;
`
