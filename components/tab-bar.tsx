"use client"

interface TabBarProps {
  activeTab: "now_playing" | "top_rated"
  onTabChange: (tab: "now_playing" | "top_rated") => void
  viewMode: "list" | "grid"
  onViewModeChange: (mode: "list" | "grid") => void
}

const TabBar = ({ activeTab, onTabChange, viewMode, onViewModeChange }: TabBarProps) => {
  return (
    <div className="tab-bar">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "now_playing" ? "active" : ""}`}
          onClick={() => onTabChange("now_playing")}
        >
          Now Playing
        </button>
        <button className={`tab ${activeTab === "top_rated" ? "active" : ""}`} onClick={() => onTabChange("top_rated")}>
          Top Rated
        </button>
      </div>

      <div className="view-controls">
        <button
          className={`view-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => onViewModeChange("list")}
          title="List View"
        >
          ☰
        </button>
        <button
          className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => onViewModeChange("grid")}
          title="Grid View"
        >
          ⊞
        </button>
      </div>
    </div>
  )
}

export default TabBar
