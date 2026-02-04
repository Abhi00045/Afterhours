import { supabase } from './supabase'

export const createEntry = async (userId, entryData) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert([
      //fuck you
      {
        user_id: userId,
        title: entryData.title,
        content: entryData.content,
        entry_date: entryData.entry_date || new Date().toISOString().split('T')[0]
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getEntries = async (userId) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('entry_date', { ascending: false })

  if (error) throw error
  return data
}

export const getEntryById = async (entryId, userId) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('id', entryId)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateEntry = async (entryId, userId, updates) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .update({
      title: updates.title,
      content: updates.content,
      entry_date: updates.entry_date,
      updated_at: new Date().toISOString()
    })
    .eq('id', entryId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteEntry = async (entryId, userId) => {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', entryId)
    .eq('user_id', userId)

  if (error) throw error
}

export const getEntriesByDateRange = async (userId, startDate, endDate) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lte('entry_date', endDate)
    .order('entry_date', { ascending: false })

  if (error) throw error
  return data
}

export const getEntryDates = async (userId) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('entry_date')
    .eq('user_id', userId)

  if (error) throw error
  return data.map(entry => entry.entry_date)
}