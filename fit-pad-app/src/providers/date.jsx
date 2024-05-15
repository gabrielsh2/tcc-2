import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAgendaService, useDailyNoteService } from '@services'
import { getCurrentMonth, getCurrentYear, getTodayString } from '@utils'
import { useSnackbar } from './snackbar'

const DateContext = createContext()

export function useDate() {
  return useContext(DateContext)
}

export function DateProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth())
  const [selectedYear, setSelectedYear] = useState(getCurrentYear())
  const [agendas, setAgendas] = useState([])
  const [currentAgenda, setCurrentAgenda] = useState(null)
  const [currentDailyNotes, setCurrentDailyNotes] = useState([])
  const { findAgendas, createAgenda } = useAgendaService()
  const { findAgendaDailyNotes } = useDailyNoteService()
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
    } else {
      setCurrentDailyNotes([])
    }
  }, [currentAgenda])

  async function fetchAgendas() {
    try {
      const { data } = await findAgendas(selectedYear, selectedMonth, id, {
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
      console.error(error)
      showErrorMessage('Erro ao buscar anotações do dia.')
    }
  }

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        agendas,
        currentAgenda,
        handleAgendaCreation,
        refreshAgendas: fetchAgendas,
        fetchDailyNotes,
        currentDailyNotes,
      }}
    >
      {children}
    </DateContext.Provider>
  )
}
