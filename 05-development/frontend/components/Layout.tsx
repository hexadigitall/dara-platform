'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X,
  Sun,
  Moon,
  Bell
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Discover', href: '/discover', current: router.pathname === '/discover' },
    { name: 'Style AI', href: '/style', current: router.pathname === '/style' },
    { name: 'Trends', href: '/trends', current: router.pathname === '/trends' },
    { name: 'Brands', href: '/brands', current: router.pathname === '/brands' },
  ]

  const userActions = [
    { 
      name: 'Search', 
      icon: Search, 
      href: '/search',
      shortcut: '⌘K',
      ariaLabel: 'Open search'
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      href: '/notifications',
      badge: 3,
      ariaLabel: 'View notifications'
    },
    { 
      name: 'Favorites', 
      icon: Heart, 
      href: '/favorites',
      ariaLabel: 'View favorites'
    },
    { 
      name: 'Cart', 
      icon: ShoppingBag, 
      href: '/cart',
      badge: 2,
      ariaLabel: 'View shopping cart'
    },
  ]

  // Skip to main content for accessibility
  const skipToMain = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const main = document.getElementById('main-content')
      main?.focus()
    }
  }

  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors ${className}`}>
      {/* Skip to main content link for accessibility */}
      <Link
        href="#main-content"
        className="skip-link"
        onKeyDown={skipToMain}
      >
        Skip to main content
      </Link>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-soft' 
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center space-x-2 focus-ring rounded-lg p-2 -ml-2"
                aria-label="DARA Home"
              >
                <div className="relative">
                  <img src="/logos/dara-mark-64.png" alt="DARA" className="h-8 w-8" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse" />
                </div>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  DARA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-ring ${
                      item.current
                        ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* Desktop User Actions */}
              <div className="hidden sm:flex items-center space-x-2">
                {userActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="relative p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring"
                      aria-label={action.ariaLabel}
                      title={action.shortcut ? `${action.name} ${action.shortcut}` : action.name}
                    >
                      <Icon className="h-5 w-5" />
                      {action.badge && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-600 text-xs text-white">
                          {action.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Profile */}
              <Link
                href="/profile"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring"
                aria-label="View profile"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-800 rounded-lg mt-2 shadow-medium">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus-ring ${
                        item.current
                          ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                  
                  {/* Mobile User Actions */}
                  <div className="space-y-1">
                    {userActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Link
                          key={action.name}
                          href={action.href}
                          className="flex items-center px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-ring"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {action.name}
                          {action.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-xs text-white">
                              {action.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main 
        id="main-content"
        className="pt-16"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>&copy; 2024 DARA. Made by <a href="https://hexadigitall.com" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 font-medium focus-ring rounded">Hexadigitall</a>.</p>
            <div className="mt-3 space-x-4">
              <Link href="/privacy" className="hover:text-accent-600 focus-ring rounded">Privacy</Link>
              <Link href="/terms" className="hover:text-accent-600 focus-ring rounded">Terms</Link>
              <Link href="/support" className="hover:text-accent-600 focus-ring rounded">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
