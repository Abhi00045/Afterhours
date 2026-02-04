-- AfterHours Journal Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_entry_date ON journal_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_date ON journal_entries(user_id, entry_date);

-- Enable Row Level Security
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can create their own entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can update their own entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can delete their own entries" ON journal_entries;

-- Create RLS policies
-- Policy: Users can only view their own journal entries
CREATE POLICY "Users can view their own entries"
ON journal_entries FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can only create their own journal entries
CREATE POLICY "Users can create their own entries"
ON journal_entries FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own journal entries
CREATE POLICY "Users can update their own entries"
ON journal_entries FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own journal entries
CREATE POLICY "Users can delete their own entries"
ON journal_entries FOR DELETE
USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_journal_entries_updated_at ON journal_entries;
CREATE TRIGGER update_journal_entries_updated_at
BEFORE UPDATE ON journal_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();