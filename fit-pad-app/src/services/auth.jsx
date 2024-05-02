import { api } from './api'

export function useAuthService() {
  function registerUser(data) {
    return api.post('auth/register', data)
  }

  return {
    registerUser,
  }
}
