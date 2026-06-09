"use client"

import { useState } from "react"
import { useAdmin } from "@/lib/admin-context"
import { X, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Enquiry {
  id: string
  name: string
  email: string
  phone?: string
  occasion: string
  deliveryDate: string
  message: string
  status: "new" | "contacted" | "in-progress" | "completed"
  createdAt: string
  notes?: string
}

export default function AdminInquiries() {
  const { enquiries, updateEnquiry, deleteEnquiry } = useAdmin()
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [notes, setNotes] = useState("")
  const [statusFilter, setStatusFilter] = useState<Enquiry["status"] | "all">("all")

  const filteredEnquiries =
    statusFilter === "all" ? enquiries : enquiries.filter((e) => e.status === statusFilter)

  const handleStatusChange = (enquiryId: string, newStatus: Enquiry["status"]) => {
    updateEnquiry(enquiryId, { status: newStatus })
    if (selectedEnquiry?.id === enquiryId) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus })
    }
  }

  const handleAddNotes = () => {
    if (selectedEnquiry && notes.trim()) {
      updateEnquiry(selectedEnquiry.id, {
        notes: (selectedEnquiry.notes || "") + "\n" + notes,
      })
      setSelectedEnquiry({
        ...selectedEnquiry,
        notes: (selectedEnquiry.notes || "") + "\n" + notes,
      })
      setNotes("")
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      deleteEnquiry(id)
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null)
      }
    }
  }

  const getStatusIcon = (status: Enquiry["status"]) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "contacted":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getStatusColor = (status: Enquiry["status"]) => {
    switch (status) {
      case "new":
        return "bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100"
      case "contacted":
        return "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100"
      case "in-progress":
        return "bg-orange-50 dark:bg-orange-950 text-orange-900 dark:text-orange-100"
      case "completed":
        return "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Enquiries List */}
      <div className="lg:col-span-1">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Enquiries ({filteredEnquiries.length})</h3>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="all">All Enquiries ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
            <option value="contacted">
              Contacted ({enquiries.filter((e) => e.status === "contacted").length})
            </option>
            <option value="in-progress">
              In Progress ({enquiries.filter((e) => e.status === "in-progress").length})
            </option>
            <option value="completed">
              Completed ({enquiries.filter((e) => e.status === "completed").length})
            </option>
          </select>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No enquiries found</p>
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                onClick={() => {
                  setSelectedEnquiry(enquiry)
                  setNotes("")
                }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedEnquiry?.id === enquiry.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{enquiry.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{enquiry.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">{enquiry.occasion}</p>
                  </div>
                  <div className="flex-shrink-0">{getStatusIcon(enquiry.status)}</div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Enquiry Details */}
      <div className="lg:col-span-2">
        {selectedEnquiry ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedEnquiry.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(selectedEnquiry.createdAt).toLocaleDateString()} at{" "}
                  {new Date(selectedEnquiry.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1">{selectedEnquiry.email}</p>
              </div>
              {selectedEnquiry.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="mt-1">{selectedEnquiry.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Occasion</label>
                <p className="mt-1">{selectedEnquiry.occasion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Delivery Date</label>
                <p className="mt-1">{selectedEnquiry.deliveryDate}</p>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Enquiry Message</label>
              <div className="mt-2 p-4 bg-muted rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>
            </div>

            {/* Status Management */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
              <div className="flex gap-2 flex-wrap">
                {(["new", "contacted", "in-progress", "completed"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedEnquiry.id, status)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      selectedEnquiry.status === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/20"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Internal Notes
              </label>
              {selectedEnquiry.notes && (
                <div className="p-3 bg-muted rounded-lg mb-3 max-h-32 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">{selectedEnquiry.notes}</p>
                </div>
              )}
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this enquiry..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
              <button
                onClick={handleAddNotes}
                disabled={!notes.trim()}
                className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                Add Note
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: Your Being Personalised Enquiry`}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 text-center"
              >
                Reply via Email
              </a>
              <a
                href={`https://wa.me/${selectedEnquiry.phone?.replace(/\D/g, "") || "916398765432"}?text=Hi%20${encodeURIComponent(selectedEnquiry.name)}%2C%20Thank%20you%20for%20your%20enquiry!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:opacity-90 text-center"
              >
                WhatsApp
              </a>
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select an enquiry to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
