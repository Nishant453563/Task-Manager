import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 glass sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 w-96">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search tasks or projects..."
          className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full border-2 border-slate-950"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
