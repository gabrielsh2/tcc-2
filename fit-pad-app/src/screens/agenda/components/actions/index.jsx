import { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'
import { router, useLocalSearchParams } from 'expo-router'
import { COLORS, ROUTES } from '@constants'

export function AgendaActions() {
  const [state, setState] = useState({ open: false })

  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  const { id } = useLocalSearchParams()

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'silverware-fork-knife',
            color: COLORS.SECONDARY_BLUE,

            label: 'Refeição',
            onPress: () => console.log('Refeição'),
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
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  )
}
