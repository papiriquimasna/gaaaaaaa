import { useState } from 'react';
import { Avatar } from '@heroui/react';
import { Camera, CheckCircle, X } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import { useAcciones } from '../../../context/AccionesContext';

const Settings = () => {
  const { userData, updateUserData } = useUser();
  const { agregarAccion } = useAcciones();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Estado local temporal para los cambios
  const [tempData, setTempData] = useState({
    nombre: userData.nombre,
    apellidoPaterno: userData.apellido.split(' ')[0] || '',
    apellidoMaterno: userData.apellido.split(' ')[1] || '',
    genero: 'Masculino',
    dni: userData.dni,
    email: userData.email,
    rol: userData.rol,
    foto: userData.foto,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({ ...tempData, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Solo guardar la foto
    updateUserData({ foto: tempData.foto });
    
    // Registrar acción
    agregarAccion({
      tipo: 'usuario',
      titulo: 'Perfil Actualizado',
      descripcion: `${userData.nombre} ${userData.apellido} actualizó su foto de perfil`,
      usuario: `${userData.nombre} ${userData.apellido}`,
      usuarioDni: userData.dni,
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl border border-green-200/60 dark:border-green-800 p-4 flex items-center gap-3 min-w-[320px]">
            <div className="shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Cambios guardados</h4>
              <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">Tu perfil se actualizó correctamente</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="shrink-0 text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors p-1 hover:bg-white/50 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-linear-to-br from-white to-slate-50/50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-slate-200/60 dark:border-gray-700 p-8 backdrop-blur-sm">
          {/* Título */}
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8">Configuración de Perfil</h2>
          
          {/* Avatar */}
          <div className="mb-8 pb-8 border-b border-slate-200/60 dark:border-gray-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-4">Foto de perfil</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={tempData.foto}
                  size="lg"
                  name={`${tempData.nombre} ${tempData.apellidoPaterno}`}
                  className="w-24 h-24 border-3 border-slate-200 shadow-md"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute -bottom-1 -right-1 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white p-2 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-base font-semibold text-slate-800 dark:text-white">{tempData.nombre} {tempData.apellidoPaterno} {tempData.apellidoMaterno}</p>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">{tempData.rol}</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={tempData.nombre}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              {/* Apellido Paterno */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Apellido Paterno</label>
                <input
                  type="text"
                  value={tempData.apellidoPaterno}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                  placeholder="Ingresa tu apellido paterno"
                />
              </div>

              {/* Apellido Materno */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Apellido Materno</label>
                <input
                  type="text"
                  value={tempData.apellidoMaterno}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                  placeholder="Ingresa tu apellido materno"
                />
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Género</label>
                <input
                  type="text"
                  value={tempData.genero}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">DNI</label>
                <input
                  type="text"
                  value={tempData.dni}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                  maxLength={8}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={tempData.email}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 border-2 border-slate-200/60 dark:border-gray-600 rounded-xl text-sm text-slate-600 dark:text-gray-300 cursor-not-allowed shadow-sm"
                  placeholder="correo@onpe.gob.pe"
                />
              </div>
            </div>

            {/* Botón de guardar foto */}
            <div className="flex justify-end pt-6 mt-6 border-t border-slate-200/60">
              <button 
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-linear-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Guardar foto de perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;