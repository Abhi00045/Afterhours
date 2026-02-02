"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Send,
  Calendar as CalIcon,
  User,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Calendar from "@/Components/Calender";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [entries, setEntries] = useState<Record<string, string>>({});

  /* ---------------- MOUNT ---------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    if (!mounted) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [mounted]);

  /* ---------------- FETCH USER ENTRIES ---------------- */
  useEffect(() => {
    if (!user) {
      setEntries({});
      return;
    }

    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("entry_date, content")
        .eq("user_id", user.id);

      if (!error && data) {
        const map: Record<string, string> = {};
        data.forEach((e) => {
          map[e.entry_date] = e.content;
        });
        setEntries(map);
      }
    };

    fetchEntries();
  }, [user]);

  /* ---------------- AUTH ACTIONS ---------------- */
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsEditing(false);
    setContent("");
  };

  /* ---------------- JOURNAL ---------------- */
  const startNewEntry = () => {
    if (!user) {
      handleLogin(); // 🔥 force login if not logged in
      return;
    }
    setIsEditing(true);
    setContent(entries[selectedDate] || "");
  };

  const handlePost = async () => {
    if (!user) {
      handleLogin();
      return;
    }

    const { error } = await supabase
      .from("journal_entries")
      .upsert({
        user_id: user.id,
        entry_date: selectedDate,
        content,
      });

    if (!error) {
      setEntries((prev) => ({
        ...prev,
        [selectedDate]: content,
      }));
      setIsEditing(false);
      setContent("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#dcc9a6] p-3 md:p-6 font-serif text-[#3e342a]">
      <div className="max-w-5xl mx-auto border-4 border-double border-[#8b7355] bg-[#f4e9d2] shadow-2xl">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row gap-4 items-center justify-between border-b-2 border-[#8b7355] p-6 bg-[#efe2c9]">
          <div>
            <h1 className="text-4xl font-black uppercase">After Hours</h1>
            <p className="text-sm italic">A journal</p>
          </div>

          <div className="flex gap-3 items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="p-2 border border-[#8b7355] rounded-full hover:bg-[#e8dcc4]"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="p-2 border border-black rounded-full hover:bg-[#e8dcc4]"
                title="Login"
              >
                <User size={18} />
              </button>
            )}

            <button
              onClick={isEditing ? handlePost : startNewEntry}
              className="flex items-center gap-2 px-6 py-2 bg-[#3e342a] text-[#f4e9d2] font-bold"
            >
              {isEditing ? <Send size={18} /> : <Plus size={18} />}
              {isEditing ? "POST" : "ADD"}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* LEFT */}
          <section className="flex-1 p-6 border-r-2 border-[#8b7355]">
            {isEditing ? (
              <textarea
                autoFocus
                className="w-full h-[400px] bg-transparent text-xl italic outline-none resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <div className="text-xl whitespace-pre-wrap">
                {entries[selectedDate] || "Start writing your thoughts..."}
              </div>
            )}
          </section>

          {/* RIGHT */}
          <section className="w-full md:w-1/3 bg-[#e8dcc4] p-6">
           <Calendar
  entriesDates={Object.keys(entries)}
  selectedDate={selectedDate}
  onDateSelect={(date) => {
    setSelectedDate(date);
    setIsEditing(false);
  }}
/>
          </section>
        </div>
      </div>
    </div>
  );
}
