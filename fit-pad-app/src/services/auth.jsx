import { useRequest } from '@hooks'

export function useAuthService() {
  const { http } = useRequest()

  function registerUser(data) {
    console.log('http', http)
    return http.post('auth/register', data)
  }

  return {
    registerUser,
  }
}
