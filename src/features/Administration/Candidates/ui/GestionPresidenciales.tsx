import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Eye, UserRoundSearch } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Pagination, Select, SelectItem } from '@heroui/react';
import Search from '../components/Search';
import InfoCandidatoPresi from '../widgets/InfoCandidatoPresi';
import DeletePresidente from '../widgets/DeletePresidente';
import RestoreCandidato from '../widgets/RestoreCandidato';
import defaultPerfil from '../../../../assets/defaultperfil.jpg';
import { useAcciones } from '../../../../context/AccionesContext';
import { dataService } from '../../../../services/dataService';

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

const GestionPresidenciales = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  // Cargar partidos y candidatos desde el servicio de datos
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
    
    // Cargar candidatos presidenciales
    const candidatosData = dataService.getCandidatos('presidente');
    const candidatosFormateados = candidatosData.map(c => {
      const partido = dataService.getPartidoById(c.partidoId);
      return {
        id: parseInt(c.id.replace('cp', '')),
        dni: c.dni,
        nombre: c.nombre,
        apellidoPaterno: c.apellidoPaterno,
        apellidoMaterno: c.apellidoMaterno,
        genero: 'Masculino',
        partidoPolitico: partido?.nombre || '',
        fotoPostulante: c.foto,
        fotoPartido: partido?.logo || '',
        estadoPostulacion: 'Aprobado' as 'Aprobado' | 'Pendiente' | 'Rechazado'
      };
    });
    setCandidates(candidatosFormateados);
  }, []);

  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    partidoPolitico: '',
    fotoPostulante: '',
    fotoPartido: '',
    estadoPostulacion: 'Pendiente' as 'Aprobado' | 'Pendiente' | 'Rechazado'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePartidoChange = (partidoId: string) => {
    const partido = partidos.find(p => p.id.toString() === partidoId);
    if (partido) {
      setFormData({
        ...formData,
        partidoPolitico: partido.nombre,
        fotoPartido: partido.logo
      });
    }
  };

  const handleImageUpload = (field: 'fotoPostulante' | 'fotoPartido', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCandidate = () => {
    setIsEditing(false);
    setFormData({
      dni: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      genero: '',
      partidoPolitico: '',
      fotoPostulante: '',
      fotoPartido: '',
      estadoPostulacion: 'Pendiente'
    });
    onOpen();
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setIsEditing(true);
    setEditingCandidate(candidate);
    setFormData({
      dni: candidate.dni,
      nombre: candidate.nombre,
      apellidoPaterno: candidate.apellidoPaterno,
      apellidoMaterno: candidate.apellidoMaterno,
      genero: candidate.genero,
      partidoPolitico: candidate.partidoPolitico,
      fotoPostulante: candidate.fotoPostulante,
      fotoPartido: candidate.fotoPartido,
      estadoPostulacion: candidate.estadoPostulacion
    });
    onOpen();
  };

  const { agregarAccion } = useAcciones();

  const handleSaveCandidate = () => {
    if (isEditing && editingCandidate) {
      const updatedCandidate = { ...editingCandidate, ...formData };
      const updatedCandidates = candidates.map(c => c.id === editingCandidate.id ? updatedCandidate : c);
      setCandidates(updatedCandidates);
      
      // Guardar en localStorage
      localStorage.setItem('candidatosPresidenciales', JSON.stringify(updatedCandidates));
      
      // Si cambió el partido, limpiar del partido anterior
      if (editingCandidate.partidoPolitico !== formData.partidoPolitico) {
        removePresidenteFromPartido(editingCandidate.partidoPolitico);
      }
      
      // Actualizar el representante presidente en el nuevo partido
      updatePartidoRepresentante(formData.partidoPolitico, `${formData.nombre} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`);
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Candidato presidencial actualizado',
        descripcion: `${formData.nombre} ${formData.apellidoPaterno} del partido ${formData.partidoPolitico} fue actualizado`,
        usuario: 'Admin Sistema'
      });
    } else {
      const newCandidate: Candidate = {
        id: candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1,
        ...formData
      };
      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates);
      
      // Guardar en localStorage
      localStorage.setItem('candidatosPresidenciales', JSON.stringify(updatedCandidates));
      
      // Actualizar el representante presidente en el partido
      updatePartidoRepresentante(formData.partidoPolitico, `${formData.nombre} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`);
      
      // Registrar acción
      agregarAccion({
        tipo: 'candidato',
        titulo: 'Nuevo candidato presidencial registrado',
        descripcion: `${formData.nombre} ${formData.apellidoPaterno} del partido ${formData.partidoPolitico} fue agregado como candidato presidencial`,
        usuario: 'Admin Sistema'
      });
    }
    onOpenChange();
  };

  const updatePartidoRepresentante = (partidoNombre: string, representanteNombre: string) => {
    const storedPartidos = localStorage.getItem('partidos');
    if (storedPartidos) {
      const partidosArray: Partido[] = JSON.parse(storedPartidos);
      const updatedPartidos = partidosArray.map(p => 
        p.nombre === partidoNombre 
          ? { ...p, representantePresidente: representanteNombre }
          : p
      );
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      setPartidos(updatedPartidos);
    }
  };

  const removePresidenteFromPartido = (partidoNombre: string) => {
    const storedPartidos = localStorage.getItem('partidos');
    if (storedPartidos) {
      const partidosArray: Partido[] = JSON.parse(storedPartidos);
      const updatedPartidos = partidosArray.map(p => 
        p.nombre === partidoNombre 
          ? { ...p, representantePresidente: '' }
          : p
      );
      localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
      setPartidos(updatedPartidos);
    }
  };

  const handleDeleteCandidate = (candidate: Candidate) => {
    setCandidateToDelete(candidate);
    onDeleteOpen();
  };

  const confirmDeleteCandidate = () => {
    if (candidateToDelete) {
      // Mover a eliminados
      const deletedCandidates = JSON.parse(localStorage.getItem('deletedCandidatosPresidenciales') || '[]');
      deletedCandidates.push({ ...candidateToDelete, deletedAt: new Date().toISOString() });
      localStorage.setItem('deletedCandidatosPresidenciales', JSON.stringify(deletedCandidates));
      
      // Eliminar de la lista actual
      const updatedCandidates = candidates.filter(c => c.id !== candidateToDelete.id);
      setCandidates(updatedCandidates);
      localStorage.setItem('candidatosPresidenciales', JSON.stringify(updatedCandidates));
      
      // Limpiar representante del partido
      const storedPartidos = localStorage.getItem('partidos');
      if (storedPartidos) {
        const partidosArray: Partido[] = JSON.parse(storedPartidos);
        const candidateName = `${candidateToDelete.nombre} ${candidateToDelete.apellidoPaterno} ${candidateToDelete.apellidoMaterno}`;
        const updatedPartidos = partidosArray.map(p => 
          p.representantePresidente === candidateName 
            ? { ...p, representantePresidente: '' }
            : p
        );
        localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
        setPartidos(updatedPartidos);
      }
      
      setCandidateToDelete(null);
    }
  };

  const handleRestoreCandidate = (candidate: Candidate) => {
    // Agregar de vuelta a la lista
    const { deletedAt, ...candidateWithoutDeletedAt } = candidate;
    const updatedCandidates = [...candidates, candidateWithoutDeletedAt];
    setCandidates(updatedCandidates);
    localStorage.setItem('candidatosPresidenciales', JSON.stringify(updatedCandidates));
    
    // Eliminar de eliminados
    const deletedCandidates = JSON.parse(localStorage.getItem('deletedCandidatosPresidenciales') || '[]');
    const updatedDeleted = deletedCandidates.filter((c: Candidate) => c.id !== candidate.id);
    localStorage.setItem('deletedCandidatosPresidenciales', JSON.stringify(updatedDeleted));
    
    // Restaurar como representante del partido
    updatePartidoRepresentante(candidate.partidoPolitico, `${candidate.nombre} ${candidate.apellidoPaterno} ${candidate.apellidoMaterno}`);
  };

  const handleViewInfo = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    onInfoOpen();
  };

  // Filtrar candidatos según la búsqueda
  const filteredCandidates = useMemo(() => {
    if (!searchQuery) return candidates;
    
    const query = searchQuery.toLowerCase();
    return candidates.filter((candidate) => 
      candidate.dni.toLowerCase().includes(query) ||
      candidate.nombre.toLowerCase().includes(query) ||
      candidate.apellidoPaterno.toLowerCase().includes(query) ||
      candidate.apellidoMaterno.toLowerCase().includes(query) ||
      candidate.partidoPolitico.toLowerCase().includes(query) ||
      candidate.estadoPostulacion.toLowerCase().includes(query)
    );
  }, [candidates, searchQuery]);

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

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
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Gestión de Postulantes Presidenciales</h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1">Administra los candidatos presidenciales del proceso electoral</p>
          </div>

          {/* Buscador y Botón Agregar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Search 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por DNI, nombre, apellido, partido o estado..."
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
                onClick={handleAddCandidate}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs md:text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg justify-center whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Agregar Postulante
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de candidatos */}
        <div className="bg-linear-to-br from-white to-slate-50/50 rounded-xl md:rounded-2xl shadow-md border border-slate-200/60 overflow-hidden min-h-[540px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-linear-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Foto</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">DNI</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Paterno</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Materno</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Género</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Partido Político</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Estado</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {currentCandidates.length === 0 ? (
                  <tr style={{ height: '448px' }}>
                    <td colSpan={9} className="px-6 text-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">No hay postulantes registrados</h3>
                        <p className="text-sm text-slate-400">Agrega el primer postulante presidencial</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {currentCandidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors" style={{ height: '64px' }}>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <img 
                            src={candidate.fotoPostulante || defaultPerfil} 
                            alt={candidate.nombre}
                            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                          />
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-slate-800">{candidate.dni}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{candidate.nombre}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{candidate.apellidoPaterno}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{candidate.apellidoMaterno}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{candidate.genero}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {candidate.fotoPartido && (
                              <img 
                                src={candidate.fotoPartido} 
                                alt={candidate.partidoPolitico}
                                className="w-8 h-8 rounded object-cover border border-slate-200"
                              />
                            )}
                            <span className="text-xs md:text-sm text-slate-600">{candidate.partidoPolitico}</span>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg ${getStatusColor(candidate.estadoPostulacion)}`}>
                            {candidate.estadoPostulacion}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1 md:gap-2">
                            <button
                              onClick={() => handleViewInfo(candidate)}
                              className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver información"
                            >
                              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleEditCandidate(candidate)}
                              className="p-1.5 md:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCandidate(candidate)}
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
                    {Array.from({ length: Math.max(0, itemsPerPage - currentCandidates.length) }).map((_, index) => (
                      <tr key={`empty-${index}`} style={{ height: '64px' }}>
                        <td colSpan={9} className="px-6 py-4">&nbsp;</td>
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
              wrapper: "gap-1 md:gap-2",
              item: "w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm min-w-7 md:min-w-8",
              cursor: "bg-slate-700 text-white font-semibold"
            }}
          />
        </div>
      </div>

      {/* Modal para agregar/editar postulante */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl"
        isDismissable={false}
        hideCloseButton={false}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-800">
                  {isEditing ? 'Editar Postulante' : 'Agregar Nuevo Postulante'}
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Fotos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Foto del Postulante */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Foto del Postulante</label>
                      <div className="flex flex-col items-center gap-3">
                        <img 
                          src={formData.fotoPostulante || defaultPerfil} 
                          alt="Postulante"
                          className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('fotoPostulante', e)}
                            className="hidden"
                          />
                          <span className="inline-block py-2 px-4 rounded-lg border-0 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                            Seleccionar archivo
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Vista Previa del Logo del Partido */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Logo del Partido</label>
                      <div className="flex flex-col items-center gap-3">
                        {formData.fotoPartido ? (
                          <img 
                            src={formData.fotoPartido} 
                            alt="Partido"
                            className="w-32 h-32 rounded-lg object-cover border-4 border-slate-200"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-lg bg-slate-100 border-4 border-slate-200 flex items-center justify-center">
                            <span className="text-slate-400 text-xs">Selecciona un partido</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-500 text-center">
                          El logo se asigna automáticamente al seleccionar el partido
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Datos personales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DNI */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">DNI</label>
                      <input
                        type="text"
                        value={formData.dni}
                        onChange={(e) => handleInputChange('dni', e.target.value.replace(/\D/g, '').slice(0, 8))}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                        placeholder="12345678"
                        maxLength={8}
                      />
                    </div>

                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                        placeholder="Juan Carlos"
                      />
                    </div>

                    {/* Apellido Paterno */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Paterno</label>
                      <input
                        type="text"
                        value={formData.apellidoPaterno}
                        onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                        placeholder="Pérez"
                      />
                    </div>

                    {/* Apellido Materno */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Apellido Materno</label>
                      <input
                        type="text"
                        value={formData.apellidoMaterno}
                        onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                        placeholder="García"
                      />
                    </div>

                    {/* Género */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Género</label>
                      <Select
                        selectedKeys={[formData.genero]}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        variant="bordered"
                        placeholder="Selecciona un género"
                        aria-label="Género"
                        disallowEmptySelection={false}
                        classNames={{
                          trigger: "border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]",
                          value: "text-sm"
                        }}
                      >
                        <SelectItem key="Masculino">Masculino</SelectItem>
                        <SelectItem key="Femenino">Femenino</SelectItem>
                        <SelectItem key="Otro">Otro</SelectItem>
                      </Select>
                    </div>

                    {/* Partido Político */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Partido Político</label>
                      <Select
                        selectedKeys={formData.partidoPolitico ? [partidos.find(p => p.nombre === formData.partidoPolitico)?.id.toString() || ''] : []}
                        onChange={(e) => handlePartidoChange(e.target.value)}
                        variant="bordered"
                        placeholder="Selecciona un partido"
                        aria-label="Partido Político"
                        disallowEmptySelection={false}
                        classNames={{
                          trigger: "border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]",
                          value: "text-sm"
                        }}
                        renderValue={(items) => {
                          return items.map((item) => {
                            const partido = partidos.find(p => p.id.toString() === item.key);
                            return partido ? (
                              <div key={item.key} className="flex items-center gap-2">
                                {partido.logo && (
                                  <img src={partido.logo} alt={partido.nombre} className="w-5 h-5 rounded object-cover" />
                                )}
                                <span>{partido.nombre}</span>
                              </div>
                            ) : null;
                          });
                        }}
                      >
                        {partidos.filter(p => p.estado === 'Activo').map((partido) => (
                          <SelectItem key={partido.id.toString()} textValue={partido.nombre}>
                            <div className="flex items-center gap-2">
                              {partido.logo && (
                                <img src={partido.logo} alt={partido.nombre} className="w-6 h-6 rounded object-cover" />
                              )}
                              <span>{partido.nombre}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Estado de Postulación */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Estado de Postulación</label>
                      <Select
                        selectedKeys={[formData.estadoPostulacion]}
                        onChange={(e) => handleInputChange('estadoPostulacion', e.target.value)}
                        variant="bordered"
                        placeholder="Selecciona un estado"
                        aria-label="Estado de Postulación"
                        disallowEmptySelection={false}
                        classNames={{
                          trigger: "border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]",
                          value: "text-sm"
                        }}
                      >
                        <SelectItem key="Pendiente">Pendiente</SelectItem>
                        <SelectItem key="Aprobado">Aprobado</SelectItem>
                        <SelectItem key="Rechazado">Rechazado</SelectItem>
                      </Select>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button onPress={handleSaveCandidate} className="bg-slate-700 text-white">
                  <Save className="w-4 h-4 mr-1" />
                  {isEditing ? 'Guardar Cambios' : 'Agregar Postulante'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de información del candidato */}
      <InfoCandidatoPresi
        isOpen={isInfoOpen}
        onClose={onInfoClose}
        candidate={selectedCandidate}
      />

      {/* Modal para eliminar candidato */}
      <DeletePresidente
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        candidate={candidateToDelete}
        onConfirm={confirmDeleteCandidate}
      />

      {/* Modal para restaurar candidato */}
      <RestoreCandidato
        isOpen={isRestoreOpen}
        onClose={onRestoreClose}
        onRestore={handleRestoreCandidate}
      />
    </div>
  );
};

export default GestionPresidenciales;
