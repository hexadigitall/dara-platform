'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar,
  Palette,
  Globe,
  BarChart3,
  Eye,
  Heart,
  Share2,
  ChevronRight
} from 'lucide-react'
import Layout from '../components/Layout'
import Link from 'next/link'

const trendingColors = [
  { name: 'Digital Lime', hex: '#D4FF00', trend: '+28%' },
  { name: 'Classic Blue', hex: '#0F4C75', trend: '+15%' },
  { name: 'Living Coral', hex: '#FF6B6B', trend: '+22%' },
  { name: 'Ultra Violet', hex: '#6B46C1', trend: '+18%' },
  { name: 'Sage Green', hex: '#87B69B', trend: '+31%' }
]

const seasonalTrends = [
  {
    id: 1,
    season: 'Spring 2024',
    title: 'Oversized Blazers',
    description: 'Power dressing meets comfort with structured shoulders and flowing silhouettes',
    popularity: 92,
    growth: '+45%',
    tags: ['Professional', 'Versatile', 'Statement'],
    image: 'blazer-trend'
  },
  {
    id: 2,
    season: 'Spring 2024',
    title: 'Cutout Details',
    description: 'Strategic cutouts add interest while maintaining sophistication',
    popularity: 87,
    growth: '+67%',
    tags: ['Evening', 'Modern', 'Edgy'],
    image: 'cutout-trend'
  },
  {
    id: 3,
    season: 'Summer 2024',
    title: 'Mesh & Sheer',
    description: 'Layered transparency creates depth and visual intrigue',
    popularity: 79,
    growth: '+52%',
    tags: ['Summer', 'Layering', 'Textural'],
    image: 'mesh-trend'
  },
  {
    id: 4,
    season: 'Summer 2024',
    title: 'Cargo Renaissance',
    description: 'Utility meets fashion with elevated cargo pants and skirts',
    popularity: 84,
    growth: '+38%',
    tags: ['Casual', 'Functional', 'Street'],
    image: 'cargo-trend'
  }
]

const globalInfluences = [
  {
    region: 'Seoul, Korea',
    trend: 'Y2K Revival',
    influence: 'K-pop and Korean dramas drive metallic fabrics and futuristic silhouettes',
    percentage: 76
  },
  {
    region: 'Lagos, Nigeria',
    trend: 'Afrofuturism',
    influence: 'Bold geometric prints and traditional techniques meet modern cuts',
    percentage: 68
  },
  {
    region: 'Copenhagen, Denmark',
    trend: 'Sustainable Luxury',
    influence: 'Scandinavian minimalism emphasizes quality over quantity',
    percentage: 82
  },
  {
    region: 'Mumbai, India',
    trend: 'Fusion Wear',
    influence: 'Traditional textiles reimagined for contemporary global fashion',
    percentage: 71
  }
]

const styleForecasts = [
  {
    timeframe: 'Next 3 Months',
    predictions: [
      'Cropped cardigans will see 40% increase',
      'Wide-leg trousers gaining momentum in professional wear',
      'Statement earrings replacing necklaces as primary accessory'
    ]
  },
  {
    timeframe: 'Fall 2024',
    predictions: [
      'Rich burgundy and deep forest greens dominating',
      'Textured fabrics: bouclé, mohair, and wool blends',
      'Midi lengths preferred over both mini and maxi'
    ]
  },
  {
    timeframe: 'Next Year',
    predictions: [
      'AI-assisted personal styling becomes mainstream',
      'Circular fashion models gain 200% adoption',
      'Gender-neutral designs cross 50% market share'
    ]
  }
]

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState('seasonal')

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
            Fashion Trends & Insights
          </motion.h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
            Stay ahead of the curve with AI-powered trend analysis, global fashion insights, 
            and data-driven style predictions from fashion capitals worldwide.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg w-fit">
          {[
            { id: 'seasonal', label: 'Seasonal Trends', icon: Calendar },
            { id: 'colors', label: 'Color Palette', icon: Palette },
            { id: 'global', label: 'Global Influences', icon: Globe },
            { id: 'forecast', label: 'AI Forecast', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-neutral-700 text-accent-600 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Seasonal Trends Tab */}
        {activeTab === 'seasonal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {seasonalTrends.map((trend, index) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-accent-600 font-medium">{trend.season}</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{trend.growth}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {trend.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {trend.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Popularity</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{trend.popularity}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div 
                        className="bg-accent-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${trend.popularity}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trend.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <button className="flex items-center space-x-1 hover:text-accent-600">
                        <Eye className="h-4 w-4" />
                        <span>2.1k</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                        <span>156</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-accent-600">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    <Link href="/style" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                      Try Style AI →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Color Palette Tab */}
        {activeTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Trending Colors This Season
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {trendingColors.map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center group cursor-pointer"
                  >
                    <div 
                      className="w-full h-32 rounded-lg mb-3 shadow-md group-hover:shadow-lg transition-shadow relative overflow-hidden"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                      <div className="absolute top-2 right-2 bg-white dark:bg-neutral-800 px-2 py-1 rounded text-xs font-medium">
                        {color.trend}
                      </div>
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
                      {color.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{color.hex}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Color Psychology in Fashion
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Confidence Boosters</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Bold colors like Digital Lime and Living Coral increase confidence levels by 23% 
                    and are perfect for presentations or important meetings.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Calming Influences</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sage Green and Classic Blue promote feelings of tranquility and trust, 
                    ideal for client meetings or networking events.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Influences Tab */}
        {activeTab === 'global' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {globalInfluences.map((influence, index) => (
              <motion.div
                key={influence.region}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {influence.trend}
                    </h3>
                    <p className="text-sm text-accent-600">{influence.region}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {influence.percentage}%
                    </div>
                    <div className="text-xs text-neutral-500">Global Impact</div>
                  </div>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {influence.influence}
                </p>
                
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-accent-600 to-accent-400 h-2 rounded-full"
                    style={{ width: `${influence.percentage}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* AI Forecast Tab */}
        {activeTab === 'forecast' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {styleForecasts.map((forecast, index) => (
              <motion.div
                key={forecast.timeframe}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-5 w-5 text-accent-600 mr-2" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {forecast.timeframe}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {forecast.predictions.map((prediction, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-accent-600 mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-600 dark:text-neutral-400">{prediction}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Get Personalized Trend Insights</h3>
              <p className="mb-4 opacity-90">
                Our AI analyzes your style preferences to predict trends you'll love before they go mainstream.
              </p>
              <Link 
                href="/style"
                className="inline-flex items-center bg-white text-accent-600 px-4 py-2 rounded-md font-medium hover:bg-neutral-100 transition-colors"
              >
                Try Personal AI Stylist
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
