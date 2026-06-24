"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Download, BookOpen } from "lucide-react";
import { Book } from "@/types";
import { formatDownloads } from "@/lib/data";

interface BookCardProps {
  book: Book;
  size?: "sm" | "md" | "lg";
  onRead?: (book: Book) => void;
  onDownload?: (book: Book) => void;
}

export function BookCard({
  book,
  size = "md",
  onRead,
  onDownload,
}: BookCardProps) {
  const widths = { sm: "w-[120px]", md: "w-[150px]", lg: "w-[180px]" };
  const imgHeights = { sm: "h-[172px]", md: "h-[214px]", lg: "h-[258px]" };

  return (
    <motion.div
      className={`flex-shrink-0 ${widths[size]} cursor-pointer`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Cover */}
      <div
        className={`relative w-full ${imgHeights[size]} rounded-2xl overflow-hidden mb-3 group`}
        style={{
          boxShadow: `0 8px 32px ${book.color}66, 0 2px 8px rgba(0,0,0,0.5)`,
        }}
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={`${size === "sm" ? 120 : size === "md" ? 150 : 180}px`}
          unoptimized
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* New badge */}
        {book.isNew && (
          <div className="absolute top-2 left-2">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(245,166,35,0.9)",
                color: "#0f1117",
              }}
            >
              NEW
            </span>
          </div>
        )}

        {/* Quick actions on hover */}
        <div className="absolute bottom-2 inset-x-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onRead?.(book);
            }}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-semibold"
            style={{
              background: "rgba(245,166,35,0.95)",
              color: "#0f1117",
            }}
            whileTap={{ scale: 0.96 }}
          >
            <BookOpen size={11} />
            Read
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.(book);
            }}
            className="w-8 flex items-center justify-center py-1.5 rounded-xl"
            style={{
              background: "rgba(30,35,55,0.95)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f7f4ef",
            }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={11} />
          </motion.button>
        </div>
      </div>

      {/* Meta */}
      <div>
        <p
          className="text-[13px] font-semibold leading-tight mb-1 line-clamp-2"
          style={{ color: "#f7f4ef" }}
        >
          {book.title}
        </p>
        <p
          className="text-[11px] mb-1.5 line-clamp-1"
          style={{ color: "#9ba3b8" }}
        >
          {book.author}
        </p>
        <div className="flex items-center gap-1.5">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span
            className="text-[11px] font-medium"
            style={{ color: "#f5a623" }}
          >
            {book.rating}
          </span>
          <span
            className="text-[10px]"
            style={{ color: "#5a6278" }}
          >
            · {formatDownloads(book.downloads)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
