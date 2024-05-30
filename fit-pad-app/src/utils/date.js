import { format } from 'date-fns'

function formatDateString(date) {
  return format(date, 'yyyy-MM-dd')
}

export function getTodayString() {
  return formatDateString(new Date())
}

export function getCurrentMonth() {
  return new Date().getMonth() + 1
}

export function getCurrentYear() {
  return new Date().getFullYear()
}

export function getTomorrowString(date) {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getDate() + 1)

  return formatDateString(currentDate)
}

export function getYesterdayString(date) {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getDate() - 1)

  return formatDateString(currentDate)
}

export function formatDateToDisplay(date) {
  const currentDate = new Date(date)

  const day = currentDate.getUTCDate().toString().padStart(2, '0')
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getUTCFullYear()

  return `${day}/${month}/${year}`
}
