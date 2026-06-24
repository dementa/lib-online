"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";

interface CategoryChipsProps {
  active: string;
  onChange: (cat: string) => void;
}

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 md:px-0 w-max pb-1">
        {CATEGORIES.map((cat, index) => {
          const isActive = cat === active;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              className="relative flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors"
              style={{
                color: isActive ? "#0f1117" : "#9ba3b8",
                background: isActive ? "#f5a623" : "rgba(255,255,255,0.06)",
                border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#f5a623" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
