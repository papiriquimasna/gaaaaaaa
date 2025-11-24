import { useEffect, useState } from 'react';
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dataService } from '../../../../services/dataService';

export default function VotosDonutChart() {
  const [chartData, setChartData] = useState([
    { name: "Nuevos", value: 0, fill: "var(--color-nuevos)" },
    { name: "Recurrentes", value: 0, fill: "var(--color-recurrentes)" },
    { name: "Inactivos", value: 0, fill: "var(--color-inactivos)" },
  ]);

  useEffect(() => {
    const usuarios = dataService.getUsuarios();
    const totalUsuarios = usuarios.length;
    const estadisticas = dataService.getEstadisticas();
    const usuariosQueVotaron = estadisticas.usuariosQueVotaron;
    
    const nuevos = Math.round((usuariosQueVotaron / totalUsuarios) * 100) || 0;
    const inactivos = Math.round(((totalUsuarios - usuariosQueVotaron) / totalUsuarios) * 100) || 0;
    const recurrentes = 100 - nuevos - inactivos;

    setChartData([
      { name: "Nuevos", value: nuevos, fill: "var(--color-nuevos)" },
      { name: "Recurrentes", value: recurrentes, fill: "var(--color-recurrentes)" },
      { name: "Inactivos", value: inactivos, fill: "var(--color-inactivos)" },
    ]);
  }, []);

  const chartConfig = {
    value: {
      label: "Usuarios",
    },
    nuevos: {
      label: "Nuevos",
      color: "#3B4868",
    },
    recurrentes: {
      label: "Recurrentes",
      color: "#798BB4",
    },
    inactivos: {
      label: "Inactivos",
      color: "#B4BED5",
    },
  } satisfies ChartConfig;

  const colorMap: Record<string, string> = {
    Nuevos: "#3B4868",
    Recurrentes: "#798BB4",
    Inactivos: "#B4BED5",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 p-5 flex flex-col h-full hover:shadow-md transition-all">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Usuarios</h3>
        <p className="text-xs text-slate-500 dark:text-gray-400">Últimos 30 días</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[160px] w-[160px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={43}
              outerRadius={65}
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="space-y-2 mt-4">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorMap[item.name] }}
              />
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
