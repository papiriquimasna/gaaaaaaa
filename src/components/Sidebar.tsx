import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoOnpe from '../assets/onpe.svg'
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  FileText,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  ChevronsLeft,
  ChevronsRight,
  X,
  Users,
  Book,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  submenuItems?: { id: string; label: string; route?: string }[];
  route?: string;
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { userData } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    audience: false,
    income: false,
    assistant: false,
    settings: false,
  });
  
  const isAdmin = userData.rol === 'Administrador';
  const isUser = userData.rol === 'Usuario';

  // Automatically collapse sidebar on smaller desktop screens
  useEffect(() => {
    if (isDesktop) {
      setIsExpanded(true);
    } else {
      setIsExpanded(true); // Always expanded on mobile view
    }
  }, [isDesktop]);

  // MENU items - Todos pueden ver
  const mainMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Inicio', icon: <Home size={20} />, route: '/dashboard' },
    // Solo usuarios pueden votar
    ...(isUser ? [{ id: 'voto-digital', label: 'Voto Digital', icon: <FileText size={20} />, route: '/dashboard/voto-digital' }] : [])
  ];

  // ADMINISTRACIÓN - Solo administradores
  const administrationMenuItems: MenuItem[] = isAdmin ? [
    { id: 'schedules', label: 'Calendario', icon: <Calendar size={20} />, route: '/dashboard/calendario' },
    {
      id: 'candidatos',
      label: 'Candidatos',
      icon: <BarChart3 size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { id: 'presidentes', label: 'Presidentes', route: '/dashboard/candidatos/presidenciales' },
        { id: 'partidos', label: 'Partidos Políticos', route: '/dashboard/candidatos/partidos' },
        { id: 'alcaldes', label: 'Alcaldes', route: '/dashboard/candidatos/alcaldes' },
        { id: 'gestion-datos', label: 'Gestión de Datos', route: '/dashboard/candidatos/gestion-datos' }
      ]
    }
  ] : [];

  // SOPORTE - Todos pueden ver
  const supportMenuItems: MenuItem[] = [
    {
      id: 'assistant',
      label: 'Asistente',
      icon: <Bell size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { id: 'chatbot', label: 'ChatBot', route: '/dashboard/chatbot' },
        { id: 'documentation', label: 'Documentación', route: '/dashboard/documentacion' }
      ]
    },
    { id: 'complaints-book', label: 'Libro de Reclamaciones', icon: <Book size={20} />, route: '/dashboard/reclamaciones' },
    { id: 'user-manual', label: 'Manual de Usuario', icon: <FileText size={20} />, route: '/dashboard/manual-usuario' }
  ];

  // SISTEMA - Solo administradores
  const systemMenuItems: MenuItem[] = isAdmin ? [
    { id: 'users', label: 'Usuarios', icon: <Users size={20} />, route: '/dashboard/usuarios' },
  ] : [];

  const settingsMenuItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { id: 'Perfil', label: 'Perfil', route: '/dashboard/perfil' },
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };
  
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    const allItems = [...mainMenuItems, ...administrationMenuItems, ...supportMenuItems, ...systemMenuItems, ...settingsMenuItems];
    const menuItem = allItems.find(item => item.id === itemId);
    if (menuItem?.hasSubmenu) {
      toggleMenu(itemId);
    } else if (!isDesktop) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveItem(subItemId);
    if (!isDesktop) {
      setIsMobileMenuOpen(false);
    }
  };

  const shouldShowText = isDesktop ? isExpanded : true;

  const renderSubMenu = (item: MenuItem) => (
    <AnimatePresence>
      {shouldShowText && expandedMenus[item.id] && item.submenuItems && (
        <motion.div
          key={`submenu-${item.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="ml-8 mt-1 space-y-1 border-l border-gray-200 pl-3 overflow-hidden"
        >
          {item.submenuItems.map((subItem) => (
            subItem.route ? (
              <Link
                key={subItem.id}
                to={subItem.route}
                onClick={() => handleSubItemClick(subItem.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                  activeItem === subItem.id
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {subItem.label}
              </Link>
            ) : (
              <button
                key={subItem.id}
                onClick={() => handleSubItemClick(subItem.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                  activeItem === subItem.id
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {subItem.label}
              </button>
            )
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <aside
      className={`bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 dark:border-gray-700
      fixed inset-y-0 left-0 z-30 lg:relative lg:translate-x-0
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      ${isDesktop ? (isExpanded ? 'w-64' : 'w-20') : 'w-64'}`}
    >
      <div className="px-4 pt-10 pb-6 flex items-center justify-between h-[100px] shrink-0">
        {shouldShowText ? (
          <div className="flex items-center justify-center w-full">
            <img 
              src={LogoOnpe} 
              alt="ONPE Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <img 
              src={LogoOnpe} 
              alt="ONPE Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
        )}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-800 absolute right-4"
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200 border border-gray-200 z-10 hidden lg:flex"
        aria-label={isExpanded ? 'Colapsar menú' : 'Expandir menú'}
      >
        {isExpanded ? <ChevronsLeft size={14} /> : <ChevronsRight size={14} />}
      </button>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div>
          {shouldShowText && (
            <div className="text-xs font-semibold text-gray-400 mb-3 px-3">
              MENU
            </div>
          )}
          <nav className="space-y-1">
            {mainMenuItems.map((item) => (
              <div key={item.id}>
                {item.route ? (
                  <Link
                    to={item.route}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {shouldShowText && item.hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                )}
                {renderSubMenu(item)}
              </div>
            ))}
          </nav>
        </div>

        {administrationMenuItems.length > 0 && (
          <div className="mt-6">
            {shouldShowText && (
              <div className="text-xs font-semibold text-gray-400 mb-3 px-3">
                ADMINISTRACIÓN
              </div>
            )}
            <nav className="space-y-1">
            {administrationMenuItems.map((item) => (
              <div key={item.id}>
                {item.route ? (
                  <Link
                    to={item.route}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {shouldShowText && item.hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                )}
                {renderSubMenu(item)}
              </div>
            ))}
          </nav>
          </div>
        )}

        <div className="mt-6">
          {shouldShowText && (
            <div className="text-xs font-semibold text-gray-400 mb-3 px-3">
              SOPORTE
            </div>
          )}
          <nav className="space-y-1">
            {supportMenuItems.map((item) => (
              <div key={item.id}>
                {item.route ? (
                  <Link
                    to={item.route}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {shouldShowText && item.hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                )}
                {renderSubMenu(item)}
              </div>
            ))}
          </nav>
        </div>

        {systemMenuItems.length > 0 && (
          <div className="mt-6">
            {shouldShowText && (
              <div className="text-xs font-semibold text-gray-400 mb-3 px-3">
                SISTEMA
              </div>
            )}
            <nav className="space-y-1">
              {systemMenuItems.map((item) => (
              <div key={item.id}>
                {item.route ? (
                  <Link
                    to={item.route}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      shouldShowText
                        ? 'justify-between'
                        : 'justify-center'
                    } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {shouldShowText && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {shouldShowText && item.hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                )}
                {renderSubMenu(item)}
              </div>
            ))}
          </nav>
          </div>
        )}

        <div className="mt-6">
          {shouldShowText && (
            <div className="text-xs font-semibold text-gray-400 mb-3 px-3">
              CONFIGURACIÓN
            </div>
          )}
          <nav className="space-y-1">
            {settingsMenuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    shouldShowText
                      ? 'justify-between'
                      : 'justify-center'
                  } ${ activeItem === item.id && !item.hasSubmenu ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {shouldShowText && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>
                  {shouldShowText && item.hasSubmenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        expandedMenus[item.id] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {renderSubMenu(item)}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
        {shouldShowText ? (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex gap-1">
            <button
              onClick={toggleTheme}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                !isDark
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Sun size={16} />
                <span>Light</span>
              </div>
            </button>
            <button
              onClick={toggleTheme}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Moon size={16} />
                <span>Dark</span>
              </div>
            </button>
          </div>
        ) : (
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDark ? (
              <Moon size={20} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun size={20} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
