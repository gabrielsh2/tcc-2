import { COLORS, ROUTES } from '@constants'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { DateProvider } from '@providers'
import { Tabs, useLocalSearchParams } from 'expo-router'

export default function TabsLayout() {
  const { id } = useLocalSearchParams()

  return (
    <Tabs
      safeAreaInsets={{ bottom: 5, right: 15 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name={ROUTES.DIET}
        options={{
          title: 'Dietas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name='food-apple'
              size={20}
              style={{ marginBottom: -3 }}
            />
          ),
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
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <FontAwesome
              color={color}
              name='calendar-o'
              size={20}
              style={{ marginBottom: -3 }}
            />
          ),
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
          title: 'Antropometria',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name='arm-flex'
              size={20}
              style={{ marginBottom: -3 }}
            />
          ),
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
