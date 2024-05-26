import { Redirect, Stack, router } from 'expo-router'
import { ActivityIndicator, Button, Portal, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AgendaProvider,
  AnthropometryProvider,
  DietProvider,
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
    return (
      <Portal>
        <ActivityIndicator animating />
      </Portal>
    )
  }

  if (userData) {
    return (
      <NutritionistProvider>
        <DietProvider>
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
        </DietProvider>
      </NutritionistProvider>
    )
  }

  return <Redirect href={ROUTES.SIGN_IN} />
}
