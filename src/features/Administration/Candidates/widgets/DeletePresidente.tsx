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
import defaultPerfil from '../../../../assets/defaultperfil.jpg';

interface Candidate {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  partidoPolitico: string;
  fotoPostulante: string;
  fotoPartido: string;
  estadoPostulacion: 'Aprobado' | 'Pendiente' | 'Rechazado';
}

interface DeletePresidenteProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onConfirm: () => void;
}

export default function DeletePresidente({
  isOpen,
  onClose,
  candidate,
  onConfirm,
}: DeletePresidenteProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm();
    setIsDeleting(false);
    onClose();
  };

  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isDismissable={!isDeleting}>
      <ModalContent className="min-h-[500px]">
        {isDeleting ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
            <Spinner />
            <p className="text-slate-600 mt-4 text-sm">Eliminando candidato...</p>
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
                    Eliminar Candidato Presidencial
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
                  ¿Estás seguro de que deseas eliminar este candidato? El candidato será
                  movido a la papelera y podrás restaurarlo más tarde.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={candidate.fotoPostulante || defaultPerfil}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {candidate.nombre} {candidate.apellidoPaterno}{' '}
                        {candidate.apellidoMaterno}
                      </h3>
                      <p className="text-sm text-slate-500">{candidate.partidoPolitico}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">DNI</span>
                      <span className="text-sm font-semibold text-slate-800">
                        {candidate.dni}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Género</span>
                      <span className="text-sm text-slate-800">{candidate.genero}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Estado</span>
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          candidate.estadoPostulacion === 'Aprobado'
                            ? 'bg-green-100 text-green-700'
                            : candidate.estadoPostulacion === 'Pendiente'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {candidate.estadoPostulacion}
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
                Eliminar Candidato
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
