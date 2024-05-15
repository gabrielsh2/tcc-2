import { AppTitle, PageContainer } from '@components'
import {
  AgendaActions,
  AppCalendar,
  DailyMood,
  DailyNotesList,
  DailyTasks,
  DayBar,
} from './components'
import { Portal } from 'react-native-paper'
import { useEffect } from 'react'
import { useDate } from '@providers'

export function AgendaScreen() {
  const { refreshAgendas } = useDate()

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
      </PageContainer>
    </Portal.Host>
  )
}
