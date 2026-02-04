"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "../ui/icons"

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

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="p-2 rounded-full hover:bg-vintage-cream transition"
      >
        <ChevronLeft className="w-5 h-5 text-vintage-brown" />
      </button>

      <h3 className="font-display text-base sm:text-lg text-vintage-ink">
        {format(currentMonth, "MMMM yyyy")}
      </h3>

      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
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
    const monthEnd = endOfMonth(monthStart)

    let startDate = startOfWeek(monthStart)
    let endDate = endOfWeek(monthEnd)

    const totalDays = 42

    const rows = []
    let days = []
    let day = startDate

    for (let i = 0; i < totalDays; i++) {
      const formattedDate = format(day, "d")
      const cloneDay = day

      const isSelected = selectedDate && isSameDay(day, selectedDate)
      const isCurrentMonth = isSameMonth(day, monthStart)
      const isToday = isSameDay(day, new Date())

      days.push(
        <div
          key={day.toString()}
          onClick={() => isCurrentMonth && onDateSelect(cloneDay)}
          className={`
            aspect-square flex items-center justify-center rounded-xl
            text-sm sm:text-base cursor-pointer select-none transition

            ${!isCurrentMonth ? "text-vintage-border" : "text-vintage-ink"}

            ${isSelected ? "bg-vintage-brown text-vintage-paper font-semibold shadow-md scale-105" : ""}

            ${!isSelected && isCurrentMonth ? "hover:bg-vintage-paper" : ""}

            ${isToday && !isSelected ? "ring-2 ring-vintage-brown" : ""}
          `}
        >
          {formattedDate}
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
