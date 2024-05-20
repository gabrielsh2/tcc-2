import { Redirect, Stack, router } from 'expo-router'
import { Button, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AgendaProvider,
  AnthropometryProvider,
  NutritionistProvider,
  TaskProvider,
  useSession,
} from '@providers'
import { ROUTES, STACK_DEFAULT_SCREEN_OPTIONS } from '@constants'

export default function AppLayout() {
  const { userData, isLoading } = useSession()

  async function handleLogout() {
    await AsyncStorage.clear()
    router.navigate(ROUTES.SIGN_IN)
  }

  if (isLoading) {
    // TODO: Splash Screen
    return <Text>Loading...</Text>
  }

  if (userData) {
    return (
      <NutritionistProvider>
        <AnthropometryProvider>
          <TaskProvider>
            <AgendaProvider>
              <Stack
                screenOptions={{
                  ...STACK_DEFAULT_SCREEN_OPTIONS,
                  headerRight: () => (
                    <Button onPress={handleLogout}>Sair</Button>
                  ),
                }}
              />
            </AgendaProvider>
          </TaskProvider>
        </AnthropometryProvider>
      </NutritionistProvider>
    )
  }

  return <Redirect href={ROUTES.SIGN_IN} />
}
