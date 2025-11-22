"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginScreenProps {
  onLoginSubmit: (mobile: string, pin: string) => void
}

export function LoginScreen({ onLoginSubmit }: LoginScreenProps) {
  const [mobile, setMobile] = useState("")
  const [pin, setPin] = useState("")
  const [remember, setRemember] = useState(true)
  const [supportsBiometric, setSupportsBiometric] = useState(false)

  useEffect(() => {
    // Check if biometric authentication is available
    const checkBiometric = async () => {
      if (window.PublicKeyCredential) {
        const available = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        setSupportsBiometric(available)
      }
    }
    checkBiometric()

    // Load remembered mobile number
    const savedMobile = localStorage.getItem("rememberedMobile")
    if (savedMobile) {
      setMobile(savedMobile)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (remember) {
      localStorage.setItem("rememberedMobile", mobile)
    }
    onLoginSubmit(mobile, pin)
  }

  const handleBiometricLogin = async () => {
    try {
      // Simulate biometric authentication
      const challenge = new Uint8Array(32)
      window.crypto.getRandomValues(challenge)

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          timeout: 60000,
          userVerification: "required",
        },
      } as any)

      if (credential) {
        // Simulate successful biometric login
        onLoginSubmit(mobile || "+968XXXXXXXX", "****")
      }
    } catch (error) {
      console.log("Biometric authentication cancelled or failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
     

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-semibold -ml-10">Login</h1>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white px-6 pt-8">
        <h2 className="text-2xl font-bold mb-8">Enter your credentials</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="text-base font-medium text-foreground">Mobile Number</label>
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus-within:border-gray-300">
              <span className="text-base font-medium text-foreground mr-2">+968</span>
              <div className="w-px h-6 bg-gray-300 mr-3" />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile Number"
                maxLength={8}
                className="flex-1 bg-transparent text-base placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Remember Checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked as boolean)}
              className="w-6 h-6 border-2 data-[state=checked]:bg-[#7C6FEE] data-[state=checked]:border-[#7C6FEE]"
            />
            <label htmlFor="remember" className="text-base font-normal text-foreground cursor-pointer">
              Remember my mobile number
            </label>
          </div>

          {/* PIN Code */}
          <div className="space-y-2">
            <label className="text-base font-medium text-foreground">PIN code</label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={10}
              placeholder="Enter your PIN code"
              className="bg-white border-2 border-gray-200 rounded-xl px-4 py-6 text-base placeholder:text-gray-400 focus:border-gray-300"
            />
          </div>

          {/* Forgot PIN */}
          <div className="text-center">
            <button type="button" className="text-[#7C6FEE] font-semibold text-base">
              Forgot PIN?
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center text-base">
            <span className="text-foreground">Don't have an account? </span>
            <button type="button" className="text-[#7C6FEE] font-semibold">
              Register
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-[#9B8FFF] hover:bg-[#8B7FEF] text-white text-lg font-semibold py-7 rounded-2xl"
          >
            Login
          </Button>

          {/* Biometric Login */}
          {supportsBiometric && (
            <div className="pt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleBiometricLogin}
                variant="outline"
                className="w-full mt-6 border-2 border-gray-200 py-7 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 bg-transparent"
              >
                <Fingerprint className="w-6 h-6 text-[#7C6FEE]" />
                <span className="text-base font-semibold text-foreground">Login with Face ID</span>
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
