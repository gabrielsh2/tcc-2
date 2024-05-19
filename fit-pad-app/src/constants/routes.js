import { USER_TYPE } from './userType'

export const ROUTES = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
  AGENDA: 'agenda/[id]',
  ANTHROPOMETRY: 'anthropometry/[id]',
  DIET: 'diet/[id]',
  NUTRITIONIST_DASHBOARD: 'nutritionistDashboard',
  REGISTER_PATIENT: 'registerPatient',
  DAILY_NOTE: 'dailyNote',
  MEAL_RECORD: 'mealRecord',
  TASKS: 'tasks',
  CREATE_TASK: 'createTask',
}

export const USER_DEFAULT_ROUTE = {
  [USER_TYPE.NUTRITIONIST]: ROUTES.NUTRITIONIST_DASHBOARD,
  [USER_TYPE.PATIENT]: ROUTES.AGENDA,
}
