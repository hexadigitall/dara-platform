'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, CreditCard } from 'lucide-react'
import Layout from '../components/Layout'

const cartItems = [
  { id: 1, title: 'Professional Blazer', brand: 'Everlane', price: 189, quantity: 1, size: 'M' },
  { id: 2, title: 'Midi Dress', brand: '& Other Stories', price: 95, quantity: 2, size: 'S' }
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart ({items.length})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm flex">
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-neutral-500">Item</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{item.brand}</p>
                  <p className="text-sm text-neutral-500">Size: {item.size}</p>
                  <div className="flex items-center mt-2">
                    <button className="p-1 rounded border">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-3 font-medium">{item.quantity}</span>
                    <button className="p-1 rounded border">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${item.price * item.quantity}</p>
                  <button className="text-red-500 mt-2">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm h-fit">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-accent-600 text-white py-3 rounded-md mt-6 font-medium hover:bg-accent-700">
              <CreditCard className="h-4 w-4 inline mr-2" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
