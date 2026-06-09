"use client"

import { useAdmin } from "@/lib/admin-context"
import { useState } from "react"

const STATUS_OPTIONS = [
  { value: "approved", label: "Approved", color: "bg-blue-100 text-blue-800" },
  { value: "processing", label: "Processing", color: "bg-purple-100 text-purple-800" },
  { value: "shipped", label: "Shipped", color: "bg-orange-100 text-orange-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "discontinued", label: "Discontinued", color: "bg-red-100 text-red-800" },
]

const STATUS_TEMPLATES = {
  approved: [
    "Thank you for your order! We have confirmed your purchase and will begin processing it shortly.",
    "Your order has been approved. We appreciate your business!",
  ],
  processing: [
    "Your order is now being processed. Thank you for your patience!",
    "We are preparing your beautiful abaya with care.",
  ],
  shipped: ["Your order has been shipped! You will receive it soon.", "Great news! Your abaya is on its way to you."],
  delivered: ["Your order has been delivered. Thank you for shopping with LURMOR!", "We hope you love your new abaya!"],
  discontinued: [
    "Sorry, this product has been discontinued. Please choose another item.",
    "Unfortunately, this item is no longer available. We apologize for any inconvenience.",
  ],
}

export default function AdminUpdateTracking() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusNote, setStatusNote] = useState<{ [key: string]: string }>({})

  const filteredOrders = orders
    .filter((order) => order.status !== "pending")
    .filter(
      (order) =>
        order.id.includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false,
    )

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any, statusNote[orderId])
    setStatusNote({ ...statusNote, [orderId]: "" })
  }

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      deleteOrder(orderId)
    }
  }

  if (orders.filter((o) => o.status !== "pending").length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No approved orders to track</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email, order ID, or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-muted border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-6">
              <div
                className="flex justify-between items-start mb-4 cursor-pointer hover:opacity-70"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID: {order.id}</p>
                  <p className="font-semibold mt-1">{order.customerInfo?.name || order.email}</p>
                  <p className="text-sm text-muted-foreground">{order.email}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className="text-xl font-semibold">${order.totalPrice.toFixed(2)}</span>
              </div>

              {/* Status Update Buttons */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Update Status:</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusUpdate(order.id, status.value)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        order.status === status.value
                          ? `${status.color} ring-2 ring-offset-2 dark:ring-offset-background`
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  {/* Order Items */}
                  <div>
                    <p className="font-medium text-sm mb-2">Order Items:</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm bg-muted p-2 rounded">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-muted-foreground">
                            {item.color} • {item.size} • Qty: {item.quantity} @ ${item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Note Input with Templates */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Add Status Note</label>
                    <div className="mb-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setStatusNote({ ...statusNote, [order.id]: e.target.value })
                          }
                        }}
                        className="w-full bg-muted border border-border rounded p-2 text-sm text-foreground"
                      >
                        <option value="">Select a template...</option>
                        {Object.entries(STATUS_TEMPLATES).map(([status, templates]) => (
                          <optgroup
                            key={status}
                            label={`${status.charAt(0).toUpperCase() + status.slice(1)} Templates`}
                          >
                            {templates.map((template, idx) => (
                              <option key={idx} value={template}>
                                {template.substring(0, 50)}...
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={statusNote[order.id] || ""}
                      onChange={(e) => setStatusNote({ ...statusNote, [order.id]: e.target.value })}
                      placeholder="Or add a custom note..."
                      className="w-full bg-muted border border-border rounded p-2 text-sm text-foreground"
                      rows={2}
                    />
                  </div>

                  {/* Status History */}
                  <div>
                    <p className="font-medium text-sm mb-2">Tracking History:</p>
                    <div className="space-y-3">
                      {order.statusHistory.map((history, idx) => (
                        <div key={idx} className="bg-muted p-3 rounded text-sm">
                          <p className="font-semibold capitalize">{history.status}</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(history.timestamp).toLocaleString()}
                          </p>
                          {history.note && <p className="text-muted-foreground mt-1">{history.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cancel Order Button */}
                  <div className="border-t border-border pt-4">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
                    >
                      Remove Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No orders matching your search</p>
        </div>
      )}
    </div>
  )
}
