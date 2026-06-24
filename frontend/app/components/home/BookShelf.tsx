"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Book } from "@/types";
import { BookCard } from "@/components/book/BookCard";

interface BookShelfProps {
  title: string;
  subtitle?: string;
  books: Book[];
  size?: "sm" | "md" | "lg";
  onSeeAll?: () => void;
}

export function BookShelf({
  title,
  subtitle,
  books,
  size = "md",
  onSeeAll,
}: BookShelfProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 md:px-0 mb-4">
        <div>
          <h2
            className="text-[17px] font-bold tracking-[-0.2px]"
            style={{ color: "#f7f4ef" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-[12px] mt-0.5"
              style={{ color: "#9ba3b8" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {onSeeAll && (
          <motion.button
            onClick={onSeeAll}
            className="flex items-center gap-0.5 text-[12px] font-medium mt-0.5"
            style={{ color: "#f5a623" }}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
          >
            See all
            <ChevronRight size={14} />
          </motion.button>
        )}
      </div>

      {/* Scrollable shelf */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-2"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
          >
            <BookCard book={book} size={size} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
