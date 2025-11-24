import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Select, SelectItem } from '@heroui/react';
import ViewReclamation from '../widgets/ViewReclamation';

interface ArchivoBase64 {
  name: string;
  type: string;
  size: number;
  data: string;
}

interface Reclamacion {
  id: string;
  tipo: string;
  asunto: string;
  descripcion: string;
  fecha: string;
  estado: string;
  cantidadArchivos: number;
  archivos?: ArchivoBase64[];
}

export default function Calendary() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [showSidebar, setShowSidebar] = useState(true);
  const [reclamaciones, setReclamaciones] = useState<Reclamacion[]>([]);
  const [selectedReclamacion, setSelectedReclamacion] = useState<Reclamacion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
  // Cargar reclamaciones desde localStorage
  useEffect(() => {
    const reclamacionesGuardadas = localStorage.getItem('reclamaciones');
    if (reclamacionesGuardadas) {
      setReclamaciones(JSON.parse(reclamacionesGuardadas));
    }
  }, []);

  // Función para obtener reclamaciones de una fecha específica
  const getReclamacionesPorFecha = (fecha: Date) => {
    return reclamaciones.filter(rec => {
      const recFecha = new Date(rec.fecha);
      return recFecha.getDate() === fecha.getDate() &&
             recFecha.getMonth() === fecha.getMonth() &&
             recFecha.getFullYear() === fecha.getFullYear();
    });
  };

  // Función para calcular la posición según la hora (8 AM = 0, 3 PM = 7)
  const calcularPosicionPorHora = (fecha: string) => {
    const date = new Date(fecha);
    const hora = date.getHours();
    const minutos = date.getMinutes();
    
    // Si la hora está fuera del rango 8-15, ajustar
    if (hora < 8) return 0;
    if (hora >= 16) return 7;
    
    // Calcular posición: cada hora = 80px (h-20)
    const horaRelativa = hora - 8;
    const posicionBase = horaRelativa * 80;
    const posicionMinutos = (minutos / 60) * 80;
    
    return posicionBase + posicionMinutos;
  };

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const daysShort = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    const newDate = new Date(currentDate);
    if (action === 'PREV') {
      if (currentView === 'month') newDate.setMonth(newDate.getMonth() - 1);
      else if (currentView === 'week') newDate.setDate(newDate.getDate() - 7);
      else if (currentView === 'day') newDate.setDate(newDate.getDate() - 1);
    } else if (action === 'NEXT') {
      if (currentView === 'month') newDate.setMonth(newDate.getMonth() + 1);
      else if (currentView === 'week') newDate.setDate(newDate.getDate() + 7);
      else if (currentView === 'day') newDate.setDate(newDate.getDate() + 1);
    } else {
      setCurrentDate(new Date());
      return;
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = (date: Date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDays.push(currentDay);
    }
    
    return weekDays;
  };

  const getWeekRange = () => {
    const weekDays = getWeekDays(new Date(currentDate));
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.getDate()} - ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const days = getDaysInMonth(currentDate);

  const handleViewReclamacion = (rec: Reclamacion) => {
    setSelectedReclamacion(rec);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-0 md:gap-4 p-0 md:p-4 lg:p-6 bg-white md:bg-slate-50">
      {/* Main Calendar */}
      <div className="flex-1 bg-white rounded-none md:rounded-2xl shadow-none md:shadow-sm border-0 md:border md:border-slate-200/60 flex flex-col min-h-0 relative">
        {/* Header */}
        <div className="flex flex-col gap-3 px-4 md:px-6 py-3 md:py-4 border-b border-slate-200">
          {/* Mobile: Título con navegación y dropdown */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigate('PREV')}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="text-lg font-medium text-slate-800 capitalize">
                {months[currentDate.getMonth()]}
              </h2>
              <button
                onClick={() => handleNavigate('NEXT')}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Dropdown de vistas */}
            <Select
              selectedKeys={[currentView]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as 'month' | 'week' | 'day' | 'agenda';
                setCurrentView(selected);
              }}
              className="w-32"
              size="sm"
              variant="flat"
              aria-label="Seleccionar vista"
            >
              <SelectItem key="month">Mes</SelectItem>
              <SelectItem key="week">Semana</SelectItem>
              <SelectItem key="day">Día</SelectItem>
              <SelectItem key="agenda">Agenda</SelectItem>
            </Select>
          </div>

          {/* Desktop: Header completo */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('PREV')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={() => handleNavigate('TODAY')}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Hoy
              </button>
              <button
                onClick={() => handleNavigate('NEXT')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-500 capitalize">
              {currentView === 'month' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              {currentView === 'week' && getWeekRange()}
              {currentView === 'day' && `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              {currentView === 'agenda' && 'Agenda'}
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('month')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'month'
                      ? 'bg-slate-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Mes
                </button>
                <button
                  onClick={() => setCurrentView('week')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'week'
                      ? 'bg-slate-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setCurrentView('day')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'day'
                      ? 'bg-slate-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Día
                </button>
                <button
                  onClick={() => setCurrentView('agenda')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'agenda'
                      ? 'bg-slate-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Agenda
                </button>
              </div>

              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
              >
                <ChevronRight className={`w-5 h-5 text-slate-600 transition-transform ${showSidebar ? '' : 'rotate-180'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 p-0 md:p-4 lg:p-6 min-h-0 overflow-auto md:overflow-hidden">
          {/* Vista Mes */}
          {currentView === 'month' && (
            <div className="md:h-full">
              {/* Días de la semana */}
              <div className="grid grid-cols-7 border-b border-slate-200">
                {['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'].map((day, idx) => (
                  <div key={idx} className="text-center py-2">
                    <span className="text-xs text-slate-500 font-normal">{day}</span>
                  </div>
                ))}
              </div>

              {/* Grid de días */}
              <div className="grid grid-cols-7">
                {days.map((dayInfo, index) => {
                  const reclamacionesDelDia = getReclamacionesPorFecha(dayInfo.date);
                  const isVotingDay = dayInfo.isCurrentMonth && 
                                     dayInfo.date.getMonth() === 10 && 
                                     (dayInfo.day === 24 || dayInfo.day === 25);
                  return (
                    <div
                      key={index}
                      onClick={() => dayInfo.isCurrentMonth && setSelectedDate(dayInfo.date)}
                      className={`min-h-[80px] md:min-h-[100px] p-2 border-r border-b border-slate-200 cursor-pointer transition-colors ${
                        !dayInfo.isCurrentMonth 
                          ? 'bg-slate-50' 
                          : isVotingDay
                          ? 'bg-red-50'
                          : isToday(dayInfo.date)
                          ? 'bg-slate-200'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-center md:justify-start mb-1">
                        <span
                          className={`text-sm font-normal ${
                            isVotingDay
                              ? 'text-red-600 font-bold'
                              : isToday(dayInfo.date)
                              ? 'text-slate-800 font-medium'
                              : dayInfo.isCurrentMonth
                              ? 'text-slate-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {dayInfo.day}
                        </span>
                      </div>
                      {/* Mostrar reclamaciones */}
                      {dayInfo.isCurrentMonth && reclamacionesDelDia.length > 0 && (
                        <div className="space-y-1">
                          {reclamacionesDelDia.slice(0, 2).map((rec) => (
                            <div
                              key={rec.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewReclamacion(rec);
                              }}
                              className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 truncate cursor-pointer hover:bg-slate-200 transition-colors"
                              title={rec.asunto}
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="truncate">{rec.asunto}</span>
                            </div>
                          ))}
                          {reclamacionesDelDia.length > 2 && (
                            <div className="text-xs text-slate-500 px-2">
                              +{reclamacionesDelDia.length - 2} más
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vista Semana */}
          {currentView === 'week' && (
            <div className="h-full">
              {/* Header con días */}
              <div className="grid grid-cols-7 border-b border-slate-200">
                {getWeekDays(new Date(currentDate)).map((day, index) => (
                  <div key={index} className="text-center py-2 border-r border-slate-200 last:border-r-0">
                    <div className="text-xs text-slate-500 font-normal">
                      {['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.'][index]}
                    </div>
                    <div className={`text-sm font-medium mt-1 ${
                      isToday(day) ? 'text-slate-800 font-semibold' : 'text-slate-700'
                    }`}>
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid de días */}
              <div className="grid grid-cols-7">
                {getWeekDays(new Date(currentDate)).map((day, dayIndex) => {
                  const reclamacionesDelDia = getReclamacionesPorFecha(day);
                  return (
                    <div
                      key={dayIndex}
                      className={`min-h-[600px] p-2 border-r border-b border-slate-200 last:border-r-0 ${
                        isToday(day) ? 'bg-slate-200' : 'bg-white hover:bg-slate-50'
                      } cursor-pointer transition-colors`}
                    >
                      {/* Mostrar reclamaciones */}
                      {reclamacionesDelDia.length > 0 && (
                        <div className="space-y-1">
                          {reclamacionesDelDia.slice(0, 8).map((rec) => (
                            <div
                              key={rec.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewReclamacion(rec);
                              }}
                              className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 truncate cursor-pointer hover:bg-slate-200 transition-colors"
                              title={rec.asunto}
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="truncate">{rec.asunto}</span>
                            </div>
                          ))}
                          {reclamacionesDelDia.length > 8 && (
                            <div className="text-xs text-slate-500 px-2">
                              +{reclamacionesDelDia.length - 8} más
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vista Día */}
          {currentView === 'day' && (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-20 bg-slate-50 border-r border-slate-200 shrink-0">
                  {[8, 9, 10, 11, 12, 13, 14, 15].map((hour) => (
                    <div key={hour} className="h-20 border-b border-slate-200 last:border-b-0 flex items-start justify-center pt-2">
                      <span className="text-sm font-medium text-slate-600">
                        {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative border-r border-slate-200">
                  {[8, 9, 10, 11, 12, 13, 14, 15].map((hour) => (
                    <div key={hour} className="h-20 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors"></div>
                  ))}
                  {/* Mostrar reclamaciones del día posicionadas por hora */}
                  {(() => {
                    const reclamacionesDelDia = getReclamacionesPorFecha(currentDate);
                    // Filtrar solo reclamaciones entre 8 AM y 3 PM (antes de las 4 PM)
                    const reclamacionesFiltradas = reclamacionesDelDia.filter(rec => {
                      const hora = new Date(rec.fecha).getHours();
                      return hora >= 8 && hora < 16;
                    });
                    
                    return (
                      <>
                        {reclamacionesFiltradas.map((rec, index) => {
                          const posicionTop = calcularPosicionPorHora(rec.fecha);
                          const hora = new Date(rec.fecha).getHours();
                          const minutos = new Date(rec.fecha).getMinutes();
                          return (
                            <div
                              key={rec.id}
                              className="absolute left-2 right-2 px-2 py-1 bg-slate-500 text-white rounded text-xs font-medium shadow-sm hover:shadow-md transition-all cursor-pointer hover:z-10"
                              style={{
                                top: `${posicionTop + (index * 22)}px`,
                                height: '20px'
                              }}
                              title={`${hora}:${minutos.toString().padStart(2, '0')} - ${rec.asunto}`}
                            >
                              <div className="truncate leading-tight">
                                {hora}:{minutos.toString().padStart(2, '0')} - {rec.asunto}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Vista Agenda */}
          {currentView === 'agenda' && (
            <div className="h-full border border-slate-200 rounded-lg overflow-auto bg-slate-50">
              {reclamaciones.length === 0 ? (
                <div className="h-full p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg className="w-full h-full text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-md font-semibold text-slate-400 mb-2">No hay eventos programados</h3>
                  <p className="text-sm text-slate-400 text-center max-w-md">
                    Los eventos aparecerán aquí cuando sean registrados
                  </p>
                </div>
              ) : (
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {reclamaciones.map((rec) => {
                      const fecha = new Date(rec.fecha);
                      const primeraImagen = rec.archivos?.find(file => file.type.startsWith('image/'));
                      
                      return (
                        <div
                          key={rec.id}
                          onClick={() => handleViewReclamacion(rec)}
                          className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer rounded-lg"
                        >
                          {primeraImagen && (
                            <div className="w-full h-40 overflow-hidden bg-slate-100">
                              <img 
                                src={primeraImagen.data} 
                                alt="Evidencia"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-xs font-semibold text-slate-700">
                                {fecha.toLocaleDateString('es-ES', { 
                                  day: '2-digit', 
                                  month: '2-digit', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                            
                            <h4 className="text-base font-bold text-slate-800 mb-3">
                              {rec.tipo.charAt(0).toUpperCase() + rec.tipo.slice(1)}
                            </h4>
                            
                            <div className="space-y-2 text-xs">
                              <div>
                                <span className="font-semibold text-slate-700">ASUNTO:</span>
                                <p className="text-slate-600 mt-0.5 line-clamp-2">{rec.asunto}</p>
                              </div>
                              
                              <div>
                                <span className="font-semibold text-slate-700">DESCRIPCIÓN:</span>
                                <p className="text-slate-600 mt-0.5 line-clamp-2">{rec.descripcion}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="hidden lg:block w-80 transition-all">
          {/* Mini Calendar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
              className="p-1 hover:bg-slate-100 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <h3 className="text-sm font-semibold text-slate-800 capitalize">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
              className="p-1 hover:bg-slate-100 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysShort.map((day) => (
              <div key={day} className="text-center">
                <span className="text-xs font-medium text-slate-500">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((dayInfo, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(dayInfo.date)}
                className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-colors ${
                  !dayInfo.isCurrentMonth
                    ? 'text-slate-300'
                    : isToday(dayInfo.date)
                    ? 'bg-slate-500 text-white font-semibold'
                    : isSelected(dayInfo.date)
                    ? 'bg-slate-100 text-slate-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {dayInfo.day}
              </button>
            ))}
          </div>
        </div>
        </div>
      )}

      {/* Modal para ver detalles */}
      <ViewReclamation 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reclamacion={selectedReclamacion}
        onImageClick={(imageUrl) => setImagenAmpliada(imageUrl)}
      />

      {/* Visor de imagen ampliada */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={() => setImagenAmpliada(null)}
        >
          <button
            onClick={() => setImagenAmpliada(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={imagenAmpliada || ''}
            alt="Imagen ampliada"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
