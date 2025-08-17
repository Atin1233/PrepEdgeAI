import Link from 'next/link';
import { ArrowRight, CheckCircle, Brain, Target, Zap, Shield, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-[#0A2540]">
                  PrepEdge<span className="text-[#3AC7F3]">AI</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-700 hover:text-[#3AC7F3] px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-[#3AC7F3] px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-gray-700 hover:text-[#3AC7F3] px-3 py-2 text-sm font-medium transition-colors">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="text-gray-700 hover:text-[#3AC7F3] px-3 py-2 text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="prepedge-button-primary">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#1a365d]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Smarter prep.
              <br />
              <span className="text-[#3AC7F3]">Sharper scores.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered SAT prep that adapts to you. Get personalized study plans, adaptive practice, and expert explanations to boost your score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-up" className="prepedge-button-secondary text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#demo" className="prepedge-button-outline text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-[#0A2540]">
                Watch Demo
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-[#3AE374]" />
                <span>3-day free trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-[#3AE374]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-[#3AE374]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              Your edge for the SAT — powered by AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Half the cost of competitors, double the clarity and reliability. Get the personalized attention you need to excel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AC7F3]/10 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-[#3AC7F3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">AI-Personalized Learning</h3>
              <p className="text-gray-600">
                Start with a diagnostic test to get your personalized study plan. Our AI adapts to your strengths and weaknesses in real-time.
              </p>
            </div>

            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AE374]/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-[#3AE374]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Adaptive Analytics</h3>
              <p className="text-gray-600">
                Track your progress with detailed analytics. Get score trajectory predictions and topic mastery breakdowns with weekly Edge Reports.
              </p>
            </div>

            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AC7F3]/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-[#3AC7F3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Realistic Practice</h3>
              <p className="text-gray-600">
                Human-verified AI-generated questions in authentic SAT style. Unlimited adaptive practice sets and full-length timed exams.
              </p>
            </div>

            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AE374]/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-[#3AE374]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Smart Hints & Explanations</h3>
              <p className="text-gray-600">
                Get in-problem coaching with hints before submission. Step-by-step reasoning like having a personal tutor by your side.
              </p>
            </div>

            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AC7F3]/10 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-[#3AC7F3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Stable & Fast</h3>
              <p className="text-gray-600">
                Clean, academic interface without clutter or gamified bloat. Works seamlessly on desktop and mobile with sub-second load times.
              </p>
            </div>

            <div className="prepedge-card p-8">
              <div className="w-12 h-12 bg-[#3AE374]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-[#3AE374]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Score Guarantee</h3>
              <p className="text-gray-600">
                200+ point score increase guarantee. If you don't see improvement, we'll work with you until you do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Half the cost of competitors, with no hidden fees or surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="prepedge-card p-8 text-center">
              <h3 className="text-xl font-semibold text-[#0A2540] mb-2">Free Trial</h3>
              <div className="text-3xl font-bold text-[#3AC7F3] mb-4">$0</div>
              <p className="text-gray-600 mb-6">3 days all-access</p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>Full platform access</li>
                <li>Diagnostic test</li>
                <li>Basic analytics</li>
              </ul>
              <Link href="/sign-up" className="prepedge-button-outline w-full">
                Start Free Trial
              </Link>
            </div>

            <div className="prepedge-card p-8 text-center border-2 border-[#3AC7F3] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#3AC7F3] text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0A2540] mb-2">Monthly</h3>
              <div className="text-3xl font-bold text-[#3AC7F3] mb-4">$49</div>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>Everything in Free Trial</li>
                <li>Unlimited practice</li>
                <li>AI tutoring sessions</li>
                <li>Advanced analytics</li>
                <li>Study plans</li>
              </ul>
              <Link href="/sign-up" className="prepedge-button-primary w-full">
                Choose Monthly
              </Link>
            </div>

            <div className="prepedge-card p-8 text-center">
              <h3 className="text-xl font-semibold text-[#0A2540] mb-2">Quarterly</h3>
              <div className="text-3xl font-bold text-[#3AC7F3] mb-4">$129</div>
              <p className="text-gray-600 mb-6">$43/month</p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>Everything in Monthly</li>
                <li>Priority support</li>
                <li>Score predictions</li>
                <li>Progress tracking</li>
              </ul>
              <Link href="/sign-up" className="prepedge-button-outline w-full">
                Choose Quarterly
              </Link>
            </div>

            <div className="prepedge-card p-8 text-center">
              <h3 className="text-xl font-semibold text-[#0A2540] mb-2">Annual</h3>
              <div className="text-3xl font-bold text-[#3AC7F3] mb-4">$399</div>
              <p className="text-gray-600 mb-6">$33/month</p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li>Everything in Quarterly</li>
                <li>Score guarantee</li>
                <li>1-on-1 consultations</li>
                <li>Early access to new features</li>
              </ul>
              <Link href="/sign-up" className="prepedge-button-outline w-full">
                Choose Annual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0A2540] to-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to boost your SAT score?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who have improved their scores with PrepEdge AI.
          </p>
          <Link href="/sign-up" className="prepedge-button-secondary text-lg px-8 py-3">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                PrepEdge<span className="text-[#3AC7F3]">AI</span>
              </h3>
              <p className="text-gray-400">
                Smarter prep. Sharper scores.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guarantee</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PrepEdge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 