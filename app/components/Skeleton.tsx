import { motion } from 'framer-motion';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-xl ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
      </div>
      
      <div className="mt-4">
        <Skeleton className="h-4 w-20 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      </div>
      
      <div className="mt-8">
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 rounded-3xl" />
          <Skeleton className="h-16 rounded-3xl" />
          <Skeleton className="h-16 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function InventorySkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Skeleton className="h-8 w-32 mb-4" />
      <Skeleton className="h-14 rounded-2xl mb-6" />
      <Skeleton className="h-32 rounded-[32px] mb-6" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="flex-1 h-20 rounded-3xl" />
        <Skeleton className="flex-1 h-20 rounded-3xl" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-24 rounded-3xl" />
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-20 rounded-[20px]" />
      <Skeleton className="h-20 rounded-[20px]" />
      <Skeleton className="h-20 rounded-[20px]" />
      <Skeleton className="h-20 rounded-[20px]" />
    </div>
  );
}
