"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntryDates,
} from "../../lib/journal"
import { Calendar } from "../journal/Calendar"
import { RecentEntries, RecentEntriesSkeleton } from "../journal/RecentEntries"
import { JournalEditor } from "../journal/JournalEditor"
import { JournalViewer, JournalViewerSkeleton } from "../journal/JournalViewer"
import { Button } from "../ui/Button"
import { Plus, LogOut } from "../ui/icons"
import { format } from "date-fns"
import type { JournalEntry } from "../../lib/types"

export const Journal = () => {
  const { user, signOut } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [entryDates, setEntryDates] = useState<string[]>([])
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    if (user) {
      loadEntries()
      loadEntryDates()
    }
  }, [user])

  const loadEntries = async () => {
    try {
      setLoading(true)
      const data = await getEntries(user!.id)
      setEntries(data)
      if (data.length > 0 && !selectedEntry) {
        setSelectedEntry(data[0])
      }
    } catch (error) {
      console.error("Error loading entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadEntryDates = async () => {
    try {
      const dates = await getEntryDates(user!.id)
      setEntryDates(dates)
    } catch (error) {
      console.error("Error loading entry dates:", error)
    }
  }

  const handleSaveEntry = async (entryData: {
    title: string
    content: string
    entry_date: string
  }) => {
    try {
      setSaving(true)
      if (editingEntry) {
        const updated = await updateEntry(editingEntry.id, user!.id, entryData)
        setEntries((prev) =>
          prev
            .map((e) => (e.id === updated.id ? updated : e))
            .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime())
        )
        setSelectedEntry(updated)
      } else {
        const created = await createEntry(user!.id, entryData)
        setEntries((prev) => [created, ...prev])
        setSelectedEntry(created)
      }

      await loadEntryDates()
      setIsEditing(false)
      setEditingEntry(null)
    } catch (error) {
      console.error("Error saving entry:", error)
      alert("Failed to save entry.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteEntry = async (entryId: string | number) => {
    try {
      setDeleting(true)
      await deleteEntry(entryId, user!.id)
      const remaining = entries.filter((e) => e.id !== entryId)
      setEntries(remaining)
      setSelectedEntry(remaining[0] || null)
      await loadEntryDates()
      setIsEditing(false)
      setEditingEntry(null)
    } catch (error) {
      console.error("Error deleting entry:", error)
      alert("Delete failed.")
    } finally {
      setDeleting(false)
    }
  }

  const handleAddNew = () => {
    setIsEditing(true)
    setEditingEntry(null)
  }

  const handleEdit = (entry: JournalEntry) => {
    setIsEditing(true)
    setEditingEntry(entry)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingEntry(null)
  }

  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setIsEditing(false)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const dateString = format(date, "yyyy-MM-dd")
    const entry = entries.find((e) => e.entry_date === dateString)
    if (entry) {
      setSelectedEntry(entry)
      setIsEditing(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-vintage-paper relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative z-10">
        <header className="border-b border-vintage-border bg-white shadow-vintage sticky top-0 z-20">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-handwriting text-2xl text-vintage-ink">AfterHours</h1>
                <p className="font-serif text-sm text-vintage-brown">
                  {user?.email || "Personal Journal"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddNew} variant="primary" icon={<Plus className="w-4 h-4" />}>
                Add Journal
              </Button>
              <Button onClick={handleSignOut} variant="outline" icon={<LogOut className="w-4 h-4" />}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isEditing ? (
                <JournalEditor
                  entry={editingEntry}
                  onSave={handleSaveEntry}
                  onDelete={handleDeleteEntry}
                  onCancel={handleCancel}
                  saving={saving}
                  deleting={deleting}
                />
              ) : loading ? (
                <JournalViewerSkeleton />
              ) : (
                <JournalViewer entry={selectedEntry} onEdit={handleEdit} />
              )}
            </div>

            <div className="space-y-6 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto">
              <Calendar
                entryDates={entryDates}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />

              {loading ? (
                <RecentEntriesSkeleton />
              ) : (
                <RecentEntries
                  entries={entries}
                  onEntrySelect={handleEntrySelect}
                  selectedEntryId={selectedEntry?.id}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
