export const FIELDS = {
  NAME: 'name',
  FOOD_GROUPS: 'foodGroups',
  OBSERVATIONS: 'observations',
  QUANTITY: 'quantity',
  ITEMS: 'items',
  IS_EDITING: 'isEditing',
}

export const FIELD_LABELS = {
  [FIELDS.NAME]: 'Grupo*',
  [FIELDS.OBSERVATIONS]: 'Observações',
  [FIELDS.QUANTITY]: 'Quantidade',
  ITEM_NAME: 'Alimento*',
}

export const DEFAULT_ITEM = {
  [FIELDS.NAME]: '',
  [FIELDS.QUANTITY]: '',
}

export const DEFAULT_FOOD_GROUP = {
  [FIELDS.NAME]: '',
  [FIELDS.ITEMS]: [{ ...DEFAULT_ITEM }],
  [FIELDS.IS_EDITING]: true,
}

export const INITIAL_FORM = {
  [FIELDS.OBSERVATIONS]: '',
  [FIELDS.FOOD_GROUPS]: [{ ...DEFAULT_FOOD_GROUP }],
}
