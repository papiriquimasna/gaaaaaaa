import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, UserRoundSearch } from 'lucide-react';
import { useDisclosure, Pagination } from '@heroui/react';
import Search from '../components/Search';
import InfoAlcalde from '../widgets/InfoAlcalde';
import DeleteAlcalde from '../widgets/DeleteAlcalde';
import RestoreAlcalde from '../widgets/RestoreAlcalde';
import CreateAlcalde from '../widgets/CreateAlcalde';
import defaultPerfil from '../../../../assets/defaultperfil.jpg';
import { useAcciones } from '../../../../context/AccionesContext';
import { dataService } from '../../../../services/dataService';

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
  deletedAt?: string;
}

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
}

const GestionAlcaldes = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();

  const [alcaldes, setAlcaldes] = useState<Alcalde[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [editingAlcalde, setEditingAlcalde] = useState<Alcalde | null>(null);
  const [selectedAlcalde, setSelectedAlcalde] = useState<Alcalde | null>(null);
  const [alcaldeToDelete, setAlcaldeToDelete] = useState<Alcalde | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  // Cargar partidos y alcaldes desde el servicio de datos
  useEffect(() => {
    // Cargar partidos
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
    
    // Cargar candidatos a alcalde
    const alcaldesData = dataService.getCandidatos('alcalde');
    const alcaldesFormateados = alcaldesData.map(c => {
      const partido = dataService.getPartidoById(c.partidoId);
      return {
        id: parseInt(c.id.replace('ca', '')),
        dni: c.dni,
        nombre: c.nombre,
        apellidoPaterno: c.apellidoPaterno,
        apellidoMaterno: c.apellidoMaterno,
        genero: 'Masculino',
        departamento: 'Lima',
        partidoPolitico: partido?.nombre || '',
        fotoPostulante: c.foto,
        fotoPartido: partido?.logo || '',
        estadoPostulacion: 'Aprobado' as 'Aprobado' | 'Pendiente' | 'Rechazado'
      };
    });
    setAlcaldes(alcaldesFormateados);
  }, []);

  const handleAddAlcalde = () => {
    setIsEditing(false);
    setEditingAlcalde(null);
    onOpen();
  };

  const handleEditAlcalde = (alcalde: Alcalde) => {
    setIsEditing(true);
    setEditingAlcalde(alcalde);
    onOpen();
  };

  const { agregarAccion } = useAcciones();

  const handleSaveAlcalde = (alcaldeData: Omit<Alcalde, 'id'>) => {
    if (isEditing && editingAlcalde) {
      const updatedAlcalde = { ...editingAlcalde, ...alcaldeData };
      const updatedAlcaldes = alcaldes.map((a) => (a.id === editingAlcalde.id ? updatedAlcalde : a));
      setAlcaldes(updatedAlcaldes);

      // Guardar en localStorage
      localStorage.setItem('candidatosAlcaldes', JSON.stringify(updatedAlcaldes));

      // Si cambió el partido, limpiar del partido anterior
      if (editingAlcalde.partidoPolitico !== alcaldeData.partidoPolitico) {
        removeAlcaldeFromPartido(editingAlcalde.partidoPolitico, editingAlcalde.departamento);
      }

      // Actualizar el representante alcalde en el nuevo partido
      const alcaldeNombre = `${alcaldeData.nombre} ${alcaldeData.apellidoPaterno} ${alcaldeData.apellidoMaterno}`;
      updatePartidoRepresentante(alcaldeData.partidoPolitico, alcaldeNombre, alcaldeData.departamento);
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Candidato alcalde actualizado',
        descripcion: `${alcaldeNombre} del partido ${alcaldeData.partidoPolitico} - ${alcaldeData.departamento} fue actualizado`,
        usuario: 'Admin Sistema'
      });
    } else {
      const newAlcalde: Alcalde = {
        id: alcaldes.length > 0 ? Math.max(...alcaldes.map((a) => a.id)) + 1 : 1,
        ...alcaldeData,
      };
      const updatedAlcaldes = [...alcaldes, newAlcalde];
      setAlcaldes(updatedAlcaldes);

      // Guardar en localStorage
      localStorage.setItem('candidatosAlcaldes', JSON.stringify(updatedAlcaldes));

      // Actualizar el representante alcalde en el partido
      const alcaldeNombre = `${alcaldeData.nombre} ${alcaldeData.apellidoPaterno} ${alcaldeData.apellidoMaterno}`;
      updatePartidoRepresentante(alcaldeData.partidoPolitico, alcaldeNombre, alcaldeData.departamento);
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Nuevo candidato alcalde registrado',
        descripcion: `${alcaldeNombre} del partido ${alcaldeData.partidoPolitico} fue agregado como candidato alcalde de ${alcaldeData.departamento}`,
        usuario: 'Admin Sistema'
      });
    }
  };

  const updatePartidoRepresentante = (partidoNombre: string, alcaldeNombre: string, departamento: string) => {
    const storedPartidos = localStorage.getItem('partidos');
    if (storedPartidos) {
      const partidosArray: Partido[] = JSON.parse(storedPartidos);
      const updatedPartidos = partidosArray.map((p) => {
        if (p.nombre === partidoNombre) {
          // Inicializar array si no existe
          const alcaldes = p.representantesAlcaldes || [];
          // Buscar si ya existe un alcalde para este departamento
          const existingIndex = alcaldes.findIndex(a => a.departamento === departamento);
          
          let updatedAlcaldes;
          if (existingIndex >= 0) {
            // Actualizar alcalde existente
            updatedAlcaldes = [...alcaldes];
            updatedAlcaldes[existingIndex] = { departamento, nombreCompleto: alcaldeNombre };
          } else {
            // Agregar nuevo alcalde
            updatedAlcaldes = [...alcaldes, { departamento, nombreCompleto: alcaldeNombre }];
          }
          
          return { ...p, representantesAlcaldes: updatedAlcaldes };
        }
        return p;
      });
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      setPartidos(updatedPartidos);
    }
  };

  const removeAlcaldeFromPartido = (partidoNombre: string, departamento: string) => {
    const storedPartidos = localStorage.getItem('partidos');
    if (storedPartidos) {
      const partidosArray: Partido[] = JSON.parse(storedPartidos);
      const updatedPartidos = partidosArray.map((p) => {
        if (p.nombre === partidoNombre) {
          const alcaldes = p.representantesAlcaldes || [];
          const updatedAlcaldes = alcaldes.filter(a => a.departamento !== departamento);
          return { ...p, representantesAlcaldes: updatedAlcaldes };
        }
        return p;
      });
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      setPartidos(updatedPartidos);
    }
  };

  const handleDeleteAlcalde = (alcalde: Alcalde) => {
    setAlcaldeToDelete(alcalde);
    onDeleteOpen();
  };

  const confirmDeleteAlcalde = () => {
    if (alcaldeToDelete) {
      // Mover a eliminados
      const deletedAlcaldes = JSON.parse(localStorage.getItem('deletedCandidatosAlcaldes') || '[]');
      deletedAlcaldes.push({ ...alcaldeToDelete, deletedAt: new Date().toISOString() });
      localStorage.setItem('deletedCandidatosAlcaldes', JSON.stringify(deletedAlcaldes));

      // Eliminar de la lista actual
      const updatedAlcaldes = alcaldes.filter((a) => a.id !== alcaldeToDelete.id);
      setAlcaldes(updatedAlcaldes);
      localStorage.setItem('candidatosAlcaldes', JSON.stringify(updatedAlcaldes));

      setAlcaldeToDelete(null);
    }
  };

  const handleRestoreAlcalde = (alcalde: Alcalde) => {
    // Agregar de vuelta a la lista
    const { deletedAt, ...alcaldeWithoutDeletedAt } = alcalde;
    const updatedAlcaldes = [...alcaldes, alcaldeWithoutDeletedAt];
    setAlcaldes(updatedAlcaldes);
    localStorage.setItem('candidatosAlcaldes', JSON.stringify(updatedAlcaldes));

    // Eliminar de eliminados
    const deletedAlcaldes = JSON.parse(localStorage.getItem('deletedCandidatosAlcaldes') || '[]');
    const updatedDeleted = deletedAlcaldes.filter((a: Alcalde) => a.id !== alcalde.id);
    localStorage.setItem('deletedCandidatosAlcaldes', JSON.stringify(updatedDeleted));

    // Restaurar como representante del partido
    const alcaldeNombre = `${alcalde.nombre} ${alcalde.apellidoPaterno} ${alcalde.apellidoMaterno}`;
    updatePartidoRepresentante(alcalde.partidoPolitico, alcaldeNombre, alcalde.departamento);
  };

  const handleViewInfo = (alcalde: Alcalde) => {
    setSelectedAlcalde(alcalde);
    onInfoOpen();
  };

  // Filtrar alcaldes según la búsqueda
  const filteredAlcaldes = useMemo(() => {
    if (!searchQuery) return alcaldes;

    const query = searchQuery.toLowerCase();
    return alcaldes.filter(
      (alcalde) =>
        alcalde.dni.toLowerCase().includes(query) ||
        alcalde.nombre.toLowerCase().includes(query) ||
        alcalde.apellidoPaterno.toLowerCase().includes(query) ||
        alcalde.apellidoMaterno.toLowerCase().includes(query) ||
        alcalde.departamento.toLowerCase().includes(query) ||
        alcalde.partidoPolitico.toLowerCase().includes(query) ||
        alcalde.estadoPostulacion.toLowerCase().includes(query)
    );
  }, [alcaldes, searchQuery]);

  const totalPages = Math.ceil(filteredAlcaldes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlcaldes = filteredAlcaldes.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rechazado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Gestión de Candidatos a Alcalde
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Administra los candidatos a alcalde por departamento
            </p>
          </div>

          {/* Buscador y Botón Agregar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por DNI, nombre, departamento, partido o estado..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onRestoreOpen}
                className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all shadow-sm hover:shadow-md"
                title="Restaurar candidato"
              >
                <UserRoundSearch className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddAlcalde}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs md:text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg justify-center whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Agregar Candidato
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de alcaldes */}
        <div className="bg-linear-to-br from-white to-slate-50/50 rounded-xl md:rounded-2xl shadow-md border border-slate-200/60 overflow-hidden min-h-[540px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-linear-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Partido Político
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
                {currentAlcaldes.length === 0 ? (
                  <tr style={{ height: '448px' }}>
                    <td colSpan={6} className="px-6 text-center">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">
                          No hay candidatos registrados
                        </h3>
                        <p className="text-sm text-slate-400">
                          Agrega el primer candidato a alcalde
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {currentAlcaldes.map((alcalde) => (
                      <tr
                        key={alcalde.id}
                        className="hover:bg-slate-50/50 transition-colors"
                        style={{ height: '64px' }}
                      >
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                              <img
                                src={alcalde.fotoPostulante || defaultPerfil}
                                alt={alcalde.nombre}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs md:text-sm font-medium text-slate-800 truncate">
                                {alcalde.nombre} {alcalde.apellidoPaterno}
                              </p>
                              <p className="text-xs text-slate-500 truncate">{alcalde.genero}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-slate-800">
                          {alcalde.dni}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-slate-800">
                          {alcalde.departamento}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {alcalde.fotoPartido && (
                              <img
                                src={alcalde.fotoPartido}
                                alt={alcalde.partidoPolitico}
                                className="w-8 h-8 rounded object-cover border border-slate-200"
                              />
                            )}
                            <span className="text-xs md:text-sm text-slate-600">
                              {alcalde.partidoPolitico}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg ${getStatusColor(alcalde.estadoPostulacion)}`}
                          >
                            {alcalde.estadoPostulacion}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1 md:gap-2">
                            <button
                              onClick={() => handleViewInfo(alcalde)}
                              className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver información"
                            >
                              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleEditAlcalde(alcalde)}
                              className="p-1.5 md:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAlcalde(alcalde)}
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
                      length: Math.max(0, itemsPerPage - currentAlcaldes.length),
                    }).map((_, index) => (
                      <tr key={`empty-${index}`} style={{ height: '64px' }}>
                        <td colSpan={6} className="px-6 py-4">
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

      {/* Modal para agregar/editar alcalde */}
      <CreateAlcalde
        isOpen={isOpen}
        onClose={onOpenChange}
        alcalde={editingAlcalde}
        onSave={handleSaveAlcalde}
        isEditing={isEditing}
        partidos={partidos}
      />

      {/* Modal de información del alcalde */}
      <InfoAlcalde isOpen={isInfoOpen} onClose={onInfoClose} alcalde={selectedAlcalde} />

      {/* Modal para eliminar alcalde */}
      <DeleteAlcalde
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        alcalde={alcaldeToDelete}
        onConfirm={confirmDeleteAlcalde}
      />

      {/* Modal para restaurar alcalde */}
      <RestoreAlcalde
        isOpen={isRestoreOpen}
        onClose={onRestoreClose}
        onRestore={handleRestoreAlcalde}
      />
    </div>
  );
};

export default GestionAlcaldes;
