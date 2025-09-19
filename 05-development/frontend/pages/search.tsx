'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search as SearchIcon, 
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  ShoppingBag,
  Star,
  TrendingUp,
  X
} from 'lucide-react'
import Layout from '../components/Layout'
import Link from 'next/link'

const searchSuggestions = [
  'Black blazer professional',
  'Summer casual dresses',
  'Sustainable activewear',
  'Minimalist jewelry',
  'Winter coats warm'
]

const searchResults = [
  {
    id: 1,
    type: 'outfit',
    title: 'Professional Black Blazer Look',
    brand: 'Everlane',
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 156,
    image: 'blazer-outfit',
    tags: ['Professional', 'Versatile', 'Classic'],
    description: 'Timeless black blazer styled for modern professionals'
  },
  {
    id: 2,
    type: 'item',
    title: 'Organic Cotton Midi Dress',
    brand: '& Other Stories',
    price: 89,
    originalPrice: null,
    rating: 4.6,
    reviews: 203,
    image: 'midi-dress',
    tags: ['Casual', 'Sustainable', 'Comfortable'],
    description: 'Perfect for weekend brunches and casual dates'
  },
  {
    id: 3,
    type: 'collection',
    title: 'Minimalist Wardrobe Essentials',
    brand: 'COS',
    price: 245,
    originalPrice: 320,
    rating: 4.7,
    reviews: 89,
    image: 'minimalist-collection',
    tags: ['Minimalist', 'Curated', 'Timeless'],
    description: '7-piece capsule wardrobe for effortless style'
  }
]

const trendingSearches = [
  'Y2K fashion',
  'Sustainable brands',
  'Office wear',
  'Date night outfits',
  'Athleisure',
  'Vintage inspired',
  'Color blocking',
  'Wide leg pants'
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('relevance')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Here you would typically make an API call to search
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-2xl mx-auto"
          >
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search for styles, brands, or occasions..."
              className="w-full pl-12 pr-16 py-4 text-lg border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent shadow-sm"
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 transition-colors"
            >
              Search
            </button>
          </motion.div>

          {/* Search Suggestions */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mt-4"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm hover:bg-accent-100 dark:hover:bg-accent-900 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Filters and Controls */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {searchResults.length} results for "{searchQuery}"
                </span>
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

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900"
                    >
                      <option value="all">All Categories</option>
                      <option value="outfits">Complete Outfits</option>
                      <option value="tops">Tops & Blouses</option>
                      <option value="bottoms">Pants & Skirts</option>
                      <option value="dresses">Dresses</option>
                      <option value="outerwear">Jackets & Coats</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Brand
                    </label>
                    <select className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900">
                      <option value="">All Brands</option>
                      <option value="everlane">Everlane</option>
                      <option value="cos">COS</option>
                      <option value="other-stories">& Other Stories</option>
                      <option value="girlfriend">Girlfriend Collective</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          className="px-3 py-1 border border-neutral-200 dark:border-neutral-600 rounded text-sm hover:bg-accent-50 dark:hover:bg-accent-900"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Search Results */}
        {searchQuery ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-t-lg flex items-center justify-center">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {result.type === 'outfit' ? 'Outfit' : result.type === 'collection' ? 'Collection' : 'Item'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md">
                      <Heart className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </button>
                  </div>

                  {result.type === 'collection' && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Collection
                      </span>
                    </div>
                  )}
                </div>

                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-sm line-clamp-2">
                      {result.title}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {result.brand}
                  </p>

                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">
                      {result.rating} ({result.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      ${result.price}
                    </span>
                    {result.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        ${result.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {result.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                    {result.description}
                  </p>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-accent-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-accent-700 transition-colors">
                      <ShoppingBag className="h-4 w-4 inline mr-1" />
                      {result.type === 'collection' ? 'Shop All' : 'Shop Now'}
                    </button>
                    <Link 
                      href="/style"
                      className="px-3 py-2 border border-accent-600 text-accent-600 rounded-md text-sm hover:bg-accent-50 dark:hover:bg-accent-900 transition-colors"
                    >
                      Style
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Trending Searches */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Trending Searches
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {trendingSearches.map((search, index) => (
                <motion.button
                  key={search}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSearch(search)}
                  className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all group"
                >
                  <TrendingUp className="h-6 w-6 text-accent-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {search}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Style Assistant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-accent-600 to-accent-700 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
          <p className="mb-6 opacity-90">
            Let our AI stylist help you discover the perfect pieces based on your style preferences and needs.
          </p>
          <Link
            href="/style"
            className="inline-flex items-center bg-white text-accent-600 px-6 py-3 rounded-md font-medium hover:bg-neutral-100 transition-colors"
          >
            Try AI Stylist
            <SearchIcon className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  )
}
