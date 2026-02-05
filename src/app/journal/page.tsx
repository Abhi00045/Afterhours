"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Journal } from "../../components/pages/Journal"
import { LoadingScreen } from "../../components/ui/LoadingSpinner"

export const dynamic = "force-dynamic";


export default function JournalPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/")
    }
  }, [loading, user, router])

  if (loading) return <LoadingScreen />
  if (!user) return null

  return <Journal />
}
