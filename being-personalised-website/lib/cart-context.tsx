"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
  maxStock: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const cartKey = user?.email ? `lurmor-cart-${user.email}` : "lurmor-cart-guest"
    const savedCart = localStorage.getItem(cartKey)
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to load cart:", e)
      }
    }
    setMounted(true)
  }, [user?.email])

  useEffect(() => {
    if (mounted) {
      const cartKey = user?.email ? `lurmor-cart-${user.email}` : "lurmor-cart-guest"
      localStorage.setItem(cartKey, JSON.stringify(items))
    }
  }, [items, mounted, user?.email])

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
            ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.maxStock) }
            : item,
        )
      }

      return [...prevItems, newItem]
    })
  }

  const removeFromCart = (id: string, size: string, color: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size && item.color === color)))
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.min(quantity, item.maxStock) }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
