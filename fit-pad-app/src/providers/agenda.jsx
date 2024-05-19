import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  useAgendaService,
  useDailyNoteService,
  useMealRecordService,
} from '@services'
import { getTodayString } from '@utils'
import { useSnackbar } from './snackbar'

const DateContext = createContext()

export function useAgenda() {
  return useContext(DateContext)
}

export function AgendaProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [agendas, setAgendas] = useState([])
  const [currentAgenda, setCurrentAgenda] = useState(null)
  const [currentDailyNotes, setCurrentDailyNotes] = useState([])
  const [currentMealRecords, setCurrentMealRecords] = useState([])
  const { findAgendas, createAgenda } = useAgendaService()
  const { findAgendaDailyNotes } = useDailyNoteService()
  const { findAgendaMealRecord } = useMealRecordService()
  const { showErrorMessage } = useSnackbar()
  const { id } = useGlobalSearchParams()

  useEffect(() => {
    const foundAgenda = agendas.find(
      ({ registerDate }) => registerDate === selectedDate
    )
    setCurrentAgenda(foundAgenda)
  }, [selectedDate, agendas])

  useEffect(() => {
    if (currentAgenda) {
      fetchDailyNotes()
      fetchMealRecords()
    } else {
      setCurrentDailyNotes([])
      setCurrentMealRecords([])
    }
  }, [currentAgenda])

  async function fetchAgendas() {
    try {
      const { data } = await findAgendas(id, {
        date: selectedDate,
      })
      setAgendas(data)
    } catch (error) {
      console.error(error?.response?.data)
      showErrorMessage('Erro ao buscar por registros na agenda!')
    }
  }

  async function handleAgendaCreation() {
    try {
      const { data } = await createAgenda(id, { date: selectedDate })
      return data.id
    } catch (error) {
      showErrorMessage('Erro ao criar registro na agenda.')
    }
  }

  async function fetchDailyNotes() {
    try {
      const { data } = await findAgendaDailyNotes(currentAgenda?.id)
      setCurrentDailyNotes(data)
    } catch (error) {
      showErrorMessage('Erro ao buscar anotações do dia.')
    }
  }

  async function fetchMealRecords() {
    try {
      const { data } = await findAgendaMealRecord(currentAgenda?.id)
      setCurrentMealRecords(data)
    } catch (error) {
      showErrorMessage('Erro ao buscar refeições do dia.')
    }
  }

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        agendas,
        currentAgenda,
        handleAgendaCreation,
        refreshAgendas: fetchAgendas,
        fetchDailyNotes,
        currentDailyNotes,
        fetchMealRecords,
        currentMealRecords,
      }}
    >
      {children}
    </DateContext.Provider>
  )
}
