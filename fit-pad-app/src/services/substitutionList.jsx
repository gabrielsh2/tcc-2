import { api } from './api'

export function useSubstitutionList() {
  function findSubstitutionList(patientId) {
    return api.get(`substitution-list/patient/${patientId}`)
  }

  function createSubstitutionList(patientId, data) {
    return api.post(`substitution-list/patient/${patientId}`, data)
  }

  function updateSubstitutionList(substitutionListId, data) {
    return api.put(`substitution-list/${substitutionListId}`, data)
  }

  return {
    findSubstitutionList,
    createSubstitutionList,
    updateSubstitutionList,
  }
}
