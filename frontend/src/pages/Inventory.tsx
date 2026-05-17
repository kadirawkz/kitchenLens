import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Apple,
  Calendar,
  Layers
} from 'lucide-react';

const categories = ['All', 'Vegetables', 'Dairy', 'Meat', 'Pantry', 'Snacks'];

export default function Inventory() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Kitchen Inventory</h2>
          <p className="mt-1 text-slate-500">Manage and track your grocery items.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-primary-700 shadow-lg active:scale-95">
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search ingredients..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table/Grid */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Item</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Expiry</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {[
                { id: 1, name: 'Greek Yogurt', cat: 'Dairy', expiry: '2026-05-18', qty: '2 units', status: 'warning' },
                { id: 2, name: 'Carrots', cat: 'Vegetables', expiry: '2026-05-25', qty: '1 kg', status: 'fresh' },
                { id: 3, name: 'Bread', cat: 'Pantry', expiry: '2026-05-16', qty: '1 loaf', status: 'expired' },
                { id: 4, name: 'Chicken', cat: 'Meat', expiry: '2026-05-20', qty: '500g', status: 'fresh' },
              ].map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <Apple size={16} />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                      <Layers size={14} />
                      {item.cat}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {item.expiry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">{item.qty}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      item.status === 'warning' ? 'bg-amber-100 text-amber-700' : 
                      item.status === 'expired' ? 'bg-rose-100 text-rose-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
