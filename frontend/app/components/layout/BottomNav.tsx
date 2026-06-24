"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, BookMarked, Download, Library } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Search },
  { id: "library", label: "Library", icon: Library },
  { id: "saved", label: "Saved", icon: BookMarked },
  { id: "downloads", label: "Downloads", icon: Download },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export function BottomNav() {
  const [active, setActive] = useState<NavId>("home");

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "rgba(15, 17, 23, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl min-w-[52px]"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -inset-2 rounded-xl"
                    style={{ background: "rgba(245,166,35,0.12)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className="relative z-10"
                  style={{
                    color: isActive ? "#f5a623" : "#5a6278",
                    strokeWidth: isActive ? 2.2 : 1.8,
                  }}
                />
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? "#f5a623" : "#5a6278" }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
