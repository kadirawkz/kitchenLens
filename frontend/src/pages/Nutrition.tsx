import React, { useState } from 'react';
import axios from 'axios';
import { Camera, ShieldCheck, Upload, Loader2, FileText } from 'lucide-react';

const Nutrition = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/v1/nutrition/upload-label', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data.summary);
    } catch (err) {
      console.error(err);
      setResult("Error analyzing label. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Nutrition Scanner</h1>
        <p className="text-slate-500">Scan food labels to understand what you eat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-slate-900 rounded-[2rem] relative overflow-hidden flex items-center justify-center border-8 border-slate-800 shadow-2xl">
            {scanning && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-full h-1 bg-emerald-400 absolute top-0 animate-scan shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
              </div>
            )}
            <div className="text-slate-500 text-center p-8">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="font-medium">Point your camera at a nutrition label</p>
            </div>
            
            <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
          </div>

          <label className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all cursor-pointer">
            {scanning ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
            {scanning ? 'Analyzing...' : 'Upload Label Image'}
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={scanning} />
          </label>
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6 min-h-[300px] flex flex-col justify-center relative bg-white">
            {!result && !scanning ? (
              <div className="text-center text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Scan a label to see the AI breakdown here</p>
              </div>
            ) : scanning ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-3 text-emerald-600">
                  <ShieldCheck className="w-8 h-8" />
                  <h3 className="text-xl font-bold">AI Analysis</h3>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 leading-relaxed">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
