import { api } from './api'

export function useAuthService() {
  function registerUser(data) {
    return api.post('auth/register', data)
  }

  function login(data) {
    return api.post('auth/login', data)
  }

  return {
    registerUser,
    login,
  }
}
