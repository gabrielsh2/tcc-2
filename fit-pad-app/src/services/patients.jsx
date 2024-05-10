import { api } from './api'

export function usePatientService() {
  function findAvailablePatients() {
    return api.get('/patients/available')
  }

  function findPatientsByNutritionist(nutritionistId) {
    return api.get(`/patients/nutritionist/${nutritionistId}`)
  }

  return {
    findAvailablePatients,
    findPatientsByNutritionist,
  }
}
