import { api } from './api'

export function useDietService() {
  function createDiet(patientId, data) {
    return api.post(`/diets/patient/${patientId}`, data)
  }

  function findPatientDiets(patientId) {
    return api.get(`/diets/patient/${patientId}`)
  }

  return {
    createDiet,
    findPatientDiets,
  }
}
