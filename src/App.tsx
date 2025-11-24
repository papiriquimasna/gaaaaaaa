import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GestionUser from './features/System/Users/ui/GestionUser';
import Calendary from './features/Administration/Calendary/ui/Calendary';
import ChatBot from './features/Support/Assistant/ui/ChatBot';
import Reclamaciones from './features/Support/Reclamaciones/ui/Reclamaciones';
import Documentation from './features/Support/Manual/ui/Documentation';
import ManualUsuario from './features/Support/Manual/ui/ManualUsuario';
import GestionPresidenciales from './features/Administration/Candidates/ui/GestionPresidenciales';
import PartidosPoliticos from './features/Administration/Candidates/ui/PartidosPoliticos';
import GestionAlcaldes from './features/Administration/Candidates/ui/GestionAlcaldes';
import GestionDatos from './features/Administration/Data/ui/GestionDatos';
import ControlPanel from './features/System/Control/ui/ControlPanel';
import Home from './features/Home/Main/ui/Home';
import Perfil from './features/Configuration/ui/Perfil';
import LandingPage from './features/Landing/LandingPage';
import Login from './features/Auth/Login';
import VoteDigital from './features/Vote/VoteDigital';
import PresidenteVote from './features/Vote/PresidenteVote';
import AlcaldeVote from './features/Vote/AlcaldeVote';
import { UserProvider } from './context/UserContext';
import { AccionesProvider } from './context/AccionesContext';
import { ThemeProvider } from './context/ThemeContext';

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <UserProvider>
        <AccionesProvider>
          <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <div className="flex h-screen w-full bg-gray-50 text-gray-800">
                    <AnimatePresence>
                      {isMobileMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      )}
                    </AnimatePresence>

                    <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

                    <main className="flex-1 flex flex-col overflow-hidden">
                      <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />
                      <div className="flex-1 overflow-y-auto">
                        <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/usuarios" element={<GestionUser />} />
                        <Route path="/calendario" element={<Calendary />} />
                        <Route path="/candidatos/presidenciales" element={<GestionPresidenciales />} />
                        <Route path="/candidatos/partidos" element={<PartidosPoliticos />} />
                        <Route path="/candidatos/alcaldes" element={<GestionAlcaldes />} />
                        <Route path="/candidatos/gestion-datos" element={<GestionDatos />} />
                        <Route path="/control" element={<ControlPanel />} />
                        <Route path="/chatbot" element={<ChatBot />} />
                        <Route path="/reclamaciones" element={<Reclamaciones />} />
                        <Route path="/documentacion" element={<Documentation />} />
                        <Route path="/manual-usuario" element={<ManualUsuario />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/voto-digital" element={<VoteDigital />} />
                        <Route path="/voto-digital/presidente" element={<PresidenteVote />} />
                        <Route path="/voto-digital/alcalde" element={<AlcaldeVote />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
          </Router>
        </AccionesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
