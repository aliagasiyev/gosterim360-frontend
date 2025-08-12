"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BookingData } from "@/app/page"

interface QRTicketProps {
  bookingData: BookingData
  onNewBooking: () => void
}

export function QRTicket({ bookingData, onNewBooking }: QRTicketProps) {
  const generateQRData = () => {
    return JSON.stringify({
      movie: bookingData.movie?.title,
      session: bookingData.movie?.sessionTime,
      seats: bookingData.seats.map((s) => s.id).join(", "),
      total: bookingData.totalPrice,
      transactionId: bookingData.paymentData?.transactionId,
    })
  }

  const generateQRPattern = () => {
    const size = 25
    const pattern = []

    for (let i = 0; i < size * size; i++) {
      const row = Math.floor(i / size)
      const col = i % size

      // Create finder patterns (corners)
      const isFinderPattern = (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7)

      // Create timing patterns
      const isTimingPattern = (row === 6 || col === 6) && !isFinderPattern

      // Create data pattern with some structure
      const isDataPattern = !isFinderPattern && !isTimingPattern

      let isBlack = false

      if (isFinderPattern) {
        const localRow = row < 7 ? row : row - (size - 7)
        const localCol = col < 7 ? col : col >= size - 7 ? col - (size - 7) : col
        isBlack =
          localRow === 0 ||
          localRow === 6 ||
          localCol === 0 ||
          localCol === 6 ||
          (localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4)
      } else if (isTimingPattern) {
        isBlack = (row + col) % 2 === 0
      } else if (isDataPattern) {
        // Create pseudo-random but structured data pattern
        const hash = (row * 31 + col * 17 + bookingData.movie?.id || 0) % 100
        isBlack = hash > 45
      }

      pattern.push(isBlack)
    }

    return pattern
  }

  const qrPattern = generateQRPattern()

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="backdrop-blur-glass border-gray-600/50 p-16 max-w-2xl w-full card-shadow">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-serif bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Booking Complete!
          </h2>
          <p className="text-gray-400 text-xl">Your digital ticket is ready</p>
        </div>

        <div className="flex flex-col items-center space-y-10">
          <div className="w-80 h-80 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-6 transition-all-smooth hover:scale-105">
            <div className="w-68 h-68 grid grid-cols-25 gap-0">
              {qrPattern.map((isBlack, i) => (
                <div key={i} className={`aspect-square ${isBlack ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="text-4xl font-bold font-serif">{bookingData.movie?.title}</div>
            <div className="text-2xl text-gray-400">Today, {bookingData.movie?.sessionTime?.replace(":", "")}</div>
            {bookingData.seats.length > 0 && (
              <div className="text-lg text-gray-500 bg-gray-800/50 px-6 py-3 rounded-full">
                Seats: {bookingData.seats.map((s) => s.id).join(", ")}
              </div>
            )}
            <div className="text-2xl font-bold text-green-400 mt-6">Total: ${bookingData.totalPrice.toFixed(2)}</div>
            {bookingData.paymentData?.transactionId && (
              <div className="text-sm text-gray-600 mt-4 font-mono bg-gray-800/30 px-4 py-2 rounded">
                Transaction ID: {bookingData.paymentData.transactionId}
              </div>
            )}
          </div>

          <div className="flex gap-6 w-full max-w-md">
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent transition-all-smooth hover:scale-105 py-4 text-lg"
              onClick={() => window.print()}
            >
              Print Ticket
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all-smooth hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 py-4 text-lg font-semibold"
              onClick={onNewBooking}
            >
              Book Another Movie
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
