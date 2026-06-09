"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import AdminInquiries from "@/components/admin-inquiries"
import AdminOrders from "@/components/admin-orders"
import AdminAlertManager from "@/components/admin-alert-manager"

export default function Dashboard() {
  const { isLoggedIn } = useAdmin()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn) {
      router.push("/admin/login")
    }
  }, [isLoggedIn, router])

  const [activeTab, setActiveTab] = useState("enquiries")

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Redirecting to admin login...</p>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Being Personalised Admin</h1>
          <p className="text-muted-foreground">Manage your personalised gift enquiries and orders</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {[
            { id: "enquiries", label: "Enquiries" },
            { id: "orders", label: "Orders" },
            { id: "alert", label: "Alert Banner" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-lg p-6 border border-border">
          {activeTab === "enquiries" && <AdminInquiries />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "alert" && <AdminAlertManager />}
        </div>
      </div>
    </div>
  )
}
