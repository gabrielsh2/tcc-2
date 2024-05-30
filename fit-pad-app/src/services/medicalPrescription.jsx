import { api } from './api'

export function useMedicalPrescriptionService() {
  function findMedicalPrescriptions(patientId) {
    return api.get(`/medical-prescription/patient/${patientId}`)
  }

  function createMedicalPrescription(patientId, data) {
    return api.post(`/medical-prescription/patient/${patientId}`, data)
  }

  function updateMedicalPrescription(medicalPrescriptionId, data) {
    return api.put(`/medical-prescription/${medicalPrescriptionId}`, data)
  }

  return {
    findMedicalPrescriptions,
    createMedicalPrescription,
    updateMedicalPrescription,
  }
}
