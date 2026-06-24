"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { ContinueReading as ContinueReadingType } from "@/types";

interface ContinueReadingProps {
  items: ContinueReadingType[];
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ContinueReading({ items }: ContinueReadingProps) {
  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 md:px-0 mb-4">
        <h2
          className="text-[17px] font-bold tracking-[-0.2px]"
          style={{ color: "#f7f4ef" }}
        >
          Continue Reading
        </h2>
        <button
          className="text-[12px] font-medium"
          style={{ color: "#f5a623" }}
        >
          My Library
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 md:px-0">
        {items.map((item, index) => (
          <motion.div
            key={item.book.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="flex gap-4 p-4 rounded-2xl cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Book cover */}
            <div
              className="relative flex-shrink-0 rounded-xl overflow-hidden"
              style={{
                width: 54,
                height: 76,
                boxShadow: `0 6px 20px ${item.book.color}60`,
              }}
            >
              <Image
                src={item.book.cover}
                alt={item.book.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[14px] font-semibold leading-snug mb-0.5 line-clamp-1"
                style={{ color: "#f7f4ef" }}
              >
                {item.book.title}
              </p>
              <p
                className="text-[12px] mb-3"
                style={{ color: "#9ba3b8" }}
              >
                {item.book.author}
              </p>

              {/* Progress bar */}
              <div
                className="relative h-1 rounded-full mb-2 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ background: "#f5a623" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock size={10} style={{ color: "#5a6278" }} />
                  <span className="text-[11px]" style={{ color: "#5a6278" }}>
                    {timeAgo(item.lastReadAt)}
                  </span>
                </div>
                <span className="text-[11px]" style={{ color: "#9ba3b8" }}>
                  {item.progress}% · page {item.lastReadPage}
                </span>
              </div>
            </div>

            {/* Read button */}
            <motion.button
              className="self-center flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl"
              style={{
                background: "rgba(245,166,35,0.12)",
                color: "#f5a623",
              }}
              whileHover={{ background: "rgba(245,166,35,0.2)", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen size={15} />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
