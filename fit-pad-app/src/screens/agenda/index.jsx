import { AppTitle, PageContainer } from '@components'
import {
  AgendaActions,
  AppCalendar,
  DailyMood,
  DailyNotesList,
  DailyTasks,
  DayBar,
  MealRecords,
} from './components'
import { Portal } from 'react-native-paper'
import { useEffect } from 'react'
import { useAgenda } from '@providers'
import { View } from 'react-native'

export function AgendaScreen() {
  const { refreshAgendas } = useAgenda()

  useEffect(() => {
    async function fetchData() {
      await refreshAgendas()
    }

    fetchData()
  }, [])

  return (
    <Portal.Host>
      <PageContainer>
        <AppTitle>Agenda</AppTitle>
        <AppCalendar />
        <DayBar />
        <DailyMood />
        <DailyTasks />
        <DailyNotesList />
        <AgendaActions />
        <MealRecords />
        <View style={{ height: 50 }} />
      </PageContainer>
    </Portal.Host>
  )
}
