'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Heart, 
  ShoppingBag, 
  Star,
  Filter,
  Grid,
  List,
  Eye
} from 'lucide-react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: "Spring Minimalist",
    description: "Clean lines and neutral tones for the modern professional",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    items: 24,
    trending: true
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    description: "Eco-friendly pieces that don't compromise on style",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    items: 18,
    trending: true
  },
  {
    id: 3,
    title: "Street Style Essentials",
    description: "Urban-inspired looks for the city dweller",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    items: 32,
    trending: false
  }
]

const featuredOutfits = [
  {
    id: 1,
    title: "Business Casual Perfection",
    brand: "Everlane",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    tags: ["Professional", "Comfortable", "Versatile"]
  },
  {
    id: 2,
    title: "Weekend Comfort",
    brand: "COS",
    price: 95,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    tags: ["Casual", "Relaxed", "Modern"]
  },
  {
    id: 3,
    title: "Date Night Elegance",
    brand: "& Other Stories",
    price: 125,
    originalPrice: 165,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    tags: ["Elegant", "Romantic", "Special"]
  },
  {
    id: 4,
    title: "Athletic Chic",
    brand: "Girlfriend Collective",
    price: 78,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1506629905208-b50f3aa75b3e",
    tags: ["Athletic", "Comfortable", "Stylish"]
  }
]

export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Discover Your Style
          </motion.h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Explore curated collections, trending outfits, and personalized recommendations 
            tailored to your unique style preferences.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8 bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-neutral-500" />
            <div className="flex space-x-2">
              {['all', 'trending', 'new', 'sale'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    activeFilter === filter
                      ? 'bg-accent-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-accent-100 dark:hover:bg-accent-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent-100 text-accent-600' : 'text-neutral-500'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent-100 text-accent-600' : 'text-neutral-500'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Featured Collections */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Featured Collections
            </h2>
            <Link href="/collections" className="text-accent-600 hover:text-accent-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                    <span className="text-neutral-500 dark:text-neutral-400">Collection Image</span>
                  </div>
                  
                  {collection.trending && (
                    <div className="absolute top-4 left-4 bg-accent-600 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      Trending
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                    <h3 className="text-lg font-bold mb-1">{collection.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                    <span className="text-xs">{collection.items} items</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Outfits */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Featured Outfits
            </h2>
            <Link href="/outfits" className="text-accent-600 hover:text-accent-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {featuredOutfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                    <span className="text-neutral-500 dark:text-neutral-400">Outfit Image</span>
                  </div>
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md hover:bg-accent-50">
                      <Heart className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </button>
                  </div>
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                      {outfit.title}
                    </h3>
                    <Eye className="h-4 w-4 text-neutral-400" />
                  </div>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {outfit.brand}
                  </p>
                  
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                      {outfit.rating} ({outfit.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-neutral-900 dark:text-white">
                        ${outfit.price}
                      </span>
                      {outfit.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          ${outfit.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {outfit.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-accent-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-accent-700 transition-colors">
                      <ShoppingBag className="h-4 w-4 inline mr-1" />
                      Shop Look
                    </button>
                    <Link 
                      href="/style"
                      className="px-4 py-2 border border-accent-600 text-accent-600 rounded-md text-sm font-medium hover:bg-accent-50 dark:hover:bg-accent-900 transition-colors"
                    >
                      Try AI
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
