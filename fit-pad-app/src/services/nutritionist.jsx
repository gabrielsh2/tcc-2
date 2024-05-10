import { api } from './api'

export function useNutritionistService() {
  function bindPatient(nutritionistId, data) {
    return api.post(`/nutritionist/${nutritionistId}/bind-patient`, data)
  }

  return {
    bindPatient,
  }
}
