import { CreditCard, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { name: 'Total Volume', value: '₹24,562.00', change: '+4.75%', type: 'up', icon: Activity },
  { name: 'Total Transactions', value: '1,429', change: '+12.5%', type: 'up', icon: CreditCard },
  { name: 'Refunds', value: '₹142.00', change: '-1.2%', type: 'down', icon: ArrowDownRight },
  { name: 'Net Settlement', value: '₹24,420.00', change: '+5.1%', type: 'up', icon: ArrowUpRight },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-idbi-green to-idbi-orange">
            Welcome Back!
          </h1>
          <p className="text-slate-500 mt-1">Here's your live transaction overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${
              stat.type === 'up' ? 'bg-idbi-green' : 'bg-red-500'
            }`} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${
                stat.type === 'up' ? 'bg-idbi-green/10 text-idbi-green' : 'bg-red-500/10 text-red-500'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-bold flex items-center ${
                stat.type === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Chart mock area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-6 h-96 flex items-center justify-center border-dashed border-2 border-slate-300 dark:border-slate-700"
      >
        <div className="text-center text-slate-400">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium text-lg">Interactive Chart Area</p>
          <p className="text-sm">Revenue analytics will be plotted here</p>
        </div>
      </motion.div>
    </div>
  );
}
