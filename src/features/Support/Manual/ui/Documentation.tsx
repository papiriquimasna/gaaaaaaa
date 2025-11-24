import { useState } from 'react';
import ChatMain from '../../../../assets/chatbotsitomain.png';
import ChatReclamations from '../../../../assets/chatbotreclamations.png';
import ChatConver from '../../../../assets/chatbotconversation.png';
import ChatVoteCalendar from '../../../../assets/chatcalendarvote.png';
export default function Documentation() {
  const [selectedSection, setSelectedSection] = useState('introduction');

  const menuItems = [
    {
      title: 'Primeros Pasos',
      items: [
        { id: 'introduction', label: 'Introducción' },
        { id: 'what-is', label: 'Qué es el Asistente' }
      ]
    },
    {
      title: 'Documentación',
      items: [
        { id: 'features', label: 'Características' },
        { id: 'how-to-use', label: 'Cómo Usar' },
        { id: 'voting-queries', label: 'Consultas de Votación' },
        { id: 'candidate-info', label: 'Información de Candidatos' },
        { id: 'complaints', label: 'Reclamaciones' },
        { id: 'calendar', label: 'Calendario Electoral' },
        { id: 'results', label: 'Resultados Electorales' }
      ]
    },
    {
      title: 'Guías',
      items: [
        { id: 'ask-question', label: 'Cómo Hacer Preguntas' },
        { id: 'best-practices', label: 'Mejores Prácticas' },
        { id: 'examples', label: 'Ejemplos de Consultas' }
      ]
    },
    {
      title: 'Avanzado',
      items: [
        { id: 'tips', label: 'Consejos y Trucos' },
        { id: 'troubleshooting', label: 'Solución de Problemas' },
        { id: 'limitations', label: 'Limitaciones' }
      ]
    }
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'introduction':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Documentación - Asistente Electoral ONPE
            </h1>
            
            <p className="text-lg text-slate-500 mb-8">
              Bienvenido a la documentación del Asistente Virtual de Elecciones Laborales ONPE.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
              Esta es la documentación del chatbot Asistente Electoral ONPE.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE es un asistente virtual inteligente diseñado específicamente para elecciones laborales. 
              Proporciona respuestas instantáneas a preguntas sobre el proceso electoral, información de candidatos, procedimientos 
              de votación y presentación de reclamaciones. El asistente está disponible 24/7 para ayudar a los votantes y 
              participantes a navegar por el sistema electoral con facilidad y confianza.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Acerca de esta Documentación</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Esta documentación proporciona información completa sobre cómo usar el Asistente Electoral ONPE de manera efectiva. 
              Aprenderás sobre sus características, cómo interactuar con él, qué tipos de preguntas puedes hacer y cómo 
              obtener las respuestas más precisas y útiles.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Capacidades Principales</h3>
              <p className="text-slate-600 mb-4">El asistente puede ayudarte con:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Información sobre el proceso y procedimientos de votación</li>
                <li>Detalles sobre candidatos registrados y sus propuestas</li>
                <li>Calendario electoral y fechas importantes</li>
                <li>Cómo presentar reclamaciones o quejas</li>
                <li>Verificación del estado de registro de votantes</li>
                <li>Consultas generales sobre elecciones laborales</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Información</h2>
            <p className="text-slate-600 mb-6">Selecciona un tema a continuación para aprender más sobre él.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Documentación</h3>
                <p className="text-slate-500">
                  La documentación oficial sobre cómo usar el Asistente Electoral ONPE.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Guías</h3>
                <p className="text-slate-500">
                  Guías paso a paso sobre cómo interactuar con el asistente.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Ejemplos</h3>
                <p className="text-slate-500">
                  Ejemplos reales de consultas y respuestas del asistente.
                </p>
              </div>
            </div>
          </div>
        );

      case 'what-is':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Qué es el Asistente Electoral ONPE</h1>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El Asistente Electoral ONPE es un chatbot impulsado por IA diseñado específicamente para apoyar las elecciones 
              laborales organizadas por la Oficina Nacional de Procesos Electorales (ONPE) en Perú. Sirve como una guía virtual 
              que proporciona información instantánea y precisa sobre todos los aspectos del proceso electoral.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Propósito y Misión</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              La misión principal del Asistente Electoral es democratizar el acceso a la información electoral y 
              hacer que el proceso de votación sea más transparente y accesible para todos los participantes. Al proporcionar 
              respuestas instantáneas a preguntas y preocupaciones comunes, el asistente ayuda a reducir la incertidumbre y 
              aumenta la confianza en el sistema electoral.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Cómo Funciona</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              El asistente utiliza procesamiento de lenguaje natural para comprender tus preguntas y proporcionar respuestas 
              relevantes. Puedes interactuar con él a través de una interfaz de chat simple, escribiendo tus preguntas en 
              español natural. El sistema analiza tu consulta y recupera la información más apropiada de su base de conocimientos.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Características Principales</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong>Comprensión de Lenguaje Natural:</strong> Haz preguntas con tus propias palabras sin necesidad de comandos o sintaxis específica.</li>
                <li><strong>Respuestas Instantáneas:</strong> Obtén respuestas inmediatas sin esperar al personal de soporte humano.</li>
                <li><strong>Disponibilidad 24/7:</strong> Accede a información en cualquier momento, día o noche.</li>
                <li><strong>Conocimiento Integral:</strong> Cubre todos los aspectos del proceso electoral laboral.</li>
                <li><strong>Soporte Multi-tema:</strong> Maneja preguntas sobre votación, candidatos, reclamaciones y más.</li>
              </ul>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente se actualiza continuamente con la información electoral más reciente para garantizar precisión y relevancia.
            </p>
          </div>
        );

      case 'features':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Características</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE ofrece un conjunto completo de características diseñadas para apoyar cada aspecto 
              del proceso electoral laboral. A continuación se presenta una descripción detallada de lo que el asistente puede hacer por ti.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Información de Votación</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Obtén información detallada sobre el proceso de votación, incluyendo requisitos de elegibilidad, métodos de votación 
              e instrucciones paso a paso para emitir tu voto. El asistente puede explicar tanto los procedimientos de votación 
              digital como tradicional.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-600 mb-2"><strong>Ejemplos de consultas:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>¿Cómo voto en las elecciones laborales?</li>
                <li>¿Qué documentos necesito para votar?</li>
                <li>¿Puedo votar digitalmente?</li>
                <li>¿Cuáles son los horarios de votación?</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Información de Candidatos</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Accede a información completa sobre todos los candidatos registrados, incluyendo sus propuestas, antecedentes 
              y plataformas de campaña. El asistente puede proporcionar información imparcial y objetiva para ayudarte a tomar 
              una decisión informada.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Calendario Electoral</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Mantente informado sobre fechas y plazos electorales importantes. El asistente puede decirte cuándo cierra el registro, 
              cuándo comienza la votación, cuándo se anunciarán los resultados y otras fechas críticas en el cronograma electoral.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Reclamaciones y Quejas</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Aprende cómo presentar reclamaciones o quejas si encuentras problemas durante el proceso electoral. El asistente 
              puede guiarte a través del procedimiento de presentación de reclamaciones y explicar tus derechos como votante.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Resultados y Estadísticas</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Una vez que concluya la votación, el asistente puede proporcionar información sobre cómo y cuándo se publicarán los resultados, 
              y dónde puedes acceder a las estadísticas electorales oficiales.
            </p>
          </div>
        );

      case 'how-to-use':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Cómo Usar el Asistente</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Usar el Asistente Electoral ONPE es simple e intuitivo. Esta guía te llevará a través de los conceptos básicos 
              de interactuar con el asistente para obtener la información que necesitas.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Paso 1: Acceder al Asistente</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Navega a la sección ChatBot en el menú de Soporte. La interfaz del asistente se abrirá, mostrando un 
              mensaje de bienvenida y solicitándote que hagas tu pregunta.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
              <img 
                src= {ChatMain} 
                alt="Interfaz principal del ChatBot"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-sm text-slate-500 mt-2 text-center">Interfaz principal del Asistente Virtual ONPE</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Paso 2: Escribe tu Pregunta</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              En el campo de entrada de mensajes en la parte inferior de la interfaz de chat, escribe tu pregunta en español natural. 
              No necesitas usar palabras clave o comandos específicos, solo pregunta naturalmente como le preguntarías a otra persona.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-600 mb-2"><strong>Buenos ejemplos:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 mb-4">
                <li>¿Cómo puedo votar?</li>
                <li>¿Quiénes son los candidatos?</li>
                <li>¿Cuándo son las elecciones?</li>
              </ul>
              <p className="text-slate-600 mb-2"><strong>Evita:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Palabras sueltas sin contexto</li>
                <li>Preguntas extremadamente largas y complejas</li>
                <li>Múltiples preguntas no relacionadas en un mensaje</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Paso 3: Revisa la Respuesta</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente procesará tu pregunta y proporcionará una respuesta detallada. Lee la respuesta cuidadosamente. 
              Si necesitas aclaraciones o tienes preguntas de seguimiento, puedes continuar la conversación.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Paso 4: Haz Preguntas de Seguimiento</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente mantiene el contexto de los mensajes anteriores en la conversación, por lo que puedes hacer preguntas 
              de seguimiento sin repetir información. Por ejemplo, después de preguntar sobre procedimientos de votación, puedes 
              simplemente preguntar "¿Qué documentos necesito?" y el asistente entenderá que sigues hablando sobre votación.
            </p>
          </div>
        );

      case 'voting-queries':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Consultas de Votación</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE está diseñado para responder todas tus preguntas sobre el proceso de votación 
              en las elecciones laborales. Desde cómo emitir tu voto hasta entender las reglas y restricciones del sistema electoral.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Información sobre el Proceso de Votación</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente puede proporcionarte información detallada sobre cada paso del proceso de votación digital, 
              explicándote cómo acceder al sistema, seleccionar candidatos y confirmar tu voto de manera segura.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
              <img 
                src= {ChatConver} 
                alt="Consulta sobre el proceso de votación"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-sm text-slate-500 mt-2 text-center">Ejemplo de consulta sobre cómo votar en el sistema</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Aspectos Importantes del Voto</h2>
            
            <div className="border-l-4 border-slate-500 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Reglas Fundamentales</h3>
              <ul className="space-y-2 text-slate-700">
                <li><strong>Una sola oportunidad:</strong> Solo puedes votar una vez. Una vez confirmado tu voto, no podrás modificarlo.</li>
                <li><strong>Dos elecciones:</strong> Debes elegir UN candidato para Presidente y UN candidato para Alcalde.</li>
                <li><strong>Voto obligatorio:</strong> Debes completar ambas selecciones para poder confirmar tu voto.</li>
                <li><strong>Comprobante:</strong> Al finalizar, recibirás un comprobante digital de tu votación.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre Votación</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cómo accedo al sistema de votación?</h3>
                <p className="text-slate-600">
                  Una vez que hayas iniciado sesión en el sistema ONPE, dirígete a la sección "Voto Digital" en el menú principal. 
                  El asistente puede guiarte paso a paso si tienes dudas.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Puedo cambiar mi voto después de confirmarlo?</h3>
                <p className="text-slate-600">
                  No. El sistema electoral garantiza la integridad del proceso permitiendo solo un voto por persona. 
                  Una vez confirmado, tu voto es definitivo e irreversible.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Qué pasa si tengo problemas técnicos al votar?</h3>
                <p className="text-slate-600">
                  Si experimentas problemas técnicos, puedes consultar al asistente o presentar una reclamación en el 
                  Libro de Reclamaciones. El sistema registra todos los intentos de votación para garantizar transparencia.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cómo sé que mi voto fue registrado correctamente?</h3>
                <p className="text-slate-600">
                  Al confirmar tu voto, recibirás un comprobante digital con un número de registro único. 
                  Este comprobante es tu garantía de que tu voto fue registrado exitosamente en el sistema.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Ejemplos de Consultas</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-600 mb-2"><strong>Puedes preguntar al asistente:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>¿Cómo puedo votar?</li>
                <li>¿Cuántas veces puedo votar?</li>
                <li>¿Puedo cambiar mi voto?</li>
                <li>¿Qué pasa si me equivoco al votar?</li>
                <li>¿Cómo obtengo mi comprobante de votación?</li>
                <li>¿Hasta cuándo puedo votar?</li>
              </ul>
            </div>
          </div>
        );

      case 'results':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Resultados Electorales</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE puede informarte sobre cuándo y cómo se publicarán los resultados oficiales 
              de las elecciones laborales. Conoce los plazos y dónde consultar los resultados una vez finalizado el proceso de votación.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Fecha de Publicación de Resultados</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Anuncio Oficial</h3>
              <p className="text-slate-600 mb-4">
                Los resultados oficiales de las elecciones laborales se publicarán:
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
                <p className="text-xl font-bold text-slate-800 mb-2">26 de Noviembre de 2025</p>
                <p className="text-slate-600">En horas de la mañana</p>
              </div>
              <p className="text-slate-600">
                Los resultados incluirán la información completa sobre quién fue elegido como Presidente y quién como Alcalde, 
                junto con el conteo total de votos y las estadísticas del proceso electoral.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Qué Información Se Publicará</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Resultados por Cargo</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Candidato electo para Presidente con número de votos obtenidos</li>
                  <li>Candidato electo para Alcalde con número de votos obtenidos</li>
                  <li>Porcentaje de votación de cada candidato</li>
                  <li>Total de votos válidos, nulos y en blanco</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Estadísticas del Proceso</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Número total de votantes registrados</li>
                  <li>Porcentaje de participación electoral</li>
                  <li>Número de votos emitidos por día</li>
                  <li>Distribución de votos por horario</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Dónde Consultar los Resultados</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Una vez publicados, podrás consultar los resultados oficiales en:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <ul className="space-y-3 text-slate-600">
                <li><strong>Portal Web ONPE:</strong> Los resultados estarán disponibles en la página principal del sistema</li>
                <li><strong>Notificaciones:</strong> Recibirás una notificación en el sistema cuando los resultados estén disponibles</li>
                <li><strong>Asistente Virtual:</strong> Podrás consultar al asistente sobre los resultados publicados</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre Resultados</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿A qué hora exacta se publican los resultados?</h3>
                <p className="text-slate-600">
                  Los resultados se publicarán en horas de la mañana del 26 de noviembre. La hora exacta dependerá 
                  del tiempo que tome el conteo y verificación final de todos los votos.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Los resultados son definitivos?</h3>
                <p className="text-slate-600">
                  Los resultados publicados el 26 de noviembre son oficiales y definitivos, salvo que existan 
                  reclamaciones pendientes que puedan afectar el resultado final.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Puedo impugnar los resultados?</h3>
                <p className="text-slate-600">
                  Si tienes evidencia de irregularidades en el proceso electoral, puedes presentar una reclamación 
                  formal en el Libro de Reclamaciones. El asistente puede orientarte sobre el procedimiento.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cómo se garantiza la transparencia?</h3>
                <p className="text-slate-600">
                  El sistema ONPE registra todas las votaciones de forma segura y encriptada. Los resultados son 
                  verificables y auditables para garantizar la transparencia del proceso electoral.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Ejemplos de Consultas</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-600 mb-2"><strong>Puedes preguntar al asistente:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>¿Cuándo se publican los resultados?</li>
                <li>¿Dónde veo los resultados de las elecciones?</li>
                <li>¿Quién ganó las elecciones?</li>
                <li>¿Cómo consulto los resultados oficiales?</li>
                <li>¿Los resultados son definitivos?</li>
              </ul>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Calendario Electoral</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE puede proporcionarte información sobre las fechas más importantes del proceso 
              electoral laboral. Conoce cuándo puedes votar, los plazos establecidos y las consecuencias de no participar 
              en el proceso electoral.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Fechas Clave del Proceso Electoral</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente está programado para informarte sobre las fechas oficiales de votación y otros eventos importantes 
              del calendario electoral. Esta información es crucial para que puedas planificar tu participación en el proceso.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
              <img 
                src= {ChatVoteCalendar} 
                alt="Consulta sobre fechas electorales"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-sm text-slate-500 mt-2 text-center">Ejemplo de consulta sobre fechas de votación</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Días de Votación</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Fechas Oficiales de Votación</h3>
              <ul className="space-y-2 text-slate-600">
                <li><strong>24 de Noviembre de 2025</strong> - Primer día de votación</li>
                <li><strong>25 de Noviembre de 2025</strong> - Segundo día de votación</li>
                <li><strong>Horario:</strong> 8:00 AM - 3:00 PM (ambos días)</li>
              </ul>
              <p className="text-slate-600 mt-4">
                <strong>Nota importante:</strong> Estos son los únicos días habilitados para emitir tu voto. 
                El sistema de votación digital estará activo únicamente durante este período.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Multas por No Votar</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Consecuencias de la Omisión al Voto</h3>
              <p className="text-slate-600 mb-4">
                El voto en las elecciones laborales es obligatorio. Si no participas en el proceso electoral durante 
                las fechas establecidas, se aplicarán las siguientes sanciones:
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-slate-800 mb-2">S/ 44.00 soles</p>
                <p className="text-slate-600">Multa por omisión al sufragio</p>
              </div>
              <p className="text-slate-600">
                Esta multa deberá ser pagada en las entidades autorizadas por ONPE. Recuerda que votar es tu derecho 
                y tu deber como trabajador participante en el proceso electoral laboral.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre Fechas</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Puedo votar en cualquier momento durante esos días?</h3>
                <p className="text-slate-600">
                  Sí, puedes votar en cualquier momento entre las 8:00 AM y 3:00 PM durante los días 24 y 25 de noviembre. 
                  Te recomendamos votar temprano para evitar contratiempos.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Qué pasa si tengo un problema técnico el día de la votación?</h3>
                <p className="text-slate-600">
                  Si experimentas problemas técnicos, puedes intentar votar en el otro día habilitado. También puedes 
                  presentar una reclamación en el Libro de Reclamaciones para documentar el incidente.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cómo justifico mi ausencia si no puedo votar?</h3>
                <p className="text-slate-600">
                  Debes presentar una justificación válida ante ONPE dentro de los plazos establecidos. El asistente 
                  puede orientarte sobre los documentos necesarios y el procedimiento a seguir.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cuándo se publican los resultados?</h3>
                <p className="text-slate-600">
                  Los resultados oficiales se publican después del cierre de la votación el 25 de noviembre. 
                  Puedes consultar al asistente sobre cómo y dónde acceder a los resultados oficiales.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Ejemplos de Consultas</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-600 mb-2"><strong>Puedes preguntar al asistente:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>¿Cuándo son las elecciones?</li>
                <li>¿Qué días puedo votar?</li>
                <li>¿Cuál es el horario de votación?</li>
                <li>¿Qué pasa si no voto?</li>
                <li>¿Cuánto es la multa por no votar?</li>
                <li>¿Hasta qué hora puedo votar?</li>
              </ul>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Reclamaciones y Quejas</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              El Asistente Electoral ONPE puede guiarte en el proceso de presentación de reclamaciones y quejas 
              relacionadas con el proceso electoral. Obtén información clara y precisa sobre cómo ejercer tus derechos 
              como votante o participante en las elecciones laborales.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Tipos de Reclamaciones</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              El sistema ONPE permite presentar diferentes tipos de reclamaciones según la naturaleza de tu consulta o problema:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <ul className="space-y-3 text-slate-600">
                <li><strong>Queja:</strong> Expresión de insatisfacción con el servicio o atención recibida durante el proceso electoral.</li>
                <li><strong>Reclamo:</strong> Manifestación de disconformidad relacionada con irregularidades en el proceso de votación o resultados.</li>
                <li><strong>Sugerencia:</strong> Propuesta de mejora para optimizar el sistema electoral o sus procedimientos.</li>
                <li><strong>Consulta:</strong> Solicitud de información o aclaración sobre aspectos del proceso electoral.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Cómo Consultar sobre Reclamaciones</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              El asistente puede proporcionarte información detallada sobre cómo presentar una reclamación, qué documentos 
              necesitas, los plazos establecidos y cómo hacer seguimiento a tu caso.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
              <img 
                src= {ChatReclamations}
                alt="Consulta sobre reclamaciones en el ChatBot"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-sm text-slate-500 mt-2 text-center">Ejemplo de consulta sobre el proceso de reclamaciones</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Preguntas Frecuentes sobre Reclamaciones</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cómo presento una reclamación?</h3>
                <p className="text-slate-600">
                  Puedes preguntar al asistente "¿Cómo presento una reclamación?" y te guiará paso a paso por el proceso, 
                  desde acceder al Libro de Reclamaciones hasta recibir tu número de registro.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Qué documentos necesito adjuntar?</h3>
                <p className="text-slate-600">
                  Es obligatorio adjuntar evidencias (fotos, documentos, capturas de pantalla) que respalden tu reclamación. 
                  El asistente te explicará qué tipo de evidencias son aceptadas y cómo adjuntarlas correctamente.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Cuánto tiempo tarda el proceso?</h3>
                <p className="text-slate-600">
                  El asistente puede informarte sobre los plazos de procesamiento de reclamaciones y cómo hacer seguimiento 
                  a tu caso a través del calendario electoral.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Puedo ver el estado de mi reclamación?</h3>
                <p className="text-slate-600">
                  Sí, una vez presentada tu reclamación, recibirás un número de registro. Puedes consultar al asistente 
                  sobre cómo verificar el estado de tu reclamación en el sistema.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Ejemplos de Consultas</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-600 mb-2"><strong>Puedes preguntar:</strong></p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>¿Cómo presento una reclamación?</li>
                <li>¿Qué tipos de reclamaciones puedo hacer?</li>
                <li>¿Necesito adjuntar documentos?</li>
                <li>¿Dónde veo el estado de mi reclamo?</li>
                <li>¿Cuánto tiempo tarda en procesarse una queja?</li>
              </ul>
            </div>
          </div>
        );

      case 'best-practices':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Mejores Prácticas</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Para obtener las mejores respuestas del Asistente Electoral ONPE, es importante saber cómo comunicarte 
              efectivamente con él. Esta guía te ayudará a maximizar la utilidad del asistente.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Cómo Formular Preguntas Efectivas</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Preguntas Bien Formuladas</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong>Específicas:</strong> "¿Cómo presento una reclamación por problemas técnicos?"</li>
                <li><strong>Completas:</strong> "¿Qué documentos necesito para justificar mi ausencia en la votación?"</li>
                <li><strong>Claras:</strong> "¿Hasta qué hora puedo votar el 24 de noviembre?"</li>
                <li><strong>Directas:</strong> "¿Cuánto es la multa por no votar?"</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Preguntas Mal Formuladas</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong>Muy vagas:</strong> "Dime sobre las elecciones" (mejor: "¿Cuándo son las elecciones?")</li>
                <li><strong>Múltiples temas:</strong> "¿Cómo voto y quiénes son los candidatos y cuándo son las elecciones?" (separa en 3 preguntas)</li>
                <li><strong>Palabras sueltas:</strong> "candidatos" (mejor: "¿Quiénes son los candidatos?")</li>
                <li><strong>Muy complejas:</strong> Preguntas con más de 3 sub-preguntas en una sola</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Cuándo Usar el Asistente</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              El asistente es ideal para:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Consultas Rápidas</h3>
                <p className="text-slate-600">
                  Cuando necesitas información inmediata sobre fechas, horarios, procedimientos básicos.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Orientación Inicial</h3>
                <p className="text-slate-600">
                  Cuando no sabes por dónde empezar o qué sección del sistema usar.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Dudas Generales</h3>
                <p className="text-slate-600">
                  Preguntas sobre el proceso electoral, requisitos, plazos.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Aprovecha el Contexto</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              El asistente recuerda la conversación, así que puedes hacer preguntas de seguimiento sin repetir información:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-slate-600"><strong>Usuario:</strong> ¿Cómo presento una reclamación?</p>
                  <p className="text-slate-500 text-sm">El asistente explica el proceso...</p>
                </div>
                <div>
                  <p className="text-slate-600"><strong>Usuario:</strong> ¿Qué documentos necesito?</p>
                  <p className="text-slate-500 text-sm">El asistente entiende que sigues hablando de reclamaciones</p>
                </div>
                <div>
                  <p className="text-slate-600"><strong>Usuario:</strong> ¿Cuánto tiempo tarda?</p>
                  <p className="text-slate-500 text-sm">El asistente sabe que preguntas sobre el tiempo de procesamiento de reclamaciones</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'examples':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Ejemplos de Consultas</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              A continuación encontrarás ejemplos reales de conversaciones con el Asistente Electoral ONPE. 
              Estos casos te ayudarán a entender cómo interactuar efectivamente con el sistema.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Escenario 1: Usuario Nuevo</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">Es mi primera vez usando el sistema, ¿cómo empiezo?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    Bienvenido al sistema electoral ONPE. Para comenzar, te recomiendo primero conocer las fechas 
                    de votación (24 y 25 de noviembre). Luego puedes revisar la lista de candidatos en la sección 
                    correspondiente. Cuando llegue el día de votación, accede a "Voto Digital" para emitir tu voto.
                  </p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">¿Dónde veo los candidatos?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    Puedes consultar información sobre los candidatos en la sección "Candidatos" del menú de Administración...
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Escenario 2: Dudas sobre Votación</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">¿Puedo cambiar mi voto después de confirmar?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    No. Solo tienes UNA oportunidad para votar. Una vez confirmado tu voto, no podrás cambiarlo. 
                    Asegúrate de revisar bien tu selección antes de confirmar.
                  </p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">Entiendo. ¿Y si me equivoco al seleccionar?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    Antes de confirmar tu voto, el sistema te mostrará un resumen de tus selecciones. 
                    Revisa cuidadosamente antes de hacer clic en "Confirmar". Una vez confirmado, es definitivo.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Escenario 3: Problema Técnico</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">Tuve un error al intentar votar, ¿qué hago?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    Si experimentaste problemas técnicos, puedes intentar votar nuevamente. Recuerda que tienes 
                    dos días para votar (24 y 25 de noviembre). Si el problema persiste, te recomiendo presentar 
                    una reclamación en el Libro de Reclamaciones para documentar el incidente.
                  </p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Usuario:</p>
                  <p className="text-slate-600">¿Cómo presento la reclamación?</p>
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Asistente:</p>
                  <p className="text-slate-600">
                    Para presentar una reclamación: 1. Dirígete a "Libro de Reclamaciones" en el menú de Soporte...
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ask-question':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Cómo Hacer Preguntas</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Obtener las mejores respuestas del Asistente Electoral depende de cómo formules tus preguntas. 
              Esta guía proporciona consejos y mejores prácticas para una comunicación efectiva con el asistente.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Sé Específico</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Aunque el asistente puede manejar preguntas generales, ser específico te ayuda a obtener respuestas más 
              dirigidas y útiles. En lugar de preguntar "Cuéntame sobre las elecciones", intenta "¿Cuáles son los requisitos para votar en elecciones laborales?"
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Usa Oraciones Completas</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Formula tus preguntas como oraciones completas en lugar de solo palabras clave. Esto ayuda al asistente a 
              comprender mejor tu intención y proporcionar respuestas más precisas.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Un Tema a la Vez</h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Enfócate en un tema por pregunta. Si tienes múltiples preguntas sobre diferentes temas, hazlas por separado 
              para obtener respuestas más claras y enfocadas para cada una.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ejemplos de Conversaciones</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-600 mb-1"><strong>Usuario:</strong> ¿Cómo puedo votar en las elecciones laborales?</p>
                  <p className="text-slate-600"><strong>Asistente:</strong> Para votar en las elecciones laborales, debes...</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1"><strong>Usuario:</strong> ¿Necesito algún documento especial?</p>
                  <p className="text-slate-600"><strong>Asistente:</strong> Sí, necesitas presentar tu DNI vigente...</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tips':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Consejos y Trucos</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Descubre formas avanzadas de interactuar con el Asistente Electoral ONPE para obtener información 
              más rápida y precisa.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Atajos de Consulta</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Preguntas Directas</h3>
                <p className="text-slate-600 mb-3">
                  En lugar de preguntas largas, usa preguntas cortas y directas para información específica:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>"¿Cuándo voto?" en lugar de "¿Me puedes decir cuándo son las fechas de votación?"</li>
                  <li>"¿Multa?" en lugar de "¿Cuánto es la multa si no voto?"</li>
                  <li>"¿Horario?" en lugar de "¿Cuál es el horario de votación?"</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Preguntas de Seguimiento</h3>
                <p className="text-slate-600 mb-3">
                  Aprovecha que el asistente recuerda el contexto:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Después de preguntar sobre votación: "¿Y si tengo problemas?"</li>
                  <li>Después de preguntar sobre candidatos: "¿Dónde veo sus propuestas?"</li>
                  <li>Después de preguntar sobre reclamaciones: "¿Cuánto tarda?"</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Obtener Información Detallada</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Si necesitas más detalles sobre una respuesta, puedes:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <ul className="space-y-3 text-slate-600">
                <li><strong>Pedir ejemplos:</strong> "¿Puedes darme un ejemplo?"</li>
                <li><strong>Solicitar pasos:</strong> "¿Cuáles son los pasos exactos?"</li>
                <li><strong>Aclarar dudas:</strong> "No entendí la parte de..."</li>
                <li><strong>Pedir alternativas:</strong> "¿Hay otra forma de hacerlo?"</li>
              </ul>
            </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Solución de Problemas</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Si tienes dificultades al usar el Asistente Electoral ONPE, esta guía te ayudará a resolver 
              los problemas más comunes.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">El Asistente No Entiende Mi Pregunta</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-3">Soluciones:</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong>Reformula la pregunta:</strong> Usa palabras diferentes o simplifica tu pregunta</li>
                <li><strong>Sé más específico:</strong> En lugar de "problemas", di "error al votar"</li>
                <li><strong>Divide la pregunta:</strong> Si es muy compleja, sepárala en varias preguntas simples</li>
                <li><strong>Usa palabras clave:</strong> "votar", "candidatos", "reclamación", "fechas"</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">La Respuesta No Es Lo Que Esperaba</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-3">Qué hacer:</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong>Aclara tu pregunta:</strong> "Me refiero específicamente a..."</li>
                <li><strong>Proporciona contexto:</strong> "Tengo un problema con..." seguido de detalles</li>
                <li><strong>Haz una pregunta de seguimiento:</strong> "¿Y qué pasa si...?"</li>
                <li><strong>Reformula completamente:</strong> Intenta preguntar de otra manera</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Problemas Comunes</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Problema: Respuestas genéricas</h3>
                <p className="text-slate-600 mb-2"><strong>Causa:</strong> Pregunta muy vaga</p>
                <p className="text-slate-600"><strong>Solución:</strong> Sé más específico en tu pregunta</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Problema: El asistente no responde sobre un tema</h3>
                <p className="text-slate-600 mb-2"><strong>Causa:</strong> Tema fuera del alcance del asistente</p>
                <p className="text-slate-600"><strong>Solución:</strong> Consulta la sección de Limitaciones o contacta soporte</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Problema: Información desactualizada</h3>
                <p className="text-slate-600 mb-2"><strong>Causa:</strong> El sistema puede no tener la última actualización</p>
                <p className="text-slate-600"><strong>Solución:</strong> Verifica en las secciones oficiales del sistema</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Cuándo Contactar Soporte Humano</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Contacta al equipo de soporte si:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <ul className="space-y-2 text-slate-600">
                <li>El asistente no puede responder tu pregunta después de varios intentos</li>
                <li>Necesitas ayuda con un problema técnico específico</li>
                <li>Tienes una situación única que requiere atención personalizada</li>
                <li>Necesitas realizar una acción que el asistente no puede ejecutar</li>
              </ul>
            </div>
          </div>
        );

      case 'limitations':
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Limitaciones</h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Es importante conocer qué puede y qué no puede hacer el Asistente Electoral ONPE para tener 
              expectativas realistas y saber cuándo usar otras herramientas del sistema.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Qué NO Puede Hacer el Asistente</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Acciones del Sistema</h3>
                <p className="text-slate-600 mb-3">El asistente NO puede:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Votar por ti o modificar tu voto</li>
                  <li>Registrar candidatos o modificar información de candidatos</li>
                  <li>Presentar reclamaciones en tu nombre</li>
                  <li>Acceder a tu información personal o historial de votación</li>
                  <li>Modificar fechas o configuraciones del sistema</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Información Personalizada</h3>
                <p className="text-slate-600 mb-3">El asistente NO puede:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Ver si ya votaste o no</li>
                  <li>Acceder al estado de tus reclamaciones específicas</li>
                  <li>Proporcionar información sobre tu cuenta personal</li>
                  <li>Verificar tu elegibilidad para votar</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Decisiones y Recomendaciones</h3>
                <p className="text-slate-600 mb-3">El asistente NO puede:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Recomendar por quién votar</li>
                  <li>Dar opiniones sobre candidatos</li>
                  <li>Tomar decisiones en tu nombre</li>
                  <li>Proporcionar asesoría legal</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Cuándo Usar Otras Secciones</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Para Votar</h3>
                <p className="text-slate-600">
                  Usa la sección "Voto Digital" directamente. El asistente solo te orienta, no puede votar por ti.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Para Ver Candidatos</h3>
                <p className="text-slate-600">
                  Accede a la sección "Candidatos" para ver información completa y actualizada.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Para Presentar Reclamaciones</h3>
                <p className="text-slate-600">
                  Ve directamente al "Libro de Reclamaciones". El asistente te explica cómo, pero no puede presentarla por ti.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-2">Para Información Administrativa</h3>
                <p className="text-slate-600">
                  Si eres administrador, usa las secciones de administración directamente para gestionar el sistema.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Actualizaciones y Mejoras</h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              El Asistente Electoral ONPE se actualiza periódicamente para:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <ul className="space-y-2 text-slate-600">
                <li>Mejorar la comprensión de preguntas</li>
                <li>Agregar información sobre nuevas funcionalidades</li>
                <li>Actualizar fechas y datos del proceso electoral</li>
                <li>Corregir respuestas inexactas o incompletas</li>
                <li>Ampliar el rango de temas que puede abordar</li>
              </ul>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Documentación</h1>
            <p className="text-slate-600">Selecciona un tema del menú lateral para ver su documentación.</p>
          </div>
        );
    }
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Documentación</h2>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay para móvil */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 right-0 md:left-0 z-50 md:z-0
        w-64 md:w-64 bg-white border-l md:border-l-0 md:border-r border-slate-200 
        overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${showMobileMenu ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSelectedSection(item.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedSection === item.id
                          ? 'bg-slate-100 text-slate-900 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
