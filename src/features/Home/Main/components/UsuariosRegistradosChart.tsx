import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { dataService } from '../../../../services/dataService';

export default function UsuariosRegistradosChart() {
  const data = useMemo(() => {
    const usuarios = dataService.getUsuarios();
    
    // Agrupar usuarios por mes de registro
    const usuariosPorMes: { [key: string]: number } = {};
    
    usuarios.forEach(usuario => {
      const fecha = new Date(usuario.fechaRegistro);
      const mesAno = `${fecha.toLocaleString('es', { month: 'short' })} ${fecha.getFullYear()}`;
      usuariosPorMes[mesAno] = (usuariosPorMes[mesAno] || 0) + 1;
    });
    
    // Convertir a array y ordenar por fecha
    const meses = Object.keys(usuariosPorMes).sort((a, b) => {
      const fechaA = new Date(a);
      const fechaB = new Date(b);
      return fechaA.getTime() - fechaB.getTime();
    });
    
    // Calcular acumulado
    let acumulado = 0;
    return meses.slice(-6).map(mes => {
      acumulado += usuariosPorMes[mes];
      return {
        mes,
        usuarios: acumulado,
      };
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all h-full">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-gray-300 mb-4">
        Usuarios Registrados (Acumulado)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="mes" 
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
          <Line 
            type="monotone" 
            dataKey="usuarios" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
