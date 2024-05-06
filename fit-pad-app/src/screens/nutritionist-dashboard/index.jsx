import { AppText, PageContainer } from '@components'
import { ROUTES } from '@constants'
import { Link } from 'expo-router'

export function NutritionistDashboard() {
  return (
    <PageContainer>
      <AppText variant='headlineLarge' textAlign='center'>
        Pacientes
      </AppText>
      <AppText>Selecione um de seus pacientes para ver seus dados!</AppText>
      <Link href={ROUTES.AGENDA}>Agenda</Link>
      <Link href={ROUTES.SIGN_IN}>Logout</Link>
    </PageContainer>
  )
}
