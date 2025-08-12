"use client"

import { useState } from "react"
import { MovieSelection } from "@/components/movie-selection"
import { SeatSelection } from "@/components/seat-selection"
import { Payment } from "@/components/payment"
import { QRTicket } from "@/components/qr-ticket"

export type AppStep = "movies" | "seats" | "payment" | "ticket"

export interface SelectedMovie {
  id: number
  title: string
  poster: string
  sessionId: number
  sessionTime: string
  price: number
}

export interface SelectedSeat {
  id: string
  row: string
  number: number
  price: number
}

export interface BookingData {
  movie: SelectedMovie | null
  seats: SelectedSeat[]
  totalPrice: number
  paymentData: any
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<AppStep>("movies")
  const [bookingData, setBookingData] = useState<BookingData>({
    movie: null,
    seats: [],
    totalPrice: 0,
    paymentData: null,
  })

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const goToStep = (step: AppStep) => {
    setCurrentStep(step)
  }

  return (
    <div className="min-h-screen bg-[#181A20] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass border-b border-gray-700/50">
        <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            GÖSTERIM360
          </h1>
          <nav className="flex items-center gap-8">
            <button className="text-gray-300 hover:text-white transition-all-smooth hover:scale-105 font-medium">
              Movies
            </button>
            <button className="text-gray-300 hover:text-white transition-all-smooth hover:scale-105 font-medium">
              About
            </button>
            <button className="text-gray-300 hover:text-white transition-all-smooth hover:scale-105 font-medium">
              FAQ
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all-smooth hover:scale-105 font-medium">
              Log In
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 pt-24 max-w-7xl">
        {currentStep === "movies" && (
          <MovieSelection
            onMovieSelect={(movie) => {
              updateBookingData({ movie })
              goToStep("seats")
            }}
          />
        )}

        {currentStep === "seats" && bookingData.movie && (
          <SeatSelection
            movie={bookingData.movie}
            onSeatsSelect={(seats, totalPrice) => {
              updateBookingData({ seats, totalPrice })
              goToStep("payment")
            }}
            onBack={() => goToStep("movies")}
          />
        )}

        {currentStep === "payment" && (
          <Payment
            bookingData={bookingData}
            onPaymentComplete={(paymentData) => {
              updateBookingData({ paymentData })
              goToStep("ticket")
            }}
            onBack={() => goToStep("seats")}
          />
        )}

        {currentStep === "ticket" && (
          <QRTicket
            bookingData={bookingData}
            onNewBooking={() => {
              setBookingData({
                movie: null,
                seats: [],
                totalPrice: 0,
                paymentData: null,
              })
              goToStep("movies")
            }}
          />
        )}
      </main>
    </div>
  )
}
