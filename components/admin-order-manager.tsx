"use client"

import { useAdmin } from "@/lib/admin-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "approved", label: "Approved", color: "bg-blue-100 text-blue-800" },
  { value: "processing", label: "Processing", color: "bg-purple-100 text-purple-800" },
  { value: "shipped", label: "Shipped", color: "bg-orange-100 text-orange-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "discontinued", label: "Discontinued", color: "bg-red-100 text-red-800" },
]

export default function AdminOrderManager() {
  const { orders, updateOrderStatus, inquiries } = useAdmin()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [statusNote, setStatusNote] = useState<{ [key: string]: string }>({})

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any, statusNote[orderId])
    setStatusNote({ ...statusNote, [orderId]: "" })
  }

  if (orders.length === 0 && inquiries.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No orders or inquiries yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Pending Inquiries */}
      {inquiries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">New Cart Inquiries (Awaiting Approval)</h3>
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{new Date(inquiry.timestamp).toLocaleString()}</p>
                    <p className="font-medium mt-1">{inquiry.customerInfo?.email || "Guest"}</p>
                  </div>
                  <span className="text-xl font-semibold">${inquiry.totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-2 mb-4">
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

                <Button className="w-full bg-green-600 hover:bg-green-700">Approve as Order</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmed Orders */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Orders ({orders.length})</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-6">
              <div
                className="flex justify-between items-start mb-4 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div>
                  <p className="font-semibold">{order.customerInfo?.name || order.email}</p>
                  <p className="text-sm text-muted-foreground">{order.email}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className="text-xl font-semibold">${order.totalPrice.toFixed(2)}</span>
              </div>

              <div className="mb-4">
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

              {expandedOrder === order.id && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-muted-foreground">
                          {item.color} • {item.size} • Qty: {item.quantity} @ ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Status Update Note</label>
                    <textarea
                      value={statusNote[order.id] || ""}
                      onChange={(e) => setStatusNote({ ...statusNote, [order.id]: e.target.value })}
                      placeholder="Add note about status update..."
                      className="w-full bg-muted border border-border rounded p-2 text-sm text-foreground"
                      rows={2}
                    />
                  </div>

                  <div className="bg-muted p-3 rounded text-sm">
                    <p className="font-semibold mb-2">Status History:</p>
                    <div className="space-y-2">
                      {order.statusHistory.map((history, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="font-medium capitalize">{history.status}</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(history.timestamp).toLocaleString()}
                          </p>
                          {history.note && <p className="text-muted-foreground">{history.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
