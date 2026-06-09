"use client"

import type React from "react"
import { useState } from "react"
import { useAdmin } from "@/lib/admin-context"

export default function AdminCollectionsManager() {
  const { collections, addCollection, updateCollection, deleteCollection, products } = useAdmin()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    image: "",
    productIds: [] as string[],
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductSelect = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter((id) => id !== productId)
        : [...prev.productIds, productId],
    }))
  }

  const handleAdd = () => {
    if (formData.name && formData.tagline && formData.description && formData.image) {
      addCollection({
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        image: formData.image,
        productIds: formData.productIds,
      })
      setFormData({ name: "", tagline: "", description: "", image: "", productIds: [] })
      setIsAdding(false)
    }
  }

  const handleUpdate = (id: string) => {
    const collection = collections.find((c) => c.id === id)
    if (collection && formData.name && formData.image) {
      updateCollection(id, {
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        image: formData.image,
        productIds: formData.productIds,
      })
      setExpandedId(null)
      setFormData({ name: "", tagline: "", description: "", image: "", productIds: [] })
    }
  }

  const openEdit = (collection: any) => {
    setFormData({
      name: collection.name,
      tagline: collection.tagline,
      description: collection.description,
      image: collection.image,
      productIds: collection.productIds || [],
    })
    setExpandedId(collection.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Collections</h2>
        <button
          onClick={() => {
            setIsAdding(true)
            setFormData({ name: "", tagline: "", description: "", image: "", productIds: [] })
          }}
          className="bg-foreground text-background px-4 py-2 rounded hover:bg-foreground/90 transition"
        >
          Add Collection
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-muted p-6 rounded-lg border border-border space-y-4">
          <h3 className="font-semibold">Add New Collection</h3>
          <input
            type="text"
            name="name"
            placeholder="Collection Title"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded bg-background"
          />
          <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded bg-background"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded bg-background h-24"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Thumbnail Image (from device)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-border rounded bg-background"
            />
            {formData.image && (
              <div className="relative w-full h-40 bg-muted rounded border border-border overflow-hidden">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Collection preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Products</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded p-3 bg-background">
              {products.map((product) => (
                <label key={product.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.productIds.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{product.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-foreground text-background px-4 py-2 rounded hover:bg-foreground/90"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-muted border border-border px-4 py-2 rounded hover:bg-muted/80"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Collections List */}
      <div className="space-y-4">
        {collections.map((collection) => (
          <div key={collection.id} className="border border-border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{collection.name}</h3>
                <p className="text-sm text-muted-foreground">{collection.tagline}</p>
                {collection.image && (
                  <div className="relative w-32 h-20 bg-muted rounded border border-border overflow-hidden mt-2">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(collection)}
                  className="px-3 py-1 bg-muted border border-border rounded text-sm hover:bg-muted/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCollection(collection.id)}
                  className="px-3 py-1 bg-red-900/20 border border-red-700 rounded text-sm hover:bg-red-900/40 text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedId === collection.id && (
              <div className="bg-muted p-4 rounded border border-border space-y-4 mt-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Collection Title"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background"
                />
                <input
                  type="text"
                  name="tagline"
                  placeholder="Tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded bg-background h-24"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Thumbnail Image (from device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-border rounded bg-background"
                  />
                  {formData.image && (
                    <div className="relative w-full h-40 bg-muted rounded border border-border overflow-hidden">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Collection preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Select Products</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded p-3 bg-background">
                    {products.map((product) => (
                      <label key={product.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.productIds.includes(product.id)}
                          onChange={() => handleProductSelect(product.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(collection.id)}
                    className="bg-foreground text-background px-4 py-2 rounded hover:bg-foreground/90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="bg-muted border border-border px-4 py-2 rounded hover:bg-muted/80"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
