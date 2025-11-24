import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Plus, Settings, Mic, ChevronDown, MessageSquare, MoreVertical, Menu, Pin, Edit2, Trash2 } from 'lucide-react';
import iconBot from '../../../../assets/AssitantBot.gif';
import { aiService } from '../../../../services/aiService';
import { useUser } from '../../../../context/UserContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  image?: string;
  isImageAnalysis?: boolean;
}

interface ChatHistory {
  id: number;
  title: string;
  date: string;
  messages: Message[];
  isPinned?: boolean;
}

export default function ChatBot() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const isAdmin = userData.rol === 'Administrador';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [speed, setSpeed] = useState('Rápido');
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getLocalResponse = (lowerMessage: string): { text: string; image?: string } => {
    let botResponse = '¡Hola! ¿Cómo te puedo ayudar hoy?';
    let logoImage: string | undefined;
    
    if (lowerMessage.includes('muestrame tu logo') || 
        lowerMessage.includes('muéstrame tu logo') ||
        lowerMessage.includes('mostrar logo') ||
        lowerMessage.includes('ver tu logo') ||
        lowerMessage.includes('tu logo')) {
      botResponse = '¡Claro! Aquí está mi logo:';
      logoImage = iconBot;
    } else if (lowerMessage.includes('reclamacion') || 
               lowerMessage.includes('reclamo') ||
               lowerMessage.includes('queja') ||
               lowerMessage.includes('presentar') && lowerMessage.includes('reclamo')) {
      botResponse = 'Para presentar una reclamación en el sistema ONPE, sigue estos pasos:\n\n' +
                   '1. Dirígete a la sección "Libro de Reclamaciones" en el menú de Soporte\n' +
                   '2. Selecciona el tipo de reclamación: Queja, Reclamo, Sugerencia o Consulta\n' +
                   '3. Completa el formulario con:\n' +
                   '   - Asunto de tu reclamación\n' +
                   '   - Descripción detallada del problema\n' +
                   '   - Adjunta evidencias (fotos, documentos) - OBLIGATORIO\n' +
                   '4. Haz clic en "Enviar Reclamación"\n' +
                   '5. Recibirás un número de registro para hacer seguimiento\n\n' +
                   'Tu reclamación será procesada y podrás ver su estado en el calendario electoral. ' +
                   '¿Necesitas ayuda con algún paso específico?';
    } else if (lowerMessage.includes('votar') || lowerMessage.includes('votacion') || lowerMessage.includes('voto')) {
      if (isAdmin) {
        botResponse = 'Como administrador, no tienes acceso a la función de votación. Tu rol es:\n\n' +
                     '✓ Gestionar candidatos y partidos políticos\n' +
                     '✓ Administrar el calendario electoral\n' +
                     '✓ Revisar reclamaciones de usuarios\n' +
                     '✓ Gestionar usuarios del sistema\n' +
                     '✓ Supervisar el proceso electoral\n\n' +
                     'Solo los usuarios con rol "Usuario" pueden emitir votos en el sistema.';
      } else {
        botResponse = 'Para votar en las elecciones laborales ONPE:\n\n' +
                     '1. Accede a la sección "Voto Digital" en el menú principal\n' +
                     '2. Revisa la lista de candidatos disponibles\n' +
                     '3. Selecciona UN candidato para Presidente\n' +
                     '4. Selecciona UN candidato para Alcalde\n' +
                     '5. Confirma tu voto\n' +
                     '6. Recibirás un comprobante de votación\n\n' +
                     'IMPORTANTE: Solo tienes UNA oportunidad para votar. Una vez confirmado tu voto, no podrás cambiarlo. ' +
                     'Asegúrate de revisar bien tu selección antes de confirmar.';
      }
    } else if (lowerMessage.includes('candidato') || lowerMessage.includes('candidatos')) {
      if (isAdmin) {
        botResponse = 'Como administrador, puedes gestionar candidatos en:\n\n' +
                     '1. Menú "Administración" → "Candidatos"\n' +
                     '2. Allí puedes:\n' +
                     '   - Ver lista completa de candidatos\n' +
                     '   - Agregar nuevos candidatos presidenciales o alcaldes\n' +
                     '   - Editar información de candidatos existentes\n' +
                     '   - Eliminar o restaurar candidatos\n' +
                     '   - Gestionar partidos políticos\n' +
                     '   - Administrar datos del sistema\n\n' +
                     'Todos los cambios se reflejan inmediatamente en el sistema.';
      } else {
        botResponse = 'Puedes consultar información sobre los candidatos en:\n\n' +
                     '1. Sección "Voto Digital" para ver candidatos disponibles\n' +
                     '2. Sección "Manual de Usuario" → "Candidatos" para información detallada\n' +
                     '3. Allí encontrarás:\n' +
                     '   - Lista completa de candidatos registrados\n' +
                     '   - Sus partidos políticos\n' +
                     '   - Información básica de cada candidato\n\n' +
                     'Todos los candidatos han sido verificados y aprobados por ONPE.';
      }
    } else if (lowerMessage.includes('calendario') || lowerMessage.includes('fecha') || lowerMessage.includes('cuando')) {
      botResponse = 'Fechas Importantes de las Elecciones Laborales ONPE:\n\n' +
                   'DÍAS DE VOTACIÓN:\n' +
                   '- 24 de Noviembre de 2025\n' +
                   '- 25 de Noviembre de 2025\n' +
                   'Horario: 8:00 AM - 3:00 PM\n\n' +
                   (isAdmin 
                     ? 'Como administrador, puedes gestionar el calendario electoral en la sección "Calendario" del menú de Administración.'
                     : 'Durante estos dos días podrás acceder a la sección "Voto Digital" para emitir tu voto.\n\n' +
                       'IMPORTANTE: \n' +
                       '- Solo puedes votar durante estos dos días en el horario establecido\n' +
                       '- Si no votas en estos plazos, se te aplicará una multa de S/ 44.00 soles\n' +
                       '- Asegúrate de votar a tiempo para evitar sanciones');
    } else if (isAdmin && (lowerMessage.includes('usuario') || lowerMessage.includes('usuarios') || lowerMessage.includes('gestionar'))) {
      botResponse = 'Como administrador, puedes gestionar usuarios en:\n\n' +
                   'Menú "Sistema" → "Usuarios"\n\n' +
                   'Funciones disponibles:\n' +
                   '✓ Ver lista completa de usuarios registrados\n' +
                   '✓ Agregar nuevos usuarios al sistema\n' +
                   '✓ Editar información de usuarios\n' +
                   '✓ Cambiar roles (Usuario/Administrador)\n' +
                   '✓ Eliminar usuarios\n' +
                   '✓ Ver estadísticas de usuarios\n\n' +
                   'Todos los cambios requieren confirmación para evitar errores.';
    } else if (!isAdmin && (lowerMessage.includes('perfil') || lowerMessage.includes('mi cuenta') || lowerMessage.includes('configuracion'))) {
      botResponse = 'Para gestionar tu perfil:\n\n' +
                   '1. Ve a "Settings" → "Perfil" en el menú\n' +
                   '2. Puedes actualizar:\n' +
                   '   - Tu foto de perfil\n' +
                   '   - Ver tu información personal\n\n' +
                   'Los cambios se guardan automáticamente y se reflejan en todo el sistema.';
    }
    
    return { text: botResponse, image: logoImage };
  };

  // Crear nuevo chat
  const createNewChat = () => {
    if (messages.length > 0) {
      // Guardar chat actual si tiene mensajes
      const firstUserMessage = messages.find(m => m.isUser)?.text || 'Nueva conversación';
      const title = firstUserMessage.slice(0, 30) + (firstUserMessage.length > 30 ? '...' : '');
      
      const newChat: ChatHistory = {
        id: Date.now(),
        title,
        date: 'Ahora',
        messages: [...messages],
        isPinned: false,
      };
      
      setChatHistory(prev => [newChat, ...prev]);
    }
    
    setMessages([]);
    setCurrentChatId(null);
  };

  // Cargar chat del historial
  const loadChat = (chatId: number) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setShowHistory(false);
    }
  };

  // Eliminar chat
  const deleteChat = (chatId: number) => {
    setChatHistory(prev => prev.filter(c => c.id !== chatId));
    if (currentChatId === chatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  // Fijar/Desfijar chat
  const togglePinChat = (chatId: number) => {
    setChatHistory(prev => 
      prev.map(c => c.id === chatId ? { ...c, isPinned: !c.isPinned } : c)
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        })
    );
  };

  // Renombrar chat
  const startRenameChat = (chatId: number, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveRenameChat = (chatId: number) => {
    if (editingTitle.trim()) {
      setChatHistory(prev => 
        prev.map(c => c.id === chatId ? { ...c, title: editingTitle.trim() } : c)
      );
    }
    setEditingChatId(null);
    setEditingTitle('');
  };

  // Manejar selección de imagen
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Limpiar imagen seleccionada
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message || '📷 Imagen adjunta',
      isUser: true,
      image: selectedImage || undefined,
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentMessage = message;
    const currentImage = selectedImage;
    setMessage('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      let botResponse: string;
      let logoImage: string | undefined;

      if (useGemini) {
        // Si hay imagen, usar análisis de visión
        if (currentImage) {
          const visionPrompt = `Eres un asistente del sistema electoral ONPE. Analiza esta imagen y describe lo que ves. 
Si es un documento electoral, identifica candidatos, partidos o información relevante.
Si es otra cosa, descríbela brevemente.

${currentMessage ? `Pregunta adicional: ${currentMessage}` : ''}`;

          botResponse = await aiService.chatWithImage(visionPrompt, currentImage);
        } else {
          // Chat normal sin imagen
          const contextPrompt = `Eres un asistente virtual del sistema electoral ONPE (Oficina Nacional de Procesos Electorales) de Perú. 

Tu función PRINCIPAL es ayudar con:
- Sistema de votación digital
- Registro y consulta de candidatos
- Presentación de reclamaciones
- Fechas importantes (votación: 24-25 de Noviembre 2025, 8:00 AM - 3:00 PM)
- Gestión de usuarios y administración del sistema

IMPORTANTE:
- Si te preguntan sobre el sistema ONPE, responde con detalle y profesionalismo
- Si te preguntan cosas generales (matemáticas, programación, cultura, etc.), puedes responder brevemente pero recuerda que tu especialidad es ONPE
- Siempre responde en español de manera clara y concisa

Pregunta del usuario: ${currentMessage}`;

          botResponse = await aiService.chat(contextPrompt);
        }
      } else {
        // Usar respuestas locales predefinidas
        const localResponse = getLocalResponse(currentMessage.toLowerCase().trim());
        botResponse = localResponse.text;
        logoImage = localResponse.image;
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
        image: logoImage
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: '❌ Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="h-full flex bg-slate-50 relative">
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col">
            {/* Header móvil */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
              <h2 className="flex-1 text-lg font-semibold text-slate-800 text-center">Asistente</h2>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Menú"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
              <div className="w-full max-w-3xl flex flex-col items-center gap-6 md:gap-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-600 text-center px-4">
                  Hola {userData.nombre}
                </h1>

                <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-sm px-3 md:px-4 py-2.5 md:py-3">
                  {imagePreview && (
                    <div className="mb-2 relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-20 rounded-lg" />
                      <button
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <label className="shrink-0 p-1.5 md:p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" aria-label="Subir imagen">
                      <Plus className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={isAdmin ? "Pregúntale al Asistente sobre administración..." : "Pregúntale al Asistente sobre votación..."}
                      className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder:text-slate-500 text-sm md:text-base"
                    />
                    <button className="hidden md:block shrink-0 p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="Herramientas">
                      <Settings className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="hidden md:block">
                      <Dropdown>
                        <DropdownTrigger>
                          <button className="shrink-0 flex items-center gap-1 px-3 py-1.5 hover:bg-slate-100 rounded-full transition-colors text-sm text-slate-700">
                            {speed}
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Velocidad" onAction={(key) => setSpeed(key as string)}>
                          <DropdownItem key="Lento">Lento</DropdownItem>
                          <DropdownItem key="Normal">Normal</DropdownItem>
                          <DropdownItem key="Rápido">Rápido</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <button className="shrink-0 p-1.5 md:p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="Micrófono">
                      <Mic className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3 w-full">
                  {isAdmin ? (
                    // Preguntas para Administradores
                    <>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cómo puedo registrar un nuevo candidato?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cómo puedo registrar un nuevo candidato?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cómo funciona el sistema de votación?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cómo funciona el sistema de votación?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Dónde puedo ver los reportes?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Dónde puedo ver los reportes?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cómo gestiono los usuarios del sistema?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cómo gestiono los usuarios del sistema?</p>
                      </button>
                    </>
                  ) : (
                    // Preguntas para Usuarios
                    <>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cómo puedo votar?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cómo puedo votar?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cuándo son las elecciones?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cuándo son las elecciones?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Dónde veo los candidatos?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Dónde veo los candidatos?</p>
                      </button>
                      <button 
                        onClick={() => handleSuggestionClick('¿Cómo presento una reclamación?')}
                        className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-xs md:text-sm text-slate-700">¿Cómo presento una reclamación?</p>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-full flex flex-col">
            {/* Header móvil */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
              <h2 className="flex-1 text-lg font-semibold text-slate-800 text-center">Asistente</h2>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Menú"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-48 space-y-4 md:space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-2 md:gap-4">
                    {!msg.isUser && (
                      <div className="shrink-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden">
                          <img src={iconBot} alt="Bot" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    <div className={`flex-1 ${msg.isUser ? 'flex justify-end' : ''}`}>
                      <div 
                        className={`${msg.isUser ? 'bg-slate-200 px-3.5 py-2.5 md:px-5 md:py-3 inline-block max-w-[85%] md:max-w-[80%]' : ''}`}
                        style={msg.isUser ? { borderRadius: '20px 20px 4px 20px' } : {}}
                      >
                        {msg.image && (
                          <div className="mb-2">
                            <img 
                              src={msg.image} 
                              alt="Imagen adjunta" 
                              className="max-w-full h-auto max-h-64 rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm md:text-base text-slate-800 whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 md:gap-4">
                    <div className="shrink-0">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden">
                        <img src={iconBot} alt="Bot" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-slate-100 px-4 py-3 rounded-lg inline-block">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-3 md:bottom-6 left-0 right-0 flex justify-center px-3 md:px-6">
              <div className="w-full max-w-3xl">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-md px-3 md:px-5 py-2.5 md:py-3 mb-1.5 md:mb-2">
                  {imagePreview && (
                    <div className="mb-2 relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-20 rounded-lg" />
                      <button
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <label className="shrink-0 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" aria-label="Subir imagen">
                      <Plus className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={isAdmin ? "Pregúntale al Asistente sobre administración..." : "Pregúntale al Asistente sobre votación..."}
                      className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder:text-slate-500 text-sm md:text-base"
                    />
                    <button className="hidden md:block shrink-0 p-1.5 hover:bg-slate-100 rounded-full transition-colors" aria-label="Herramientas">
                      <Settings className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="hidden md:block">
                      <Dropdown>
                        <DropdownTrigger>
                          <button className="shrink-0 flex items-center gap-1 px-3 py-1.5 hover:bg-slate-100 rounded-full transition-colors text-sm text-slate-700">
                            {speed}
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Velocidad" onAction={(key) => setSpeed(key as string)}>
                          <DropdownItem key="Lento">Lento</DropdownItem>
                          <DropdownItem key="Normal">Normal</DropdownItem>
                          <DropdownItem key="Rápido">Rápido</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <button className="shrink-0 p-1.5 hover:bg-slate-100 rounded-full transition-colors" aria-label="Micrófono">
                      <Mic className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-center text-slate-500 px-2 md:px-4">
                  El Asistente puede cometer errores, así que verifica las respuestas.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop para móvil */}
      {showHistory && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out animate-in fade-in"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* Panel de historial derecho - Overlay en móvil con animación */}
      <div className={`
        bg-slate-100/50 flex flex-col
        md:relative md:border-l md:border-slate-200
        transition-all duration-300 ease-in-out
        ${showHistory 
          ? 'fixed md:static top-0 right-0 bottom-0 md:inset-auto z-50 md:z-auto w-[85%] md:w-80 bg-white md:bg-slate-100/50 translate-x-0' 
          : 'fixed md:static top-0 right-0 bottom-0 md:inset-auto md:flex w-[85%] md:w-16 bg-white md:bg-slate-100/50 translate-x-full md:translate-x-0'
        }
      `}>
        <div className="p-4 shrink-0">
          {showHistory ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-200/60 rounded-lg transition-colors"
                aria-label="Colapsar menú"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={createNewChat}
                className="flex-1 flex items-center gap-3 px-3 py-2 hover:bg-slate-200/60 rounded-lg transition-colors text-sm text-slate-700"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Nuevo chat</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex flex-col gap-2">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-200/60 rounded-lg transition-colors w-full flex justify-center"
                aria-label="Expandir menú"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={createNewChat}
                className="p-2 hover:bg-slate-200/60 rounded-lg transition-colors w-full flex justify-center"
                aria-label="Nuevo chat"
              >
                <MessageSquare className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          )}
        </div>

        {showHistory && (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              {chatHistory.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No hay conversaciones guardadas</p>
                  <p className="text-xs text-slate-400 mt-1">Inicia un chat para verlo aquí</p>
                </div>
              ) : (
                <>
                  {chatHistory.some(c => c.isPinned) && (
                    <>
                      <h3 className="text-xs font-medium text-slate-500 mb-2 px-3">Fijados</h3>
                      <div className="space-y-0.5 mb-4">
                        {chatHistory.filter(c => c.isPinned).map((chat) => (
                          <div
                            key={chat.id}
                            className={`group relative flex items-center hover:bg-slate-200/60 rounded-lg transition-colors ${
                              currentChatId === chat.id ? 'bg-slate-200/60' : ''
                            }`}
                          >
                            {editingChatId === chat.id ? (
                              <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveRenameChat(chat.id);
                                  if (e.key === 'Escape') setEditingChatId(null);
                                }}
                                onBlur={() => saveRenameChat(chat.id)}
                                className="flex-1 px-3 py-2 text-sm text-slate-700 bg-white border border-blue-500 rounded-lg outline-none"
                                autoFocus
                              />
                            ) : (
                              <button 
                                onClick={() => loadChat(chat.id)}
                                className="flex-1 text-left px-3 py-2 text-sm text-slate-700 flex items-center gap-2 min-w-0"
                              >
                                <Pin className="w-3 h-3 text-blue-500 shrink-0" />
                                <span className="truncate">{chat.title}</span>
                              </button>
                            )}
                            <Dropdown>
                              <DropdownTrigger>
                                <button 
                                  className="md:opacity-0 md:group-hover:opacity-100 p-2 hover:bg-slate-300/60 rounded-lg transition-opacity mr-1 shrink-0"
                                  aria-label="Opciones"
                                >
                                  <MoreVertical className="w-4 h-4 text-slate-600" />
                                </button>
                              </DropdownTrigger>
                              <DropdownMenu 
                                aria-label="Opciones del chat"
                                onAction={(key) => {
                                  if (key === 'pin') togglePinChat(chat.id);
                                  if (key === 'rename') startRenameChat(chat.id, chat.title);
                                  if (key === 'delete') deleteChat(chat.id);
                                }}
                              >
                                <DropdownItem key="pin" startContent={<Pin className="w-4 h-4" />}>
                                  Desfijar
                                </DropdownItem>
                                <DropdownItem key="rename" startContent={<Edit2 className="w-4 h-4" />}>
                                  Cambiar nombre
                                </DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 className="w-4 h-4" />}>
                                  Borrar
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <h3 className="text-xs font-medium text-slate-500 mb-2 px-3">Recientes</h3>
                  <div className="space-y-0.5">
                    {chatHistory.filter(c => !c.isPinned).map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative flex items-center hover:bg-slate-200/60 rounded-lg transition-colors ${
                          currentChatId === chat.id ? 'bg-slate-200/60' : ''
                        }`}
                      >
                        {editingChatId === chat.id ? (
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRenameChat(chat.id);
                              if (e.key === 'Escape') setEditingChatId(null);
                            }}
                            onBlur={() => saveRenameChat(chat.id)}
                            className="flex-1 px-3 py-2 text-sm text-slate-700 bg-white border border-blue-500 rounded-lg outline-none"
                            autoFocus
                          />
                        ) : (
                          <button 
                            onClick={() => loadChat(chat.id)}
                            className="flex-1 text-left px-3 py-2 text-sm text-slate-700 min-w-0"
                          >
                            <div className="truncate">{chat.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{chat.date}</div>
                          </button>
                        )}
                        <Dropdown>
                          <DropdownTrigger>
                            <button 
                              className="md:opacity-0 md:group-hover:opacity-100 p-2 hover:bg-slate-300/60 rounded-lg transition-opacity mr-1 shrink-0"
                              aria-label="Opciones"
                            >
                              <MoreVertical className="w-4 h-4 text-slate-600" />
                            </button>
                          </DropdownTrigger>
                          <DropdownMenu 
                            aria-label="Opciones del chat"
                            onAction={(key) => {
                              if (key === 'pin') togglePinChat(chat.id);
                              if (key === 'rename') startRenameChat(chat.id, chat.title);
                              if (key === 'delete') deleteChat(chat.id);
                            }}
                          >
                            <DropdownItem key="pin" startContent={<Pin className="w-4 h-4" />}>
                              Fijar
                            </DropdownItem>
                            <DropdownItem key="rename" startContent={<Edit2 className="w-4 h-4" />}>
                              Cambiar nombre
                            </DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 className="w-4 h-4" />}>
                              Borrar
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 shrink-0 space-y-2">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-200/60 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-700">IA Groq</span>
                  {useGemini && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Activo</span>}
                </div>
                <button
                  onClick={() => setUseGemini(!useGemini)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    useGemini ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      useGemini ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <button 
                onClick={() => navigate('/perfil')}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200/60 rounded-lg transition-colors text-sm text-slate-700"
              >
                <Settings className="w-5 h-5" />
                <span>Configuración y perfil</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
