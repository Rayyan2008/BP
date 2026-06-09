"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { products as initialProducts, type Product } from "./products-data"

interface CartInquiry {
  id: string
  timestamp: string
  items: Array<{
    productName: string
    color: string
    size: string
    quantity: number
    price: number
  }>
  totalPrice: number
}

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
  contactMethod?: string
  budget?: string
  timeframe?: string
  source?: string
}

interface Order {
  id: string
  email: string
  customerInfo?: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    productName: string
    color: string
    size: string
    quantity: number
    price: number
  }>
  totalPrice: number
  status: "pending" | "approved" | "processing" | "shipped" | "delivered" | "discontinued"
  statusHistory: Array<{
    status: string
    timestamp: string
    note?: string
  }>
  createdAt: string
}

interface Collection {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  productIds: string[]
}

interface AdminContextType {
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  inquiries: CartInquiry[]
  clearInquiries: () => void
  removeFromInquiries: (id: string) => void
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "statusHistory">) => void
  updateOrderStatus: (orderId: string, status: Order["status"], note?: string) => void
  deleteOrder: (orderId: string) => void
  getOrdersByEmail: (email: string) => Order[]
  alert: AlertConfig
  updateAlert: (alert: AlertConfig) => void
  collections: Collection[]
  addCollection: (collection: Omit<Collection, "id">) => void
  updateCollection: (id: string, updates: Partial<Collection>) => void
  deleteCollection: (id: string) => void
  enquiries: Enquiry[]
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) => void
  updateEnquiry: (id: string, updates: Partial<Enquiry>) => void
  deleteEnquiry: (id: string) => void
}

interface AlertConfig {
  message: string
  isActive: boolean
  backgroundColor: string
  textColor: string
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = "SapotoInfosys"

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [inquiries, setInquiries] = useState<CartInquiry[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [alert, setAlert] = useState<AlertConfig>({
    message: "",
    isActive: false,
    backgroundColor: "bg-black",
    textColor: "text-white",
  })
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "classic",
      name: "Classic Collection",
      tagline: "Timeless elegance for every occasion",
      description:
        "Embrace timeless sophistication with our classic collection, designed for women who appreciate enduring style.",
      image: "/collections/classic-collection.jpg",
      productIds: ["1"],
    },
    {
      id: "contemporary",
      name: "Contemporary Line",
      tagline: "Modern designs with traditional touches",
      description: "Discover contemporary aesthetics blended with traditional craftsmanship in our modern line.",
      image: "/collections/contemporary-line.jpg",
      productIds: ["4"],
    },
    {
      id: "premium",
      name: "Premium Selection",
      tagline: "Exquisite craftsmanship and detail",
      description:
        "Experience luxury like never before with our premium collection featuring the finest materials and intricate details.",
      image: "/collections/premium-selection.jpg",
      productIds: ["3", "7"],
    },
  ])
  const [mounted, setMounted] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("lurmor-products")
    const savedInquiries = localStorage.getItem("lurmor-inquiries")
    const savedEnquiries = localStorage.getItem("lurmor-enquiries")
    const adminSession = localStorage.getItem("lurmor-admin-session")
    const savedAlert = localStorage.getItem("lurmor-alert")
    const savedOrders = localStorage.getItem("lurmor-orders")
    const savedCollections = localStorage.getItem("lurmor-collections")

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (e) {
        console.error("Failed to load products:", e)
      }
    }

    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries))
      } catch (e) {
        console.error("Failed to load inquiries:", e)
      }
    }

    if (savedEnquiries) {
      try {
        setEnquiries(JSON.parse(savedEnquiries))
      } catch (e) {
        console.error("Failed to load enquiries:", e)
      }
    }

    if (adminSession) {
      setIsLoggedIn(true)
    }

    if (savedAlert) {
      try {
        setAlert(JSON.parse(savedAlert))
      } catch (e) {
        console.error("Failed to load alert:", e)
      }
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Failed to load orders:", e)
      }
    }

    if (savedCollections) {
      try {
        setCollections(JSON.parse(savedCollections))
      } catch (e) {
        console.error("Failed to load collections:", e)
      }
    }

    setMounted(true)
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-products", JSON.stringify(products))
    }
  }, [products, mounted])

  // Save inquiries to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-inquiries", JSON.stringify(inquiries))
    }
  }, [inquiries, mounted])

  // Save enquiries to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-enquiries", JSON.stringify(enquiries))
    }
  }, [enquiries, mounted])

  // Save alert to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-alert", JSON.stringify(alert))
    }
  }, [alert, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-orders", JSON.stringify(orders))
    }
  }, [orders, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lurmor-collections", JSON.stringify(collections))
    }
  }, [collections, mounted])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem("lurmor-admin-session", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("lurmor-admin-session")
  }

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const id = Date.now().toString()
    setProducts([...products, { ...newProduct, id }])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const clearInquiries = () => {
    setInquiries([])
  }

  const removeFromInquiries = (id: string) => {
    setInquiries(inquiries.filter((i) => i.id !== id))
  }

  const addOrder = (newOrder: Omit<Order, "id" | "statusHistory">) => {
    const id = Date.now().toString()
    const order: Order = {
      ...newOrder,
      id,
      status: "pending",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          note: "Order received",
        },
      ],
    }
    setOrders([...orders, order])
  }

  const updateOrderStatus = (orderId: string, status: Order["status"], note?: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              statusHistory: [
                ...order.statusHistory,
                {
                  status,
                  timestamp: new Date().toISOString(),
                  note,
                },
              ],
            }
          : order,
      ),
    )
  }

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId))
  }

  const getOrdersByEmail = (email: string): Order[] => {
    return orders.filter((order) => order.email === email)
  }

  const updateAlert = (newAlert: AlertConfig) => {
    setAlert(newAlert)
  }

  const addCollection = (newCollection: Omit<Collection, "id">) => {
    const id = Date.now().toString()
    setCollections([...collections, { ...newCollection, id }])
  }

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(collections.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const deleteCollection = (id: string) => {
    setCollections(collections.filter((c) => c.id !== id))
  }

  const addEnquiry = (newEnquiry: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) => {
    const id = Date.now().toString()
    const enquiry: Enquiry = {
      ...newEnquiry,
      id,
      status: "new",
      createdAt: new Date().toISOString(),
      notes: "",
    }
    setEnquiries([enquiry, ...enquiries])
  }

  const updateEnquiry = (id: string, updates: Partial<Enquiry>) => {
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const deleteEnquiry = (id: string) => {
    setEnquiries(enquiries.filter((e) => e.id !== id))
  }

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        inquiries,
        clearInquiries,
        removeFromInquiries,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrdersByEmail,
        alert,
        updateAlert,
        collections,
        addCollection,
        updateCollection,
        deleteCollection,
        enquiries,
        addEnquiry,
        updateEnquiry,
        deleteEnquiry,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}
