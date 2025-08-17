import { DashboardOverview } from './dashboard-overview';
import { QuickActions } from './quick-actions';
import { RecentActivity } from './recent-activity';
import { StudyProgress } from './study-progress';

export default function DashboardPage() {
  // Mock user data for demo
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-[#0A2540] mb-2">
          Welcome back, {user.name || 'Student'}!
        </h1>
        <p className="text-gray-600">
          Ready to continue your SAT prep journey? Here's your progress and what's next.
        </p>
      </div>

      {/* Dashboard Overview */}
      <DashboardOverview user={user} />

      {/* Quick Actions */}
      <QuickActions />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Study Progress */}
        <StudyProgress />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
}