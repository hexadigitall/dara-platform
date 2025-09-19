'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Heart, 
  ShoppingCart, 
  Eye,
  Filter,
  Sliders,
  Camera,
  Mic,
  MicOff,
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react'
import Layout from '../components/Layout'
import Image from 'next/image'

interface StyleMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  outfits?: OutfitSuggestion[]
}

interface OutfitSuggestion {
  id: string
  items: OutfitItem[]
  totalPrice: number
  style: string
  occasion: string
  confidence: number
}

interface OutfitItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  retailer: string
  url: string
}

const StylePage: React.FC = () => {
  const [messages, setMessages] = useState<StyleMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI stylist. Describe what you're looking for and I'll help you find the perfect outfit. Try something like: 'I need a professional look for a client meeting' or 'Show me casual weekend outfits'.",
      timestamp: new Date(),
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    occasion: '',
    style: '',
    size: '',
    colors: []
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-focus input on page load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: StyleMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response with outfit suggestions
    setTimeout(() => {
      const aiResponse: StyleMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Great! Based on your request, I've found some perfect outfits for you. Here are my top recommendations:",
        timestamp: new Date(),
        outfits: generateMockOutfits()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const generateMockOutfits = (): OutfitSuggestion[] => {
    return [
      {
        id: '1',
        style: 'Professional Chic',
        occasion: 'Business Meeting',
        confidence: 95,
        totalPrice: 245,
        items: [
          {
            id: '1',
            name: 'Tailored Blazer',
            brand: 'Zara',
            price: 89,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
            category: 'Blazers',
            retailer: 'Zara',
            url: '#'
          },
          {
            id: '2',
            name: 'High-Waist Trousers',
            brand: 'H&M',
            price: 45,
            image: 'https://images.unsplash.com/photo-1506629905208-b50f3aa75b3e?w=300&h=400&fit=crop',
            category: 'Pants',
            retailer: 'H&M',
            url: '#'
          },
          {
            id: '3',
            name: 'Silk Blouse',
            brand: 'Mango',
            price: 65,
            image: 'https://images.unsplash.com/photo-1485462537861-f374c2ab7914?w=300&h=400&fit=crop',
            category: 'Tops',
            retailer: 'Mango',
            url: '#'
          },
          {
            id: '4',
            name: 'Oxford Shoes',
            brand: 'Massimo Dutti',
            price: 89,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
            category: 'Shoes',
            retailer: 'Massimo Dutti',
            url: '#'
          }
        ]
      },
      {
        id: '2',
        style: 'Modern Minimalist',
        occasion: 'Business Casual',
        confidence: 88,
        totalPrice: 189,
        items: [
          {
            id: '5',
            name: 'Knit Cardigan',
            brand: 'COS',
            price: 79,
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop',
            category: 'Cardigans',
            retailer: 'COS',
            url: '#'
          },
          {
            id: '6',
            name: 'Wide-leg Pants',
            brand: 'Everlane',
            price: 68,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
            category: 'Pants',
            retailer: 'Everlane',
            url: '#'
          },
          {
            id: '7',
            name: 'Leather Loafers',
            brand: 'Everlane',
            price: 168,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
            category: 'Shoes',
            retailer: 'Everlane',
            url: '#'
          }
        ]
      }
    ]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    if ('webkitSpeechRecognition' in window) {
      // Voice recognition implementation
    }
  }

  const OutfitCard: React.FC<{ outfit: OutfitSuggestion }> = ({ outfit }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden"
    >
      {/* Outfit Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-neutral-900 dark:text-white">{outfit.style}</h3>
          <div className="flex items-center space-x-1 text-sm text-accent-600">
            <Sparkles className="w-4 h-4" />
            <span>{outfit.confidence}% match</span>
          </div>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Perfect for: {outfit.occasion}
        </p>
        <p className="text-lg font-bold text-neutral-900 dark:text-white mt-2">
          Total: ${outfit.totalPrice}
        </p>
      </div>

      {/* Outfit Items Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {outfit.items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-neutral-50 dark:bg-neutral-700 rounded-lg overflow-hidden aspect-square"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium truncate">{item.name}</p>
                <p className="text-white/80 text-xs">${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-3 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 focus-ring text-sm font-medium">
            <Eye className="w-4 h-4 mr-2" />
            Virtual Try-On
          </button>
          <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus-ring text-sm font-medium">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          <button className="flex items-center px-3 py-2 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-500 focus-ring text-sm font-medium">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>
    </motion.div>
  )

  const suggestionPrompts = [
    "Professional outfit for job interview",
    "Casual weekend look",
    "Date night ensemble",
    "Summer vacation outfits",
    "Business casual attire",
    "Formal event styling"
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-accent-50/30 dark:from-neutral-900 dark:to-accent-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="inline-flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-full px-4 py-2 shadow-soft border border-neutral-200 dark:border-neutral-700">
                <Sparkles className="w-5 h-5 text-accent-600" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">AI Stylist</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2"
            >
              Tell me what you're looking for
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              Describe your style needs in natural language and I'll create the perfect outfit for you
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Chat Interface */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Suggestion Prompts */}
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Try these suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestionPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(prompt)}
                        className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-300 dark:hover:border-accent-700 focus-ring text-sm transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 min-h-[500px] flex flex-col">
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[600px]">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-accent-600 text-white'
                              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          
                          {/* Outfit Suggestions */}
                          {message.outfits && (
                            <div className="mt-4 space-y-4">
                              {message.outfits.map((outfit) => (
                                <OutfitCard key={outfit.id} outfit={outfit} />
                              ))}
                            </div>
                          )}
                          
        <p className="text-sm text-neutral-600 dark:text-neutral-400" suppressHydrationWarning>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-neutral-100 dark:bg-neutral-700 rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-accent-600" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Finding perfect outfits for you...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe what you're looking for..."
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                        disabled={isLoading}
                      />
                      
                      {/* Input Actions */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button
                          onClick={() => {}} // Image upload handler
                          className="p-2 text-neutral-400 hover:text-accent-600 focus-ring rounded-lg"
                          title="Upload image"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleVoiceInput}
                          className={`p-2 rounded-lg focus-ring ${
                            isListening 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-neutral-400 hover:text-accent-600'
                          }`}
                          title={isListening ? "Stop listening" : "Voice input"}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 focus-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">
                    Press Enter to send • Shift + Enter for new line
                  </p>
                </div>
              </div>
            </div>

            {/* Filters Sidebar */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sliders className="w-5 h-5 text-accent-600" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Preferences</h3>
                </div>
                
                {/* Price Range */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span>${filters.priceRange[0]}</span>
                      <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                        <div 
                          className="h-full bg-accent-600 rounded-full" 
                          style={{ width: '60%' }}
                        />
                      </div>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Quick Filters
                    </label>
                    <div className="space-y-2">
                      {['Budget-friendly', 'Mid-range', 'Premium', 'Luxury'].map((filter) => (
                        <label key={filter} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
                          />
                          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                            {filter}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Style History */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Recent Searches</h3>
                <div className="space-y-2">
                  {['Professional attire', 'Weekend casual', 'Date night outfit'].map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(search)}
                      className="block w-full text-left px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StylePage
