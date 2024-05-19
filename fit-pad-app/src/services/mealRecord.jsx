import { api } from './api'

export function useMealRecordService() {
  function createMealRecord(agendaId, data) {
    return api.post(`meal-record/agenda/${agendaId}`, data)
  }

  function updateMealRecord(mealRecordId, data) {
    return api.put(`meal-record/${mealRecordId}`, data)
  }

  function findAgendaMealRecord(agendaId) {
    return api.get(`meal-record/agenda/${agendaId}`)
  }

  return {
    createMealRecord,
    updateMealRecord,
    findAgendaMealRecord,
  }
}
