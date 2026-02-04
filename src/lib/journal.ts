import { supabase } from "./supabase"
import type { JournalEntry } from "./types"

export const createEntry = async (
  userId: string,
  entryData: { title: string; content: string; entry_date?: string }
): Promise<JournalEntry> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .insert([
      {
        user_id: userId,
        title: entryData.title,
        content: entryData.content,
        entry_date: entryData.entry_date || new Date().toISOString().split("T")[0],
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as JournalEntry
}

export const getEntries = async (userId: string): Promise<JournalEntry[]> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false })

  if (error) throw error
  return (data || []) as JournalEntry[]
}

export const getEntryById = async (
  entryId: string | number,
  userId: string
): Promise<JournalEntry> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", entryId)
    .eq("user_id", userId)
    .single()

  if (error) throw error
  return data as JournalEntry
}

export const updateEntry = async (
  entryId: string | number,
  userId: string,
  updates: { title: string; content: string; entry_date: string }
): Promise<JournalEntry> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .update({
      title: updates.title,
      content: updates.content,
      entry_date: updates.entry_date,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entryId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error
  return data as JournalEntry
}

export const deleteEntry = async (entryId: string | number, userId: string) => {
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId)

  if (error) throw error
}

export const getEntriesByDateRange = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<JournalEntry[]> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .gte("entry_date", startDate)
    .lte("entry_date", endDate)
    .order("entry_date", { ascending: false })

  if (error) throw error
  return (data || []) as JournalEntry[]
}

export const getEntryDates = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("entry_date")
    .eq("user_id", userId)

  if (error) throw error
  return (data || []).map((entry) => entry.entry_date)
}
