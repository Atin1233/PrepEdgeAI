'use client';

import { BookOpen, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export function PracticeHistory() {
  // Mock data - in real app, this would come from the database
  const practiceHistory = [
    {
      id: 1,
      type: 'Adaptive Practice',
      subject: 'Math',
      date: 'Today',
      time: '2:30 PM',
      duration: '25 min',
      questions: 20,
      score: 85,
      accuracy: 80,
      trend: 'up',
    },
    {
      id: 2,
      type: 'Subject Practice',
      subject: 'Reading',
      date: 'Yesterday',
      time: '4:15 PM',
      duration: '35 min',
      questions: 25,
      score: 92,
      accuracy: 88,
      trend: 'up',
    },
    {
      id: 3,
      type: 'Quick Practice',
      subject: 'Writing',
      date: '2 days ago',
      time: '1:45 PM',
      duration: '12 min',
      questions: 10,
      score: 78,
      accuracy: 70,
      trend: 'down',
    },
    {
      id: 4,
      type: 'Timed Practice',
      subject: 'Math',
      date: '3 days ago',
      time: '10:30 AM',
      duration: '65 min',
      questions: 38,
      score: 88,
      accuracy: 82,
      trend: 'up',
    },
    {
      id: 5,
      type: 'Full Practice Test',
      subject: 'All',
      date: '1 week ago',
      time: '9:00 AM',
      duration: '3h 15m',
      questions: 154,
      score: 1350,
      accuracy: 75,
      trend: 'up',
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-[#3AE374]" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#3AE374]';
    if (score >= 80) return 'text-[#3AC7F3]';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-[#0A2540] mb-4">Recent Practice Sessions</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Questions</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {practiceHistory.map((session) => (
              <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-[#3AC7F3]" />
                    <span className="text-sm font-medium text-[#0A2540]">{session.type}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{session.subject}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div className="text-gray-900">{session.date}</div>
                    <div className="text-gray-500">{session.time}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.duration}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{session.questions}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(session.trend)}
                    <span className={`text-sm font-medium ${getScoreColor(session.score)}`}>
                      {session.score}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{session.accuracy}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-sm text-[#3AC7F3] hover:text-[#2BB8E4] font-medium transition-colors duration-200">
          View all practice history
        </button>
      </div>
    </div>
  );
} 