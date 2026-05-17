import { 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  ChefHat,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function ZeroWaste() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-rose-100 dark:bg-rose-900/20 text-rose-600 rounded-2xl shadow-sm">
          <Trash2 size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Zero Waste Mode</h2>
          <p className="mt-1 text-slate-500">Prioritize ingredients that are expiring soon to minimize food waste.</p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-3xl flex items-start gap-4">
        <div className="p-2 bg-amber-100 dark:bg-amber-800/50 text-amber-600 rounded-xl">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 dark:text-amber-300">3 Items Expiring Today</h4>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400/80">
            Milk, Bread, and Eggs are reaching their expiry. Use them now to prevent waste.
          </p>
        </div>
      </div>

      {/* Recommended Recipe Card */}
      <div className="card-premium p-8 border-2 border-primary-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles size={14} />
            BEST MATCH
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-48 h-48 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <ChefHat size={64} />
          </div>
          
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold">Classic French Toast</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The perfect way to use up dry bread, milk, and eggs. This recipe uses 100% of your expiring items.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Uses Expiring</p>
                <div className="flex flex-wrap gap-2">
                  {['Milk', 'Bread', 'Eggs'].map(i => (
                    <span key={i} className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-lg border border-rose-100 dark:border-rose-800/30">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missing</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-lg">
                    Cinnamon
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2 active:scale-95">
                View Recipe
                <ArrowRight size={20} />
              </button>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle2 size={18} />
                Saves 450g waste
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Options */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold">Other Alternatives</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Bread Pudding', waste: '380g', items: 'Bread, Milk' },
            { name: 'Omelette', waste: '200g', items: 'Eggs' },
          ].map((recipe) => (
            <div key={recipe.name} className="card-premium p-6 flex items-center justify-between group cursor-pointer hover:border-primary-500/50">
              <div>
                <h5 className="font-bold">{recipe.name}</h5>
                <p className="text-sm text-slate-500 mt-1">Uses: {recipe.items}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-600">Saves {recipe.waste}</p>
                <div className="mt-2 text-primary-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
