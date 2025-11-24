import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, UserRoundSearch } from 'lucide-react';
import { useDisclosure, Pagination } from '@heroui/react';
import Search from '../components/Search';
import CreatePartido from '../widgets/CreatePartido';
import DeletePartido from '../widgets/DeletePartido';
import InfoPartido from '../widgets/InfoPartido';
import RestorePartido from '../widgets/RestorePartido';
import { useAcciones } from '../../../../context/AccionesContext';
import { dataService } from '../../../../services/dataService';

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
  deletedAt?: string;
}

const PartidosPoliticos = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();

  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [editingPartido, setEditingPartido] = useState<Partido | null>(null);
  const [selectedPartido, setSelectedPartido] = useState<Partido | null>(null);
  const [partidoToDelete, setPartidoToDelete] = useState<Partido | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  // Cargar partidos desde el servicio de datos
  useEffect(() => {
    const partidosData = dataService.getPartidos();
    const partidosFormateados = partidosData.map(p => ({
      id: parseInt(p.id.replace('p', '')),
      nombre: p.nombre,
      siglas: p.siglas,
      logo: p.logo,
      representantePresidente: '',
      representantesAlcaldes: [],
      estado: 'Activo' as 'Activo' | 'Inactivo'
    }));
    setPartidos(partidosFormateados);
  }, []);

  const handleAddPartido = () => {
    setIsEditing(false);
    setEditingPartido(null);
    onOpen();
  };

  const handleEditPartido = (partido: Partido) => {
    setIsEditing(true);
    setEditingPartido(partido);
    onOpen();
  };

  const { agregarAccion } = useAcciones();

  const handleSavePartido = (partidoData: Omit<Partido, 'id' | 'representantePresidente' | 'representantesAlcaldes'>) => {
    if (isEditing && editingPartido) {
      // Mantener los representantes existentes al editar
      const updatedPartido = { 
        ...editingPartido, 
        ...partidoData,
        representantePresidente: editingPartido.representantePresidente,
        representantesAlcaldes: editingPartido.representantesAlcaldes || []
      };
      const updatedPartidos = partidos.map((p) => (p.id === editingPartido.id ? updatedPartido : p));
      setPartidos(updatedPartidos);
      
      // Guardar en localStorage
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Partido político actualizado',
        descripcion: `${partidoData.nombre} (${partidoData.siglas}) fue actualizado en el sistema`,
        usuario: 'Admin Sistema'
      });
    } else {
      const newPartido: Partido = {
        id: partidos.length > 0 ? Math.max(...partidos.map(p => p.id)) + 1 : 1,
        ...partidoData,
        representantePresidente: '',
        representantesAlcaldes: []
      };
      const updatedPartidos = [...partidos, newPartido];
      setPartidos(updatedPartidos);
      
      // Guardar en localStorage
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Nuevo partido político registrado',
        descripcion: `${partidoData.nombre} (${partidoData.siglas}) fue agregado al sistema electoral`,
        usuario: 'Admin Sistema'
      });
    }
  };

  const handleDeletePartido = (partido: Partido) => {
    setPartidoToDelete(partido);
    onDeleteOpen();
  };

  const confirmDeletePartido = () => {
    if (partidoToDelete) {
      // Mover a eliminados
      const deletedPartidos = JSON.parse(localStorage.getItem('deletedPartidos') || '[]');
      deletedPartidos.push({ ...partidoToDelete, deletedAt: new Date().toISOString() });
      localStorage.setItem('deletedPartidos', JSON.stringify(deletedPartidos));
      
      // Eliminar de la lista actual
      const updatedPartidos = partidos.filter((p) => p.id !== partidoToDelete.id);
      setPartidos(updatedPartidos);
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      
      setPartidoToDelete(null);
    }
  };

  const handleRestorePartido = (partido: Partido) => {
    // Agregar de vuelta a la lista
    const { deletedAt, ...partidoWithoutDeletedAt } = partido;
    const updatedPartidos = [...partidos, partidoWithoutDeletedAt];
    setPartidos(updatedPartidos);
    localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
    
    // Eliminar de eliminados
    const deletedPartidos = JSON.parse(localStorage.getItem('deletedPartidos') || '[]');
    const updatedDeleted = deletedPartidos.filter((p: Partido) => p.id !== partido.id);
    localStorage.setItem('deletedPartidos', JSON.stringify(updatedDeleted));
  };

  const handleViewInfo = (partido: Partido) => {
    setSelectedPartido(partido);
    onInfoOpen();
  };

  // Filtrar partidos según la búsqueda
  const filteredPartidos = useMemo(() => {
    if (!searchQuery) return partidos;

    const query = searchQuery.toLowerCase();
    return partidos.filter(
      (partido) =>
        partido.nombre.toLowerCase().includes(query) ||
        partido.siglas.toLowerCase().includes(query) ||
        partido.estado.toLowerCase().includes(query)
    );
  }, [partidos, searchQuery]);

  const totalPages = Math.ceil(filteredPartidos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartidos = filteredPartidos.slice(startIndex, endIndex);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Gestión de Partidos Políticos
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Administra los partidos políticos del proceso electoral
            </p>
          </div>

          {/* Buscador y Botón Agregar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por nombre, siglas o estado..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onRestoreOpen}
                className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all shadow-sm hover:shadow-md"
                title="Restaurar partido"
              >
                <UserRoundSearch className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddPartido}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs md:text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg justify-center whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Agregar Partido
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de partidos */}
        <div className="bg-linear-to-br from-white to-slate-50/50 rounded-xl md:rounded-2xl shadow-md border border-slate-200/60 overflow-hidden min-h-[540px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-linear-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Siglas
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Rep. Presidente
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Rep. Alcalde
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {currentPartidos.length === 0 ? (
                  <tr style={{ height: '448px' }}>
                    <td colSpan={7} className="px-6 text-center">
                      <div className="flex flex-col items-center justify-center h-full">
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
                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">
                          No hay partidos registrados
                        </h3>
                        <p className="text-sm text-slate-400">
                          Agrega el primer partido político
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {currentPartidos.map((partido) => (
                      <tr
                        key={partido.id}
                        className="hover:bg-slate-50/50 transition-colors"
                        style={{ height: '64px' }}
                      >
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          {partido.logo ? (
                            <img
                              src={partido.logo}
                              alt={partido.nombre}
                              className="w-10 h-10 rounded-lg object-cover border-2 border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                              <span className="text-slate-400 text-[10px]">Sin logo</span>
                            </div>
                          )}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-slate-800">
                          {partido.nombre}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">
                          {partido.siglas}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">
                          {partido.representantePresidente || '-'}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">
                          {partido.representantesAlcaldes && partido.representantesAlcaldes.length > 0
                            ? `${partido.representantesAlcaldes.length} alcalde${partido.representantesAlcaldes.length > 1 ? 's' : ''}`
                            : '-'}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg ${
                              partido.estado === 'Activo'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {partido.estado}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1 md:gap-2">
                            <button
                              onClick={() => handleViewInfo(partido)}
                              className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver información"
                            >
                              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleEditPartido(partido)}
                              className="p-1.5 md:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePartido(partido)}
                              className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Filas vacías para mantener altura mínima */}
                    {Array.from({
                      length: Math.max(0, itemsPerPage - currentPartidos.length),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} style={{ height: '64px' }}>
                        <td colSpan={7} className="px-6 py-4">
                          &nbsp;
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        <div className="flex justify-center sm:justify-end mt-4">
          <Pagination
            showControls
            total={totalPages || 1}
            page={currentPage}
            onChange={setCurrentPage}
            classNames={{
              wrapper: 'gap-1 md:gap-2',
              item: 'w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm min-w-7 md:min-w-8',
              cursor: 'bg-slate-700 text-white font-semibold',
            }}
          />
        </div>
      </div>

      {/* Modal para agregar/editar partido */}
      <CreatePartido
        isOpen={isOpen}
        onClose={onOpenChange}
        partido={editingPartido}
        onSave={handleSavePartido}
        isEditing={isEditing}
      />

      {/* Modal para eliminar partido */}
      <DeletePartido
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        partido={partidoToDelete}
        onConfirm={confirmDeletePartido}
      />

      {/* Modal de información del partido */}
      <InfoPartido isOpen={isInfoOpen} onClose={onInfoClose} partido={selectedPartido} />

      {/* Modal para restaurar partido */}
      <RestorePartido
        isOpen={isRestoreOpen}
        onClose={onRestoreClose}
        onRestore={handleRestorePartido}
      />
    </div>
  );
};

export default PartidosPoliticos;
