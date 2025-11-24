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
  deletedAt?: string;
}

interface RestoreCandidatoProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (candidate: Candidate) => void;
}

export default function RestoreCandidato({
  isOpen,
  onClose,
  onRestore,
}: RestoreCandidatoProps) {
  const [deletedCandidates, setDeletedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('deletedCandidatosPresidenciales');
      if (stored) {
        setDeletedCandidates(JSON.parse(stored));
      }
    }
  }, [isOpen]);

  const handleRestore = (candidate: Candidate) => {
    onRestore(candidate);
    setDeletedCandidates(deletedCandidates.filter((c) => c.id !== candidate.id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">
              Restaurar Candidatos Presidenciales
            </h3>
            <p className="text-sm text-slate-500 font-normal">
              Selecciona un candidato para restaurarlo
            </p>
          </ModalHeader>
          <ModalBody>
            {deletedCandidates.length === 0 ? (
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-slate-400 mb-2">
                  No hay candidatos eliminados
                </h3>
                <p className="text-sm text-slate-400">
                  Los candidatos eliminados aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {deletedCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={candidate.fotoPostulante || defaultPerfil}
                      alt={candidate.nombre}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">
                        {candidate.nombre} {candidate.apellidoPaterno}{' '}
                        {candidate.apellidoMaterno}
                      </h4>
                      <p className="text-sm text-slate-600">DNI: {candidate.dni}</p>
                      <p className="text-sm text-slate-500">
                        Partido: {candidate.partidoPolitico}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => handleRestore(candidate)}
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
