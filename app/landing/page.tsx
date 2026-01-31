'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, X, BookOpen, Coins, Gift, Users, Smartphone, Trophy, BarChart3 } from 'lucide-react';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || isSubmitted) return;
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd82bea2a-c215-4abb-b5e4-53e759193b6b',
          email: email,
          subject: 'New ScreenTime Swap Waitlist Signup',
          from_name: 'ScreenTime Swap Waitlist',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setIsSubmitted(true);
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (isSubmitted && status === 'success') {
    return (
      <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{"You're on the list!"}</p>
            <p className="text-sm text-muted-foreground">{"We'll email you when we launch."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@email.com"
            required
            aria-required="true"
            aria-label="Email address"
            disabled={status === 'loading'}
            className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-3 text-destructive text-sm" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-3 text-center">
        For parents only. No spam, ever.
      </p>
    </form>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ScreenTime Swap" className="w-10 h-10" />
            <span className="font-semibold text-foreground text-lg">ScreenTime Swap</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition text-sm">
              How It Works
            </Link>
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition text-sm">
              Features
            </Link>
            <Link href="#waitlist" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm mb-8 border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground">Launching Spring 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance leading-tight">
              Turn screen time into family time
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Kids earn bonus screen time through real-world activities they choose. 
              Stop the battles, start the balance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#waitlist"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/kids"
                className="bg-card border border-border text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-muted transition"
              >
                Demo for Kids
              </Link>
              <Link 
                href="/parent-demo"
                className="bg-card border border-border text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-muted transition"
              >
                Demo for Parents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">The Problem</h2>
                <ul className="space-y-4">
                  {[
                    'Constant screen time battles',
                    'Kids feel controlled and restricted',
                    'No motivation for offline activities',
                    'Parental control apps feel punitive',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-primary text-primary-foreground rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">The Solution</h2>
                <ul className="space-y-4">
                  {[
                    'Kids earn tokens for activities they choose',
                    'Trade tokens for bonus screen time',
                    'Builds self-regulation and responsibility',
                    'Positive reinforcement, not punishment',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-primary-foreground/90">
                      <Check className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple steps to screen time harmony</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                step: '1',
                title: 'Do Activities',
                description: 'Kids choose from parent-approved activities: reading, outdoor play, chores, creative projects.',
              },
              {
                icon: Coins,
                step: '2',
                title: 'Earn Tokens',
                description: 'Log activities in the app and instantly earn tokens. Build responsibility through self-tracking.',
              },
              {
                icon: Gift,
                step: '3',
                title: 'Swap for Rewards',
                description: 'Trade tokens for bonus screen time, special privileges, or custom family rewards.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need for balanced screen time</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: 'Parent Control Dashboard',
                description: 'Set activities, assign token values, and monitor progress from one simple dashboard.',
              },
              {
                icon: Smartphone,
                title: 'Kid-Friendly Interface',
                description: 'Beautiful, easy-to-use design for kids ages 8-12. Track activities and redeem rewards instantly.',
              },
              {
                icon: Trophy,
                title: 'Custom Rewards',
                description: 'Beyond screen time—create rewards like staying up late or picking the family movie.',
              },
              {
                icon: BarChart3,
                title: 'Activity Insights',
                description: 'See what activities your kids love and watch them build healthy offline habits.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Join the Waitlist</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Be among the first families to try ScreenTime Swap. 
              Get exclusive early access and special launch pricing.
            </p>
            
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-3">
              Built by a Mom, for Moms
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-4">TheMomDegree</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Creating practical apps that solve real parenting challenges. 
              Because moms know what moms need.
            </p>
            <a 
              href="https://twitter.com/themomdegree" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground font-medium hover:underline underline-offset-4"
            >
              @themomdegree
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ScreenTime Swap" className="w-8 h-8" />
              <span className="text-muted-foreground text-sm">
                2026 ScreenTime Swap by TheMomDegree
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
