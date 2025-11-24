import React, { useState, useEffect } from 'react';
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import defaultPerfil from '../assets/defaultperfil.jpg';

interface HeaderProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} De ${month} De ${year}`;
  };

  return (
    <header className="flex items-center justify-between h-[69px] border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 md:px-6 shrink-0">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-gray-600 hover:text-gray-900"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Date and Time */}
      <div className="ml-auto text-right lg:mr-4">
        <div className="text-sm font-medium text-slate-800 dark:text-white">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs text-slate-500 dark:text-gray-400 capitalize whitespace-nowrap">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-2 md:gap-3 ml-3 md:ml-6">
        {/* Notification Icon with Dropdown */}
        <button 
          className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Notificaciones"
        >
          <Bell size={20} />
        </button>

        {/* Language/Settings Dropdown */}
        <button 
          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Idioma"
        >
          <span className="text-sm font-medium">ES</span>
          <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

        {/* User Profile */}
        <div className="relative user-menu-container">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-2 md:px-3 py-2 transition-colors"
            aria-label="Perfil de usuario"
          >
            <div className="text-right hidden xl:block">
              <div className="text-sm font-semibold text-gray-800 dark:text-white">{userData.nombre} {userData.apellido}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{userData.rol}</div>
            </div>
            <img 
              src={userData.foto || defaultPerfil} 
              alt={userData.nombre} 
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-200 shrink-0"
            />
            <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/dashboard/perfil');
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Mi Perfil
              </button>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <button
                onClick={() => {
                  // Guardar datos del usuario actual antes de limpiar
                  const currentDni = localStorage.getItem('userDni');
                  const currentUserData = localStorage.getItem('userData');
                  
                  // Preservar datos importantes que NO deben borrarse
                  const votosGlobales = localStorage.getItem('votosGlobales');
                  const accionesGlobales = localStorage.getItem('accionesGlobales');
                  const presidenteVotado = localStorage.getItem(`presidenteVotado_${currentDni}`);
                  const alcaldeVotado = localStorage.getItem(`alcaldeVotado_${currentDni}`);
                  
                  if (currentDni && currentUserData) {
                    localStorage.setItem(`userData_${currentDni}`, currentUserData);
                  }
                  
                  // Limpiar SOLO datos de sesión (NO los votos)
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userDni');
                  localStorage.removeItem('userData');
                  localStorage.removeItem('userName');
                  localStorage.removeItem('userRole');
                  
                  // Restaurar datos importantes
                  if (votosGlobales) localStorage.setItem('votosGlobales', votosGlobales);
                  if (accionesGlobales) localStorage.setItem('accionesGlobales', accionesGlobales);
                  if (currentDni && presidenteVotado) localStorage.setItem(`presidenteVotado_${currentDni}`, presidenteVotado);
                  if (currentDni && alcaldeVotado) localStorage.setItem(`alcaldeVotado_${currentDni}`, alcaldeVotado);
                  
                  window.dispatchEvent(new Event('authChange'));
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
