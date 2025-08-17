'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Calendar,
  Trophy,
  Brain,
  Clock
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Practice', href: '/dashboard/practice', icon: BookOpen },
  { name: 'Study Plan', href: '/dashboard/study-plan', icon: Target },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'AI Tutor', href: '/dashboard/ai-tutor', icon: Brain },
  { name: 'Progress', href: '/dashboard/progress', icon: Trophy },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'History', href: '/dashboard/history', icon: Clock },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="p-4">
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 