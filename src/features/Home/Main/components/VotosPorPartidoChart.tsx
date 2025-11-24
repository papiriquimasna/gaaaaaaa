import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { dataService } from '../../../../services/dataService';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function VotosPorPartidoChart() {
  const { chartData, totalVotos, partidoLider } = useMemo(() => {
    const partidos = dataService.getPartidos();
    const votos = dataService.getVotos();
    const candidatos = [...dataService.getCandidatos('presidente'), ...dataService.getCandidatos('alcalde')];
    
    const data = partidos.map(partido => {
      const candidatosDelPartido = candidatos.filter(c => c.partidoId === partido.id);
      const votosDelPartido = votos.filter(v => 
        candidatosDelPartido.some(c => c.id === v.candidatoId)
      ).length;
      
      return {
        partido: partido.siglas,
        votos: votosDelPartido,
        fill: partido.color,
      };
    }).filter(p => p.votos > 0).sort((a, b) => b.votos - a.votos).slice(0, 6);

    const total = data.reduce((sum, item) => sum + item.votos, 0);
    const lider = data[0]?.partido || 'N/A';
    
    return { chartData: data, totalVotos: total, partidoLider: lider };
  }, []);

  const chartConfig = {
    votos: {
      label: 'Votos',
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-slate-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Votos por Partido</CardTitle>
        <CardDescription className="text-slate-600 dark:text-gray-400">
          Distribución de votos entre partidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="partido"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="votos" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-slate-700 dark:text-gray-300">
          {partidoLider} lidera con más votos
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-slate-500 dark:text-gray-400 leading-none">
          Total de {totalVotos} votos registrados
        </div>
      </CardFooter>
    </Card>
  );
}
