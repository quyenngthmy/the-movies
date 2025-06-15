"use client"

import { useState } from "react"
import MoviesList from "@/components/movies-list"
import SearchBar from "@/components/search-bar"
import TabBar from "@/components/tab-bar"
import "../styles/globals.css"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"now_playing" | "top_rated">("now_playing")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Movies</h1>
        <SearchBar onSearch={setSearchQuery} />
      </header>

      <main className="app-main">
        {!searchQuery && (
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} viewMode={viewMode} onViewModeChange={setViewMode} />
        )}

        <MoviesList category={searchQuery ? "search" : activeTab} searchQuery={searchQuery} viewMode={viewMode} />
      </main>
    </div>
  )
}

export default HomePage
