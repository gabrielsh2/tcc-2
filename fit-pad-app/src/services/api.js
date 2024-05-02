import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://classic-obliging-aphid.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})
