import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    </div>
  );
}
