'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, Heart, ShoppingBag, Camera, Edit3 } from 'lucide-react'
import Layout from '../components/Layout'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm mb-8">
          <div className="relative h-32 bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800 rounded-t-lg">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-neutral-300 dark:bg-neutral-600 rounded-full border-4 border-white dark:border-neutral-800 flex items-center justify-center">
                  <User className="h-16 w-16 text-neutral-500" />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-accent-600 text-white rounded-full hover:bg-accent-700">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Sarah Johnson
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Fashion enthusiast • Sustainable living advocate
                </p>
                <div className="flex space-x-6 text-sm">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-white">47</span>
                    <span className="text-neutral-500 ml-1">Outfits</span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-white">23</span>
                    <span className="text-neutral-500 ml-1">Favorites</span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-white">12</span>
                    <span className="text-neutral-500 ml-1">Orders</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-700">
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Style Preferences</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Minimalist</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div className="bg-accent-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Professional</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div className="bg-accent-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Size Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Tops</span>
                <span>Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Bottoms</span>
                <span>Size 8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Shoes</span>
                <span>8.5</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Sustainability Score</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Great job choosing sustainable brands!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
