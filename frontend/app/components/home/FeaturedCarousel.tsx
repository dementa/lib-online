"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "@/types";
import { formatDownloads } from "@/lib/data";

interface FeaturedCarouselProps {
  books: Book[];
}

export function FeaturedCarousel({ books }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + books.length) % books.length);
    },
    [books.length]
  );

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % books.length);
    }, 5000);
  }, [books.length]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const book = books[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden select-none"
      style={{ height: "380px" }}
    >
      {/* Background image layer */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={`bg-${book.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Image
            src={book.cover}
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Multi-layer gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, rgba(10,12,20,0.97) 0%, rgba(10,12,20,0.8) 50%, rgba(10,12,20,0.3) 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(10,12,20,0.9) 0%, transparent 60%)`,
            }}
          />
          {/* Color tint from book */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-40"
            style={{ backgroundColor: book.color }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-end pb-7 px-6">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={book.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex gap-5 items-end w-full"
          >
            {/* Book cover thumbnail */}
            <motion.div
              className="flex-shrink-0 relative rounded-2xl overflow-hidden"
              style={{
                width: 90,
                height: 130,
                boxShadow: `0 12px 40px ${book.color}80, 0 4px 16px rgba(0,0,0,0.6)`,
              }}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(245,166,35,0.15)",
                    color: "#f5a623",
                    border: "1px solid rgba(245,166,35,0.25)",
                  }}
                >
                  {book.category}
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: "#9ba3b8" }}
                >
                  Featured
                </span>
              </div>

              <h2
                className="text-[22px] font-bold leading-tight mb-1.5"
                style={{
                  color: "#f7f4ef",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {book.title}
              </h2>

              <p
                className="text-[13px] mb-2.5"
                style={{ color: "#9ba3b8" }}
              >
                {book.author}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: "#f5a623" }}
                  >
                    {book.rating}
                  </span>
                </div>
                <span style={{ color: "#3a4060" }}>·</span>
                <span
                  className="text-[12px]"
                  style={{ color: "#9ba3b8" }}
                >
                  {formatDownloads(book.downloads)} downloads
                </span>
                <span style={{ color: "#3a4060" }}>·</span>
                <span
                  className="text-[12px]"
                  style={{ color: "#9ba3b8" }}
                >
                  {book.pages} pages
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-semibold"
                  style={{
                    background: "#f5a623",
                    color: "#0f1117",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <BookOpen size={14} />
                  Read Now
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#f7f4ef",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                  whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={14} />
                  Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows - desktop */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-5 flex-col gap-2">
        <motion.button
          onClick={() => { goTo(current - 1, -1); resetInterval(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          whileHover={{ background: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={16} style={{ color: "#f7f4ef" }} />
        </motion.button>
        <motion.button
          onClick={() => { goTo(current + 1, 1); resetInterval(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          whileHover={{ background: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={16} style={{ color: "#f7f4ef" }} />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {books.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { goTo(i, i > current ? 1 : -1); resetInterval(); }}
            animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
            style={{ background: "#f5a623" }}
          />
        ))}
      </div>
    </div>
  );
}
