import { format } from "date-fns"
import { Calendar, Clock, Edit2, BookOpen } from "../ui/icons"
import { Button } from "../ui/Button"
import type { JournalEntry } from "../../lib/types"

export const JournalViewer = ({
  entry,
  onEdit,
}: {
  entry: JournalEntry | null
  onEdit: (entry: JournalEntry) => void
}) => {
  if (!entry) {
    return (
      <div className="bg-vintage-paper border border-vintage-border rounded-2xl shadow-vintage-lg h-full flex items-center justify-center p-8 sm:p-12">
        <div className="text-center max-w-md">
          <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-vintage-border mx-auto mb-4" />
          <h3 className="font-display text-xl sm:text-2xl text-vintage-ink mb-2">
            No Entry Selected
          </h3>
          <p className="font-serif text-vintage-brown text-sm sm:text-base">
            Select an entry from the recent list or click "Add Journal" to create a new one
          </p>
        </div>
      </div>
    )
  }

  const entryDate = new Date(entry.entry_date)

  return (
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl shadow-vintage-lg h-full flex flex-col overflow-hidden">
      <div className="border-b border-vintage-border px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <h1 className="font-display text-2xl sm:text-3xl text-vintage-ink leading-snug break-words">
            {entry.title}
          </h1>

          <Button
            variant="outline"
            onClick={() => onEdit(entry)}
            icon={<Edit2 className="w-4 h-4" />}
            className="self-start"
          >
            Edit
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-serif text-vintage-brown">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(entryDate, "MMMM d, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {entry.updated_at && entry.created_at && entry.updated_at !== entry.created_at
                ? `Updated ${format(new Date(entry.updated_at), "MMM d, h:mm a")}`
                : `Created ${format(new Date(entry.created_at || entry.entry_date), "MMM d, h:mm a")}`
              }
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="font-serif text-vintage-ink text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </div>
      </div>
    </div>
  )
}

export const JournalViewerSkeleton = () => {
  return (
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl shadow-vintage-lg h-full flex flex-col overflow-hidden">
      <div className="border-b border-vintage-border px-4 sm:px-6 py-6">
        <div className="h-7 bg-vintage-cream rounded-lg w-3/4 mb-4 animate-pulse"></div>

        <div className="flex flex-wrap gap-3">
          <div className="h-4 bg-vintage-cream rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-vintage-cream rounded w-40 animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 space-y-3">
        <div className="h-4 bg-vintage-cream rounded w-full animate-pulse"></div>
        <div className="h-4 bg-vintage-cream rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-vintage-cream rounded w-4/6 animate-pulse"></div>
        <div className="h-4 bg-vintage-cream rounded w-full animate-pulse"></div>
        <div className="h-4 bg-vintage-cream rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  )
}
