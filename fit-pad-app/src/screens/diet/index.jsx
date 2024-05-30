import { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppText,
  AppTitle,
  ListItem,
  PageContainer,
} from '@components'
import { useDiet, useSession } from '@providers'
import { ROUTES, USER_TYPE } from '@constants'
import { SubstitutionListItem, customStyle } from './style'

export function DietScreen() {
  const { id } = useLocalSearchParams()
  const { diets, fetchDiets, fetchSubstitutionList, substitutionList } =
    useDiet()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    fetchDiets()
    fetchSubstitutionList()
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

  function handleSubstitutionList(substitutionListId) {
    router.navigate({
      pathname: ROUTES.CREATE_SUBSTITUTION_LIST,
      params: {
        id,
        substitutionListId,
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

  function handleClickCreateSubstitutionList() {
    router.navigate({
      pathname: ROUTES.CREATE_SUBSTITUTION_LIST,
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
      {substitutionList && (
        <SubstitutionListItem
          style={customStyle.button}
          onPress={() => handleSubstitutionList(substitutionList.id)}
        >
          <AppText>Lista de Substituição</AppText>
        </SubstitutionListItem>
      )}
      {userType === USER_TYPE.NUTRITIONIST && (
        <AppButton onPress={handleClickCreateDiet}>Criar Dieta</AppButton>
      )}
      {!substitutionList && (
        <AppButton onPress={handleClickCreateSubstitutionList}>
          Criar Lista de Substituição
        </AppButton>
      )}
    </PageContainer>
  )
}
