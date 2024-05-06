import { USER_TYPE } from './userType'

export const ROUTES = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
  AGENDA: 'agenda',
  NUTRITIONIST_DASHBOARD: 'nutritionistDashboard',
}

export const USER_DEFAULT_ROUTE = {
  [USER_TYPE.NUTRITIONIST]: ROUTES.NUTRITIONIST_DASHBOARD,
  [USER_TYPE.PATIENT]: ROUTES.AGENDA,
}
