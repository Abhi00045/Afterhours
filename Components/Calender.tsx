'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  entriesDates: string[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function Calendar({
  entriesDates,
  onDateSelect,
  selectedDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { calendarDays, monthYear } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const days: {
      day: number | null;
      dateStr: string;
      isToday: boolean;
      hasEntry: boolean;
    }[] = [];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, dateStr: '', isToday: false, hasEntry: false });
    }

    // Month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        d
      ).padStart(2, '0')}`;

      days.push({
        day: d,
        dateStr,
        isToday: dateStr === todayStr,
        hasEntry: entriesDates.includes(dateStr),
      });
    }

    return {
      calendarDays: days,
      monthYear: `${MONTHS[month]} ${year}`,
    };
  }, [currentDate, entriesDates]);

  const navigateMonth = (dir: number) => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + dir);
      return d;
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-[#d9cbb0] rounded"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="font-bold tracking-wide">{monthYear}</span>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-[#080808] rounded"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-xs font-bold mb-1 text-black">
        {DAYS.map((d) => (
          <div key={d} className='text-black'>
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          if (!day.day) {
            return <div key={i} />;
          }

          const isSelected = day.dateStr === selectedDate;

          return (
            <button
              key={i}
              disabled={!day.hasEntry}
              onClick={() => onDateSelect(day.dateStr)}
              className={`
                h-9 text-xs flex items-center justify-center rounded
                transition-all text-black
                ${day.hasEntry ? 'cursor-pointer' : 'opacity-30 cursor-default'}
                ${day.hasEntry ? 'hover:bg-[#282726]' : ''}
                ${day.isToday ? 'border border-[#000000]' : ''}
                ${isSelected ? 'bg-[#1d1d1c] text-[#f4e9d2]' : ''}
              `}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
