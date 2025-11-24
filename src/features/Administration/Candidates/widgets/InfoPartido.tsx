import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { X, Flag, Hash, User, Activity } from 'lucide-react';

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
}

interface InfoPartidoProps {
  isOpen: boolean;
  onClose: () => void;
  partido: Partido | null;
}

export default function InfoPartido({ isOpen, onClose, partido }: InfoPartidoProps) {
  if (!partido) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <Flag className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Información del Partido
                </h2>
                <p className="text-sm text-slate-500 font-normal">
                  Detalles completos del partido político
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="py-4">
            <div className="space-y-6">
              {/* Logo del Partido */}
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-slate-600 mb-3">Logo del Partido</p>
                {partido.logo ? (
                  <img
                    src={partido.logo}
                    alt={partido.nombre}
                    className="w-40 h-40 rounded-lg object-cover border-4 border-slate-200 shadow-md"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-lg bg-slate-100 border-4 border-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">Sin logo</span>
                  </div>
                )}
              </div>

              {/* Información General */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Información General
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600">
                      Nombre del Partido
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {partido.nombre}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Siglas
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {partido.siglas}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Representante Presidente
                    </span>
                    <span className="text-sm text-slate-800">
                      {partido.representantePresidente || 'No asignado'}
                    </span>
                  </div>

                  <div className="py-2">
                    <span className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-3">
                      <User className="w-4 h-4" />
                      Representantes Alcaldes ({partido.representantesAlcaldes?.length || 0})
                    </span>
                    {partido.representantesAlcaldes && partido.representantesAlcaldes.length > 0 ? (
                      <div className="max-h-48 overflow-y-auto space-y-2 bg-white rounded-lg p-3 border border-slate-200">
                        {partido.representantesAlcaldes.map((alcalde, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-sm font-medium text-slate-700">
                              {alcalde.departamento}
                            </span>
                            <span className="text-sm text-slate-600">
                              {alcalde.nombreCompleto}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No hay alcaldes asignados</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-slate-200 mt-2">
                    <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Estado
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
                        partido.estado === 'Activo'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {partido.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="pt-2">
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
