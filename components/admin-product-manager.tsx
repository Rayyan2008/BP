"use client"

import { useState } from "react"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/products-data"

export default function AdminProductManager() {
  const { products, updateProduct, deleteProduct, addProduct } = useAdmin()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProductColors, setNewProductColors] = useState<string[]>(["Black", "White", "Beige"])
  const [colorInput, setColorInput] = useState("")
  const [colorImageUploads, setColorImageUploads] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "everyday",
    colors: ["Black", "White", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: {},
    description: "",
    image: "/luxury-abaya.jpg",
    isTrending: false,
    isNew: false,
  })

  const initializeStockForProduct = (colors: string[], sizes: string[]) => {
    const stock: Record<string, number> = {}
    colors.forEach((color) => {
      sizes.forEach((size) => {
        stock[`${color}-${size}`] = 10
      })
    })
    return stock
  }

  const handleAddColor = () => {
    if (colorInput.trim() && !newProductColors.includes(colorInput.trim())) {
      const updatedColors = [...newProductColors, colorInput.trim()]
      setNewProductColors(updatedColors)
      setFormData({
        ...formData,
        colors: updatedColors,
        stock: initializeStockForProduct(updatedColors, formData.sizes || ["XS", "S", "M", "L", "XL", "XXL"]),
      })
      setColorInput("")
    }
  }

  const handleRemoveColor = (colorToRemove: string) => {
    const updatedColors = newProductColors.filter((c) => c !== colorToRemove)
    setNewProductColors(updatedColors)
    setFormData({
      ...formData,
      colors: updatedColors,
      stock: initializeStockForProduct(updatedColors, formData.sizes || ["XS", "S", "M", "L", "XL", "XXL"]),
    })
  }

  const handleAddProduct = () => {
    if (formData.name && formData.price && newProductColors.length > 0) {
      const productToAdd = {
        ...formData,
        colors: newProductColors,
        stock:
          formData.stock ||
          initializeStockForProduct(newProductColors, formData.sizes || ["XS", "S", "M", "L", "XL", "XXL"]),
      } as Omit<Product, "id">

      addProduct(productToAdd)
      setFormData({
        name: "",
        price: 0,
        category: "everyday",
        colors: ["Black", "White", "Beige"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        stock: {},
        description: "",
        image: "/luxury-abaya.jpg",
        isTrending: false,
        isNew: false,
      })
      setNewProductColors(["Black", "White", "Beige"])
      setColorInput("")
      setShowAddForm(false)
    }
  }

  const handleUpdateStock = (productId: string, colorSize: string, quantity: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      updateProduct(productId, {
        stock: { ...product.stock, [colorSize]: quantity },
      })
    }
  }

  const handleImageUpload = (productId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Image = event.target?.result as string
      updateProduct(productId, { image: base64Image })
    }
    reader.readAsDataURL(file)
  }

  const handleColorImageUpload = (productId: string, color: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Image = event.target?.result as string
      const product = products.find((p) => p.id === productId)
      if (product) {
        updateProduct(productId, {
          colorImages: {
            ...product.colorImages,
            [color]: base64Image,
          },
        })
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? "Cancel" : "+ Add New Product"}</Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category || "everyday"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md"
              >
                <option value="everyday">Everyday</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      setFormData({ ...formData, image: event.target?.result as string })
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
              {formData.image && !formData.image.startsWith("data:") && (
                <p className="text-xs text-muted-foreground mt-1">Current: {formData.image}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="font-medium text-sm">Available Colors</h4>
              <div className="flex gap-2">
                <Input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddColor()
                    }
                  }}
                  placeholder="Add color (e.g., Black, White, Beige)"
                />
                <Button onClick={handleAddColor} variant="outline" className="whitespace-nowrap bg-transparent">
                  Add Color
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProductColors.map((color) => (
                  <div key={color} className="bg-muted px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="text-sm">{color}</span>
                    <button
                      onClick={() => handleRemoveColor(color)}
                      className="text-xs font-bold cursor-pointer hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isTrending || false}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                />
                Trending
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isNew || false}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                />
                New
              </label>
            </div>
          </div>
          <Button onClick={handleAddProduct} className="w-full">
            Create Product
          </Button>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div
              onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
              className="p-4 cursor-pointer hover:bg-muted/50 flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${product.price} • {product.category}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newName = prompt("Enter new product name:", product.name)
                    if (newName && newName.trim()) {
                      updateProduct(product.id, { name: newName.trim() })
                    }
                  }}
                >
                  Rename
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm("Are you sure you want to delete this product?")) {
                      deleteProduct(product.id)
                    }
                  }}
                >
                  Delete
                </Button>
                <span className="text-muted-foreground">{expandedId === product.id ? "▼" : "▶"}</span>
              </div>
            </div>

            {expandedId === product.id && (
              <div className="border-t border-border p-4 space-y-6">
                {/* Edit Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      <Input
                        type="number"
                        defaultValue={String(product.price || 0)}
                        onChange={(e) => updateProduct(product.id, { price: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        defaultValue={product.category}
                        onChange={(e) => updateProduct(product.id, { category: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      >
                        <option value="everyday">Everyday</option>
                        <option value="formal">Formal</option>
                        <option value="casual">Casual</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Product Image</h4>
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 bg-muted rounded border border-border flex-shrink-0">
                      {product.image && !product.image.startsWith("data:") && (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload New Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(product.id, file)
                          }
                        }}
                        className="px-3 py-2 border border-border rounded-md text-sm w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Colors and Sizes */}
                <div className="space-y-4">
                  <h4 className="font-medium">Variants</h4>
                  <div className="space-y-4">
                    {product.colors.map((color) =>
                      product.sizes.map((size) => {
                        const key = `${color}-${size}`
                        const isOutOfStock = product.stock[key] === 0
                        return (
                          <div key={key} className="flex items-center gap-4">
                            <span className="text-sm w-32">
                              {color} - {size}
                            </span>
                            <Input
                              type="number"
                              min="0"
                              value={product.stock[key] || 0}
                              onChange={(e) => handleUpdateStock(product.id, key, Number.parseInt(e.target.value))}
                              placeholder="Stock"
                              className="w-20"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isOutOfStock}
                                onChange={(e) => {
                                  handleUpdateStock(product.id, key, e.target.checked ? 0 : 1)
                                }}
                              />
                              <span className="text-xs text-muted-foreground">Out of Stock</span>
                            </label>
                          </div>
                        )
                      }),
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium text-sm mb-4">Color-Specific Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.colors.map((color) => (
                        <div key={color} className="border border-border rounded-lg p-4">
                          <div className="flex gap-4">
                            <div className="relative w-20 h-20 bg-muted rounded border border-border flex-shrink-0">
                              {product.colorImages?.[color] && (
                                <img
                                  src={product.colorImages[color] || "/placeholder.svg"}
                                  alt={`${product.name} in ${color}`}
                                  className="w-full h-full object-cover rounded"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">{color}</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    handleColorImageUpload(product.id, color, file)
                                  }
                                }}
                                className="px-2 py-1 border border-border rounded-md text-xs w-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flags */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={product.isTrending}
                      onChange={(e) => updateProduct(product.id, { isTrending: e.target.checked })}
                    />
                    Trending
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={product.isNew}
                      onChange={(e) => updateProduct(product.id, { isNew: e.target.checked })}
                    />
                    New
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
