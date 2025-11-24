import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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

export default function UsuariosRegistradosChart() {
  const { chartData, totalUsuarios, crecimiento } = useMemo(() => {
    const usuarios = dataService.getUsuarios();
    
    // Agrupar usuarios por mes de registro
    const usuariosPorMes: { [key: string]: number } = {};
    
    usuarios.forEach(usuario => {
      const fecha = new Date(usuario.fechaRegistro);
      const mesAno = `${fecha.toLocaleString('es', { month: 'long' })}`;
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
    const data = meses.slice(-6).map(mes => {
      acumulado += usuariosPorMes[mes];
      return {
        month: mes.charAt(0).toUpperCase() + mes.slice(1),
        usuarios: acumulado,
      };
    });

    // Calcular crecimiento
    const primerMes = data[0]?.usuarios || 0;
    const ultimoMes = data[data.length - 1]?.usuarios || 0;
    const porcentajeCrecimiento = primerMes > 0 
      ? Math.round(((ultimoMes - primerMes) / primerMes) * 100) 
      : 0;
    
    return { 
      chartData: data, 
      totalUsuarios: usuarios.length,
      crecimiento: porcentajeCrecimiento 
    };
  }, []);

  const chartConfig = {
    usuarios: {
      label: 'Usuarios',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-slate-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Usuarios Registrados</CardTitle>
        <CardDescription className="text-slate-600 dark:text-gray-400">
          Crecimiento acumulado de usuarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="usuarios"
              type="natural"
              stroke="var(--color-usuarios)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-usuarios)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-slate-700 dark:text-gray-300">
          Crecimiento de {crecimiento}% en el período
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-slate-500 dark:text-gray-400 leading-none">
          Total de {totalUsuarios} usuarios registrados
        </div>
      </CardFooter>
    </Card>
  );
}
