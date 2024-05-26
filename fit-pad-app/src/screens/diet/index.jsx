import { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { AppButton, AppTitle, ListItem, PageContainer } from '@components'
import { useDiet, useSession } from '@providers'
import { ROUTES, USER_TYPE } from '@constants'

export function DietScreen() {
  const { id } = useLocalSearchParams()
  const { diets, fetchDiets } = useDiet()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    fetchDiets()
  }, [])

  function handleClickDiet(dietId) {
    router.navigate({
      pathname: ROUTES.CREATE_DIET,
      params: {
        id,
        dietId,
      },
    })
  }

  function handleClickCreateDiet() {
    router.navigate({
      pathname: ROUTES.CREATE_DIET,
      params: {
        id,
      },
    })
  }

  return (
    <PageContainer>
      <AppTitle>Dietas</AppTitle>
      {diets.map(({ name, id }, index) => (
        <ListItem key={index} index={index} onPress={() => handleClickDiet(id)}>
          {name}
        </ListItem>
      ))}
      {userType === USER_TYPE.NUTRITIONIST && (
        <AppButton onPress={handleClickCreateDiet}>Criar Dieta</AppButton>
      )}
    </PageContainer>
  )
}
