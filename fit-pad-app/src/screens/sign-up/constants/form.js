import { USER_TYPE, USER_TYPE_LABEL } from '@constants'

export const USER_TYPE_OPTIONS = [
  {
    label: USER_TYPE_LABEL[USER_TYPE.NUTRITIONIST],
    value: USER_TYPE.NUTRITIONIST,
  },
  {
    label: USER_TYPE_LABEL[USER_TYPE.PATIENT],
    value: USER_TYPE.PATIENT,
  },
]

export const FORM_FIELDS = {
  USER_TYPE: 'userType',
  FULL_NAME: 'fullName',
  EMAIL: 'email',
  PASSWORD: 'password',
}

export const INITIAL_FORM = {
  [FORM_FIELDS.USER_TYPE]: '',
  [FORM_FIELDS.FULL_NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: '',
}
