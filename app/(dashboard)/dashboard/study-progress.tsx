'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export function StudyProgress() {
  // Mock data - in real app, this would come from the database
  const subjects = [
    {
      name: 'Math',
      mastery: 85,
      trend: 'up',
      questions: 89,
      accuracy: 78,
    },
    {
      name: 'Reading',
      mastery: 72,
      trend: 'up',
      questions: 67,
      accuracy: 82,
    },
    {
      name: 'Writing',
      mastery: 68,
      trend: 'down',
      questions: 91,
      accuracy: 74,
    },
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-[#3AE374]';
    if (mastery >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getMasteryBgColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-[#3AE374]';
    if (mastery >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-[#0A2540] mb-4">Study Progress</h2>
      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-[#0A2540]">{subject.name}</h3>
              <div className="flex items-center space-x-2">
                {subject.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-[#3AE374]" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${getMasteryColor(subject.mastery)}`}>
                  {subject.mastery}% mastery
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{subject.mastery}%</span>
              </div>
              <div className="prepedge-progress">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getMasteryBgColor(subject.mastery)}`}
                  style={{ width: `${subject.mastery}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <span>{subject.questions} questions</span>
              <span>{subject.accuracy}% accuracy</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-lg font-semibold text-[#0A2540]">75%</span>
        </div>
        <div className="prepedge-progress mt-2">
          <div className="prepedge-progress-bar" style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
} 