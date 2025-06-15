"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { MovieDetails } from "@/types/movie"
import { fetchMovieDetails } from "@/app/actions"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorMessage from "@/components/error-message"
import LazyImage from "@/components/lazy-image"

interface MovieDetailPageProps {
  params: { id: string }
}

const MovieDetailPage = ({ params }: MovieDetailPageProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadMovieDetails()
  }, [params.id])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchMovieDetails(Number.parseInt(params.id))
      setMovie(data)
    } catch (err) {
      setError("Failed to load movie details.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !movie) {
    return <ErrorMessage message={error || "Movie not found"} />
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={() => router.back()}>
        ← Back
      </button>

      <div className="movie-hero">
        <div className="movie-poster-large">
          <LazyImage
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                : "/placeholder.svg?height=1170&width=780"
            }
            alt={movie.title}
            className="poster-image-large"
          />
        </div>

        <div className="movie-details">
          <h1 className="movie-title-large">{movie.title}</h1>

          <div className="movie-meta">
            <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
            <span className="year">{new Date(movie.release_date).getFullYear()}</span>
            <span className="runtime">{formatRuntime(movie.runtime)}</span>
          </div>

          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="movie-overview-large">{movie.overview}</p>

          <div className="movie-info-grid">
            <div className="info-item">
              <strong>Release Date:</strong>
              <span>{formatDate(movie.release_date)}</span>
            </div>
            <div className="info-item">
              <strong>Budget:</strong>
              <span>${movie.budget.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <strong>Revenue:</strong>
              <span>${movie.revenue.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <strong>Status:</strong>
              <span>{movie.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage
