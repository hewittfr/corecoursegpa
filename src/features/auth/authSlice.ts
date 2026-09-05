import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types'
import { DEMO_CREDENTIALS, mockAuthUser } from '../../mock/data'

const AUTH_KEY = 'ccg_auth'

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  error: string | null
}

function loadAuth(): AuthState {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY)
    if (!raw) {
      return { isAuthenticated: false, user: null, error: null }
    }
    const user = JSON.parse(raw) as AuthUser
    return { isAuthenticated: true, user, error: null }
  } catch {
    return { isAuthenticated: false, user: null, error: null }
  }
}

const initialState: AuthState = loadAuth()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(action.payload))
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.error = null
      sessionStorage.removeItem(AUTH_KEY)
    },
    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { loginSuccess, loginFailure, logout, clearAuthError } =
  authSlice.actions

export function authenticateDemo(email: string, password: string): AuthUser | null {
  if (
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    return mockAuthUser
  }
  return null
}

export default authSlice.reducer
