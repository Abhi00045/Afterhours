import { createClient } from "@supabase/supabase-js"

import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null = null

export const getSupabaseClient = (): SupabaseClient => {
  if (supabaseClient) return supabaseClient

  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be used in the browser")
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    )
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })

  return supabaseClient
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient()
    const value = (client as any)[prop]
    return typeof value === "function" ? value.bind(client) : value
  },
}) as SupabaseClient
