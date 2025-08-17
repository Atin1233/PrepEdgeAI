import { DashboardNav } from './dashboard-nav';
import { UserNav } from './user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data for demo
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#0A2540]">
              PrepEdge<span className="text-[#3AC7F3]">AI</span>
            </h1>
          </div>
          <UserNav user={user} />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <DashboardNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}