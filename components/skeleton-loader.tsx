"use client"

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3 animate-pulse">
          <div className="h-32 bg-gradient-to-r from-muted via-muted-foreground to-muted rounded-lg animate-shimmer"></div>
          <div className="h-4 bg-muted rounded-lg w-3/4 animate-shimmer"></div>
          <div className="h-4 bg-muted rounded-lg w-1/2 animate-shimmer"></div>
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-muted rounded-lg w-1/2 animate-shimmer"></div>
      <div className="h-12 bg-muted rounded-lg animate-shimmer"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-muted rounded-lg flex-1 animate-shimmer"></div>
        <div className="h-10 bg-muted rounded-lg flex-1 animate-shimmer"></div>
      </div>
    </div>
  )
}
