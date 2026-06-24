"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterOpen?: () => void;
}

export function SearchBar({ onSearch, onFilterOpen }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (val: string) => {
    setQuery(val);
    onSearch?.(val);
  };

  const clear = () => {
    setQuery("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex gap-3 items-center w-full">
      {/* Search input */}
      <motion.div
        className="flex-1 relative flex items-center"
        animate={{
          borderColor: focused
            ? "rgba(245,166,35,0.4)"
            : "rgba(255,255,255,0.08)",
        }}
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Search
          size={16}
          className="absolute left-4 flex-shrink-0 transition-colors duration-200"
          style={{ color: focused ? "#f5a623" : "#5a6278" }}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search books, authors, topics…"
          className="w-full bg-transparent pl-11 pr-10 py-3 text-[14px] outline-none placeholder:text-[#5a6278]"
          style={{ color: "#f7f4ef" }}
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clear}
              className="absolute right-3 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={12} style={{ color: "#9ba3b8" }} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter button */}
      <motion.button
        onClick={onFilterOpen}
        className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#9ba3b8",
        }}
        whileHover={{ background: "rgba(255,255,255,0.09)", color: "#f7f4ef" }}
        whileTap={{ scale: 0.93 }}
      >
        <SlidersHorizontal size={17} />
      </motion.button>
    </div>
  );
}
