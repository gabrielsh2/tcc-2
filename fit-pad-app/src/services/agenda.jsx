import { api } from './api'

export function useAgendaService() {
  function findAgendas(year, month, id, data) {
    return api.get(`/agenda/${year}/${month}/patient/${id}`, {
      data,
    })
  }

  function createAgenda(patientId, data) {
    return api.post(`/agenda/patient/${patientId}`, data)
  }

  function registerMoodEmoji(agendaId, data) {
    return api.put(`/agenda/${agendaId}/register-mood-emoji`, data)
  }

  return {
    findAgendas,
    createAgenda,
    registerMoodEmoji,
  }
}
