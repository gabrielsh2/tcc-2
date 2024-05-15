import { api } from './api'

export function useTasksService() {
  function findPatientTasks(patientId) {
    return api.get(`/task/patient/${patientId}`)
  }

  function findAgendaDailyTasks(agendaId) {
    return api.get(`/agenda/${agendaId}/daily-task`)
  }

  function createDailyTask(agendaId, taskId, data) {
    return api.post(`/agenda/${agendaId}/register-daily-task/${taskId}`, data)
  }

  function updateDailyTask(dailyTaskId, data) {
    return api.put(`/agenda/daily-task/${dailyTaskId}`, data)
  }

  return {
    findPatientTasks,
    findAgendaDailyTasks,
    createDailyTask,
    updateDailyTask,
  }
}
