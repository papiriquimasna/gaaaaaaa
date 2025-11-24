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

interface User {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  correo: string;
  rol: string;
}

interface DeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: () => void;
}

export default function DeleteUser({
  isOpen,
  onClose,
  user,
  onConfirm,
}: DeleteUserProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    // Simular un delay para mostrar el spinner
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConfirm();
    setIsDeleting(false);
    onClose();
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isDismissable={!isDeleting}>
      <ModalContent className="min-h-[500px]">
        {isDeleting ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
            <Spinner />
            <p className="text-slate-600 mt-4 text-sm">Eliminando usuario...</p>
          </div>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Eliminar Usuario</h2>
                  <p className="text-sm text-slate-500 font-normal">
                    Esta acción no se puede deshacer
                  </p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="py-4">
              <div className="space-y-4">
                <p className="text-slate-700">
                  ¿Estás seguro de que deseas eliminar este usuario? El usuario será movido a la papelera y podrás restaurarlo más tarde.
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={defaultPerfil} 
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
                      </h3>
                      <p className="text-sm text-slate-500">{user.correo}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">DNI</span>
                      <span className="text-sm font-semibold text-slate-800">{user.dni}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Género</span>
                      <span className="text-sm text-slate-800">{user.genero}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Correo</span>
                      <span className="text-sm text-slate-800">{user.correo}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Rol</span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        user.rol === 'Administrador' 
                          ? 'bg-slate-700 text-white' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {user.rol}
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
                Eliminar Usuario
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
