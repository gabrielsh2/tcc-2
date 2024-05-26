export const FIELDS = {
  NAME: 'name',
  MEALS: 'meals',
  OBSERVATIONS: 'observations',
  QUANTITY: 'quantity',
  MEAL_TYPE: 'type',
  MEAL_TIME: 'mealTime',
  MEAL_ITEMS: 'items',
  IS_EDITING: 'isEditing',
}

export const FIELD_LABELS = {
  [FIELDS.NAME]: 'Nome*',
  [FIELDS.OBSERVATIONS]: 'Observações',
  [FIELDS.QUANTITY]: 'Quantidade',
  [FIELDS.MEAL_TYPE]: 'Tipo de Refeição*',
  [FIELDS.MEAL_TIME]: 'Horário',
  MEAL_ITEM_NAME: 'Alimento*',
}

export const DEFAULT_MEAL_ITEM = {
  [FIELDS.NAME]: '',
  [FIELDS.QUANTITY]: '',
}

export const DEFAULT_MEAL = {
  [FIELDS.MEAL_TYPE]: '',
  [FIELDS.MEAL_TIME]: '',
  [FIELDS.MEAL_ITEMS]: [{ ...DEFAULT_MEAL_ITEM }],
  [FIELDS.IS_EDITING]: true,
}

export const INITIAL_FORM = {
  [FIELDS.NAME]: '',
  [FIELDS.OBSERVATIONS]: '',
  [FIELDS.MEALS]: [{ ...DEFAULT_MEAL }],
}
