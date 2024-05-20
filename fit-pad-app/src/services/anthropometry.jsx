import { api } from './api'

export function useAnthropometryService() {
  function findPatientAnthropometryRegisters(patientId) {
    return api.get(`/anthropometry/patient/${patientId}`)
  }

  function createAnthropometryRegister(patientId, data) {
    return api.post(`/anthropometry/patient/${patientId}`, data)
  }

  function updateAnthropometryRegister(anthropometryId, data) {
    return api.put(`/anthropometry/${anthropometryId}`, data)
  }

  return {
    findPatientAnthropometryRegisters,
    createAnthropometryRegister,
    updateAnthropometryRegister,
  }
}
