import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = "https://zllmjnuwhdvqirhahjlj.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbG1qbnV3aGR2cWlyaGFoamxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODM5MTcsImV4cCI6MjA4MzU1OTkxN30.MergztE8FNh4ub5OKfyIIt0MIJ04Y0WT6a42wRj0GmI"

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
