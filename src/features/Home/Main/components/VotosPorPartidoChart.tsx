import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dataService } from '../../../../services/dataService';

export default function VotosPorPartidoChart() {
  const data = useMemo(() => {
    const partidos = dataService.getPartidos();
    const votos = dataService.getVotos();
    const candidatos = [...dataService.getCandidatos('presidente'), ...dataService.getCandidatos('alcalde')];
    
    return partidos.map(partido => {
      const candidatosDelPartido = candidatos.filter(c => c.partidoId === partido.id);
      const votosDelPartido = votos.filter(v => 
        candidatosDelPartido.some(c => c.id === v.candidatoId)
      ).length;
      
      return {
        nombre: partido.siglas,
        votos: votosDelPartido,
        color: partido.color,
      };
    }).filter(p => p.votos > 0).sort((a, b) => b.votos - a.votos).slice(0, 6);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all h-full">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-gray-300 mb-4">
        Votos por Partido
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis 
            dataKey="nombre" 
            tick={{ fontSize: 12, fill: '#64748b' }}
            stroke="#cbd5e1"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            stroke="#cbd5e1"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Bar dataKey="votos" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
