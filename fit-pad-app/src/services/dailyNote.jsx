import { api } from './api'

export function useDailyNoteService() {
  function createDailyNote(agendaId, data) {
    return api.post(`/daily-note/agenda/${agendaId}`, data)
  }

  function updateDailyNote(dailyNoteId, data) {
    return api.put(`/daily-note/${dailyNoteId}`, data)
  }

  function findAgendaDailyNotes(agendaId) {
    return api.get(`/daily-note/agenda/${agendaId}`)
  }

  return {
    createDailyNote,
    updateDailyNote,
    findAgendaDailyNotes,
  }
}
