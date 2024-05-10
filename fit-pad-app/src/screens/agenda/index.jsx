import { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { AppTitle, PageContainer } from '@components'
import { ROUTES } from '@constants'

export function AgendaScreen() {
  const { id } = useLocalSearchParams()

  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <PageContainer>
      <AppTitle>Agenda</AppTitle>
      <Link href={ROUTES.SIGN_IN}>Logout</Link>
    </PageContainer>
  )
}
