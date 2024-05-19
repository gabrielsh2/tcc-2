import { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'
import { router, useLocalSearchParams } from 'expo-router'
import { useSession } from '@providers'
import { COLORS, ROUTES, USER_TYPE } from '@constants'

export function AgendaActions() {
  const [state, setState] = useState({ open: false })

  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  const { id } = useLocalSearchParams()
  const {
    userData: { userType },
  } = useSession()

  const USER_ACTIONS = {
    [USER_TYPE.PATIENT]: [
      {
        icon: 'silverware-fork-knife',
        color: COLORS.SECONDARY_BLUE,

        label: 'Refeição',
        onPress: () =>
          router.navigate({
            pathname: ROUTES.MEAL_RECORD,
            params: {
              id,
            },
          }),
      },
      {
        icon: 'note',
        color: COLORS.SECONDARY_BLUE,
        label: 'Registro de Texto',
        onPress: () =>
          router.navigate({
            pathname: ROUTES.DAILY_NOTE,
            params: {
              id,
            },
          }),
      },
    ],
    [USER_TYPE.NUTRITIONIST]: [
      {
        icon: 'text-box-check',
        color: COLORS.SECONDARY_BLUE,
        label: 'Tarefas do Paciente',
        onPress: () =>
          router.navigate({
            pathname: ROUTES.TASKS,
            params: {
              id,
            },
          }),
      },
    ],
  }

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={USER_ACTIONS[userType]}
        onStateChange={onStateChange}
      />
    </Portal>
  )
}
