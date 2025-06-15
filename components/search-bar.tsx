"use client"

import { useState, useEffect } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {query && (
        <button className="clear-btn" onClick={handleClear} title="Clear search">
          ✕
        </button>
      )}
      <div className="search-icon">🔍</div>
    </div>
  )
}

export default SearchBar
