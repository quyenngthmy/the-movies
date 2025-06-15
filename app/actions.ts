"use server"

import { fetchMoviesServer, searchMoviesServer, fetchMovieDetailsServer } from "@/utils/api"
import type { MovieDetails, MoviesResponse } from "@/types/movie"

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    switch (error.message) {
      case "TMDB_API_KEY_MISSING":
        return "TMDB API key is not configured. Please add TMDB_API_KEY to your environment variables."
      case "TMDB_API_KEY_INVALID":
        return "Invalid TMDB API key. Please check your API key configuration."
      case "TMDB_API_RATE_LIMIT":
        return "Too many requests to TMDB API. Please wait a moment and try again."
      case "TMDB_API_NOT_FOUND":
        return "The requested content was not found."
      default:
        if (error.message.startsWith("TMDB_API_ERROR_")) {
          return `TMDB API error (${error.message.replace("TMDB_API_ERROR_", "")}). Please try again later.`
        }
        return error.message
    }
  }
  return "An unexpected error occurred. Please try again."
}

export async function fetchMovies(category: "now_playing" | "top_rated", page = 1): Promise<MoviesResponse> {
  try {
    console.log(`Fetching ${category} movies, page ${page}`)
    const result = await fetchMoviesServer(category, page)
    console.log(`Successfully fetched ${result.results?.length || 0} movies`)
    return result
  } catch (error) {
    console.error("Server action fetchMovies error:", error)
    throw new Error(getErrorMessage(error))
  }
}

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  try {
    console.log(`Searching movies for: "${query}", page ${page}`)
    const result = await searchMoviesServer(query, page)
    console.log(`Search found ${result.results?.length || 0} movies`)
    return result
  } catch (error) {
    console.error("Server action searchMovies error:", error)
    throw new Error(getErrorMessage(error))
  }
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  try {
    console.log(`Fetching movie details for ID: ${id}`)
    const result = await fetchMovieDetailsServer(id)
    console.log(`Successfully fetched details for: ${result.title}`)
    return result
  } catch (error) {
    console.error("Server action fetchMovieDetails error:", error)
    throw new Error(getErrorMessage(error))
  }
}
