import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { isValidEmail } from '../utils/helpers';

interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'footer';
  title?: string;
  description?: string;
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  variant = 'inline',
  title = 'Subscribe to Our Newsletter',
  description = 'Get the latest tech updates, event notifications, and exclusive content delivered to your inbox.',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        setStatus('error');
        setMessage('This email is already subscribed!');
        setLoading(false);
        return;
      }

      // Insert new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString(),
            is_active: true,
            source: variant,
          },
        ]);

      if (error) throw error;

      setStatus('success');
      setMessage('Successfully subscribed! Check your inbox for confirmation.');
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    inline: 'bg-gradient-to-r from-brand-primary to-brand-light-blue text-white p-8 rounded-xl shadow-lg',
    modal: 'bg-white dark:bg-gray-800 p-6 rounded-lg',
    footer: 'bg-gray-800 text-white p-6 rounded-lg',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-gray-700/50 rounded-full mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className={`${variant === 'inline' ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
            {description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  variant === 'inline'
                    ? 'bg-white/20 text-white placeholder-white/70 border border-white/30'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600'
                }`}
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                variant === 'inline'
                  ? 'bg-white text-brand-primary hover:bg-gray-100'
                  : 'bg-brand-primary text-white hover:bg-opacity-90'
              } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {status !== 'idle' && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                status === 'success'
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}
        </form>

        {/* Privacy Note */}
        <p className={`text-xs mt-4 text-center ${variant === 'inline' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
          We respect your privacy. Unsubscribe at any time. No spam, guaranteed.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
