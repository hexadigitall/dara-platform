'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Heart, ShoppingBag, TrendingUp, Settings, Check } from 'lucide-react'
import Layout from '../components/Layout'

const notifications = [
  {
    id: 1,
    type: 'trend',
    title: 'New Trend Alert: Oversized Blazers',
    message: 'Based on your style preferences, you might love this trending style',
    time: '2 hours ago',
    read: false,
    icon: TrendingUp,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'favorite',
    title: 'Item Back in Stock',
    message: 'The Everlane blazer you favorited is now available in your size',
    time: '1 day ago',
    read: false,
    icon: Heart,
    color: 'text-red-500'
  },
  {
    id: 3,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your recent order #12345 has been shipped and is on its way',
    time: '2 days ago',
    read: true,
    icon: ShoppingBag,
    color: 'text-green-500'
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Notifications
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {unreadCount} unread notifications
            </p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900 rounded-md transition-colors"
            >
              Mark all as read
            </button>
            <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {notificationList.map((notification, index) => {
            const Icon = notification.icon
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.read ? 'border-l-4 border-accent-500' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 ${notification.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-neutral-900 dark:text-white mb-1 ${
                      !notification.read ? 'font-bold' : ''
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {notification.read && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {!notification.read && (
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {notificationList.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
              No notifications yet
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              We'll notify you when there are updates about your style preferences and orders.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}
