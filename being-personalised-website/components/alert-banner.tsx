"use client"

import { useAdmin } from "@/lib/admin-context"

export function AlertBanner() {
  const { alert } = useAdmin()

  if (!alert.isActive || !alert.message) {
    return null
  }

  return (
    <div className={`${alert.backgroundColor} ${alert.textColor} py-3 px-4`}>
      <div className="max-w-7xl mx-auto text-center font-medium">{alert.message}</div>
    </div>
  )
}
