interface SkeletonLoaderProps {
  viewMode: "list" | "grid"
}

const SkeletonLoader = ({ viewMode }: SkeletonLoaderProps) => {
  const skeletonCount = viewMode === "grid" ? 12 : 6

  return (
    <div className={`skeleton-container ${viewMode}`}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className={`skeleton-card ${viewMode}`}>
          <div className="skeleton-poster"></div>
          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-year"></div>
            {viewMode === "list" && <div className="skeleton-overview"></div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
