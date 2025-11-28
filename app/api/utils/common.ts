import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO } from '@/config'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

// Initialize ChatClient with proper API configuration
// API_URL should be the base URL (e.g., https://kalm.woa.com)
// API_KEY should be the Web API Key from Dify (e.g., ClspFCYk5gzoEShN)
const apiUrl = API_URL || undefined
console.log('[ChatClient] Initializing with API_URL:', apiUrl)
console.log('[ChatClient] API_KEY present:', !!API_KEY)

export const client = new ChatClient(API_KEY, apiUrl)
