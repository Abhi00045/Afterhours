"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Login } from "../components/pages/Login"
import { LoadingScreen } from "../components/ui/LoadingSpinner"

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace("/journal")
    }
  }, [loading, user, router])

  if (loading) return <LoadingScreen />

  return <Login />
}
