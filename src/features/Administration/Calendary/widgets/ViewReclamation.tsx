import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { FileText } from 'lucide-react';
import libroImg from '../../../../assets/libro.png';

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

interface ViewReclamationProps {
  isOpen: boolean;
  onClose: () => void;
  reclamacion: Reclamacion | null;
  onImageClick: (imageUrl: string) => void;
}

export default function ViewReclamation({ isOpen, onClose, reclamacion, onImageClick }: ViewReclamationProps) {
  if (!reclamacion) return null;

  const fecha = new Date(reclamacion.fecha);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isDismissable={false}>
      <ModalContent>
        <ModalHeader className="flex items-center gap-3 pb-2">
          <img 
            src={libroImg} 
            alt="Libro de Reclamaciones" 
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">Detalles de Reclamación</h3>
            <p className="text-sm text-slate-500">
              {fecha.toLocaleDateString('es-ES', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Tipo</label>
              <p className="text-slate-600 mt-1 capitalize">{reclamacion.tipo}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Asunto</label>
              <p className="text-slate-600 mt-1">{reclamacion.asunto}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Descripción</label>
              <p className="text-slate-600 mt-1">{reclamacion.descripcion}</p>
            </div>

            {reclamacion.archivos && reclamacion.archivos.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Archivos adjuntos ({reclamacion.archivos.length})
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {reclamacion.archivos.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    
                    return (
                      <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                        {isImage ? (
                          <img 
                            src={file.data} 
                            alt={file.name}
                            className="w-full h-32 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => onImageClick(file.data)}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-slate-50">
                            <FileText className="w-5 h-5 text-slate-500" />
                            <span className="text-xs text-slate-600 truncate">{file.name}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
