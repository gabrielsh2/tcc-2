import { api } from './api'

export function usePatientService() {
  function findAllPatients() {
    return api.get('/patients')
  }

  return {
    findAllPatients,
  }
}
