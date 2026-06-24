"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Download } from "lucide-react";

const STATS = [
  { icon: BookOpen, value: "12,400+", label: "Books" },
  { icon: Users, value: "340K", label: "Readers" },
  { icon: Download, value: "2.1M", label: "Downloads" },
];

export function QuickStats() {
  return (
    <div className="flex gap-3 px-4 md:px-0">
      {STATS.map(({ icon: Icon, value, label }, i) => (
        <motion.div
          key={label}
          className="flex-1 flex flex-col items-center py-3 px-2 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
        >
          <Icon size={14} style={{ color: "#f5a623", marginBottom: 4 }} />
          <span
            className="text-[14px] font-bold tracking-[-0.3px]"
            style={{ color: "#f7f4ef" }}
          >
            {value}
          </span>
          <span className="text-[10px] mt-0.5" style={{ color: "#5a6278" }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
