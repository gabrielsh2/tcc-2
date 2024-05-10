import { Stack, router } from 'expo-router'
import {
  AppButton,
  AppText,
  AppTitle,
  ListButton,
  PageContainer,
} from '@components'
import { ROUTES } from '@constants'
import { useNutritionist } from '@providers'

export function NutritionistDashboardScreen() {
  const { nutritionistPatients } = useNutritionist()

  function handlePatientClick(id) {
    router.push({
      pathname: ROUTES.AGENDA,
      params: {
        id,
      },
    })
  }

  function renderPatients() {
    return nutritionistPatients.map(({ id, fullName }, index) => (
      <ListButton key={id} index={index} onPress={() => handlePatientClick(id)}>
        {fullName}
      </ListButton>
    ))
  }

  return (
    <>
      {/* <Stack.Screen name='(nutritionist)/nutritionistDashboard' /> */}
      <PageContainer>
        <AppTitle>Pacientes</AppTitle>
        <AppText>Selecione um de seus pacientes para ver seus dados!</AppText>
        {renderPatients()}
        <AppButton onPress={() => router.navigate(ROUTES.REGISTER_PATIENT)}>
          Registrar novo paciente
        </AppButton>
      </PageContainer>
    </>
  )
}
