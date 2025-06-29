import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  email: string
  created_at?: string
  last_login?: string
}

export type Solution = {
  title: string
  description: string
  link: string
  source: string
  type: string
  tags?: string[]
  popularity?: number
}

export type SearchResult = {
  success: boolean
  problem: string
  solutions: Solution[]
  searchId: string
  timestamp: string
}