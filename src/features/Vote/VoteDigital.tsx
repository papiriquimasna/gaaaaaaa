import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';

const VoteDigital = () => {
  const navigate = useNavigate();
  const [presidenteVotado, setPresidenteVotado] = useState(false);
  const [alcaldeVotado, setAlcaldeVotado] = useState(false);

  useEffect(() => {
    // Verificar votos del usuario actual
    const userDni = localStorage.getItem('userDni');
    if (userDni) {
      setPresidenteVotado(localStorage.getItem(`presidenteVotado_${userDni}`) === 'true');
      setAlcaldeVotado(localStorage.getItem(`alcaldeVotado_${userDni}`) === 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Voto Digital</h1>
          <p className="text-lg text-slate-600 dark:text-gray-300">Selecciona el tipo de votación que deseas realizar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contenedor Presidente */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 p-8 min-h-[400px] flex items-center transition-all duration-300 hover:shadow-2xl ${
              presidenteVotado ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6 w-full">
              <div className="relative">
                <div className="w-40 h-40 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {presidenteVotado && (
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Presidente</h2>
                <p className="text-slate-600 dark:text-gray-300">
                  {presidenteVotado ? 'Ya has votado' : 'Vota por tu candidato presidencial'}
                </p>
              </div>
              {presidenteVotado ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Voto Registrado
                </div>
              ) : (
                <Button
                  color="default"
                  size="lg"
                  onPress={() => navigate('/dashboard/voto-digital/presidente')}
                  className="mt-3 px-8 bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Votar Ahora
                </Button>
              )}
            </div>
          </div>

          {/* Contenedor Alcalde */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 p-8 min-h-[400px] flex items-center transition-all duration-300 hover:shadow-2xl ${
              alcaldeVotado ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6 w-full">
              <div className="relative">
                <div className="w-40 h-40 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                {alcaldeVotado && (
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Alcalde</h2>
                <p className="text-slate-600 dark:text-gray-300">
                  {alcaldeVotado ? 'Ya has votado' : 'Vota por tu candidato a alcalde'}
                </p>
              </div>
              {alcaldeVotado ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Voto Registrado
                </div>
              ) : (
                <Button
                  color="default"
                  size="lg"
                  onPress={() => navigate('/dashboard/voto-digital/alcalde')}
                  className="mt-3 px-8 bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Votar Ahora
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDigital;
