export function isRequiredFieldsFilled(requiredFields = [], fields = {}) {
  return Object.entries(fields)
    .filter(([key]) => requiredFields.includes(key))
    .every(([_, value]) => value)
}
