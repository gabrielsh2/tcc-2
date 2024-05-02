import { AppSnackbar } from '@components'
import { SNACKBAR_THEME } from '@constants'
import { createContext, useContext, useState } from 'react'
import { SafeAreaView } from 'react-native'

const SnackbarContext = createContext()

export function useSnackbar() {
  return useContext(SnackbarContext)
}

export function SnackbarProvider({ children }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState(SNACKBAR_THEME.ERROR)

  function handleDismissSnackbar() {
    setVisible(false)
  }

  function showErrorMessage(message) {
    setVisible(true)
    setMessage(message)
    setTheme(SNACKBAR_THEME.ERROR)
  }

  function showSuccessMessage(message) {
    setVisible(true)
    setMessage(message)
    setTheme(SNACKBAR_THEME.SUCCESS)
  }

  return (
    <SnackbarContext.Provider value={{ showErrorMessage, showSuccessMessage }}>
      {children}
      <AppSnackbar
        visible={visible}
        onDismiss={handleDismissSnackbar}
        theme={theme}
      >
        {message}
      </AppSnackbar>
    </SnackbarContext.Provider>
  )
}
