'use client';

import { Target, Clock, TrendingUp, BookOpen } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  currentScore?: number;
  targetScore?: number;
}

interface DashboardOverviewProps {
  user: User;
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  // Mock data - in real app, this would come from the database
  const stats = [
    {
      name: 'Current Score',
      value: user.currentScore || 1200,
      target: user.targetScore || 1400,
      icon: Target,
      color: 'text-[#3AC7F3]',
      bgColor: 'bg-[#3AC7F3]/10',
    },
    {
      name: 'Study Time',
      value: '12.5',
      unit: 'hours',
      icon: Clock,
      color: 'text-[#3AE374]',
      bgColor: 'bg-[#3AE374]/10',
    },
    {
      name: 'Questions Answered',
      value: '247',
      icon: BookOpen,
      color: 'text-[#0A2540]',
      bgColor: 'bg-[#0A2540]/10',
    },
    {
      name: 'Accuracy',
      value: '78',
      unit: '%',
      icon: TrendingUp,
      color: 'text-[#3AE374]',
      bgColor: 'bg-[#3AE374]/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="dashboard-label">{stat.name}</p>
              <div className="flex items-baseline space-x-2">
                <p className="dashboard-stat">{stat.value}</p>
                {stat.unit && (
                  <span className="text-sm text-gray-500">{stat.unit}</span>
                )}
              </div>
              {stat.name === 'Current Score' && stat.target && (
                <p className="text-sm text-gray-500 mt-1">
                  Target: {stat.target}
                </p>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          
          {stat.name === 'Current Score' && stat.target && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress to target</span>
                <span>{Math.round(((stat.value as number) / stat.target) * 100)}%</span>
              </div>
              <div className="prepedge-progress">
                <div 
                  className="prepedge-progress-bar" 
                  style={{ 
                    width: `${Math.min(((stat.value as number) / stat.target) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 