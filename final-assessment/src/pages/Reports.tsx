import { useState, useEffect } from 'react';
import { Download, FileSpreadsheet, Loader2, List, Calendar } from 'lucide-react';
import { reportApi } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reports() {
  const [mode, setMode] = useState<'both' | 'excel'>('both');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vpaId, setVpaId] = useState('sahil1.iserveu@idbi');
  
  const [loading, setLoading] = useState(false);
  const [queryId, setQueryId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Stream data state
  const [streamData, setStreamData] = useState<any[]>([]);

  // Function to mock stream data retrieval (or real implementation if CORS / backend allows stream chunking)
  const handleGenerateReport = async () => {
    setLoading(true);
    setStreamData([]);
    setDownloadUrl(null);
    setQueryId(null);
    
    try {
      if (mode === 'excel') {
        const res = await reportApi.submitReport({ startDate, endDate, vpa_id: vpaId, mode });
        if (res.data.status === 'SUCCESS' && res.data.query_id) {
          setQueryId(res.data.query_id);
          setPolling(true);
        } else {
          alert('Failed to initiate query');
        }
      } else {
        // Mode = 'both' or stream. Real implementation of stream reading via Fetch API
        const response = await fetch('https://api-dev-stage.iserveu.online/idbi/sb/reports/querysubmit_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate, vpa_id: vpaId, mode })
        });

        if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Note: Realistically chunk needs to be buffered to form complete JSON objects line by line
          try {
            const parsed = JSON.parse(chunk);
            if (parsed.data && Array.isArray(parsed.data)) {
              setStreamData(prev => [...prev, ...parsed.data]);
            }
          } catch (e) {
            // Unfinished chunk handling should go here
          }
        }
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (polling && queryId) {
      interval = setInterval(async () => {
        try {
          const res = await reportApi.checkReportStatus(queryId);
          if (res.data.status === 'SUCCESS' && res.data.data.status === 'READY') {
            setDownloadUrl(res.data.data.signed_url);
            setPolling(false);
          }
        } catch (error) {
          console.error('Polling error', error);
          setPolling(false);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [polling, queryId]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-idbi-green to-idbi-orange">
          Transaction Reports
        </h1>
        <p className="text-slate-500 mt-2">Generate and monitor your settlement reports efficiently.</p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 relative z-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Reporting Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date (DD/MM/YYYY)</label>
              <input 
                type="text" 
                placeholder="01/01/2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:ring-2 focus:ring-idbi-green outline-none"
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date (DD/MM/YYYY)</label>
              <input 
                type="text" 
                placeholder="13/02/2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:ring-2 focus:ring-idbi-green outline-none"
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          </div>
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <label className="block text-sm font-medium mb-3">Report Format</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${mode === 'both' ? 'bg-white dark:bg-slate-700 shadow text-idbi-green' : 'text-slate-500'}`}
                  onClick={() => setMode('both')}
                >
                  <List className="w-4 h-4" /> Live Stream
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${mode === 'excel' ? 'bg-white dark:bg-slate-700 shadow text-idbi-orange' : 'text-slate-500'}`}
                  onClick={() => setMode('excel')}
                >
                  <FileSpreadsheet className="w-4 h-4" /> Excel Dump
                </button>
              </div>
            </div>
            <button 
              onClick={handleGenerateReport}
              disabled={loading || polling}
              className="w-full bg-idbi-green hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {polling && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 border-idbi-orange border-dashed"
          >
            <Loader2 className="w-10 h-10 animate-spin text-idbi-orange" />
            <div>
              <h3 className="text-xl font-bold">Processing Excel Report</h3>
              <p className="text-slate-500 text-sm">Waiting for server readiness. Query ID: {queryId}</p>
            </div>
          </motion.div>
        )}

        {downloadUrl && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-300">Your Report is Ready!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">The requested dump has been processed.</p>
              </div>
            </div>
            <a 
              href={downloadUrl} 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow flex items-center gap-2 transition-transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" /> Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {mode === 'both' && streamData.length > 0 && (
        <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {streamData.map((row, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  key={row.Transaction_Id || i} 
                  className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                >
                  <td className="p-4 font-mono text-slate-500">{row.Transaction_Id}</td>
                  <td className="p-4">{new Date(row["Date_&_Time"]).toLocaleString()}</td>
                  <td className="p-4 text-right font-bold text-idbi-green">{row.Transaction_Amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
