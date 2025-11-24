import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { X, User, IdCard, Flag, MapPin } from 'lucide-react';
import defaultPerfil from '../../../../assets/defaultperfil.jpg';

interface Alcalde {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  departamento: string;
  partidoPolitico: string;
  fotoPostulante: string;
  fotoPartido: string;
  estadoPostulacion: 'Aprobado' | 'Pendiente' | 'Rechazado';
}

interface InfoAlcaldeProps {
  isOpen: boolean;
  onClose: () => void;
  alcalde: Alcalde | null;
}

export default function InfoAlcalde({ isOpen, onClose, alcalde }: InfoAlcaldeProps) {
  if (!alcalde) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Información del Candidato a Alcalde
                </h2>
                <p className="text-sm text-slate-500 font-normal">
                  Detalles completos del postulante
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="py-4">
            <div className="space-y-6">
              {/* Sección de Fotos */}
              <div className="grid grid-cols-2 gap-4">
                {/* Foto del Postulante */}
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Foto del Postulante
                  </p>
                  <img
                    src={alcalde.fotoPostulante || defaultPerfil}
                    alt={alcalde.nombre}
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 shadow-md"
                  />
                </div>

                {/* Logo del Partido */}
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-slate-600 mb-3">Logo del Partido</p>
                  {alcalde.fotoPartido ? (
                    <img
                      src={alcalde.fotoPartido}
                      alt={alcalde.partidoPolitico}
                      className="w-32 h-32 rounded-lg object-cover border-4 border-slate-200 shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-slate-100 border-4 border-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">Sin logo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Información Personal */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  Datos Personales
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600">DNI</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {alcalde.dni}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600">Nombre Completo</span>
                    <span className="text-sm text-slate-800">
                      {alcalde.nombre} {alcalde.apellidoPaterno} {alcalde.apellidoMaterno}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600">Género</span>
                    <span className="text-sm text-slate-800">{alcalde.genero}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Departamento
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {alcalde.departamento}
                    </span>
                  </div>
                </div>
              </div>

              {/* Información Política */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Información Política
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-600">
                      Partido Político
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {alcalde.partidoPolitico}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-slate-600">
                      Estado de Postulación
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(alcalde.estadoPostulacion)}`}
                    >
                      {alcalde.estadoPostulacion}
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
