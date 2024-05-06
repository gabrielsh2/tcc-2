import { STACK_DEFAULT_SCREEN_OPTIONS } from '@constants'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return <Stack screenOptions={STACK_DEFAULT_SCREEN_OPTIONS} />
}
