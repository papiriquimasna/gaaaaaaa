import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Pagination,
} from '@heroui/react';
import { dataService, Candidato, PartidoPolitico } from '../../services/dataService';
import { useAcciones } from '../../context/AccionesContext';
import LogoVoto from '../../assetss/LogoVoto.png';

interface CandidatoConPartido extends Candidato {
  partido: PartidoPolitico | null;
}

const PresidenteVote = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { agregarAccion } = useAcciones();
  const [candidatos, setCandidatos] = useState<CandidatoConPartido[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidatoConPartido | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Verificar si el usuario ya votó (doble verificación)
    const userDni = localStorage.getItem('userDni');
    if (userDni) {
      // Verificación 1: localStorage individual
      const yaVotoLocal = localStorage.getItem(`presidenteVotado_${userDni}`) === 'true';
      
      // Verificación 2: registro global
      const votosGlobales = JSON.parse(localStorage.getItem('votosGlobales') || '{}');
      const yaVotoGlobal = votosGlobales[`presidente_${userDni}`] !== undefined;
      
      if (yaVotoLocal || yaVotoGlobal) {
        // Si ya votó, redirigir de vuelta
        navigate('/dashboard/voto-digital');
        return;
      }
    }

    // Cargar candidatos presidenciales con sus partidos
    const candidatosData = dataService.getCandidatos('presidente');
    const candidatosConPartido = candidatosData.map((c) => ({
      ...c,
      partido: dataService.getPartidoById(c.partidoId),
    }));
    setCandidatos(candidatosConPartido);
  }, [navigate]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(candidatos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidatos = candidatos.slice(startIndex, endIndex);

  const handleSelectCandidate = (candidato: CandidatoConPartido) => {
    setSelectedCandidate(candidato);
    onOpen();
  };

  const handleConfirmVote = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setVoteSuccess(true);
      
      // Registrar voto en el servicio
      const userDni = localStorage.getItem('userDni');
      const userName = localStorage.getItem('userName') || 'Usuario';
      
      if (userDni && selectedCandidate) {
        dataService.registrarVoto(userDni, selectedCandidate.id, 'presidente');
        
        // Guardar voto de forma permanente (múltiples lugares para seguridad)
        localStorage.setItem(`presidenteVotado_${userDni}`, 'true');
        
        // Guardar en registro global de votos
        const votosGlobales = JSON.parse(localStorage.getItem('votosGlobales') || '{}');
        votosGlobales[`presidente_${userDni}`] = {
          candidatoId: selectedCandidate.id,
          candidatoNombre: selectedCandidate.nombre,
          fecha: new Date().toISOString(),
          tipo: 'presidente'
        };
        localStorage.setItem('votosGlobales', JSON.stringify(votosGlobales));
        
        // Registrar acción en el dashboard
        agregarAccion({
          tipo: 'votacion',
          titulo: 'Voto Presidencial Registrado',
          descripcion: `${userName} votó por ${selectedCandidate.nombre}`,
          usuario: userName,
          usuarioDni: userDni,
        });
      }
      
      setTimeout(() => {
        navigate('/dashboard/voto-digital');
      }, 5000);
    }, 8000);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={LogoVoto} alt="Voto Digital" className="h-24 drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Elección Presidencial</h1>
          <p className="text-slate-600 dark:text-gray-300">Selecciona tu candidato preferido</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCandidatos.map((candidato) => (
            <div
              key={candidato.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-gray-700 p-6 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={candidato.foto}
                  alt={candidato.nombre}
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{candidato.nombre}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">{candidato.partido?.nombre || 'Sin partido'}</p>
                </div>
                <Button
                  size="lg"
                  onPress={() => handleSelectCandidate(candidato)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mb-6">
            <Pagination
              loop
              showControls
              page={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
              classNames={{
                wrapper: 'gap-2',
                item: 'bg-white border-2 border-slate-200 hover:border-slate-400 shadow-sm',
                cursor: 'bg-slate-700 text-white font-semibold shadow-md',
              }}
            />
          </div>
        )}

        <div className="text-center">
          <Button color="default" variant="light" onPress={() => navigate('/dashboard/voto-digital')}>
            Volver
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!isProcessing}>
        <ModalContent>
          {(onClose) => (
            <>
              {!isProcessing && !voteSuccess && (
                <>
                  <ModalHeader className="flex flex-col gap-1">Confirmar Voto</ModalHeader>
                  <ModalBody>
                    <div className="text-center py-4">
                      <img
                        src={selectedCandidate?.foto}
                        alt={selectedCandidate?.nombre}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 mx-auto mb-4 shadow-lg"
                      />
                      <p className="text-lg font-semibold text-slate-800">¿Estás seguro de votar por:</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">{selectedCandidate?.nombre}</p>
                      <p className="text-sm text-slate-600 mt-1">{selectedCandidate?.partido?.nombre || 'Sin partido'}</p>
                      <p className="text-sm text-slate-500 mt-4">Esta acción no se puede deshacer</p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      onPress={handleConfirmVote}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-semibold"
                    >
                      Confirmar Voto
                    </Button>
                  </ModalFooter>
                </>
              )}
              {isProcessing && (
                <>
                  <ModalHeader className="flex flex-col gap-1">Procesando Voto</ModalHeader>
                  <ModalBody>
                    <div className="text-center py-8">
                      <Spinner
                        size="lg"
                        classNames={{ label: 'text-foreground mt-4' }}
                        label="Procesando solicitud..."
                      />
                    </div>
                  </ModalBody>
                </>
              )}
              {voteSuccess && (
                <>
                  <ModalHeader className="flex flex-col gap-1">¡Voto Registrado!</ModalHeader>
                  <ModalBody>
                    <div className="text-center py-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xl font-bold text-green-600">¡Voto Válido!</p>
                      <p className="text-slate-600 mt-2">Tu voto ha sido registrado exitosamente</p>
                      <p className="text-sm text-slate-500 mt-4">Redirigiendo en 5 segundos...</p>
                    </div>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PresidenteVote;
