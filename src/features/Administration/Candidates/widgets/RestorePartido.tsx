import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { RotateCcw, X } from 'lucide-react';

interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logo: string;
  representantePresidente: string;
  representantesAlcaldes: {
    departamento: string;
    nombreCompleto: string;
  }[];
  estado: 'Activo' | 'Inactivo';
  deletedAt?: string;
}

interface RestorePartidoProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (partido: Partido) => void;
}

export default function RestorePartido({
  isOpen,
  onClose,
  onRestore,
}: RestorePartidoProps) {
  const [deletedPartidos, setDeletedPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('deletedPartidos');
      if (stored) {
        setDeletedPartidos(JSON.parse(stored));
      }
    }
  }, [isOpen]);

  const handleRestore = (partido: Partido) => {
    onRestore(partido);
    setDeletedPartidos(deletedPartidos.filter((p) => p.id !== partido.id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">
              Restaurar Partidos Políticos
            </h3>
            <p className="text-sm text-slate-500 font-normal">
              Selecciona un partido para restaurarlo
            </p>
          </ModalHeader>
          <ModalBody>
            {deletedPartidos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="w-16 h-16 text-slate-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-slate-400 mb-2">
                  No hay partidos eliminados
                </h3>
                <p className="text-sm text-slate-400">
                  Los partidos eliminados aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {deletedPartidos.map((partido) => (
                  <div
                    key={partido.id}
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {partido.logo ? (
                      <img
                        src={partido.logo}
                        alt={partido.nombre}
                        className="w-14 h-14 rounded-lg object-cover border-2 border-slate-200"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-slate-200 border-2 border-slate-300 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">Sin logo</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{partido.nombre}</h4>
                      <p className="text-sm text-slate-600">Siglas: {partido.siglas}</p>
                      <p className="text-sm text-slate-500">
                        Rep. Presidente: {partido.representantePresidente || 'No asignado'}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => handleRestore(partido)}
                      startContent={<RotateCcw className="w-4 h-4" />}
                      className="bg-slate-700"
                    >
                      Restaurar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={onClose}
              startContent={<X className="w-4 h-4" />}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
