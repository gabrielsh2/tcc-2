import { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'

export function useRequest() {
  const [instance, setInstance] = useState({})
  useEffect(() => {
    console.log(Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3000`))
    const instance = axios.create({
      baseUrl: Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3000`),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('get', instance.post)

    setInstance(instance)
    async function teste() {
      console.log('aqui')
      try {
        console.log(instance.request)
        const { data } = await instance.get('/')
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    teste()
  }, [])

  return {
    http: instance,
  }
}
