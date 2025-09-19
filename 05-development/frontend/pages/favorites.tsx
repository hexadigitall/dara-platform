'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Grid, List, ShoppingBag, X, Filter } from 'lucide-react'
import Layout from '../components/Layout'
import Link from 'next/link'

const favorites = [
  {
    id: 1,
    title: 'Professional Black Blazer',
    brand: 'Everlane',
    price: 189,
    type: 'blazer',
    dateAdded: '2 days ago',
    available: true
  },
  {
    id: 2,
    title: 'Sustainable Midi Dress',
    brand: '& Other Stories',
    price: 95,
    type: 'dress',
    dateAdded: '1 week ago',
    available: true
  },
  {
    id: 3,
    title: 'Minimalist Sneakers',
    brand: 'Veja',
    price: 120,
    type: 'shoes',
    dateAdded: '2 weeks ago',
    available: false
  }
]

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              My Favorites
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {favorites.length} saved items
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent-100 text-accent-600' : 'text-neutral-400'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent-100 text-accent-600' : 'text-neutral-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-neutral-800 rounded-lg shadow-sm ${viewMode === 'list' ? 'flex' : ''}`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-t-lg flex items-center justify-center">
                  <span className="text-neutral-500">Item Image</span>
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md">
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </button>
                {!item.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {item.brand}
                </p>
                <p className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  ${item.price}
                </p>
                <p className="text-xs text-neutral-500 mb-3">
                  Added {item.dateAdded}
                </p>
                <button className="w-full bg-accent-600 text-white py-2 rounded-md hover:bg-accent-700 disabled:bg-neutral-300 disabled:cursor-not-allowed" 
                        disabled={!item.available}>
                  <ShoppingBag className="h-4 w-4 inline mr-1" />
                  {item.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
