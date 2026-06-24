"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      className={`rounded-xl bg-white/5 overflow-hidden relative ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[140px]">
      <Skeleton className="w-full aspect-[2/3] rounded-2xl mb-3" />
      <Skeleton className="h-3.5 w-3/4 rounded-lg mb-2" />
      <Skeleton className="h-3 w-1/2 rounded-lg" />
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export function ContinueReadingSkeleton() {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
      <Skeleton className="w-14 h-20 rounded-xl flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-3.5 w-3/4 rounded-lg mb-2" />
        <Skeleton className="h-3 w-1/2 rounded-lg mb-4" />
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}
