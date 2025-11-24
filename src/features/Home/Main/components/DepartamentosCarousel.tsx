import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { geoPath, geoMercator } from 'd3-geo';
import { dataService } from '../../../../services/dataService';

export default function DepartamentosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [geoData, setGeoData] = useState<any>(null);
  const [departamentosData, setDepartamentosData] = useState<any[]>([]);

  // Generar datos de departamentos basados en votos reales
  useEffect(() => {
    const estadisticas = dataService.getEstadisticas();
    const totalVotos = estadisticas.totalVotos;
    const totalUsuarios = dataService.getUsuarios().length;
    const participacionBase = totalUsuarios > 0 ? Math.round((estadisticas.usuariosQueVotaron / totalUsuarios) * 100) : 0;
    
    const colores = [
      '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#84cc16', 
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#fb923c', '#fbbf24',
      '#a3e635', '#4ade80', '#2dd4bf', '#22d3ee'
    ];
    
    const data = [
      { nombre: 'Amazonas', nombreGeo: 'AMAZONAS', votos: Math.max(Math.floor(totalVotos * 0.02), 0), participacion: Math.max(participacionBase - 5, 0), color: colores[0] },
      { nombre: 'Áncash', nombreGeo: 'ANCASH', votos: Math.max(Math.floor(totalVotos * 0.05), 0), participacion: Math.max(participacionBase + 2, 0), color: colores[1] },
      { nombre: 'Apurímac', nombreGeo: 'APURIMAC', votos: Math.max(Math.floor(totalVotos * 0.03), 0), participacion: Math.max(participacionBase - 10, 0), color: colores[2] },
      { nombre: 'Arequipa', nombreGeo: 'AREQUIPA', votos: Math.max(Math.floor(totalVotos * 0.07), 0), participacion: Math.max(participacionBase + 8, 0), color: colores[3] },
      { nombre: 'Ayacucho', nombreGeo: 'AYACUCHO', votos: Math.max(Math.floor(totalVotos * 0.03), 0), participacion: Math.max(participacionBase, 0), color: colores[4] },
      { nombre: 'Cajamarca', nombreGeo: 'CAJAMARCA', votos: Math.max(Math.floor(totalVotos * 0.04), 0), participacion: Math.max(participacionBase - 1, 0), color: colores[5] },
      { nombre: 'Callao', nombreGeo: 'CALLAO', votos: Math.max(Math.floor(totalVotos * 0.06), 0), participacion: Math.max(participacionBase + 5, 0), color: colores[6] },
      { nombre: 'Cusco', nombreGeo: 'CUSCO', votos: Math.max(Math.floor(totalVotos * 0.06), 0), participacion: Math.max(participacionBase + 3, 0), color: colores[7] },
      { nombre: 'Huancavelica', nombreGeo: 'HUANCAVELICA', votos: Math.max(Math.floor(totalVotos * 0.02), 0), participacion: Math.max(participacionBase - 9, 0), color: colores[8] },
      { nombre: 'Huánuco', nombreGeo: 'HUANUCO', votos: Math.max(Math.floor(totalVotos * 0.03), 0), participacion: Math.max(participacionBase - 3, 0), color: colores[9] },
      { nombre: 'Ica', nombreGeo: 'ICA', votos: Math.max(Math.floor(totalVotos * 0.04), 0), participacion: Math.max(participacionBase + 4, 0), color: colores[10] },
      { nombre: 'Junín', nombreGeo: 'JUNIN', votos: Math.max(Math.floor(totalVotos * 0.05), 0), participacion: Math.max(participacionBase + 1, 0), color: colores[11] },
      { nombre: 'La Libertad', nombreGeo: 'LA LIBERTAD', votos: Math.max(Math.floor(totalVotos * 0.08), 0), participacion: Math.max(participacionBase + 6, 0), color: colores[12] },
      { nombre: 'Lambayeque', nombreGeo: 'LAMBAYEQUE', votos: Math.max(Math.floor(totalVotos * 0.05), 0), participacion: Math.max(participacionBase + 3, 0), color: colores[13] },
      { nombre: 'Lima', nombreGeo: 'LIMA', votos: Math.max(Math.floor(totalVotos * 0.24), 0), participacion: Math.max(participacionBase + 9, 0), color: colores[14] },
      { nombre: 'Loreto', nombreGeo: 'LORETO', votos: Math.max(Math.floor(totalVotos * 0.03), 0), participacion: Math.max(participacionBase - 11, 0), color: colores[15] },
      { nombre: 'Madre de Dios', nombreGeo: 'MADRE DE DIOS', votos: Math.max(Math.floor(totalVotos * 0.01), 0), participacion: Math.max(participacionBase - 13, 0), color: colores[16] },
      { nombre: 'Moquegua', nombreGeo: 'MOQUEGUA', votos: Math.max(Math.floor(totalVotos * 0.02), 0), participacion: Math.max(participacionBase + 1, 0), color: colores[17] },
      { nombre: 'Pasco', nombreGeo: 'PASCO', votos: Math.max(Math.floor(totalVotos * 0.02), 0), participacion: Math.max(participacionBase - 2, 0), color: colores[18] },
      { nombre: 'Piura', nombreGeo: 'PIURA', votos: Math.max(Math.floor(totalVotos * 0.07), 0), participacion: Math.max(participacionBase + 5, 0), color: colores[19] },
      { nombre: 'Puno', nombreGeo: 'PUNO', votos: Math.max(Math.floor(totalVotos * 0.06), 0), participacion: Math.max(participacionBase, 0), color: colores[20] },
      { nombre: 'San Martín', nombreGeo: 'SAN MARTIN', votos: Math.max(Math.floor(totalVotos * 0.04), 0), participacion: Math.max(participacionBase - 1, 0), color: colores[21] },
      { nombre: 'Tacna', nombreGeo: 'TACNA', votos: Math.max(Math.floor(totalVotos * 0.02), 0), participacion: Math.max(participacionBase + 7, 0), color: colores[22] },
      { nombre: 'Tumbes', nombreGeo: 'TUMBES', votos: Math.max(Math.floor(totalVotos * 0.01), 0), participacion: Math.max(participacionBase + 2, 0), color: colores[23] },
      { nombre: 'Ucayali', nombreGeo: 'UCAYALI', votos: Math.max(Math.floor(totalVotos * 0.03), 0), participacion: Math.max(participacionBase - 10, 0), color: colores[24] }
    ];
    
    setDepartamentosData(data);
  }, []);

  const departamentos = departamentosData.map(d => d.nombre);

  useEffect(() => {
    fetch('/PeruDepartamento.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? departamentos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === departamentos.length - 1 ? 0 : prev + 1));
  };

  const currentDepartamento = departamentos[currentIndex] || '';
  const currentData = departamentosData[currentIndex];

  const departamentoPath = useMemo(() => {
    if (!geoData || !currentData) return null;
    
    const feature = geoData.features.find(
      (f: any) => f.properties.NOMBDEP === currentData.nombreGeo
    );
    
    if (!feature) return null;

    const projection = geoMercator().fitSize([180, 180], feature);
    const path = geoPath().projection(projection);
    
    return path(feature);
  }, [geoData, currentData]);

  if (!geoData || departamentosData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all h-full flex items-center justify-center">
        <p className="text-slate-500 dark:text-gray-400">Cargando mapa...</p>
      </div>
    );
  }

  if (!currentData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all h-full flex items-center justify-center">
        <p className="text-slate-500 dark:text-gray-400">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-md transition-all h-full flex flex-col">
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-gray-300" />
        </button>

        <p 
          key={currentIndex}
          className="text-xl font-bold text-slate-900 dark:text-white animate-fade-in min-w-[150px] text-center"
        >
          {currentDepartamento}
        </p>

        <button
          onClick={handleNext}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <svg width={180} height={180} viewBox="0 0 180 180">
          {departamentoPath && (
            <path
              d={departamentoPath}
              fill={currentData.color}
              stroke={currentData.color}
              strokeWidth={1.5}
              className="transition-all duration-300"
              style={{ filter: 'brightness(0.9)' }}
            />
          )}
        </svg>

        <div className="grid grid-cols-2 gap-4 w-full px-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-gray-400">Total Votos</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentData.votos.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-gray-400">Participación</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentData.participacion}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
