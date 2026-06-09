"use client"

import type React from "react"

interface FormInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: boolean
  required?: boolean
  icon?: React.ReactNode
  as?: "input" | "textarea"
  rows?: number
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error = false,
  required = false,
  icon,
  as = "input",
  rows = 4,
}: FormInputProps) {
  const baseClass =
    "w-full bg-transparent rounded-md border py-[10px] px-5 text-foreground outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:disabled:bg-dark-4"
  const borderClass = error ? "border-red dark:border-red" : "border-border dark:border-dark-3 focus:border-primary"

  if (as === "textarea") {
    return (
      <div>
        <label className="mb-[10px] block text-base font-medium text-foreground">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className={`${baseClass} ${borderClass} resize-none`}
        />
      </div>
    )
  }

  return (
    <div>
      <label className="mb-[10px] block text-base font-medium text-foreground">
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseClass} ${borderClass} ${icon ? "pl-12" : ""}`}
        />
        {icon && <span className="absolute top-1/2 left-4 -translate-y-1/2">{icon}</span>}
      </div>
      {error && <p className="mt-[10px] text-sm text-red">This field is invalid</p>}
    </div>
  )
}
