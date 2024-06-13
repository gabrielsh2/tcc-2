import { createContext, useContext, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useAnthropometryService } from '@services'
import { useSnackbar } from './snackbar'

const AnthropometryContext = createContext()

export function useAnthropometry() {
  return useContext(AnthropometryContext)
}

export function AnthropometryProvider({ children }) {
  const [anthropometryRegisters, setAnthropometryRegisters] = useState([])
  const [currentAnthropometry, setCurrentAnthropometry] = useState(null)
  const { findPatientAnthropometryRegisters } = useAnthropometryService()
  const { showErrorMessage } = useSnackbar()
  const { id: patientId } = useGlobalSearchParams()

  async function fetchAnthropometry() {
    try {
      const { data } = await findPatientAnthropometryRegisters(patientId)
      setAnthropometryRegisters(data)
      setCurrentAnthropometry(data[0])
    } catch {
      showErrorMessage('Erro ao buscar registros de antropometria.')
    }
  }

  return (
    <AnthropometryContext.Provider
      value={{
        fetchAnthropometry,
        anthropometryRegisters,
        currentAnthropometry,
        setCurrentAnthropometry,
      }}
    >
      {children}
    </AnthropometryContext.Provider>
  )
}
