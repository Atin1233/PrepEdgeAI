'use client';

import { BookOpen, Target, Trophy, Clock } from 'lucide-react';

export function RecentActivity() {
  // Mock data - in real app, this would come from the database
  const activities = [
    {
      id: 1,
      type: 'practice',
      title: 'Completed Math Practice',
      description: 'Algebra and Geometry - 20 questions',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'text-[#3AC7F3]',
      bgColor: 'bg-[#3AC7F3]/10',
      score: '85%',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Achievement Unlocked',
      description: 'Speed Demon - Completed 10 questions in under 5 minutes',
      time: '4 hours ago',
      icon: Trophy,
      color: 'text-[#3AE374]',
      bgColor: 'bg-[#3AE374]/10',
    },
    {
      id: 3,
      type: 'study_plan',
      title: 'Study Plan Updated',
      description: 'Your personalized plan has been adjusted based on recent performance',
      time: '1 day ago',
      icon: Target,
      color: 'text-[#0A2540]',
      bgColor: 'bg-[#0A2540]/10',
    },
    {
      id: 4,
      type: 'practice',
      title: 'Reading Comprehension',
      description: 'Passage Analysis - 15 questions',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-[#3AC7F3]',
      bgColor: 'bg-[#3AC7F3]/10',
      score: '92%',
    },
    {
      id: 5,
      type: 'milestone',
      title: 'Study Streak',
      description: 'You\'ve studied for 7 days in a row!',
      time: '2 days ago',
      icon: Clock,
      color: 'text-[#3AE374]',
      bgColor: 'bg-[#3AE374]/10',
    },
  ];

  const getActivityIcon = (activity: typeof activities[0]) => {
    return (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
        <activity.icon className={`h-4 w-4 ${activity.color}`} />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-[#0A2540] mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            {getActivityIcon(activity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#0A2540] truncate">
                  {activity.title}
                </h3>
                {activity.score && (
                  <span className="text-sm font-medium text-[#3AE374]">
                    {activity.score}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-sm text-[#3AC7F3] hover:text-[#2BB8E4] font-medium transition-colors duration-200">
          View all activity
        </button>
      </div>
    </div>
  );
} 