import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { RotateCcw } from 'lucide-react';

interface User {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  correo: string;
  rol: string;
  deletedAt?: string;
}

interface RestoreUserProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (user: User) => void;
}

export default function RestoreUser({ isOpen, onClose, onRestore }: RestoreUserProps) {
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);

  // Cargar usuarios eliminados desde localStorage cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('deletedUsers');
      if (stored) {
        setDeletedUsers(JSON.parse(stored));
      }
    }
  }, [isOpen]);

  const handleRestore = (user: User) => {
    onRestore(user);
    // Actualizar la lista local después de restaurar
    setDeletedUsers(deletedUsers.filter(u => u.id !== user.id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Restaurar Usuario</h2>
          <p className="text-sm text-slate-500 font-normal">
            Selecciona un usuario eliminado para restaurarlo
          </p>
        </ModalHeader>
        <ModalBody>
          {deletedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <RotateCcw className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No hay usuarios eliminados
              </h3>
              <p className="text-sm text-slate-500 text-center">
                No hay usuarios disponibles para restaurar en este momento
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {deletedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border-2 border-slate-200/60 rounded-xl hover:border-slate-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-slate-800">
                        {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-lg ${
                        user.rol === 'Administrador' 
                          ? 'bg-slate-700 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {user.rol}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>DNI: {user.dni}</span>
                      <span>•</span>
                      <span>{user.correo}</span>
                      {user.deletedAt && (
                        <>
                          <span>•</span>
                          <span className="text-xs">
                            Eliminado: {new Date(user.deletedAt).toLocaleDateString('es-PE')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    color="primary"
                    onPress={() => handleRestore(user)}
                    className="bg-slate-700 text-white"
                    startContent={<RotateCcw className="w-4 h-4" />}
                  >
                    Restaurar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color='danger' onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
