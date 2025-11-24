import { useState } from 'react';
import { Upload, Download, Users, MapPin } from 'lucide-react';
import { useDisclosure } from '@heroui/react';
import ImportModal from '../widgets/ImportModal';
import ExportModal from '../widgets/ExportModal';

const GestionDatos = () => {
  const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const [importType, setImportType] = useState<'presidentes' | 'alcaldes'>('presidentes');

  const handleImportClick = (type: 'presidentes' | 'alcaldes') => {
    setImportType(type);
    onImportOpen();
  };

  const handleImportSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Gestión de Datos</h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Importa y exporta datos de candidatos en formato CSV o JSON
          </p>
        </div>

        {/* Tabla de opciones */}
        <div className="bg-linear-to-br from-white to-slate-50/50 rounded-xl md:rounded-2xl shadow-md border border-slate-200/60 overflow-hidden">
          <table className="w-full">
            <thead className="bg-linear-to-r from-slate-100 to-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Tipo de Dato
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {/* Presidentes */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Candidatos Presidenciales</p>
                      <p className="text-xs text-slate-500">Postulantes a presidente</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    Importa o exporta la lista completa de candidatos presidenciales registrados
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleImportClick('presidentes')}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
                      title="Importar"
                    >
                      <Upload className="w-4 h-4" />
                      Importar
                    </button>
                  </div>
                </td>
              </tr>

              {/* Alcaldes */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Candidatos a Alcalde</p>
                      <p className="text-xs text-slate-500">Postulantes por departamento</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    Importa o exporta candidatos a alcalde organizados por departamento
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleImportClick('alcaldes')}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
                      title="Importar"
                    >
                      <Upload className="w-4 h-4" />
                      Importar
                    </button>
                  </div>
                </td>
              </tr>

              {/* Exportar Todo */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Exportar Datos</p>
                      <p className="text-xs text-slate-500">Todos los registros</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    Descarga todos los datos del sistema en formato CSV o JSON
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={onExportOpen}
                      className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={onImportClose}
        type={importType}
        onImportSuccess={handleImportSuccess}
      />

      <ExportModal isOpen={isExportOpen} onClose={onExportClose} />
    </div>
  );
};

export default GestionDatos;
