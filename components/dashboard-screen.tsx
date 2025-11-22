"use client"

import { Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardScreenProps {
  mobile: string
}

export function DashboardScreen({ mobile }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
    

      {/* Header */}
      <div className="bg-white px-6 py-4">
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white px-6 pt-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold mb-3">Login Successful!</h2>
          <p className="text-gray-600 mb-2">You've successfully logged in with</p>
          <p className="text-lg font-semibold text-[#7C6FEE] mb-8">{mobile || "+968XXXXXXXX"}</p>

          <div className="w-full max-w-sm space-y-4">
            <div className="bg-[#F5F5F7] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#9B8FFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Secure Authentication</h3>
                  <p className="text-sm text-gray-600">
                    Your account is protected with OTP verification and biometric authentication
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full border-2 border-gray-200 py-7 rounded-2xl text-base font-semibold"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
