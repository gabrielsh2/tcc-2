import { createContext, useContext, useEffect, useState } from 'react'
import { usePatientService } from '@services'
import { useSnackbar } from './snackbar'
import { useSession } from './session'

const NutritionistContext = createContext()

export function useNutritionist() {
  return useContext(NutritionistContext)
}

export function NutritionistProvider({ children }) {
  const [nutritionistPatients, setNutritionistPatients] = useState([])
  const { findPatientsByNutritionist } = usePatientService()
  const { showErrorMessage } = useSnackbar()
  const { userData } = useSession()

  useEffect(() => {
    fetchNutritionistPatients()
  }, [])

  async function fetchNutritionistPatients() {
    const { userId } = userData
    try {
      const { data } = await findPatientsByNutritionist(userId)
      setNutritionistPatients(data)
    } catch (error) {
      showErrorMessage('Não foi possível encontrar pacientes.')
    }
  }

  return (
    <NutritionistContext.Provider
      value={{ fetchNutritionistPatients, nutritionistPatients }}
    >
      {children}
    </NutritionistContext.Provider>
  )
}
