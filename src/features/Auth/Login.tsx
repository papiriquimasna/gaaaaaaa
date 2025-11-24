import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAcciones } from '../../context/AccionesContext';
import LogoOnpe from '../../assets/onpe.svg';

// Generar burbujas aleatorias fuera del componente para que no cambien
const generateBubbles = () =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 80,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 8,
  }));

// Cuentas predefinidas
const PREDEFINED_ACCOUNTS = {
  '60946347': {
    nombre: 'Sebastian Victor',
    apellido: 'Bohorquez Perez',
    dni: '60946347',
    email: 'sebastian.bohorquez@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
  },
  '74992266': {
    nombre: 'Josue Caleb',
    apellido: 'Ochoa Reyes',
    dni: '74992266',
    email: 'josue.ochoa@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
  },
  '60762976': {
    nombre: 'Milagros Naomi',
    apellido: 'Villa Sandoval',
    dni: '60762976',
    email: 'milagros.villa@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
  },
  '12345678': {
    nombre: 'Super',
    apellido: 'Administrador',
    dni: '12345678',
    email: 'admin@onpe.gob.pe',
    rol: 'Administrador',
    foto: '',
  },
};

const Login = () => {
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const { agregarAccion } = useAcciones();
  const bubbles = useMemo(() => generateBubbles(), []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (dni.length === 8) {
      const account = PREDEFINED_ACCOUNTS[dni as keyof typeof PREDEFINED_ACCOUNTS];
      if (account) {
        // Cargar datos guardados SOLO de este usuario específico
        const savedData = localStorage.getItem(`userData_${dni}`);
        let userDataToLoad = { ...account }; // Crear copia del account base

        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            // Solo cargar si el DNI coincide (seguridad extra)
            if (parsed.dni === dni) {
              userDataToLoad = parsed;
            }
          } catch (error) {
            console.error('Error al cargar datos guardados:', error);
          }
        }

        // Preservar datos importantes antes de limpiar
        const votosGlobales = localStorage.getItem('votosGlobales');
        const accionesGlobales = localStorage.getItem('accionesGlobales');
        const votosPresidente: { [key: string]: string } = {};
        const votosAlcalde: { [key: string]: string } = {};
        
        // Guardar todos los votos existentes
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('presidenteVotado_')) {
            votosPresidente[key] = localStorage.getItem(key) || '';
          }
          if (key.startsWith('alcaldeVotado_')) {
            votosAlcalde[key] = localStorage.getItem(key) || '';
          }
        });
        
        // Limpiar SOLO datos de sesión
        const keysToRemove = ['isAuthenticated', 'userDni', 'userData', 'userName', 'userRole'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Restaurar datos importantes
        if (votosGlobales) localStorage.setItem('votosGlobales', votosGlobales);
        if (accionesGlobales) localStorage.setItem('accionesGlobales', accionesGlobales);
        Object.entries(votosPresidente).forEach(([key, value]) => localStorage.setItem(key, value));
        Object.entries(votosAlcalde).forEach(([key, value]) => localStorage.setItem(key, value));
        
        // Establecer nueva sesión
        updateUserData(userDataToLoad);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userDni', dni);
        localStorage.setItem('userName', `${userDataToLoad.nombre} ${userDataToLoad.apellido}`);
        localStorage.setItem('userRole', userDataToLoad.rol);
        localStorage.setItem('userData', JSON.stringify(userDataToLoad));
        localStorage.setItem(`userData_${dni}`, JSON.stringify(userDataToLoad));

        // Registrar acción de login
        agregarAccion({
          tipo: 'login',
          titulo: 'Inicio de Sesión',
          descripcion: `${userDataToLoad.nombre} ${userDataToLoad.apellido} inició sesión`,
          usuario: `${userDataToLoad.nombre} ${userDataToLoad.apellido}`,
          usuarioDni: dni,
        });

        window.dispatchEvent(new Event('authChange'));
        navigate('/dashboard');
      } else {
        setError('DNI no registrado en el sistema. Por favor, contacta al administrador.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 relative overflow-hidden flex items-center justify-center">
      {/* Burbujas animadas */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-slate-400 pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animation: `fall ${bubble.duration}s linear infinite`,
            animationDelay: `-${bubble.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          5% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
          95% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>

      {/* Tarjeta de login */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={LogoOnpe} alt="ONPE Logo" className="h-24" />
        </div>
        <h2 className="text-center text-slate-800 font-semibold text-lg mb-2">
          Bienvenido al Sistema Electoral
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">Ingresa tu DNI para acceder</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value.replace(/\D/g, '').slice(0, 8));
                  setError('');
                }}
                placeholder="DNI"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                  error
                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
                    : 'border-slate-300 focus:ring-slate-400 focus:border-transparent'
                }`}
                maxLength={8}
                required
              />
            </div>
            {error && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Ingresar
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-6">
          ONPE - Oficina Nacional de Procesos Electorales
        </p>
      </div>
    </div>
  );
};

export default Login;
