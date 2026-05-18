import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ShoppingBasket, Plus, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

const ShoppingList = () => {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState('');

  const { data: items, isLoading } = useQuery({
    queryKey: ['shopping-list'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/v1/shopping-list/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (name: string) => {
      const token = localStorage.getItem('token');
      return axios.post('http://localhost:8000/api/v1/shopping-list/', 
        { item_name: name, quantity: '1', priority: 'Medium' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping-list'] });
      setNewItem('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('token');
      return axios.delete(`http://localhost:8000/api/v1/shopping-list/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping-list'] });
    }
  });

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shopping List</h1>
          <p className="text-slate-500">Plan your next grocery run</p>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <input 
          type="text" 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add something to your list..."
          className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-slate-800"
          onKeyPress={(e) => e.key === 'Enter' && addMutation.mutate(newItem)}
        />
        <button 
          onClick={() => addMutation.mutate(newItem)}
          disabled={!newItem || addMutation.isPending}
          className="bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
        >
          {addMutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid gap-4">
        {items?.map((item: any) => (
          <div key={item.id} className="card-premium p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <CheckCircle2 className={`w-6 h-6 ${item.is_completed ? 'text-emerald-500' : 'text-slate-200'}`} />
              <span className="font-bold text-slate-800">{item.item_name}</span>
            </div>
            <button 
              onClick={() => deleteMutation.mutate(item.id)}
              className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {items?.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
            <ShoppingBasket className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="text-slate-500">List is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
