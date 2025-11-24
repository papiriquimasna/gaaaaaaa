import PartidosCard from '../components/PartidosCard';
import CandidatosPresidencialesCard from '../components/CandidatosPresidencialesCard';
import CandidatosAlcaldesCard from '../components/CandidatosAlcaldesCard';
import ReclamacionesCard from '../components/ReclamacionesCard';
import VotosDonutChart from '../components/VotosDonutChart';
import SessionsAreaChart from '../components/SessionsAreaChart';
import DepartamentosCarousel from '../components/DepartamentosCarousel';
import { AccionesRecientes } from '../components/AccionesRecientes';
import DefaultPerfil from '../../../../assets/defaultperfil.jpg';
import { useUser } from '../../../../context/UserContext';

export default function Home() {
  const { userData } = useUser();
  const isAdmin = userData.rol === 'Administrador';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días!';
    if (hour < 19) return '¡Buenas tardes!';
    return '¡Buenas noches!';
  };

  return (
    <div className="h-full overflow-auto bg-slate-50 dark:bg-gray-900">
      <div className="p-6 max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Header */}
          <div className="col-span-1 lg:col-span-6 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 p-4 md:p-5 mb-2">
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src={userData.foto || DefaultPerfil} 
                alt="Usuario" 
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
              />
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white py-2 md:py-3">
                  Hola {userData.nombre}, <span className="text-slate-600 dark:text-gray-400 font-normal">{getGreeting()}</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400">Aquí está lo que está pasando en el sistema electoral hoy</p>
              </div>
            </div>
          </div>
          
          {/* Stats Grid - Left Side */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-4">
            <PartidosCard />
            <CandidatosPresidencialesCard />
            <CandidatosAlcaldesCard />
            {isAdmin && <ReclamacionesCard />}
          </div>

          {/* Charts - Right Side */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <VotosDonutChart />
            <DepartamentosCarousel />
          </div>

          {/* Sessions Chart - Full Width */}
          <div className="col-span-1 lg:col-span-6">
            <SessionsAreaChart />
          </div>

          {/* Acciones Recientes - Bottom */}
          <div className="col-span-1 lg:col-span-6">
            <AccionesRecientes />
          </div>
        </div>
        
      </div>
    </div>
  );
}
