"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { BookShelf } from "@/components/home/BookShelf";
import { CategoryChips } from "@/components/home/CategoryChips";
import { ContinueReading } from "@/components/home/ContinueReading";
import { SearchBar } from "@/components/home/SearchBar";
import { QuickStats } from "@/components/home/QuickStats";
import { BottomNav } from "@/components/layout/BottomNav";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import {
  BookCardSkeleton,
  FeaturedSkeleton,
  ContinueReadingSkeleton,
} from "@/components/ui/Skeleton";
import {
  FEATURED_BOOKS,
  SHELVES,
  CONTINUE_READING,
  BOOKS,
} from "@/lib/data";
import { BookOpen } from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const filteredBooks =
    activeCategory === "All"
      ? BOOKS
      : BOOKS.filter((b) => b.category === activeCategory);

  const searchedBooks = searchQuery
    ? filteredBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredBooks;

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0f1117" }}
    >
      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Sticky header: logo (mobile) + search */}
        <header
          className="sticky top-0 z-40 px-4 md:px-6 pt-4 pb-3"
          style={{
            background: "rgba(15,17,23,0.9)",
            backdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Mobile logo row */}
          <div className="flex items-center justify-between mb-3 md:hidden">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "#f5a623" }}
              >
                <BookOpen size={14} style={{ color: "#0f1117" }} />
              </div>
              <span
                className="text-[15px] font-bold tracking-tight"
                style={{ color: "#f7f4ef" }}
              >
                Library<span style={{ color: "#f5a623" }}>Africa</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#4ade80" }}
              />
              <span className="text-[11px]" style={{ color: "#9ba3b8" }}>
                Free Access
              </span>
            </div>
          </div>

          {/* Desktop greeting row */}
          <div className="hidden md:flex items-center justify-between mb-3">
            <div>
              <h1 className="text-[20px] font-bold tracking-tight" style={{ color: "#f7f4ef" }}>
                Good morning 📚
              </h1>
              <p className="text-[13px]" style={{ color: "#9ba3b8" }}>
                Discover your next great read
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80" }} />
              <span className="text-[11px] font-medium" style={{ color: "#4ade80" }}>
                Free · No Login Required
              </span>
            </div>
          </div>

          <SearchBar onSearch={setSearchQuery} />
        </header>

        {/* Scrollable content */}
        <main className="flex-1 pb-24 md:pb-8 md:px-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 md:px-0 pt-5 flex flex-col gap-8"
              >
                <FeaturedSkeleton />
                <div className="flex gap-4 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <ContinueReadingSkeleton />
                  <ContinueReadingSkeleton />
                </div>
                <div className="flex gap-4 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8 pt-5"
              >
                {/* Featured Carousel */}
                <div className="px-4 md:px-0">
                  <FeaturedCarousel books={FEATURED_BOOKS} />
                </div>

                {/* Quick stats */}
                <QuickStats />

                {/* Category chips */}
                <div>
                  <CategoryChips
                    active={activeCategory}
                    onChange={setActiveCategory}
                  />
                </div>

                {/* Search results / filtered view */}
                {(searchQuery || activeCategory !== "All") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 md:px-0"
                  >
                    <BookShelf
                      title={
                        searchQuery
                          ? `Results for "${searchQuery}"`
                          : activeCategory
                      }
                      subtitle={`${searchedBooks.length} books found`}
                      books={searchedBooks}
                      size="md"
                    />
                  </motion.div>
                )}

                {/* Continue Reading */}
                {!searchQuery && activeCategory === "All" && (
                  <ContinueReading items={CONTINUE_READING} />
                )}

                {/* Book shelves — only show when not in search/filter mode */}
                {!searchQuery && activeCategory === "All" && (
                  <>
                    {SHELVES.map((shelf) => (
                      <BookShelf
                        key={shelf.id}
                        title={shelf.title}
                        subtitle={shelf.subtitle}
                        books={shelf.books}
                        size="md"
                        onSeeAll={() => {}}
                      />
                    ))}
                  </>
                )}

                {/* When category selected but no search */}
                {!searchQuery && activeCategory !== "All" && searchedBooks.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 px-8 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <BookOpen size={28} style={{ color: "#3a4060" }} />
                    </div>
                    <p
                      className="text-[16px] font-semibold mb-2"
                      style={{ color: "#f7f4ef" }}
                    >
                      No books yet
                    </p>
                    <p
                      className="text-[13px]"
                      style={{ color: "#9ba3b8" }}
                    >
                      We're adding {activeCategory} books soon.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
