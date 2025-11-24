import { Clock, UserPlus, FileText, Vote, AlertCircle, Database, LogIn } from 'lucide-react';
import { useAcciones } from '../../../../context/AccionesContext';
import { useUser } from '../../../../context/UserContext';

const getIcono = (tipo: string) => {
  switch (tipo) {
    case 'usuario':
      return <UserPlus className="w-5 h-5" />;
    case 'candidato':
      return <FileText className="w-5 h-5" />;
    case 'votacion':
      return <Vote className="w-5 h-5" />;
    case 'reclamacion':
      return <AlertCircle className="w-5 h-5" />;
    case 'datos':
      return <Database className="w-5 h-5" />;
    case 'login':
      return <LogIn className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

const getColor = (tipo: string) => {
  switch (tipo) {
    case 'usuario':
      return 'bg-blue-100 text-blue-600';
    case 'candidato':
      return 'bg-green-100 text-green-600';
    case 'votacion':
      return 'bg-purple-100 text-purple-600';
    case 'reclamacion':
      return 'bg-orange-100 text-orange-600';
    case 'datos':
      return 'bg-cyan-100 text-cyan-600';
    case 'login':
      return 'bg-indigo-100 text-indigo-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const AccionesRecientes = () => {
  const { acciones } = useAcciones();
  const { userData } = useUser();
  const isAdmin = userData.rol === 'Administrador';

  // Filtrar acciones según el rol
  const accionesFiltradas = isAdmin 
    ? acciones.slice(0, 10) // Admin ve todas las acciones (últimas 10)
    : acciones.filter(accion => accion.usuarioDni === userData.dni).slice(0, 10); // Usuario solo ve las suyas

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 h-[350px] md:h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
          {isAdmin ? 'Acciones del Sistema' : 'Mis Acciones'}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">{accionesFiltradas.length} acciones</span>
      </div>

      <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto">
        {accionesFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Clock className="w-10 h-10 md:w-12 md:h-12 text-gray-300 dark:text-gray-600 mb-2 md:mb-3" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">No hay acciones recientes</p>
            <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 mt-1">Las acciones aparecerán aquí cuando realices cambios</p>
          </div>
        ) : (
          accionesFiltradas.map((accion) => (
            <div
              key={accion.id}
              className="flex items-start gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${getColor(accion.tipo)}`}>
                <div className="scale-75 md:scale-100">
                  {getIcono(accion.tipo)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  {accion.titulo}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {accion.descripcion}
                </p>
                <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2 text-[10px] md:text-xs text-gray-400 dark:text-gray-500">
                  <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span>{accion.tiempo}</span>
                  <span>•</span>
                  <span className="truncate">{accion.usuario}</span>
                  {isAdmin && (
                    <>
                      <span>•</span>
                      <span>{accion.horaReal}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
