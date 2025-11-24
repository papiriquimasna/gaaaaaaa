import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dataService } from '../../../../services/dataService';

// Datos simulados de sesiones
const chartData = [
  { date: "2024-10-26", desktop: 186, mobile: 80 },
  { date: "2024-10-27", desktop: 305, mobile: 200 },
  { date: "2024-10-28", desktop: 237, mobile: 120 },
  { date: "2024-10-29", desktop: 173, mobile: 190 },
  { date: "2024-10-30", desktop: 209, mobile: 130 },
  { date: "2024-10-31", desktop: 214, mobile: 140 },
  { date: "2024-11-01", desktop: 195, mobile: 165 },
  { date: "2024-11-02", desktop: 220, mobile: 175 },
  { date: "2024-11-03", desktop: 189, mobile: 145 },
  { date: "2024-11-04", desktop: 245, mobile: 195 },
  { date: "2024-11-05", desktop: 267, mobile: 210 },
  { date: "2024-11-06", desktop: 198, mobile: 155 },
  { date: "2024-11-07", desktop: 234, mobile: 180 },
  { date: "2024-11-08", desktop: 276, mobile: 220 },
  { date: "2024-11-09", desktop: 289, mobile: 235 },
  { date: "2024-11-10", desktop: 312, mobile: 250 },
  { date: "2024-11-11", desktop: 298, mobile: 240 },
  { date: "2024-11-12", desktop: 265, mobile: 205 },
  { date: "2024-11-13", desktop: 243, mobile: 185 },
  { date: "2024-11-14", desktop: 287, mobile: 225 },
  { date: "2024-11-15", desktop: 321, mobile: 260 },
  { date: "2024-11-16", desktop: 334, mobile: 275 },
  { date: "2024-11-17", desktop: 356, mobile: 290 },
  { date: "2024-11-18", desktop: 378, mobile: 310 },
  { date: "2024-11-19", desktop: 392, mobile: 325 },
  { date: "2024-11-20", desktop: 405, mobile: 340 },
  { date: "2024-11-21", desktop: 418, mobile: 355 },
  { date: "2024-11-22", desktop: 432, mobile: 370 },
  { date: "2024-11-23", desktop: 445, mobile: 385 },
  { date: "2024-11-24", desktop: 458, mobile: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function SessionsAreaChart() {
  const [timeRange, setTimeRange] = React.useState("30d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-30");
    let daysToSubtract = 30;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 border-b dark:border-gray-700 p-5">
        <div className="grid flex-1 gap-1">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Sesiones</h3>
          <p className="text-sm text-slate-500 dark:text-gray-400">Mostrando visitantes del último mes</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Últimos 30 días" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 días
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 días
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="px-2 pt-4 pb-4 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
