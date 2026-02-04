import { format } from 'date-fns'
import { Clock, ChevronRight } from 'lucide-react'

export const RecentEntries = ({ entries = [], onEntrySelect, selectedEntryId }) => {
  if (entries.length === 0) {
    return (
      <div className="bg-vintage-paper border border-vintage-border rounded-2xl p-6 shadow-vintage">
        <h3 className="font-display text-lg text-vintage-ink mb-4">
          Recent Entries
        </h3>

        <div className="text-center py-10">
          <Clock className="w-12 h-12 text-vintage-border mx-auto mb-3" />
          <p className="font-serif text-vintage-brown text-sm">
            No entries yet. Start your first journal entry!
          </p>
        </div>
      </div>
    )
  }

  return (<>
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl p-2 sm:p-2 shadow-vintage w-[75%] ml-[50px]">

      <h3 className="font-display text-lg text-vintage-ink mb-4 px-1">
        Recent Entries
      </h3>

      <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-1">

        {entries.slice(0, 10).map(entry => {
          const isSelected = selectedEntryId === entry.id
          const entryDate = new Date(entry.entry_date)

          return (
            <div
              key={entry.id}
              onClick={() => onEntrySelect(entry)}
              className={`
                cursor-pointer rounded-xl border p-4 transition-all duration-200

                ${isSelected
                  ? 'bg-vintage-cream border-vintage-brown shadow-md'
                  : 'bg-vintage-paper border-vintage-border hover:bg-vintage-cream hover:border-vintage-tan'
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-semibold text-vintage-ink text-sm truncate">
                    {entry.title || 'Untitled Entry'}
                  </h4>

                  <p className="font-serif text-xs text-vintage-brown mt-1">
                    {format(entryDate, 'MMM d, yyyy')}
                  </p>

                  {/* {entry.content && (
                    <p className="font-serif text-xs text-vintage-brown mt-2 line-clamp-2">
                      {entry.content.substring(0, 80)}...
                    </p>
                  )} */}
                </div>

                <ChevronRight
                  className={`w-4 h-4 mt-1 flex-shrink-0 transition 
                    ${isSelected ? 'text-vintage-brown' : 'text-vintage-border'}
                  `}
                />

              </div>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export const RecentEntriesSkeleton = () => {
  return (
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl p-5 shadow-vintage">

      <div className="h-6 bg-vintage-cream rounded-lg w-32 mb-4 animate-pulse"></div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="p-4 bg-vintage-paper border border-vintage-border rounded-xl"
          >
            <div className="h-4 bg-vintage-cream rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-vintage-cream rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-3 bg-vintage-cream rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
