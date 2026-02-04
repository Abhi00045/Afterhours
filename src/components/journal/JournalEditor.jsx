import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Save, Trash2, X, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '../ui/Button'

export const JournalEditor = ({
  entry = null,
  onSave,
  onDelete,
  onCancel,
  saving = false,
  deleting = false
}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [entryDate, setEntryDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || '')
      setContent(entry.content || '')
      setEntryDate(entry.entry_date || format(new Date(), 'yyyy-MM-dd'))
    } else {
      setTitle('')
      setContent('')
      setEntryDate(format(new Date(), 'yyyy-MM-dd'))
    }
  }, [entry])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onSave({
      title: title.trim(),
      content: content.trim(),
      entry_date: entryDate
    })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      onDelete(entry.id)
    }
  }

  return (
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl shadow-vintage-lg h-full flex flex-col overflow-hidden">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-vintage-border">
        {/* <div className="flex items-center gap-2 text-vintage-brown text-sm font-serif">
          <CalendarIcon className="w-4 h-4" />
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="bg-transparent border-none focus:outline-none font-serif cursor-pointer"
            disabled={saving || deleting}
          />
        </div> */}
        {/* <div className="border-t border-vintage-border px-4 sm:px-6 py-4 flex flex-wrap gap-3 justify-between"> */}

        <div>
          {entry && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={saving || deleting}
              icon={<Trash2 className="w-4 h-4" />}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>

        <div className="flex gap-3 ml-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={saving || deleting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={saving || deleting || !title.trim() || !content.trim()}
            icon={<Save className="w-4 h-4" />}
            // className='w-5 h-5 p-3'
          >
            {saving ? 'Saving...' : entry ? 'Update' : 'Save'}
          </Button>
        </div>


        <button
          onClick={onCancel}
          disabled={saving || deleting}
          className="p-2 rounded-full hover:bg-vintage-cream transition"
        >
          <X className="w-5 h-5 text-vintage-brown" />
        </button>
      </div>

      {/* Center Title */}
      <div className="px-4 sm:px-10 pt-8 pb-6 text-center relative">
        <div className="absolute left-4 right-4 top-1/2 border-t border-vintage-border" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          disabled={saving || deleting}
          className="
            relative bg-vintage-paper px-4
            font-handwriting text-2xl sm:text-4xl text-vintage-ink text-center
            focus:outline-none placeholder-vintage-border
          "
          required
        />
        <p className="mt-2 font-serif text-sm text-vintage-brown">
          {format(new Date(entryDate), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Writing Area */}
      <div className="flex-1 px-4 sm:px-10 pb-8 overflow-y-auto">

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="start your journey here"
          disabled={saving || deleting}
          className="
            w-full min-h-[300px] sm:min-h-[420px]
            bg-transparent resize-none leading-relaxed
            font-serif text-base sm:text-lg text-vintage-ink
            placeholder-vintage-border
            focus:outline-none
          "
          required
        />
      </div>

      {/* Action Bar */}
      {/* <div className="border-t border-vintage-border px-4 sm:px-6 py-4 flex flex-wrap gap-3 justify-between">

        <div>
          {entry && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={saving || deleting}
              icon={<Trash2 className="w-4 h-4" />}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>

        <div className="flex gap-3 ml-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={saving || deleting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={saving || deleting || !title.trim() || !content.trim()}
            icon={<Save className="w-4 h-4" />}
          >
            {saving ? 'Saving...' : entry ? 'Update Entry' : 'Save Entry'}
          </Button>
        </div>

      </div> */}
    </div>
  )
}
