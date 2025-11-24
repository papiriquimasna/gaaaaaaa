import { useState } from 'react';
import { 
  Book, 
  Home, 
  Vote, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings,
  ChevronRight,
  Search,
  HelpCircle
} from 'lucide-react';
import { dataService } from '../../../../services/dataService';

export default function ManualUsuario() {
  const [selectedSection, setSelectedSection] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');

  const menuSections = [
    {
      title: 'Introducción',
      icon: <Book className="w-5 h-5" />,
      items: [
        { id: 'inicio', label: 'Bienvenida', icon: <Home className="w-4 h-4" /> },
        { id: 'que-es', label: 'Qué es ONPE', icon: <HelpCircle className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Primeros Pasos',
      icon: <Users className="w-5 h-5" />,
      items: [
        { id: 'login', label: 'Iniciar Sesión', icon: <Users className="w-4 h-4" /> },
        { id: 'dashboard', label: 'Panel Principal', icon: <Home className="w-4 h-4" /> },
        { id: 'perfil', label: 'Mi Perfil', icon: <Settings className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Votación Digital',
      icon: <Vote className="w-5 h-5" />,
      items: [
        { id: 'voto-digital', label: 'Cómo Votar', icon: <Vote className="w-4 h-4" /> },
        { id: 'presidente', label: 'Votar Presidente', icon: <Users className="w-4 h-4" /> },
        { id: 'alcalde', label: 'Votar Alcalde', icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Información',
      icon: <FileText className="w-5 h-5" />,
      items: [
        { id: 'candidatos', label: 'Candidatos', icon: <Users className="w-4 h-4" /> },
        { id: 'partidos', label: 'Partidos Políticos', icon: <FileText className="w-4 h-4" /> },
        { id: 'calendario', label: 'Calendario Electoral', icon: <Calendar className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Soporte',
      icon: <MessageSquare className="w-5 h-5" />,
      items: [
        { id: 'asistente', label: 'Asistente Virtual', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'reclamaciones', label: 'Reclamaciones', icon: <FileText className="w-4 h-4" /> },
        { id: 'faq', label: 'Preguntas Frecuentes', icon: <HelpCircle className="w-4 h-4" /> },
      ]
    },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'inicio':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Manual de Usuario - Sistema Electoral ONPE
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Bienvenido al manual oficial del Sistema Electoral Digital de la Oficina Nacional de Procesos Electorales (ONPE).
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">¿Qué encontrarás en este manual?</h2>
              <p className="text-slate-600 mb-6">
                Este manual te guiará paso a paso en el uso del sistema electoral digital, desde cómo iniciar sesión 
                hasta cómo emitir tu voto de manera segura y confiable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Vote className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Votación Digital</h3>
                  </div>
                  <p className="text-sm text-slate-600">Aprende a votar de forma segura y rápida</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Información</h3>
                  </div>
                  <p className="text-sm text-slate-600">Conoce a los candidatos y partidos</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Asistente Virtual</h3>
                  </div>
                  <p className="text-sm text-slate-600">Obtén ayuda instantánea 24/7</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Reclamaciones</h3>
                  </div>
                  <p className="text-sm text-slate-600">Presenta quejas o sugerencias</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Navegación del Manual</h2>
              <p className="text-slate-600 mb-4">
                Utiliza el menú lateral para navegar entre las diferentes secciones del manual. Cada sección contiene 
                información detallada, capturas de pantalla y ejemplos prácticos.
              </p>
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Consejos de navegación:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Haz clic en cualquier sección del menú para ver su contenido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Usa la barra de búsqueda para encontrar temas específicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Las secciones están organizadas de forma secuencial para facilitar el aprendizaje</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'que-es':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">¿Qué es el Sistema Electoral ONPE?</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                El Sistema Electoral Digital ONPE es una plataforma moderna y segura diseñada para facilitar 
                el proceso de votación en elecciones laborales y organizacionales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Misión</h2>
              <p className="text-slate-600 leading-relaxed">
                Garantizar procesos electorales transparentes, seguros y accesibles para todos los ciudadanos, 
                promoviendo la participación democrática a través de tecnología de vanguardia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Seguridad</h3>
                <p className="text-slate-600">
                  Sistema encriptado que garantiza la confidencialidad y autenticidad de cada voto emitido.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Accesibilidad</h3>
                <p className="text-slate-600">
                  Interfaz intuitiva y fácil de usar, diseñada para usuarios de todos los niveles técnicos.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Transparencia</h3>
                <p className="text-slate-600">
                  Resultados verificables y auditoría completa de todo el proceso electoral.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Características Principales</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Votación Digital Segura</h3>
                    <p className="text-slate-600">Vota desde cualquier lugar con conexión a internet, con total seguridad y privacidad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Información Completa de Candidatos</h3>
                    <p className="text-slate-600">Accede a perfiles detallados de todos los candidatos y sus propuestas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Asistente Virtual 24/7</h3>
                    <p className="text-slate-600">Obtén ayuda instantánea en cualquier momento del proceso electoral.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Resultados en Tiempo Real</h3>
                    <p className="text-slate-600">Consulta los resultados oficiales una vez finalizado el proceso de votación.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'login':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Iniciar Sesión</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Aprende cómo acceder al sistema electoral ONPE de forma segura.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Requisito Importante</h3>
                  <p className="text-slate-600">
                    Para acceder al sistema necesitas tu <strong>Documento Nacional de Identidad (DNI)</strong>. 
                    Este es tu identificador único en el sistema electoral.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Pasos para Iniciar Sesión</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">Accede a la Página de Login</h3>
                    <p className="text-slate-600 mb-3">
                      Desde la página principal (Landing Page), haz clic en el botón "Voto Digital" en el menú de navegación.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">
                        <strong>Ruta:</strong> Página Principal → Menú → Voto Digital
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">Ingresa tu DNI</h3>
                    <p className="text-slate-600 mb-3">
                      En la pantalla de login, ingresa tu número de DNI de 8 dígitos en el campo correspondiente.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 mb-2"><strong>Importante:</strong></p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Solo números, sin espacios ni guiones</li>
                        <li>• Debe tener exactamente 8 dígitos</li>
                        <li>• Verifica que sea tu DNI correcto</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">Haz Clic en "Ingresar"</h3>
                    <p className="text-slate-600 mb-3">
                      Una vez ingresado tu DNI, presiona el botón "Ingresar" para acceder al sistema.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-700">
                        ✓ Si tu DNI está registrado, serás redirigido automáticamente al Dashboard principal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="font-semibold text-red-800 mb-3">¿Problemas para Iniciar Sesión?</h3>
              <div className="space-y-2 text-red-700">
                <p>• <strong>DNI no registrado:</strong> Contacta al administrador del sistema</p>
                <p>• <strong>Error al ingresar:</strong> Verifica que tu DNI esté escrito correctamente</p>
                <p>• <strong>Problemas técnicos:</strong> Consulta con el Asistente Virtual o presenta una reclamación</p>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Panel Principal (Dashboard)</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                El Dashboard es tu centro de control donde puedes ver estadísticas y acceder a todas las funciones del sistema.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Elementos del Dashboard</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Tarjetas de Estadísticas</h3>
                    <p className="text-slate-600">
                      Muestra información en tiempo real sobre partidos políticos, candidatos presidenciales, 
                      candidatos a alcalde y reclamaciones registradas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Vote className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Gráficos de Votación</h3>
                    <p className="text-slate-600">
                      Visualiza la distribución de votos y estadísticas de participación electoral.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Acciones Recientes</h3>
                    <p className="text-slate-600">
                      Historial de tus últimas actividades: votos registrados, cambios de perfil, reclamaciones, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Mi Perfil</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Gestiona tu información personal y personaliza tu experiencia en el sistema.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Actualizar Foto de Perfil</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  Puedes cambiar tu foto de perfil haciendo clic en el ícono de cámara sobre tu foto actual.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> Los cambios se guardan automáticamente y se reflejan en todo el sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'voto-digital':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Cómo Votar Digitalmente</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                El voto digital es seguro, rápido y fácil. Sigue estos pasos para ejercer tu derecho al voto.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Proceso de Votación</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Accede a Voto Digital</h3>
                    <p className="text-slate-600">Desde el Dashboard, haz clic en "Voto Digital" en el menú lateral.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Elige el Tipo de Votación</h3>
                    <p className="text-slate-600">Selecciona si deseas votar por Presidente o Alcalde.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Selecciona tu Candidato</h3>
                    <p className="text-slate-600">Revisa los candidatos disponibles y haz clic en "Seleccionar".</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Confirma tu Voto</h3>
                    <p className="text-slate-600">Verifica tu selección y confirma. Esta acción no se puede deshacer.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 mb-3">✓ Tu voto es:</h3>
              <div className="space-y-2 text-green-700">
                <p>• <strong>Secreto:</strong> Nadie puede ver por quién votaste</p>
                <p>• <strong>Seguro:</strong> Encriptado y protegido</p>
                <p>• <strong>Único:</strong> Solo puedes votar una vez por cada cargo</p>
              </div>
            </div>
          </div>
        );

      case 'presidente':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Votar por Presidente</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Elige al próximo presidente del Perú de manera digital y segura.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Pasos para Votar</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  1. Navega a <strong>Voto Digital → Presidente</strong><br/>
                  2. Revisa los candidatos presidenciales disponibles<br/>
                  3. Haz clic en "Seleccionar" en tu candidato preferido<br/>
                  4. Confirma tu voto en el modal de confirmación<br/>
                  5. Espera 8 segundos mientras se procesa tu voto<br/>
                  6. ¡Listo! Tu voto ha sido registrado exitosamente
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="font-semibold text-red-800 mb-3">⚠️ Importante</h3>
              <p className="text-red-700">
                Solo puedes votar UNA VEZ por presidente. Una vez confirmado, no podrás cambiar tu voto.
              </p>
            </div>
          </div>
        );

      case 'alcalde':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Votar por Alcalde</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Elige al alcalde de tu distrito de manera digital y segura.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Proceso de Votación</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  El proceso es similar al voto presidencial:<br/><br/>
                  1. Ve a <strong>Voto Digital → Alcalde</strong><br/>
                  2. Explora los candidatos a alcalde<br/>
                  3. Selecciona tu candidato preferido<br/>
                  4. Confirma tu decisión<br/>
                  5. Tu voto será procesado y registrado
                </p>
              </div>
            </div>
          </div>
        );

      case 'candidatos':
        const candidatosPresidentes = dataService.getCandidatos('presidente');
        const candidatosAlcaldes = dataService.getCandidatos('alcalde');
        
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Información de Candidatos</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Conoce a los candidatos que participan en las elecciones.
              </p>
            </div>

            {/* Candidatos Presidenciales */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Candidatos Presidenciales</h2>
                  <p className="text-sm text-slate-600">{candidatosPresidentes.length} candidatos registrados</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidatosPresidentes.map((candidato) => {
                  const partido = dataService.getPartidoById(candidato.partidoId);
                  return (
                    <div key={candidato.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <img 
                          src={candidato.foto} 
                          alt={candidato.nombre}
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-300"
                          onError={(e) => {
                            e.currentTarget.src = '/src/assets/defaultperfil.jpg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {candidato.nombre} {candidato.apellidoPaterno}
                          </h3>
                          <p className="text-xs text-slate-600 truncate">{partido?.nombre || 'Partido no encontrado'}</p>
                          <p className="text-xs text-slate-500">DNI: {candidato.dni}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Candidatos a Alcalde */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Candidatos a Alcalde</h2>
                  <p className="text-sm text-slate-600">{candidatosAlcaldes.length} candidatos registrados</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidatosAlcaldes.map((candidato) => {
                  const partido = dataService.getPartidoById(candidato.partidoId);
                  return (
                    <div key={candidato.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <img 
                          src={candidato.foto} 
                          alt={candidato.nombre}
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-300"
                          onError={(e) => {
                            e.currentTarget.src = '/src/assets/defaultperfil.jpg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {candidato.nombre} {candidato.apellidoPaterno}
                          </h3>
                          <p className="text-xs text-slate-600 truncate">{partido?.nombre || 'Partido no encontrado'}</p>
                          <p className="text-xs text-slate-500">DNI: {candidato.dni}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'partidos':
        const partidos = dataService.getPartidos();
        
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Partidos Políticos</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Información sobre los partidos políticos participantes en las elecciones.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
              <p className="text-slate-700">
                Los partidos políticos son organizaciones que agrupan candidatos con ideologías y propuestas similares.
                Cada candidato está afiliado a un partido político que lo respalda.
              </p>
              <p className="text-slate-600 mt-2">
                <strong>Total de partidos registrados:</strong> {partidos.length}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Lista de Partidos Políticos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partidos.map((partido) => (
                  <div 
                    key={partido.id} 
                    className="bg-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:shadow-lg transition-all hover:border-slate-300"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md"
                        style={{ backgroundColor: partido.color }}
                      >
                        {partido.siglas}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{partido.nombre}</h3>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p><strong>Siglas:</strong> {partido.siglas}</p>
                          <p><strong>Fundación:</strong> {partido.fundacion}</p>
                          <p><strong>Ideología:</strong> {partido.ideologia}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'calendario':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Calendario Electoral</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Fechas importantes del proceso electoral.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Fecha de Elecciones</h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="text-2xl font-bold text-blue-600 mb-2">12 de Abril, 2026</p>
                <p className="text-slate-600">Elecciones Generales del Perú</p>
              </div>
            </div>
          </div>
        );

      case 'asistente':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Asistente Virtual</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Tu ayudante inteligente para resolver dudas sobre el sistema electoral.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">¿Cómo usar el Asistente?</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  1. Haz clic en el ícono del chatbot en la esquina inferior derecha<br/>
                  2. Escribe tu pregunta en lenguaje natural<br/>
                  3. El asistente te responderá instantáneamente<br/>
                  4. Puedes hacer preguntas de seguimiento
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-green-800 mb-2">Ejemplos de preguntas:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• "¿Cómo puedo votar?"</li>
                  <li>• "¿Cuándo son las elecciones?"</li>
                  <li>• "¿Puedo cambiar mi voto?"</li>
                  <li>• "¿Cómo presento una reclamación?"</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'reclamaciones':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Reclamaciones</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Presenta quejas o reporta problemas con el sistema electoral.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Cómo Presentar una Reclamación</h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  1. Ve a <strong>Soporte → Reclamaciones</strong><br/>
                  2. Completa el formulario con los detalles de tu reclamación<br/>
                  3. Selecciona el tipo de problema<br/>
                  4. Haz clic en "Enviar Reclamación"<br/>
                  5. Recibirás un número de seguimiento
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-700">
                  <strong>Nota:</strong> Todas las reclamaciones son revisadas por el equipo de ONPE y recibirás una respuesta en un plazo de 48 horas.
                </p>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Preguntas Frecuentes</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Respuestas a las dudas más comunes sobre el sistema electoral.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-2">¿Puedo votar más de una vez?</h3>
                <p className="text-slate-600">
                  No. El sistema solo permite un voto por persona para cada cargo (presidente y alcalde).
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-2">¿Es seguro el voto digital?</h3>
                <p className="text-slate-600">
                  Sí. El sistema utiliza encriptación de última generación y cumple con todos los estándares de seguridad electoral.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-2">¿Puedo cambiar mi voto después de confirmarlo?</h3>
                <p className="text-slate-600">
                  No. Una vez confirmado, el voto es definitivo y no puede ser modificado.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-800 mb-2">¿Qué hago si olvidé mi DNI?</h3>
                <p className="text-slate-600">
                  Necesitas tu DNI para acceder al sistema. Si no lo recuerdas, consulta tu documento físico.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Selecciona una sección del menú para ver su contenido</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Manual de Usuario</h2>
          <p className="text-sm text-slate-600 dark:text-gray-400">Sistema Electoral ONPE</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Buscar en el manual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="p-4">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSection === item.id
                        ? 'bg-slate-700 dark:bg-blue-600 text-white font-medium'
                        : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
