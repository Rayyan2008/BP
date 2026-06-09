"use client"

import { useAdmin } from "@/lib/admin-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AdminOrders() {
  const { inquiries, orders, addOrder, removeFromInquiries } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.id.includes(searchTerm) || inquiry.customerInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = (inquiry: any) => {
    addOrder({
      email: inquiry.customerInfo?.email || "unknown",
      customerInfo: inquiry.customerInfo,
      items: inquiry.items,
      totalPrice: inquiry.totalPrice,
      status: "approved",
      createdAt: new Date().toISOString(),
    })
    removeFromInquiries(inquiry.id)
  }

  const handleDecline = (inquiryId: string) => {
    removeFromInquiries(inquiryId)
  }

  if (filteredInquiries.length === 0 && inquiries.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No pending inquiries</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-muted border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Pending Inquiries */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID: {inquiry.id}</p>
                  <p className="font-semibold mt-2">{inquiry.customerInfo?.email || "Guest"}</p>
                  <p className="text-sm text-muted-foreground">{new Date(inquiry.timestamp).toLocaleString()}</p>
                </div>
                <span className="text-xl font-semibold">${inquiry.totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2 mb-4 bg-white dark:bg-background p-3 rounded">
                {inquiry.items.map((item, idx) => (
                  <p key={idx} className="text-sm">
                    {item.productName} ({item.color}, {item.size}) x{item.quantity}
                  </p>
                ))}
              </div>

              {inquiry.customerInfo && (
                <div className="bg-white dark:bg-background p-3 rounded mb-4 text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {inquiry.customerInfo.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {inquiry.customerInfo.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {inquiry.customerInfo.address}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleApprove(inquiry)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Order
                </Button>
                <Button onClick={() => handleDecline(inquiry.id)} variant="outline" className="flex-1 bg-transparent">
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No inquiries matching your search</p>
        </div>
      )}
    </div>
  )
}
