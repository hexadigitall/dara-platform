'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Sparkles, 
  MessageCircle, 
  Zap, 
  Users, 
  ArrowRight,
  Play,
  Star,
  ShoppingBag,
  Palette,
  Brain
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: MessageCircle,
      title: 'Conversational AI Styling',
      description: 'Simply describe what you want: "I need something chic for a client dinner" and get perfect recommendations.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Virtual Try-On',
      description: 'See how clothes look on you with our advanced AR technology before you buy.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: ShoppingBag,
      title: 'Cross-Brand Shopping',
      description: 'Shop from 50+ brands in one place with unified checkout and comparison.',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      icon: Brain,
      title: 'Personal Style Learning',
      description: 'Our AI learns your preferences and gets better at styling you over time.',
      gradient: 'from-green-500 to-teal-600'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      avatar: '/avatars/sarah.jpg',
      content: "StyleAI transformed how I shop. Instead of spending hours browsing, I just tell it what I need and get perfect suggestions instantly.",
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Software Engineer',
      content: "Finally, an AI that understands style! It helped me find my professional wardrobe without the guesswork.",
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Fashion Blogger',
      content: "The virtual try-on feature is incredible. I can see exactly how outfits will look before ordering. Game changer!",
      rating: 5
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Users' },
    { value: '1M+', label: 'Outfits Created' },
    { value: '500+', label: 'Partner Brands' },
    { value: '95%', label: 'Satisfaction Rate' }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  const staggerChildren = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-purple-900">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6">
              Your AI Fashion
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-purple-600">
                Companion
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Describe your style in natural language and discover perfect outfits from hundreds of brands. 
              <span className="font-semibold text-accent-600">AI-powered, personalized, effortless.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/style"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-accent-700 hover:to-purple-700 focus-ring transform hover:scale-105 transition-all duration-200 shadow-strong"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Styling Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-accent-300 dark:hover:border-accent-600 focus-ring transform hover:scale-105 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-400 to-purple-500 border-2 border-white dark:border-neutral-800 flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Trusted by 50,000+ fashion lovers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Fashion AI That Actually Understands You
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Experience the future of fashion discovery with our cutting-edge AI technology
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 border border-neutral-100 dark:border-neutral-700 hover:border-accent-200 dark:hover:border-accent-800"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Join thousands of fashion enthusiasts who love StyleAI
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-neutral-900 dark:text-white font-medium mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-accent-600 w-8' 
                      : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-accent-300 dark:hover:bg-accent-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion lovers who've discovered their perfect style with AI assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/style"
                className="inline-flex items-center px-8 py-4 bg-white text-accent-600 font-semibold rounded-2xl hover:bg-neutral-50 focus-ring transform hover:scale-105 transition-all duration-200 shadow-strong"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-accent-600 focus-ring transform hover:scale-105 transition-all duration-200"
              >
                <Users className="w-5 h-5 mr-2" />
                Book a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
