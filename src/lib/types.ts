export type JournalEntry = {
  id: string | number
  user_id: string
  title: string
  content: string
  entry_date: string
  created_at?: string
  updated_at?: string
}
