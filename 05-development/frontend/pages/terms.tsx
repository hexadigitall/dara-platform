'use client'

import Layout from '../components/Layout'

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">Last updated: September 2024</p>
          
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using DARA, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>Use License</h2>
          <p>Permission is granted to temporarily use DARA for personal, non-commercial transitory viewing only.</p>
          
          <h2>AI Styling Services</h2>
          <p>Our AI recommendations are provided for informational purposes. While we strive for accuracy, we cannot guarantee that our suggestions will meet your specific needs or preferences.</p>
          
          <h2>User Accounts</h2>
          <p>You are responsible for safeguarding your account and all activities under your account. You must immediately notify us of any unauthorized use.</p>
          
          <h2>Prohibited Uses</h2>
          <p>You may not use our service for any unlawful purpose or to violate any local, state, national, or international law.</p>
        </div>
      </div>
    </Layout>
  )
}
