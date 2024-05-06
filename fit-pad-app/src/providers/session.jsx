import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SessionContext = createContext()

export function useSession() {
  return useContext(SessionContext)
}

export function SessionProvider({ children }) {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      const sessionData = await AsyncStorage.getItem('session')
      const formattedData = JSON.parse(sessionData)
      setUserData(formattedData)
      setIsLoading(false)
    }

    fetchUserData()
  }, [])

  async function saveSession(sessionData) {
    const formattedData = JSON.stringify(sessionData)
    await AsyncStorage.setItem('session', formattedData)
    setUserData(sessionData)
  }

  return (
    <SessionContext.Provider value={{ userData, isLoading, saveSession }}>
      {children}
    </SessionContext.Provider>
  )
}
