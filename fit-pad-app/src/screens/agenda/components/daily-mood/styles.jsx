import { COLORS } from '@constants'
import { Pressable, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'

export const StyledPressable = styled(Pressable)`
  align-self: flex-end;
  border: solid 1px ${COLORS.PRIMARY_COLOR};
  border-radius: 5px;
`

export const StyledView = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`

export const EmojiContainer = styled(View)`
  background-color: ${COLORS.SECONDARY_YELLOW};
  width: 40px;
  height: 40px;
  margin-left: 20px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`

export const style = StyleSheet.create({
  emojiContainer: {
    elevation: 2,
  },
})
