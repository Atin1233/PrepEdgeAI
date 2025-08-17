'use client';

import Link from 'next/link';
import { Play, Target, MessageSquare, BookOpen } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      name: 'Start Practice',
      description: 'Begin a new practice session',
      href: '/dashboard/practice',
      icon: Play,
      color: 'bg-[#3AC7F3] hover:bg-[#2BB8E4]',
    },
    {
      name: 'View Study Plan',
      description: 'Check your personalized study plan',
      href: '/dashboard/study-plan',
      icon: Target,
      color: 'bg-[#3AE374] hover:bg-[#2DD165]',
    },
    {
      name: 'Ask AI Tutor',
      description: 'Get help with a specific question',
      href: '/dashboard/ai-tutor',
      icon: MessageSquare,
      color: 'bg-[#0A2540] hover:bg-[#081a2e]',
    },
    {
      name: 'Take Diagnostic',
      description: 'Assess your current level',
      href: '/dashboard/diagnostic',
      icon: BookOpen,
      color: 'bg-[#3AC7F3] hover:bg-[#2BB8E4]',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-[#0A2540] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="group block p-4 border border-gray-200 rounded-lg hover:border-[#3AC7F3] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} text-white transition-colors duration-200`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-[#0A2540] group-hover:text-[#3AC7F3] transition-colors duration-200">
                  {action.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 