
import React from 'react';
import { Users, DollarSign, BarChart3, CheckCircle2 } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import SalesChart from '@/components/dashboard/SalesChart';
import TasksList from '@/components/dashboard/TasksList';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your sales today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Customers" 
          value="3,245" 
          icon={<Users size={16} />} 
          description="vs. last month"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Monthly Revenue" 
          value="$45,231" 
          icon={<DollarSign size={16} />} 
          description="vs. last month"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Active Deals" 
          value="82" 
          icon={<BarChart3 size={16} />} 
          description="vs. last month"
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard 
          title="Conversion Rate" 
          value="24%" 
          icon={<CheckCircle2 size={16} />} 
          description="vs. last month"
          trend={{ value: 7, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TasksList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
