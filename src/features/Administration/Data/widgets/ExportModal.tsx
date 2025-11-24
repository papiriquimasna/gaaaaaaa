import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { Download, X } from 'lucide-react';
import { exportPresidentes, exportAlcaldes, exportPartidos } from '../utils/dataExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const handleExport = (type: 'presidentes' | 'alcaldes' | 'partidos', format: 'csv' | 'json') => {
    if (type === 'presidentes') {
      exportPresidentes(format);
    } else if (type === 'alcaldes') {
      exportAlcaldes(format);
    } else {
      exportPartidos(format);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <>
          <ModalHeader>
            <h3 className="text-xl font-bold text-slate-800">Exportar Datos</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* Presidentes */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Candidatos Presidenciales</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onPress={() => handleExport('presidentes', 'csv')}
                    className="bg-slate-700 text-white"
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => handleExport('presidentes', 'json')}
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar JSON
                  </Button>
                </div>
              </div>

              {/* Alcaldes */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Candidatos a Alcalde</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onPress={() => handleExport('alcaldes', 'csv')}
                    className="bg-slate-700 text-white"
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => handleExport('alcaldes', 'json')}
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar JSON
                  </Button>
                </div>
              </div>

              {/* Partidos */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Partidos Políticos</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onPress={() => handleExport('partidos', 'csv')}
                    className="bg-slate-700 text-white"
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => handleExport('partidos', 'json')}
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Exportar JSON
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              <X className="w-4 h-4 mr-1" />
              Cerrar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
