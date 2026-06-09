"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"

const backgroundOptions = [
  { label: "Black", value: "bg-black" },
  { label: "White", value: "bg-white" },
  { label: "Red", value: "bg-red-600" },
  { label: "Gold", value: "bg-amber-600" },
]

const textColorOptions = [
  { label: "White", value: "text-white" },
  { label: "Black", value: "text-black" },
  { label: "Gold", value: "text-amber-600" },
]

export default function AdminAlertManager() {
  const { alert, updateAlert } = useAdmin()
  const [message, setMessage] = useState(alert.message)
  const [isActive, setIsActive] = useState(alert.isActive)
  const [backgroundColor, setBackgroundColor] = useState(alert.backgroundColor)
  const [textColor, setTextColor] = useState(alert.textColor)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMessage(alert.message)
    setIsActive(alert.isActive)
    setBackgroundColor(alert.backgroundColor)
    setTextColor(alert.textColor)
  }, [alert])

  const handleSave = () => {
    updateAlert({
      message,
      isActive: true,
      backgroundColor,
      textColor,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDisable = () => {
    updateAlert({
      message,
      isActive: false,
      backgroundColor,
      textColor,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-serif font-bold mb-6">Alert Banner Manager</h2>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`} />
              <span className="text-sm">{isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">Alert Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter alert message (e.g., 'Summer Sale - 20% Off All Abayas')"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
            rows={3}
          />
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="grid grid-cols-2 gap-2">
            {backgroundOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setBackgroundColor(option.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  backgroundColor === option.value ? "border-foreground" : "border-border"
                } ${option.value}`}
              >
                <span className={option.value === "bg-white" ? "text-black" : "text-white"}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-medium mb-2">Text Color</label>
          <div className="grid grid-cols-3 gap-2">
            {textColorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTextColor(option.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  textColor === option.value ? "border-foreground" : "border-border"
                } ${option.value}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium mb-2">Preview</label>
          <div className={`${backgroundColor} ${textColor} py-3 px-4 rounded-lg text-center`}>
            {message || "Your alert message will appear here"}
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm">
            Alert saved successfully!
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            Save Alert
          </Button>
          <Button onClick={handleDisable} variant="outline" className="flex-1 bg-transparent">
            Disable Alert
          </Button>
        </div>
      </div>
    </div>
  )
}
