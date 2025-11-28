import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO } from '@/config'

const userPrefix = `user_${APP_ID}:`

// Backend API configuration (server-side only, not exposed to browser)
// This allows Vercel to access internal network APIs
const INTERNAL_API_URL = process.env.INTERNAL_API_URL || 'http://api.agentflow.polaris:5001/v1'
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6ImRhMmExM2E5LTIwY2QtNDE4ZC05MzkwLThmNDY0Mjk1ZTgyMyIsImtleSI6ImFwcC10SURHeGVCWSJ9.iRPql5SPwaBgQR0urlmNEVrluJRR3IErpBBgrkPe-co'

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

// Initialize ChatClient with internal API configuration
// This uses the backend API that's accessible from Vercel
console.log('[ChatClient] Initializing backend proxy...')
console.log('[ChatClient] Internal API URL:', INTERNAL_API_URL)
console.log('[ChatClient] Internal API Key present:', !!INTERNAL_API_KEY)

export const client = new ChatClient(INTERNAL_API_KEY, INTERNAL_API_URL)
