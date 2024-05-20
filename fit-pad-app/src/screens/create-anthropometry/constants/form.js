import { ANTHROPOMETRY_FIELDS } from '@constants'

export const INITIAL_FORM = Object.values(ANTHROPOMETRY_FIELDS).reduce(
  (currentFields, field) => ({
    ...currentFields,
    [field]: '',
  }),
  {}
)
