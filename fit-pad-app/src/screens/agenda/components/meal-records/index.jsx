import { AppText, ListButton } from '@components'
import { COLORS, ROUTES } from '@constants'
import { useAgenda } from '@providers'
import { router, useLocalSearchParams } from 'expo-router'

export function MealRecords() {
  const { currentMealRecords } = useAgenda()
  const { id } = useLocalSearchParams()

  return currentMealRecords.map(({ mealType, id: mealRecordId }, index) => (
    <ListButton
      key={index}
      backgroundColor={COLORS.PRIMARY_LIGHT}
      onPress={() =>
        router.navigate({
          pathname: ROUTES.MEAL_RECORD,
          params: {
            id,
            mealRecordId,
          },
        })
      }
    >
      <AppText>{mealType}</AppText>
    </ListButton>
  ))
}
