"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { OTPScreen } from "@/components/otp-screen"
import { DashboardScreen } from "@/components/dashboard-screen"

export default function Home() {
  const [screen, setScreen] = useState<"login" | "otp" | "dashboard">("login")
  const [credentials, setCredentials] = useState({ mobile: "", pin: "" })

  const handleLoginSubmit = (mobile: string, pin: string) => {
    setCredentials({ mobile, pin })
    setScreen("otp")
  }

  const handleOTPVerified = () => {
    setScreen("dashboard")
  }

  const handleBackToLogin = () => {
    setScreen("login")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {screen === "login" && <LoginScreen onLoginSubmit={handleLoginSubmit} />}
      {screen === "otp" && (
        <OTPScreen mobile={credentials.mobile} onVerified={handleOTPVerified} onBack={handleBackToLogin} />
      )}
      {screen === "dashboard" && <DashboardScreen mobile={credentials.mobile} />}
    </main>
  )
}
