import { Redirect, Slot, Stack } from 'expo-router'
import { Text } from 'react-native-paper'
import { useSession } from '@providers'
import { ROUTES, STACK_DEFAULT_SCREEN_OPTIONS } from '@constants'

export default function AppLayout() {
  const { userData, isLoading } = useSession()

  if (isLoading) {
    // TODO: Splash Screen
    return <Text>Loading...</Text>
  }

  if (userData) {
    return <Stack screenOptions={STACK_DEFAULT_SCREEN_OPTIONS} />
  }

  return <Redirect href={ROUTES.SIGN_IN} />
}
