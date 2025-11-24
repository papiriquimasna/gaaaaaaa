import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Accion {
  id: number;
  tipo: 'usuario' | 'candidato' | 'votacion' | 'reclamacion' | 'datos' | 'login';
  titulo: string;
  descripcion: string;
  tiempo: string;
  horaReal: string;
  fechaReal: string;
  usuario: string;
  usuarioDni: string;
}

interface AccionesContextType {
  acciones: Accion[];
  agregarAccion: (accion: Omit<Accion, 'id' | 'tiempo' | 'horaReal' | 'fechaReal'>) => void;
}

const AccionesContext = createContext<AccionesContextType | undefined>(undefined);

// Función para obtener hora y fecha real
const getHoraReal = () => {
  const now = new Date();
  return now.toLocaleTimeString('es-PE', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });
};

const getFechaReal = () => {
  const now = new Date();
  return now.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getTiempoTranscurrido = (timestamp: number) => {
  const ahora = Date.now();
  const diferencia = ahora - timestamp;
  const segundos = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (segundos < 60) return 'Justo ahora';
  if (minutos < 60) return `Hace ${minutos} min`;
  if (horas < 24) return `Hace ${horas} h`;
  return `Hace ${dias} días`;
};

export const AccionesProvider = ({ children }: { children: ReactNode }) => {
  const [acciones, setAcciones] = useState<Accion[]>(() => {
    // Cargar acciones globales desde localStorage
    const accionesGuardadas = localStorage.getItem('accionesGlobales');
    if (accionesGuardadas) {
      try {
        return JSON.parse(accionesGuardadas);
      } catch (error) {
        console.error('Error al cargar acciones:', error);
        return [];
      }
    }
    return [];
  });

  // Actualizar tiempos cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setAcciones(prev => 
        prev.map(accion => ({
          ...accion,
          tiempo: getTiempoTranscurrido(accion.id)
        }))
      );
    }, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, []);

  const agregarAccion = (nuevaAccion: Omit<Accion, 'id' | 'tiempo' | 'horaReal' | 'fechaReal'>) => {
    const timestamp = Date.now();
    const accion: Accion = {
      ...nuevaAccion,
      id: timestamp,
      tiempo: 'Justo ahora',
      horaReal: getHoraReal(),
      fechaReal: getFechaReal(),
    };

    setAcciones(prev => {
      const nuevasAcciones = [accion, ...prev].slice(0, 50); // Mantener últimas 50
      // Guardar en localStorage global
      localStorage.setItem('accionesGlobales', JSON.stringify(nuevasAcciones));
      return nuevasAcciones;
    });
  };

  return (
    <AccionesContext.Provider value={{ acciones, agregarAccion }}>
      {children}
    </AccionesContext.Provider>
  );
};

export const useAcciones = () => {
  const context = useContext(AccionesContext);
  if (!context) {
    throw new Error('useAcciones debe ser usado dentro de AccionesProvider');
  }
  return context;
};
