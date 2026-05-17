import { 
  Apple, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Fresh Items', value: '24', icon: CheckCircle2, color: 'text-success', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { name: 'Expiring Soon', value: '5', icon: AlertCircle, color: 'text-warning', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { name: 'Expired', value: '2', icon: Trash2, color: 'text-danger', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  { name: 'Monthly Spend', value: 'LKR 32.5k', icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Household Overview</h2>
        <p className="mt-1 text-slate-500">Here's what's happening with your groceries today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card-premium p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Zero Waste Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-2xl font-bold">Zero Waste Mode</h3>
            <p className="mt-2 text-primary-100 max-w-sm">
              You have 3 items expiring today. Cook French Toast to save 250g of food waste.
            </p>
            <div className="mt-auto pt-8">
              <Link 
                to="/zero-waste" 
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Let's Cook
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          <Trash2 size={120} className="absolute -bottom-4 -right-4 text-white/10 rotate-12" />
        </div>

        {/* AI Assistant Quick Start */}
        <div className="card-premium p-8 bg-white dark:bg-slate-900 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl">
              <ChefHat size={24} />
            </div>
            <h3 className="text-xl font-bold">Recipe Assistant</h3>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Ask me anything about your kitchen. "What can I make with eggs and spinach?"
          </p>
          <div className="mt-auto pt-8">
            <Link to="/assistant" className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Go to Assistant
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity / Expiring Soon List */}
      <div className="card-premium overflow-hidden">
        <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg">Expiring Soon</h3>
          <Link to="/inventory" className="text-sm text-primary-600 font-medium">View All</Link>
        </div>
        <div className="divide-y dark:divide-slate-800">
          {[
            { name: 'Milk', expiry: 'Tomorrow', status: 'warning' },
            { name: 'Spinach', expiry: 'In 2 days', status: 'warning' },
            { name: 'Chicken Breast', expiry: 'In 3 days', status: 'fresh' },
          ].map((item) => (
            <div key={item.name} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <Apple size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-slate-500">Expires: {item.expiry}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                item.status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ChefHat } from 'lucide-react';
