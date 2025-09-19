'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  MapPin,
  Leaf,
  Award,
  Heart,
  ExternalLink,
  Filter,
  Search,
  ShoppingBag,
  TrendingUp,
  Users
} from 'lucide-react'
import Layout from '../components/Layout'
import Link from 'next/link'

const brands = [
  {
    id: 1,
    name: 'Everlane',
    category: 'Sustainable Essentials',
    description: 'Ethically made basics with transparent pricing and sustainable practices.',
    rating: 4.8,
    reviews: 12543,
    priceRange: '$$',
    sustainability: 95,
    location: 'San Francisco, CA',
    specialties: ['Basics', 'Workwear', 'Sustainable'],
    featured: true,
    trending: true,
    logo: 'everlane-logo',
    banner: 'everlane-banner'
  },
  {
    id: 2,
    name: '& Other Stories',
    category: 'Contemporary Fashion',
    description: 'Fashion-forward pieces with a focus on individual expression and creativity.',
    rating: 4.6,
    reviews: 8921,
    priceRange: '$$',
    sustainability: 72,
    location: 'Stockholm, Sweden',
    specialties: ['Trendy', 'Feminine', 'Unique'],
    featured: true,
    trending: false,
    logo: 'other-stories-logo',
    banner: 'other-stories-banner'
  },
  {
    id: 3,
    name: 'COS',
    category: 'Minimalist Design',
    description: 'Clean, architectural designs with a focus on quality and timeless appeal.',
    rating: 4.7,
    reviews: 6754,
    priceRange: '$$$',
    sustainability: 88,
    location: 'London, UK',
    specialties: ['Minimalist', 'Quality', 'Timeless'],
    featured: false,
    trending: true,
    logo: 'cos-logo',
    banner: 'cos-banner'
  },
  {
    id: 4,
    name: 'Girlfriend Collective',
    category: 'Sustainable Activewear',
    description: 'Inclusive activewear made from recycled materials with body-positive messaging.',
    rating: 4.9,
    reviews: 15632,
    priceRange: '$$',
    sustainability: 98,
    location: 'Seattle, WA',
    specialties: ['Activewear', 'Inclusive', 'Recycled'],
    featured: true,
    trending: true,
    logo: 'girlfriend-logo',
    banner: 'girlfriend-banner'
  },
  {
    id: 5,
    name: 'Ganni',
    category: 'Scandinavian Cool',
    description: 'Playful, colorful designs with a Scandinavian twist and sustainable mindset.',
    rating: 4.5,
    reviews: 4387,
    priceRange: '$$$',
    sustainability: 81,
    location: 'Copenhagen, Denmark',
    specialties: ['Playful', 'Colorful', 'Scandinavian'],
    featured: false,
    trending: true,
    logo: 'ganni-logo',
    banner: 'ganni-banner'
  },
  {
    id: 6,
    name: 'Reformation',
    category: 'Sustainable Fashion',
    description: 'Vintage-inspired clothing made sustainably with a focus on reducing environmental impact.',
    rating: 4.4,
    reviews: 9876,
    priceRange: '$$$',
    sustainability: 94,
    location: 'Los Angeles, CA',
    specialties: ['Vintage-inspired', 'Sustainable', 'Feminine'],
    featured: false,
    trending: false,
    logo: 'reformation-logo',
    banner: 'reformation-banner'
  }
]

const categories = [
  'All Brands',
  'Sustainable Fashion',
  'Contemporary Fashion',
  'Minimalist Design',
  'Sustainable Activewear',
  'Scandinavian Cool'
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '$', label: 'Under $50' },
  { value: '$$', label: '$50-150' },
  { value: '$$$', label: '$150+' }
]

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Brands')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = selectedCategory === 'All Brands' || brand.category === selectedCategory
    const matchesPrice = selectedPriceRange === 'all' || brand.priceRange === selectedPriceRange
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFeatured = !showFeaturedOnly || brand.featured
    
    return matchesCategory && matchesPrice && matchesSearch && matchesFeatured
  })

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
            Brand Partners
          </motion.h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
            Discover our curated selection of ethical, sustainable, and innovative fashion brands. 
            Each partner is carefully selected for their commitment to quality, sustainability, and style.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>

            {/* Featured Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Featured only</span>
            </label>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* Brand Header */}
              <div className="relative h-32 bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800">
                <div className="absolute top-4 right-4 flex space-x-2">
                  {brand.featured && (
                    <span className="bg-accent-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Award className="h-3 w-3 inline mr-1" />
                      Featured
                    </span>
                  )}
                  {brand.trending && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      Trending
                    </span>
                  )}
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-2xl font-bold text-accent-600">{brand.name.charAt(0)}</span>
                  </div>
                </div>
              </div>

              {/* Brand Content */}
              <div className="p-6 pt-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {brand.name}
                  </h3>
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <Heart className="h-5 w-5 text-neutral-400" />
                  </button>
                </div>

                <p className="text-sm text-accent-600 mb-3">{brand.category}</p>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                  {brand.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-neutral-900 dark:text-white">
                        {brand.rating}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">{brand.reviews.toLocaleString()} reviews</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span className="ml-1 text-sm font-medium text-neutral-900 dark:text-white">
                        {brand.sustainability}%
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">Sustainable</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">
                        {brand.priceRange}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">Price Range</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {brand.location}
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {brand.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-accent-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-accent-700 transition-colors flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shop Brand
                  </button>
                  <button className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-accent-600 to-accent-700 rounded-lg p-8 text-center text-white"
        >
          <Users className="h-8 w-8 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Partner with DARA</h3>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Are you a sustainable fashion brand looking to reach conscious consumers? 
            Join our curated marketplace and connect with customers who value quality and ethics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-accent-600 px-6 py-3 rounded-md font-medium hover:bg-neutral-100 transition-colors">
              Apply for Partnership
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Featured Brands Section */}
        {selectedCategory === 'All Brands' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Why These Brands?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Sustainability First</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  All partners meet our strict environmental and ethical standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Quality Assured</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Curated selection based on customer reviews and expert analysis
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Style Forward</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Trending designs that align with current and future fashion movements
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
