import { useDietService, useSubstitutionList } from '@services'
import { useSnackbar } from './snackbar'
import { useGlobalSearchParams } from 'expo-router'

const { createContext, useContext, useState } = require('react')

const DietContext = createContext()

export function useDiet() {
  return useContext(DietContext)
}

export function DietProvider({ children }) {
  const [diets, setDiets] = useState([])
  const [substitutionList, setSubstitutionList] = useState(null)
  const { showErrorMessage } = useSnackbar()
  const { findPatientDiets } = useDietService()
  const { findSubstitutionList } = useSubstitutionList()
  const { id: patientId } = useGlobalSearchParams()

  async function fetchDiets() {
    try {
      const { data } = await findPatientDiets(patientId)
      setDiets(data)
    } catch {
      showErrorMessage('Erro ao buscar dietas.')
    }
  }

  async function fetchSubstitutionList() {
    try {
      const { data } = await findSubstitutionList(patientId)
      setSubstitutionList(data)
    } catch (error) {
      if (error?.response?.status === 404) {
        setSubstitutionList(null)
      } else {
        showErrorMessage('Erro ao buscar dietas.')
      }
    }
  }

  return (
    <DietContext.Provider
      value={{ fetchDiets, diets, fetchSubstitutionList, substitutionList }}
    >
      {children}
    </DietContext.Provider>
  )
}
