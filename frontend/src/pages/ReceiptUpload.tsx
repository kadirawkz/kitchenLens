import { useState } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Camera
} from 'lucide-react';

export default function ReceiptUpload() {
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = () => {
    setStatus('uploading');
    // Mock upload flow
    setTimeout(() => {
      setStatus('processing');
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Upload Receipt</h2>
        <p className="mt-1 text-slate-500">Scan your grocery receipts to automatically update your inventory.</p>
      </div>

      <div className="card-premium p-8">
        {!preview ? (
          <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <p className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">PNG, JPG, or PDF (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border dark:border-slate-800 h-96">
              <img src={preview} alt="Receipt Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => { setFile(null); setPreview(null); setStatus('idle'); }}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {status === 'idle' && (
              <button 
                onClick={handleUpload}
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Process Receipt
                <ArrowRight size={20} />
              </button>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border dark:border-slate-800 flex items-center gap-4">
                <Loader2 size={24} className="text-primary-600 animate-spin" />
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {status === 'uploading' ? 'Uploading Receipt...' : 'AI is reading items...'}
                  </p>
                  <div className="mt-2 w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-600 h-full animate-progress-indeterminate"></div>
                  </div>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6">
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl flex items-center gap-4 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 size={24} />
                  <p className="font-bold">12 items extracted successfully!</p>
                </div>
                
                {/* Mock Extracted Items */}
                <div className="divide-y dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 overflow-hidden shadow-sm">
                  {[
                    { name: 'Organic Milk', price: 'LKR 450.00', qty: 1 },
                    { name: 'Eggs (12pk)', price: 'LKR 820.00', qty: 1 },
                    { name: 'Spinach', price: 'LKR 180.00', qty: 2 },
                  ].map((item) => (
                    <div key={item.name} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" />
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary-600">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-white dark:bg-slate-900 border dark:border-slate-800 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Edit Items
                  </button>
                  <button className="flex-1 bg-primary-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-primary-700 transition-all">
                    Add to Inventory
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Tips Section */}
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-3xl flex items-start gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-800/50 text-blue-600 rounded-xl">
          <Camera size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-300">Photo Tips</h4>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-400/80">
            Ensure the receipt is flat and well-lit. AI works best when the text is clear and the edges are visible.
          </p>
        </div>
      </div>
    </div>
  );
}
