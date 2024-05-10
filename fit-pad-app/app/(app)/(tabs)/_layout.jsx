import { ROUTES } from '@constants'
import { Tabs, useLocalSearchParams } from 'expo-router'

export default function TabsLayout() {
  const { id } = useLocalSearchParams()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={ROUTES.DIET}
        options={{
          href: {
            pathname: ROUTES.DIET,
            params: {
              id,
            },
          },
        }}
      />
      <Tabs.Screen
        name={ROUTES.AGENDA}
        options={{
          href: {
            pathname: ROUTES.AGENDA,
            params: {
              id,
            },
          },
        }}
      />
      <Tabs.Screen
        name={ROUTES.ANTHROPOMETRY}
        options={{
          href: {
            pathname: ROUTES.ANTHROPOMETRY,
            params: {
              id,
            },
          },
        }}
      />
    </Tabs>
  )
}
