"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SelectedMovie } from "@/app/page"

interface Movie {
  id: string;
  name: string;
  posterUrl: string;
  genre: string;
  rating: number;
  description: string;
  duration: number;
  reviewCount: number;
  sessions: Array<{
    id: string;
    time: string;
    price: number;
    date?: string;      // Optional: if you want to show session date
    salonId?: string;   // Optional: if you want to use salonId
  }>;
}

interface MovieSelectionProps {
  onMovieSelect: (movie: SelectedMovie) => void
}

export function MovieSelection({ onMovieSelect }: MovieSelectionProps) {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies`)
        .then((res) => res.json())
        .then((data) => {
          // Transform backend data to frontend structure
          const movies = (data.data || []).map((movie: any) => ({
            ...movie,
            sessions: (movie.sessionResponseDTOList || []).flatMap((session: any) =>
                (session.times || []).map((time: any) => ({
                  id: time.id,
                  time: time.time,
                  price: time.price,
                  date: session.date,
                  salonId: session.salonId,
                }))
            ),
          }));
          setMovies(movies)
          setLoading(false)
        })
        .catch(() => setLoading(false))
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = "/fallback-poster.png"
  }

  const getPosterUrl = (movie: Movie): string => {
    if (movie.posterUrl && movie.posterUrl.trim() !== "") {
      return movie.posterUrl
    }
    return "/fallback-poster.png"
  }

  const handleMovieSelect = (
      movie: Movie,
      session: { id: string; time: string; price: number }
  ) => {
    setSelectedMovie(movie.id)
    setSelectedSession(session.id)
    onMovieSelect({
      id: movie.id,
      title: movie.name,
      poster: getPosterUrl(movie),
      sessionId: session.id,
      sessionTime: session.time,
      price: session.price,
    })
  }

  if (loading) return <div>Loading...</div>

  return (
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-6xl font-bold font-serif bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
            Select Movie
          </h2>
          <p className="text-gray-300 text-xl font-medium">Choose your movie and preferred session time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
              <Card
                  key={movie.id}
                  className={`
              group relative overflow-hidden transition-all duration-300 ease-out
              bg-[#181A20] border border-gray-700/50 rounded-2xl
              hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20
              ${selectedMovie === movie.id ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30" : ""}
            `}
              >
                <div className="relative">
                  <div className="aspect-[2/3] overflow-hidden rounded-t-2xl">
                    <img
                        src={getPosterUrl(movie) || "/placeholder.svg"}
                        alt={`${movie.name} movie poster - ${movie.genre} film rated ${movie.rating}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        crossOrigin="anonymous"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10131A]/95 via-[#10131A]/40 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-blue-500/10 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">{movie.rating}</span>
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-semibold rounded-full border border-yellow-400/30">
                    NOW SHOWING
                  </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg group-hover:text-blue-100 transition-colors">
                        {movie.name}
                      </h3>
                      <p className="text-gray-300 text-sm font-medium">{movie.genre}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {movie.sessions.map((session) => (
                          <Button
                              key={session.id}
                              size="sm"
                              variant="outline"
                              className={`
                        px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200
                        border-2 backdrop-blur-sm
                        ${
                                  selectedSession === session.id
                                      ? "bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/30"
                                      : "bg-black/40 border-gray-500/50 text-gray-200 hover:bg-blue-500/20 hover:border-blue-400/70 hover:text-blue-100"
                              }
                        hover:scale-105 hover:shadow-md
                      `}
                              onClick={() => handleMovieSelect(movie, session)}
                          >
                            {session.time}
                          </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </div>
  )
}