import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { AlertTriangle, X } from 'lucide-react';
import Spinner from '../components/Spinner';

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

interface DeletePartidoProps {
  isOpen: boolean;
  onClose: () => void;
  partido: Partido | null;
  onConfirm: () => void;
}

export default function DeletePartido({
  isOpen,
  onClose,
  partido,
  onConfirm,
}: DeletePartidoProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm();
    setIsDeleting(false);
    onClose();
  };

  if (!partido) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isDismissable={!isDeleting}>
      <ModalContent className="min-h-[400px]">
        {isDeleting ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <Spinner />
            <p className="text-slate-600 mt-4 text-sm">Eliminando partido...</p>
          </div>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Eliminar Partido Político
                  </h2>
                  <p className="text-sm text-slate-500 font-normal">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="py-4">
              <div className="space-y-4">
                <p className="text-slate-700">
                  ¿Estás seguro de que deseas eliminar este partido político? Esta acción
                  eliminará permanentemente el partido del sistema.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    {partido.logo ? (
                      <img
                        src={partido.logo}
                        alt={partido.nombre}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-slate-200 border-2 border-slate-300 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">Sin logo</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {partido.nombre}
                      </h3>
                      <p className="text-sm text-slate-500">{partido.siglas}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Rep. Presidente</span>
                      <span className="text-sm text-slate-800">{partido.representantePresidente || 'No asignado'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Alcaldes</span>
                      <span className="text-sm text-slate-800">
                        {partido.representantesAlcaldes && partido.representantesAlcaldes.length > 0
                          ? `${partido.representantesAlcaldes.length} alcalde${partido.representantesAlcaldes.length > 1 ? 's' : ''}`
                          : 'No asignado'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Estado</span>
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          partido.estado === 'Activo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-200 text-slate-700'
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
                variant="light"
                onPress={onClose}
                startContent={<X className="w-4 h-4" />}
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={handleConfirm}
                className="bg-red-600 text-white"
              >
                Eliminar Partido
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
