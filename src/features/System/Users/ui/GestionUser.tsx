import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, UserRoundSearch } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Pagination, Select, SelectItem } from '@heroui/react';
import Search from '../components/Search';
import RestoreUser from '../widgets/RestoreUser';
import DeleteUser from '../widgets/DeleteUser';
import { dataService } from '../../../../services/dataService';

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

const Users = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    correo: '',
    rol: ''
  });

  // Cargar usuarios desde el servicio de datos
  useEffect(() => {
    const usuariosData = dataService.getUsuarios();
    const usuariosFormateados = usuariosData.map((u, index) => ({
      id: index + 1,
      dni: u.dni,
      nombre: u.nombre,
      apellidoPaterno: u.apellidoPaterno,
      apellidoMaterno: u.apellidoMaterno,
      genero: 'Masculino',
      correo: u.email,
      rol: u.rol
    }));
    setUsers(usuariosFormateados);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setFormData({
      dni: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      genero: '',
      correo: '',
      rol: ''
    });
    onOpen();
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setEditingUser(user);
    setFormData({
      dni: user.dni,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      genero: user.genero,
      correo: user.correo,
      rol: user.rol
    });
    onOpen();
  };

  const handleSaveUser = () => {
    if (isEditing && editingUser) {
      const updatedUser = { ...editingUser, ...formData };
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      
      // Actualizar en localStorage
      const existingData = localStorage.getItem(`userData_${formData.dni}`);
      const existingFoto = existingData ? JSON.parse(existingData).foto : '';
      
      const userDataToSave = {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
        email: formData.correo,
        rol: formData.rol,
        foto: existingFoto // Mantener la foto existente
      };
      localStorage.setItem(`userData_${formData.dni}`, JSON.stringify(userDataToSave));
      
      // Si es el usuario actual, actualizar también userData general
      const currentUserDni = localStorage.getItem('userDni');
      if (currentUserDni === formData.dni) {
        localStorage.setItem('userData', JSON.stringify(userDataToSave));
      }
    } else {
      const newUser: User = {
        id: users.length + 1,
        ...formData
      };
      setUsers([...users, newUser]);
      
      // Guardar nuevo usuario en localStorage
      const userDataToSave = {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
        email: formData.correo,
        rol: formData.rol,
        foto: '' // Sin foto por defecto
      };
      localStorage.setItem(`userData_${formData.dni}`, JSON.stringify(userDataToSave));
    }
    onOpenChange();
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    onDeleteOpen();
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Guardar usuario eliminado en localStorage
      const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]');
      deletedUsers.push({ ...userToDelete, deletedAt: new Date().toISOString() });
      localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
      
      // Eliminar de la lista actual
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const handleRestoreUser = (user: User) => {
    // Agregar usuario de vuelta a la lista
    const { deletedAt, ...userWithoutDeletedAt } = user;
    setUsers([...users, userWithoutDeletedAt]);
    
    // Eliminar de usuarios eliminados en localStorage
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]');
    const updatedDeletedUsers = deletedUsers.filter((u: User) => u.id !== user.id);
    localStorage.setItem('deletedUsers', JSON.stringify(updatedDeletedUsers));
  };

  // Filtrar usuarios según la búsqueda
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter((user) => 
      user.dni.toLowerCase().includes(query) ||
      user.nombre.toLowerCase().includes(query) ||
      user.apellidoPaterno.toLowerCase().includes(query) ||
      user.apellidoMaterno.toLowerCase().includes(query) ||
      user.correo.toLowerCase().includes(query) ||
      user.rol.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-slate-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">Gestión de Usuarios</h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">Administra los usuarios del sistema electoral</p>
          </div>

          {/* Buscador y Botón Agregar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Search 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por DNI, nombre, apellido, correo o rol..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onRestoreOpen}
                className="flex items-center justify-center p-2.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 rounded-xl transition-all shadow-sm hover:shadow-md"
                title="Restaurar usuario"
              >
                <UserRoundSearch className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-xs md:text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg justify-center whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Agregar Usuario
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-linear-to-br from-white to-slate-50/50 rounded-xl md:rounded-2xl shadow-md border border-slate-200/60 overflow-hidden min-h-[540px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-linear-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">DNI</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Paterno</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Apellido Materno</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Género</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Correo</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Rol</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-slate-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {currentUsers.length === 0 ? (
                  <tr style={{ height: '448px' }}>
                    <td colSpan={8} className="px-6 text-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">No hay datos disponibles</h3>
                        <p className="text-sm text-slate-400">Los datos aparecerán aquí cuando estén disponibles</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors" style={{ height: '64px' }}>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-slate-800">{user.dni}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{user.nombre}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{user.apellidoPaterno}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{user.apellidoMaterno}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{user.genero}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-slate-600">{user.correo}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg ${
                            user.rol === 'Administrador' 
                              ? 'bg-slate-700 text-white' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {user.rol}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1 md:gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-1.5 md:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
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
                    {Array.from({ length: Math.max(0, itemsPerPage - currentUsers.length) }).map((_, index) => (
                      <tr key={`empty-${index}`} style={{ height: '64px' }}>
                        <td colSpan={8} className="px-6 py-4">&nbsp;</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación fuera de la tabla - siempre visible */}
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

      {/* Modal para agregar/editar usuario */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="2xl"
        isDismissable={false}
        hideCloseButton={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-800">
                  {isEditing ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </h3>
              </ModalHeader>
              <ModalBody>
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

                  {/* Correo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange('correo', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                      placeholder="usuario@onpe.gob.pe"
                    />
                  </div>

                  {/* Rol */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rol del Sistema</label>
                    <Select
                      selectedKeys={[formData.rol]}
                      onChange={(e) => handleInputChange('rol', e.target.value)}
                      variant="bordered"
                      placeholder="Selecciona un rol"
                      aria-label="Rol del Sistema"
                      disallowEmptySelection={false}
                      classNames={{
                        trigger: "border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]",
                        value: "text-sm"
                      }}
                    >
                      <SelectItem key="Usuario">Usuario</SelectItem>
                      <SelectItem key="Administrador">Administrador</SelectItem>
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button onPress={handleSaveUser} className="bg-slate-700 text-white">
                  <Save className="w-4 h-4 mr-1" />
                  {isEditing ? 'Guardar Cambios' : 'Agregar Usuario'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal para restaurar usuario */}
      <RestoreUser
        isOpen={isRestoreOpen}
        onClose={onRestoreClose}
        onRestore={handleRestoreUser}
      />

      {/* Modal para eliminar usuario */}
      <DeleteUser
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        user={userToDelete}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
};

export default Users;