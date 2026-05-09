import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { CheckCircle2, Clock, ListTodo, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/tasks/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: ListTodo, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  ];

  if (loading) return <div className="text-white">Loading stats...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">Welcome back! Here's what's happening with your projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
             {/* Placeholder for activity */}
             {[1,2,3].map(i => (
               <div key={i} className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                   <Clock size={18} />
                 </div>
                 <div>
                   <p className="text-slate-200 text-sm"><span className="font-bold">You</span> updated the status of <span className="text-primary-400 font-medium">Design System</span> to Completed</p>
                   <p className="text-slate-500 text-xs mt-1">{i * 2} hours ago</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-6">
              <TrendingUp size={40} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Team Productivity</h3>
            <p className="text-slate-400 max-w-xs">Your team has completed 12% more tasks this week compared to last week. Keep it up!</p>
            <button className="mt-8 px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all">
              View Detailed Report
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
