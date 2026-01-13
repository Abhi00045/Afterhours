"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Send, Calendar as CalIcon, RefreshCcw } from 'lucide-react';
// import { createClient } from '@supabase/supabase-js';

export default function Home() {

//   const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<Record<string, string>>({});

  // Fetch all journal dates for calendar marking
  // useEffect(() => {
  //   fetchEntries();
  // }, []);

  // async function fetchEntries() {
  //   const { data } = await supabase.from('journals').select('*');
  //   if (data) {
  //     const entryMap = data.reduce((acc, curr) => ({ ...acc, [curr.date]: curr.content }), {});
  //     setEntries(entryMap);
  //   }
  // }

  // const handlePost = async () => {
  //   const { error } = await supabase
  //     .from('journals')
  //     .upsert({ date: selectedDate, content: content });

  //   if (!error) {
  //     setIsEditing(false);
  //     fetchEntries();
  //   }
  // };

  // const startNewEntry = () => {
  //   setIsEditing(true);
  //   setContent("");
  // };
  return (
    <div className="min-h-screen bg-[#dcc9a6] p-4 md:p-10 font-serif text-[#3e342a]">
      {/* Outer Container mimicking the image border */}
      <div className="max-w-6xl mx-auto border-4 border-double border-[#8b7355] bg-[#f4e9d2] shadow-2xl overflow-hidden">
        
        {/* HEADER AREA */}
        <header className="flex flex-col md:flex-row items-center justify-between border-b-2 border-[#8b7355] p-6 bg-[#efe2c9]">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">SKETCHBOOK <span className="text-xl">#1</span></h1>
            <p className="text-sm italic">A series of drawings and thoughts by Abhi</p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-1 border border-[#8b7355] rounded-sm hover:bg-[#e8dcc4]">
              <RefreshCcw size={16} /> Switch Pages
            </button>
            <button 
              // onClick={isEditing ? handlePost : startNewEntry}
              className="flex items-center gap-2 px-6 py-2 bg-[#3e342a] text-[#f4e9d2] font-bold shadow-md hover:opacity-90 transition"
            >
              {isEditing ? <><Send size={18} /> POST ENTRY</> : <><Plus size={18} /> ADD JOURNAL</>}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          
          {/* LEFT: JOURNAL SECTION */}
          <section className="flex-1 p-8 md:p-12 border-r-2 border-[#8b7355] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
            <div className="mb-8 text-center">
              <span className="text-sm tracking-[0.3em] uppercase opacity-60 italic">~ Introduction ~</span>
              <div className="h-px bg-[#8b7355] w-1/2 mx-auto mt-2" />
            </div>

            {isEditing ? (
              <textarea
                autoFocus
                className="w-full h-[400px] bg-transparent border-none outline-none focus:ring-0 text-xl leading-relaxed resize-none italic"
                placeholder="The page is blank, Abhi. Start writing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <div className="text-xl leading-relaxed whitespace-pre-wrap">
                {entries[selectedDate] || "Choose a marked date on the calendar to read, or click 'Add' to start a new entry."}
              </div>
            )}
            
            {/* Visual Leather Corner */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8b4513]/5 rounded-tr-full pointer-events-none" />
          </section>

          {/* RIGHT: SIDEBAR / CALENDAR */}
          <section className="w-full md:w-1/3 bg-[#e8dcc4] flex flex-col">
            <div className="p-6 border-b border-[#8b7355]">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 opacity-80">
                <CalIcon size={14} /> Navigation Calendar
              </h3>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
                  const hasEntry = !!entries[dateStr];
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setIsEditing(false);
                      }}
                      className={`h-10 text-xs border border-transparent transition-all
                        ${hasEntry ? 'bg-[#3e342a] text-[#f4e9d2] font-bold' : 'hover:border-[#8b7355]'}
                        ${isSelected ? 'border-2 border-[#8b7355] scale-110 z-10' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 flex-1">
              <h4 className="italic text-lg mb-2">Can I go yet?</h4>
              <p className="text-xs mb-6 opacity-70">Hit the button below to jump to a random page in the sketchbook.</p>
              <button className="w-full py-3 border-2 border-[#8b7355] font-bold uppercase tracking-widest hover:bg-[#8b7355] hover:text-[#f4e9d2] transition">
                Random Page
              </button>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="border-t-2 border-[#8b7355] p-3 flex justify-between text-[10px] uppercase tracking-widest opacity-60 bg-[#efe2c9]">
          <span>All images &copy; 2026 Abhi Rajidi</span>
          <span>Designed for the Vintage Soul</span>
        </footer>
      </div>
    </div>
  );
}
