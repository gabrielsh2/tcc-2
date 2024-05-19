import { useTasksService } from '@services'
import { useGlobalSearchParams } from 'expo-router'
import { createContext, useContext, useState } from 'react'
import { useSnackbar } from './snackbar'

const TaskContext = createContext()

export function useTask() {
  return useContext(TaskContext)
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const { id } = useGlobalSearchParams()
  const { findPatientTasks } = useTasksService()
  const { showErrorMessage } = useSnackbar()

  async function fetchTasks() {
    try {
      const { data } = await findPatientTasks(id)
      setTasks(data)
    } catch {
      showErrorMessage('Erro ao buscar tarefas do paciente.')
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  )
}
