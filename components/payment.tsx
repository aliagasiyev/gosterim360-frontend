"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BookingData } from "@/app/page"

interface PaymentProps {
  bookingData: BookingData
  onPaymentComplete: (paymentData: any) => void
  onBack: () => void
}

export function Payment({ bookingData, onPaymentComplete, onBack }: PaymentProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const paymentData = {
      cardNumber: cardNumber.slice(-4),
      transactionId: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    }

    onPaymentComplete(paymentData)
    setIsProcessing(false)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const isFormValid = cardNumber.length >= 15 && expiryDate.length === 5 && cvc.length >= 3

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold font-serif bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Payment
          </h2>
          <p className="text-gray-400 text-lg mt-2">Complete your booking securely</p>
        </div>
        <Button
          variant="outline"
          onClick={onBack}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent transition-all-smooth hover:scale-105 px-8 py-3"
        >
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card className="backdrop-blur-glass border-gray-600/50 p-10 card-shadow">
          <h3 className="text-3xl font-bold font-serif mb-10">Payment Details</h3>

          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-4">Card Number</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 h-14 text-xl transition-all-smooth focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-4">MM / YY</label>
                <Input
                  type="text"
                  placeholder="12/25"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 h-14 text-xl transition-all-smooth focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-4">CVC</label>
                <Input
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                  maxLength={4}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 h-14 text-xl transition-all-smooth focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-semibold text-gray-300 font-serif">Total</span>
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                ${bookingData.totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-5 text-xl font-semibold transition-all-smooth hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              onClick={handlePayment}
              disabled={!isFormValid || isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>
          </div>
        </Card>

        <Card className="backdrop-blur-glass border-gray-600/50 p-10 card-shadow">
          <h3 className="text-3xl font-bold font-serif mb-10">Ticket Preview</h3>
          <div className="flex flex-col items-center space-y-8">
            <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center shadow-2xl p-4">
              <div className="w-56 h-56 bg-black text-white text-xs p-1 font-mono grid grid-cols-16 gap-px">
                {Array.from({ length: 256 }, (_, i) => {
                  const isBlack =
                    (i < 49 && (i % 16 < 7 || i % 16 > 8)) ||
                    (i >= 49 && i < 112 && Math.random() > 0.4) ||
                    (i >= 112 && i < 144 && (i % 16 < 7 || i % 16 > 8)) ||
                    (i >= 144 && i < 207 && Math.random() > 0.4) ||
                    (i >= 207 && (i % 16 < 7 || i % 16 > 8))
                  return <div key={i} className={`${isBlack ? "bg-black" : "bg-white"} aspect-square`} />
                })}
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="text-3xl font-bold font-serif">{bookingData.movie?.title}</div>
              <div className="text-gray-400 text-xl">Today, {bookingData.movie?.sessionTime?.replace(":", "")}</div>
              {bookingData.seats.length > 0 && (
                <div className="text-base text-gray-500">Seats: {bookingData.seats.map((s) => s.id).join(", ")}</div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
