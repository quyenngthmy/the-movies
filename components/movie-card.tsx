"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Movie } from "@/types/movie"
import LazyImage from "./lazy-image"

interface MovieCardProps {
  movie: Movie
  viewMode: "list" | "grid"
}

const MovieCard = ({ movie, viewMode }: MovieCardProps) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  const formatRating = (rating: number) => {
    return rating.toFixed(1)
  }

  return (
    <div
      className={`movie-card ${viewMode} ${isHovered ? "hovered" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-poster">
        <LazyImage
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.svg?height=750&width=500"
          }
          alt={movie.title}
          className="poster-image"
        />
        <div className="movie-rating">
          <span className="rating-star">★</span>
          {formatRating(movie.vote_average)}
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{formatDate(movie.release_date)}</p>
        {viewMode === "list" && <p className="movie-overview">{movie.overview}</p>}
      </div>
    </div>
  )
}

export default MovieCard
