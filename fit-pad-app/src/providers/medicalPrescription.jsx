import { useMedicalPrescriptionService } from '@services'
import { useGlobalSearchParams } from 'expo-router'
import { createContext, useContext, useState } from 'react'
import { useSnackbar } from './snackbar'

const MedicalPrescriptionContext = createContext()

export function useMedicalPrescription() {
  return useContext(MedicalPrescriptionContext)
}

export function MedicalPrescriptionProvider({ children }) {
  const [medicalPrescriptions, setMedicalPrescriptions] = useState([])
  const { findMedicalPrescriptions } = useMedicalPrescriptionService()
  const { id: patientId } = useGlobalSearchParams()
  const { showErrorMessage } = useSnackbar()

  async function fetchData() {
    try {
      const { data } = await findMedicalPrescriptions(patientId)
      setMedicalPrescriptions(data)
    } catch {
      showErrorMessage('Erro ao buscar prescrições médicas.')
    }
  }

  return (
    <MedicalPrescriptionContext.Provider
      value={{ medicalPrescriptions, fetchData }}
    >
      {children}
    </MedicalPrescriptionContext.Provider>
  )
}
