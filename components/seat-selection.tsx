"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { SelectedMovie, SelectedSeat } from "@/app/page"

interface SeatSelectionProps {
  movie: SelectedMovie
  onSeatsSelect: (seats: SelectedSeat[], totalPrice: number) => void
  onBack: () => void
}

export function SeatSelection({ movie, onSeatsSelect, onBack }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([])
  const [showRecommended, setShowRecommended] = useState(false)

  // Generate seat map (10 rows, 12 seats per row)
  const generateSeatMap = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const seatsPerRow = 12
    const seats = []

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex]
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatId = `${row}${seatNum}`
        const isRecommended = rowIndex >= 3 && rowIndex <= 6 && seatNum >= 4 && seatNum <= 9
        const isAvailable = !(
          (rowIndex === 0 && (seatNum === 1 || seatNum === 2 || seatNum === 11 || seatNum === 12)) ||
          (rowIndex === 1 && (seatNum === 3 || seatNum === 8)) ||
          (rowIndex === 2 && seatNum === 6) ||
          (rowIndex === 7 && (seatNum === 2 || seatNum === 10)) ||
          (rowIndex === 9 && seatNum === 5)
        )

        seats.push({
          id: seatId,
          row,
          number: seatNum,
          price: movie.price,
          isAvailable,
          isRecommended,
        })
      }
    }
    return seats
  }

  const [seats] = useState(generateSeatMap())

  const toggleSeat = (seat: any) => {
    if (!seat.isAvailable) return

    const isSelected = selectedSeats.some((s) => s.id === seat.id)
    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id))
    } else {
      setSelectedSeats((prev) => [
        ...prev,
        {
          id: seat.id,
          row: seat.row,
          number: seat.number,
          price: seat.price,
        },
      ])
    }
  }

  const getSeatStatus = (seat: any) => {
    if (!seat.isAvailable) return "unavailable"
    if (selectedSeats.some((s) => s.id === seat.id)) return "selected"
    if (seat.isRecommended && showRecommended) return "recommended"
    return "available"
  }

  const getSeatColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 scale-110"
      case "recommended":
        return "bg-cyan-400 hover:bg-cyan-500 pulse-glow"
      case "available":
        return "bg-gray-600 hover:bg-blue-400 hover:shadow-md hover:shadow-blue-400/30 hover:scale-105"
      case "unavailable":
        return "bg-gray-800 cursor-not-allowed opacity-50"
      default:
        return "bg-gray-600 hover:bg-blue-400"
    }
  }

  const totalPrice = selectedSeats.length * movie.price

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      onSeatsSelect(selectedSeats, totalPrice)
    }
  }

  const handleRecommendedToggle = (checked: boolean) => {
    setShowRecommended(checked)
    if (checked) {
      const recommendedSeats = seats
        .filter((seat) => seat.isRecommended && seat.isAvailable)
        .map((seat) => ({
          id: seat.id,
          row: seat.row,
          number: seat.number,
          price: seat.price,
        }))
      setSelectedSeats(recommendedSeats)
    } else {
      setSelectedSeats([])
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold font-serif bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Select Seats
          </h2>
          <p className="text-gray-400 text-lg mt-2">Choose your preferred seats for {movie.title}</p>
        </div>
        <Button
          variant="outline"
          onClick={onBack}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent transition-all-smooth hover:scale-105 px-8 py-3"
        >
          Back
        </Button>
      </div>

      <Card className="backdrop-blur-glass border-gray-600/50 p-10 card-shadow">
        <div className="mb-10">
          <div className="flex items-center gap-12 text-base mb-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-600 rounded transition-all-smooth hover:scale-110"></div>
              <span className="text-gray-300 font-medium">Available</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-800 rounded border border-gray-600 opacity-50"></div>
              <span className="text-gray-300 font-medium">Unavailable</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-cyan-400 rounded pulse-glow"></div>
              <span className="text-cyan-300 font-medium">Recommended</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-blue-500 rounded shadow-lg shadow-blue-500/50"></div>
              <span className="text-blue-300 font-medium">Selected</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-12">
          <div></div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-300 mb-3 font-serif">SCREEN</div>
            <div className="h-2 w-40 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full shadow-lg"></div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((row) => (
            <div key={row} className="flex items-center gap-4">
              <div className="w-10 text-center text-lg text-gray-400 font-bold font-serif">{row}</div>
              <div className="flex gap-3">
                {Array.from({ length: 12 }, (_, i) => {
                  const seat = seats.find((s) => s.row === row && s.number === i + 1)
                  const status = getSeatStatus(seat)
                  return (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-lg transition-all-smooth ${getSeatColor(status)} ${
                        seat?.isAvailable ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                      onClick={() => seat && toggleSeat(seat)}
                      disabled={!seat?.isAvailable}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex items-center space-x-4">
            <Checkbox
              id="recommended"
              checked={showRecommended}
              onCheckedChange={handleRecommendedToggle}
              className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 w-5 h-5"
            />
            <label htmlFor="recommended" className="text-cyan-300 font-semibold cursor-pointer text-lg">
              All Recommended
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-gray-300 mb-2 font-serif">Total</div>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ${totalPrice.toFixed(2)}
            </div>
            {selectedSeats.length > 0 && (
              <div className="text-sm text-gray-400 mt-2">
                {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected
              </div>
            )}
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-16 py-4 text-xl font-semibold transition-all-smooth hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  )
}
