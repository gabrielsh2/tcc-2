import { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { AppTitle, PageContainer } from '@components'
import { ROUTES } from '@constants'

export function DietScreen() {
  const { id } = useLocalSearchParams()

  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <PageContainer>
      <AppTitle>Dietas</AppTitle>
      <Link href={ROUTES.SIGN_IN}>Logout</Link>
    </PageContainer>
  )
}
