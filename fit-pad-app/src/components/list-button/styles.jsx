import styled from 'styled-components/native'
import { Pressable, StyleSheet } from 'react-native'

export const customStyle = StyleSheet.create({
  button: {
    elevation: 6,
  },
})

export const StyledPressable = styled(Pressable)`
  width: 100%;
  height: 60px;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  padding: 0 20px;
`
