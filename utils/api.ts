import type { MovieDetails, MoviesResponse } from "@/types/movie"

// Server-side API functions - these will be called from server actions
const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const apiRequest = async (endpoint: string): Promise<any> => {
  if (!API_KEY) {
    console.error("TMDB API key is missing from environment variables")
    throw new Error("TMDB_API_KEY_MISSING")
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`

  console.log("Making TMDB API request to:", url.replace(API_KEY, "HIDDEN_KEY"))

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("TMDB API Error:", response.status, response.statusText, errorText)

      if (response.status === 401) {
        throw new Error("TMDB_API_KEY_INVALID")
      }
      if (response.status === 429) {
        throw new Error("TMDB_API_RATE_LIMIT")
      }
      if (response.status === 404) {
        throw new Error("TMDB_API_NOT_FOUND")
      }

      throw new Error(`TMDB_API_ERROR_${response.status}`)
    }

    const data = await response.json()
    console.log("TMDB API Success:", data.total_results || data.id ? "Data received" : "No data")
    return data
  } catch (error) {
    console.error("TMDB API Request Error:", error)
    throw error
  }
}

export const fetchMoviesServer = async (category: "now_playing" | "top_rated", page = 1): Promise<MoviesResponse> => {
  return apiRequest(`/movie/${category}?page=${page}`)
}

export const searchMoviesServer = async (query: string, page = 1): Promise<MoviesResponse> => {
  return apiRequest(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
}

export const fetchMovieDetailsServer = async (id: number): Promise<MovieDetails> => {
  return apiRequest(`/movie/${id}`)
}
