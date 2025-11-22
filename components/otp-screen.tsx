"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

interface OTPScreenProps {
  mobile: string
  onVerified: () => void
  onBack: () => void
}

export function OTPScreen({ mobile, onVerified, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      setTimeout(() => onVerified(), 500)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setTimer(60)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
     

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-semibold -ml-10">Verify OTP</h1>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white px-6 pt-8">
        <h2 className="text-2xl font-bold mb-3">Enter verification code</h2>
        <p className="text-gray-600 mb-8">
          We've sent a 6-digit code to <span className="font-semibold text-foreground">{mobile || "+968XXXXXXXX"}</span>
        </p>

        {/* OTP Input */}
        <div className="flex gap-3 mb-8">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="flex-1 aspect-square text-center text-sm font-semibold bg-white border-2 border-gray-200 rounded-xl focus:border-[#7C6FEE] focus:outline-none transition-colors"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <p className="text-gray-600">
              Resend code in <span className="font-semibold text-[#7C6FEE]">{timer}s</span>
            </p>
          ) : (
            <button onClick={handleResend} className="text-[#7C6FEE] font-semibold text-base">
              Resend Code
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={() => otp.every((digit) => digit !== "") && onVerified()}
          disabled={otp.some((digit) => digit === "")}
          className="w-full bg-[#9B8FFF] hover:bg-[#8B7FEF] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-semibold py-7 rounded-2xl"
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
