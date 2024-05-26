import { api } from './api'

export function useDietService() {
  function createDiet(patientId, data) {
    return api.post(`/diets/patient/${patientId}`, data)
  }

  function updateDiet(dietId, data) {
    return api.put(`/diets/${dietId}`, data)
  }

  function findPatientDiets(patientId) {
    return api.get(`/diets/patient/${patientId}`)
  }

  return {
    createDiet,
    updateDiet,
    findPatientDiets,
  }
}
