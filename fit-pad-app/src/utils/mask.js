export function timeMask(value) {
  const cleaned = ('' + value).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/)

  if (match) {
    const hoursDigits = match[1] || ''
    const minutesDigits = match[2] || ''

    return `${hoursDigits}${minutesDigits && ':'}${minutesDigits}`
  }

  return value.slice(0, 5)
}
