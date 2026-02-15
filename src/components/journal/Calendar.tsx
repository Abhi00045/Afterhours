"use client"

import { useEffect, useMemo, useState } from "react"
import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "../ui/icons"

const normalizeDateKey = (value: string) => {
  if (!value) return null

  const dateOnly = value.split("T")[0]
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return format(parsed, "yyyy-MM-dd")
}

export const Calendar = ({
  entryDates = [],
  onDateSelect,
  selectedDate,
}: {
  entryDates?: string[]
  onDateSelect: (date: Date) => void
  selectedDate: Date | null
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hasNavigated, setHasNavigated] = useState(false)
  const entryDateSet = useMemo(
    () =>
      new Set(
        entryDates
          .map((date) => normalizeDateKey(date))
          .filter((date): date is string => Boolean(date))
      ),
    [entryDates]
  )
  const latestEntryMonth = useMemo(() => {
    const normalizedDates = entryDates
      .map((date) => normalizeDateKey(date))
      .filter((date): date is string => Boolean(date))

    if (normalizedDates.length === 0) {
      return null
    }

    const latest = normalizedDates.reduce((max, value) => (value > max ? value : max))
    return new Date(`${latest}T00:00:00`)
  }, [entryDates])

  useEffect(() => {
    if (!hasNavigated && latestEntryMonth) {
      setCurrentMonth(latestEntryMonth)
    }
  }, [hasNavigated, latestEntryMonth])

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => {
          setHasNavigated(true)
          setCurrentMonth(subMonths(currentMonth, 1))
        }}
        className="p-2 rounded-full hover:bg-vintage-cream transition"
      >
        <ChevronLeft className="w-5 h-5 text-vintage-brown" />
      </button>

      <h3 className="font-display text-base sm:text-lg text-vintage-ink">
        {format(currentMonth, "MMMM yyyy")}
      </h3>

      <button
        onClick={() => {
          setHasNavigated(true)
          setCurrentMonth(addMonths(currentMonth, 1))
        }}
        className="p-2 rounded-full hover:bg-vintage-cream transition"
      >
        <ChevronRight className="w-5 h-5 text-vintage-brown" />
      </button>
    </div>
  )

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] sm:text-xs font-serif text-vintage-brown py-1"
          >
            {day}
          </div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const gridStartDate = startOfWeek(monthStart)
    const today = new Date()
    const totalDays = 42

    const rows = []
    let days = []
    let day = gridStartDate

    for (let i = 0; i < totalDays; i++) {
      const formattedDate = format(day, "d")
      const dateKey = format(day, "yyyy-MM-dd")
      const cloneDay = day

      const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
      const isCurrentMonth = isSameMonth(day, monthStart)
      const isToday = isSameDay(day, today)
      const hasEntry = entryDateSet.has(dateKey)

      days.push(
        <div
          key={dateKey}
          onClick={() => isCurrentMonth && onDateSelect(cloneDay)}
          className={`
            aspect-square flex items-center justify-center rounded-xl border relative
            text-sm sm:text-base cursor-pointer select-none transition

            ${!isCurrentMonth ? "text-vintage-border" : "text-vintage-ink"}

            ${
              hasEntry && !isSelected
                ? "bg-vintage-tan text-vintage-ink border-vintage-brown font-semibold shadow-sm"
                : "border-transparent"
            }

            ${
              isSelected
                ? "bg-vintage-brown text-vintage-paper border-vintage-brown font-semibold shadow-md scale-105"
                : ""
            }

            ${
              !isSelected && isCurrentMonth
                ? hasEntry
                  ? "hover:bg-vintage-tan"
                  : "hover:bg-vintage-paper"
                : ""
            }

            ${
              isToday && !isSelected
                ? "ring-2 ring-vintage-brown ring-offset-1 ring-offset-vintage-paper"
                : ""
            }
          `}
        >
          {formattedDate}
          {hasEntry && !isSelected && (
            <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-vintage-brown" />
          )}
        </div>
      )

      if ((i + 1) % 7 === 0) {
        rows.push(
          <div key={i} className="grid grid-cols-7 gap-1 sm:gap-2">
            {days}
          </div>
        )
        days = []
      }

      day = addDays(day, 1)
    }

    return <div className="space-y-1 sm:space-y-2">{rows}</div>
  }

  return (
    <div className="bg-vintage-paper border border-vintage-border rounded-2xl p-4 sm:p-5 shadow-vintage w-full max-w-sm mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}
