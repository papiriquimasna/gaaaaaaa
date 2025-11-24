import { useEffect, useState } from 'react';
import { Certificate } from '@phosphor-icons/react';
import { TrendingUp } from 'lucide-react';
import { dataService } from '../../../../services/dataService';

export default function PartidosCard() {
  const [totalPartidos, setTotalPartidos] = useState(0);

  useEffect(() => {
    const partidos = dataService.getPartidos();
    setTotalPartidos(partidos.length);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-gray-700 p-4 md:p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-gray-300">Partidos Políticos</p>
        <Certificate className="w-5 h-5 md:w-6 md:h-6 text-slate-900 dark:text-white" />
      </div>
      
      <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">{totalPartidos}</p>
      
      <div className="flex items-center gap-1">
        <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 dark:text-green-400" />
        <span className="text-[10px] md:text-xs font-semibold text-green-600 dark:text-green-400">+0%</span>
        <span className="text-[10px] md:text-xs text-slate-400 dark:text-gray-500">since last month</span>
      </div>
    </div>
  );
}
