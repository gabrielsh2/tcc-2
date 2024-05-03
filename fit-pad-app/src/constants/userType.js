export const USER_TYPE = {
  NUTRITIONIST: 'NUTRITIONIST',
  PATIENT: 'PATIENT',
}

export const USER_TYPE_LABEL = {
  [USER_TYPE.NUTRITIONIST]: 'Nutricionista',
  [USER_TYPE.PATIENT]: 'Paciente',
}

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
