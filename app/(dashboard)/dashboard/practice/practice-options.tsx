'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Brain, 
  Zap, 
  TrendingUp,
  Calculator,
  FileText,
  BookMarked
} from 'lucide-react';

export function PracticeOptions() {
  const practiceTypes = [
    {
      name: 'Adaptive Practice',
      description: 'AI-powered questions that adapt to your skill level',
      icon: Brain,
      color: 'bg-[#3AC7F3]',
      href: '/dashboard/practice/adaptive',
      features: ['Personalized difficulty', 'Real-time adaptation', 'Focus on weak areas'],
      estimatedTime: '15-30 min',
    },
    {
      name: 'Subject Practice',
      description: 'Practice specific subjects and topics',
      icon: BookOpen,
      color: 'bg-[#3AE374]',
      href: '/dashboard/practice/subject',
      features: ['Math, Reading, Writing', 'Topic-specific questions', 'Detailed explanations'],
      estimatedTime: '20-45 min',
    },
    {
      name: 'Timed Practice',
      description: 'Full-length timed sessions to build test stamina',
      icon: Clock,
      color: 'bg-[#0A2540]',
      href: '/dashboard/practice/timed',
      features: ['Realistic timing', 'Full sections', 'Performance tracking'],
      estimatedTime: '45-75 min',
    },
    {
      name: 'Quick Practice',
      description: 'Short, focused practice sessions',
      icon: Zap,
      color: 'bg-[#3AC7F3]',
      href: '/dashboard/practice/quick',
      features: ['5-10 questions', 'Quick feedback', 'Perfect for breaks'],
      estimatedTime: '5-15 min',
    },
    {
      name: 'Full Practice Test',
      description: 'Complete SAT practice test with all sections',
      icon: FileText,
      color: 'bg-[#3AE374]',
      href: '/dashboard/practice/full-test',
      features: ['Complete SAT format', 'Official timing', 'Full scoring'],
      estimatedTime: '3 hours',
    },
    {
      name: 'Weakness Focus',
      description: 'Target your weakest areas for maximum improvement',
      icon: TrendingUp,
      color: 'bg-[#0A2540]',
      href: '/dashboard/practice/weakness',
      features: ['AI-identified gaps', 'Focused practice', 'Progress tracking'],
      estimatedTime: '20-40 min',
    },
  ];

  const subjects = [
    {
      name: 'Math',
      icon: Calculator,
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Data Analysis'],
      color: 'bg-[#3AC7F3]',
    },
    {
      name: 'Reading',
      icon: BookMarked,
      topics: ['Literature', 'History', 'Science', 'Social Studies'],
      color: 'bg-[#3AE374]',
    },
    {
      name: 'Writing',
      icon: FileText,
      topics: ['Grammar', 'Usage', 'Rhetoric', 'Essay'],
      color: 'bg-[#0A2540]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Practice Types */}
      <div>
        <h2 className="text-xl font-semibold text-[#0A2540] mb-4">Choose Practice Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceTypes.map((type) => (
            <div key={type.name} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.color} text-white`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A2540]">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.estimatedTime}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{type.description}</p>
              
              <ul className="space-y-1 mb-4">
                {type.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-[#3AC7F3] rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href={type.href}
                className="prepedge-button-primary w-full text-center"
              >
                Start Practice
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Breakdown */}
      <div>
        <h2 className="text-xl font-semibold text-[#0A2540] mb-4">Practice by Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${subject.color} text-white`}>
                  <subject.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[#0A2540]">{subject.name}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                {subject.topics.map((topic) => (
                  <div key={topic} className="text-sm text-gray-600">
                    • {topic}
                  </div>
                ))}
              </div>
              
              <Link
                href={`/dashboard/practice/subject/${subject.name.toLowerCase()}`}
                className="prepedge-button-outline w-full text-center"
              >
                Practice {subject.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 