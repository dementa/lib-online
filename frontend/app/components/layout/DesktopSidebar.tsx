"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Library,
  BookMarked,
  Download,
  BookOpen,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const PRIMARY_NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Search },
  { id: "library", label: "My Library", icon: Library },
  { id: "saved", label: "Saved", icon: BookMarked },
  { id: "downloads", label: "Downloads", icon: Download },
] as const;

const SECONDARY_NAV = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "readers", label: "Readers", icon: BookOpen },
  { id: "academic", label: "Academic", icon: GraduationCap },
] as const;

type NavId =
  | (typeof PRIMARY_NAV)[number]["id"]
  | (typeof SECONDARY_NAV)[number]["id"];

export function DesktopSidebar() {
  const [active, setActive] = useState<NavId>("home");

  return (
    <aside
      className="hidden md:flex flex-col h-full w-[220px] flex-shrink-0 py-6 px-3"
      style={{
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div className="px-3 mb-8">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "#f5a623" }}
          >
            <BookOpen size={16} style={{ color: "#0f1117" }} />
          </div>
          <div>
            <span
              className="text-[15px] font-bold tracking-[-0.3px]"
              style={{ color: "#f7f4ef" }}
            >
              Library
            </span>
            <span
              className="text-[15px] font-bold tracking-[-0.3px]"
              style={{ color: "#f5a623" }}
            >
              Africa
            </span>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <div className="flex flex-col gap-1">
        {PRIMARY_NAV.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
              style={{
                color: isActive ? "#f7f4ef" : "#9ba3b8",
                background: isActive
                  ? "rgba(255,255,255,0.07)"
                  : "transparent",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.05)",
                color: "#f7f4ef",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ background: "#f5a623" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                style={{
                  color: isActive ? "#f5a623" : "currentColor",
                  strokeWidth: isActive ? 2.2 : 1.8,
                }}
              />
              <span className="text-[13px] font-medium">{label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className="my-5 mx-3"
        style={{ height: 1, background: "rgba(255,255,255,0.05)" }}
      />

      {/* Secondary nav */}
      <p
        className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2"
        style={{ color: "#3a4060" }}
      >
        Discover
      </p>
      <div className="flex flex-col gap-1">
        {SECONDARY_NAV.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
              style={{
                color: isActive ? "#f7f4ef" : "#9ba3b8",
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
              }}
              whileHover={{ background: "rgba(255,255,255,0.05)", color: "#f7f4ef" }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span className="text-[13px] font-medium">{label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom promo card */}
      <div className="mt-auto mx-1">
        <motion.div
          className="p-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(99,102,241,0.1) 100%)",
            border: "1px solid rgba(245,166,35,0.15)",
          }}
          whileHover={{ scale: 1.02 }}
        >
          <p
            className="text-[13px] font-semibold mb-1"
            style={{ color: "#f7f4ef" }}
          >
            Thousands of books
          </p>
          <p
            className="text-[11px] mb-3 leading-relaxed"
            style={{ color: "#9ba3b8" }}
          >
            All free. No login required.
          </p>
          <div
            className="text-[11px] font-semibold text-center py-1.5 rounded-xl"
            style={{
              background: "#f5a623",
              color: "#0f1117",
            }}
          >
            Browse All Books
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
