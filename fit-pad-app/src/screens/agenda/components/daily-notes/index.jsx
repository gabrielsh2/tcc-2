import { AppText, ListButton } from '@components'
import { COLORS, ROUTES } from '@constants'
import { useAgenda } from '@providers'
import { router, useLocalSearchParams } from 'expo-router'

export function DailyNotesList() {
  const { currentDailyNotes } = useAgenda()
  const { id } = useLocalSearchParams()

  return currentDailyNotes.map(({ title, id: dailyNoteId }, index) => (
    <ListButton
      key={index}
      backgroundColor={COLORS.SECONDARY_BLUE}
      onPress={() =>
        router.navigate({
          pathname: ROUTES.DAILY_NOTE,
          params: {
            id,
            dailyNoteId,
          },
        })
      }
    >
      <AppText>{title}</AppText>
    </ListButton>
  ))
}
