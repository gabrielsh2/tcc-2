import { useDietService } from '@services'
import { useSnackbar } from './snackbar'
import { useGlobalSearchParams } from 'expo-router'

const { createContext, useContext, useState } = require('react')

const DietContext = createContext()

export function useDiet() {
  return useContext(DietContext)
}

export function DietProvider({ children }) {
  const [diets, setDiets] = useState([])
  const { showErrorMessage } = useSnackbar()
  const { findPatientDiets } = useDietService()
  const { id: patientId } = useGlobalSearchParams()

  async function fetchDiets() {
    try {
      const { data } = await findPatientDiets(patientId)
      setDiets(data)
    } catch {
      showErrorMessage('Erro ao buscar dietas.')
    }
  }

  return (
    <DietContext.Provider value={{ fetchDiets, diets }}>
      {children}
    </DietContext.Provider>
  )
}
