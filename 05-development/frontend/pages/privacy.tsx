'use client'

import Layout from '../components/Layout'

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">Last updated: September 2024</p>
          
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, use our AI styling services, or contact us for support.</p>
          
          <h2>How We Use Your Information</h2>
          <ul>
            <li>Provide personalized styling recommendations</li>
            <li>Process your orders and payments</li>
            <li>Send you updates about new features and trends</li>
            <li>Improve our AI algorithms and services</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information only in limited circumstances, such as with your consent or to comply with legal obligations.</p>
          
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </div>
      </div>
    </Layout>
  )
}
