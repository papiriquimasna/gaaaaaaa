import { Modal, ModalContent, ModalBody, Spinner } from '@heroui/react';
import { CheckCircle2 } from 'lucide-react';

interface VerificateReclamacionProps {
  isOpen: boolean;
  onClose: () => void;
  isProcessing: boolean;
  numeroRegistro?: string;
}

export default function VerificateReclamacion({ 
  isOpen, 
  onClose, 
  isProcessing, 
}: VerificateReclamacionProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isDismissable={!isProcessing}
      hideCloseButton={isProcessing}
      size="lg"
      classNames={{
        base: "bg-white",
        backdrop: "bg-black/50"
      }}
    >
      <ModalContent>
        <ModalBody className="py-12 px-8 min-h-[350px] flex items-center justify-center">
          {isProcessing ? (
            // Estado: Procesando
            <div className="flex flex-col items-center justify-center space-y-6 w-full">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">
                  Procesando solicitud
                </h3>
                <p className="text-sm text-slate-500">
                  Por favor espera un momento...
                </p>
              </div>
              <Spinner 
                size="lg" 
                color="default"
                variant="wave"
              />
            </div>
          ) : (
            // Estado: Exitoso
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <div className="p-4 bg-slate-100 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-slate-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                ¡Reclamación Enviada!
              </h3>
              <p className="text-slate-600 text-center max-w-md text-sm">
                Tu reclamación ha sido registrada exitosamente. Recibirás una respuesta tan pronto sea posible
              </p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
