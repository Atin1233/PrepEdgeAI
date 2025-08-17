'use client';

import { useState } from 'react';

export default function GeneralPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Account updated successfully');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#0A2540]">Account Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue="John Doe"
                className="prepedge-input mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue="john@example.com"
                className="prepedge-input mt-1"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="target-score" className="block text-sm font-medium text-gray-700">
                Target SAT Score
              </label>
              <input
                type="number"
                id="target-score"
                name="target-score"
                defaultValue="1500"
                min="400"
                max="1600"
                className="prepedge-input mt-1"
                placeholder="Enter your target score"
              />
            </div>

            <div>
              <label htmlFor="current-score" className="block text-sm font-medium text-gray-700">
                Current SAT Score (if known)
              </label>
              <input
                type="number"
                id="current-score"
                name="current-score"
                defaultValue="1200"
                min="400"
                max="1600"
                className="prepedge-input mt-1"
                placeholder="Enter your current score"
              />
            </div>
          </div>

          <div>
            <label htmlFor="test-date" className="block text-sm font-medium text-gray-700">
              SAT Test Date
            </label>
            <input
              type="date"
              id="test-date"
              name="test-date"
              className="prepedge-input mt-1"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="prepedge-button-primary"
            >
              {isLoading ? 'Updating...' : 'Update Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}