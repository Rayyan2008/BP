"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  email: string
  name?: string
  phone_number?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: React.ReactNode) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRememberMe = async () => {
      const rememberMe = localStorage.getItem("rememberMe") === "true"
      if (rememberMe) {
        const { data } = await supabase.auth.getSession()
        if (data.session?.user) {
          setUser(data.session.user)
          await fetchProfile(data.session.user.id)
        }
      }
    }

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    checkRememberMe()

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      if (data.session?.user) {
        fetchProfile(data.session.user.id)
      }
      setLoading(false)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single()
      if (data) {
        setProfile(data)
      }
    } catch (err) {
      console.error("[v0] Error fetching profile:", err)
    }
  }

  const signUp = async (email: string, password: string) => {
    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers()
    if (!checkError && existingUsers?.users?.some((u) => u.email === email)) {
      throw new Error("This email is already registered. Please login or use a different email.")
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    })
    if (error) throw error

    if (data.user) {
      setUser(data.user)
    }
  }

  const signIn = async (email: string, password: string, rememberMe = false) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true")
      localStorage.setItem("lastLoginEmail", email)
    } else {
      localStorage.removeItem("rememberMe")
    }

    if (data.user) {
      setUser(data.user)
      await fetchProfile(data.user.id)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("rememberMe")
    localStorage.removeItem("lastLoginEmail")
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error("Not authenticated")

    const { error } = await supabase.from("profiles").update(updates).eq("id", user.id)

    if (error) throw error
    setProfile((prev) => (prev ? { ...prev, ...updates } : null))
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
