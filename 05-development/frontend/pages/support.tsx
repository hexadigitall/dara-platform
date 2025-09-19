'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Mail, Phone, HelpCircle, Search } from 'lucide-react'
import Layout from '../components/Layout'

const faqs = [
  {
    q: "How does the AI styling work?",
    a: "Our AI analyzes your style preferences, body type, and occasion to provide personalized recommendations from our partner brands."
  },
  {
    q: "Are the recommendations really personalized?",
    a: "Yes! The more you use DARA, the better it learns your preferences and provides increasingly accurate suggestions."
  },
  {
    q: "How do I return items?",
    a: "You can return items within 30 days of purchase. Simply contact our support team and we'll guide you through the process."
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Chat with our support team in real-time
            </p>
            <button className="bg-accent-600 text-white px-6 py-2 rounded-md hover:bg-accent-700">
              Start Chat
            </button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Get help via email within 24 hours
            </p>
            <button className="border border-accent-600 text-accent-600 px-6 py-2 rounded-md hover:bg-accent-50 dark:hover:bg-accent-900">
              Send Email
            </button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Call us Mon-Fri, 9am-6pm EST
            </p>
            <p className="font-semibold text-accent-600">(555) 123-4567</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-accent-600" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
