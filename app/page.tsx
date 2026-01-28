"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Send,
  Calendar as CalIcon,
  RefreshCcw,
  User,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [entries, setEntries] = useState<Record<string, string>>({});

  /* ---------------- CLIENT MOUNT ---------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- AUTH STATE ---------------- */

  useEffect(() => {
    if (!mounted) return;

    // Get session safely (NO /auth/v1/user spam)
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

  /* ---------------- AUTH ACTIONS ---------------- */

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error("Login error:", error.message);
  };

  const handleLogout = async () => {
    // 🔑 IMPORTANT: update UI immediately
    setUser(null);
    await supabase.auth.signOut();
  };

  /* ---------------- JOURNAL LOGIC ---------------- */

  const startNewEntry = () => {
    setIsEditing(true);
    setContent(entries[selectedDate] || "");
  };

  const handlePost = () => {
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: content,
    }));
    setIsEditing(false);
    setContent("");
  };

  /* ---------------- HYDRATION GUARD ---------------- */

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#dcc9a6] p-2 md:p-5 font-serif text-[#3e342a]">
      <div className="max-w-6xl mx-auto border-4 border-double border-[#8b7355] bg-[#f4e9d2] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-center justify-between border-b-2 border-[#8b7355] p-6 bg-[#efe2c9]">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              After Hours
            </h1>
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
                className="p-2 border border-[#8b7355] rounded-full hover:bg-[#e8dcc4]"
                title="Login"
              >
                <User size={18} />
              </button>
            )}

            <button className="flex items-center gap-2 px-4 py-1 border border-[#8b7355] rounded-sm hover:bg-[#e8dcc4]">
              <RefreshCcw size={16} /> Switch Pages
            </button>

            <button
              onClick={isEditing ? handlePost : startNewEntry}
              className="flex items-center gap-2 px-6 py-2 bg-[#3e342a] text-[#f4e9d2] font-bold"
            >
              {isEditing ? (
                <>
                  <Send size={18} /> POST
                </>
              ) : (
                <>
                  <Plus size={18} /> ADD
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* LEFT */}
          <section className="flex-1 p-8 border-r-2 border-[#8b7355]">
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
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase mb-6">
              <CalIcon size={14} /> Calendar
            </h3>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2026-01-${day
                  .toString()
                  .padStart(2, "0")}`;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      setIsEditing(false);
                    }}
                    className="h-10 text-xs hover:border border-[#8b7355]"
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
