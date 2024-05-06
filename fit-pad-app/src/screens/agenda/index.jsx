import { AppText, PageContainer } from '@components'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export function AgendaScreen() {
  return (
    <PageContainer>
      <AppText variant='headlineLarge'>Agenda</AppText>
    </PageContainer>
  )
}
