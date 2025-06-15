"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/types/movie"
import { fetchMovies, searchMovies } from "@/app/actions"
import MovieCard from "./movie-card"
import LoadingSpinner from "./loading-spinner"
import SkeletonLoader from "./skeleton-loader"
import ErrorMessage from "./error-message"

interface MoviesListProps {
  category: "now_playing" | "top_rated" | "search"
  searchQuery?: string
  viewMode: "list" | "grid"
}

const MoviesList = ({ category, searchQuery, viewMode }: MoviesListProps) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadMovies(true)
  }, [category, searchQuery])

  const loadMovies = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const currentPage = reset ? 1 : page
      let data

      console.log(`Loading movies: category=${category}, searchQuery=${searchQuery}, page=${currentPage}`)

      if (category === "search" && searchQuery && searchQuery.trim()) {
        data = await searchMovies(searchQuery.trim(), currentPage)
      } else if (category !== "search") {
        data = await fetchMovies(category as "now_playing" | "top_rated", currentPage)
      } else {
        // Empty search query
        setMovies([])
        setLoading(false)
        return
      }

      console.log(`Received ${data.results?.length || 0} movies`)

      if (reset) {
        setMovies(data.results || [])
        setPage(2)
      } else {
        setMovies((prev) => [...prev, ...(data.results || [])])
        setPage((prev) => prev + 1)
      }

      setHasMore(currentPage < (data.total_pages || 0))
    } catch (err) {
      console.error("Error loading movies:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to load movies. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMovies()
    }
  }

  if (loading && movies.length === 0) {
    return <SkeletonLoader viewMode={viewMode} />
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} />
  }

  // Show message for empty search
  if (category === "search" && searchQuery && movies.length === 0 && !loading) {
    return (
      <div className="error-message">
        <div className="error-icon">🔍</div>
        <p className="error-text">No movies found for "{searchQuery}"</p>
        <p className="error-text">Try searching for a different movie title.</p>
      </div>
    )
  }

  return (
    <div className="movies-container">
      <div className={`movies-grid ${viewMode}`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
        ))}
      </div>

      {loading && movies.length > 0 && (
        <div className="loading-more">
          <LoadingSpinner />
        </div>
      )}

      {hasMore && !loading && movies.length > 0 && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {error && movies.length > 0 && <ErrorMessage message={error} />}
    </div>
  )
}

export default MoviesList
