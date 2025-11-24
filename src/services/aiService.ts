// Servicio de IA usando Groq
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn('⚠️ VITE_GROQ_API_KEY no está configurada');
}

export const aiService = {
  // Chat con Groq (texto)
  async chat(message: string): Promise<string> {
    if (!GROQ_API_KEY || GROQ_API_KEY.trim() === '') {
      throw new Error(
        '⚠️ No hay API key configurada.\n\n' +
          'Para usar IA en el chatbot:\n' +
          '1. Consigue una API key GRATIS de Groq: https://console.groq.com/keys\n' +
          '2. Agrégala en tu archivo .env como VITE_GROQ_API_KEY=tu_key\n' +
          '3. Reinicia el servidor\n\n' +
          'O desactiva el toggle "IA Groq" para usar respuestas locales.'
      );
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API Error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('✅ Respuesta de Groq recibida');
      return data.choices[0]?.message?.content || 'No se pudo generar respuesta';
    } catch (error) {
      console.error('Error en Groq:', error);
      throw error;
    }
  },

  // Chat con imagen - Análisis básico sin API de visión
  async chatWithImage(message: string, _imageBase64: string): Promise<string> {
    // Por ahora, Groq no tiene modelos de visión activos gratuitos
    // El parámetro imageBase64 se mantiene para compatibilidad futura
    // pero se marca con _ para indicar que no se usa actualmente
    
    try {
      const analysisPrompt = `El usuario ha subido una imagen y pregunta: "${message || 'Analiza esta imagen'}"

Como asistente del sistema ONPE, proporciona una respuesta útil basándote en el contexto:

- Si pregunta sobre documentos electorales, explica qué tipo de documentos existen en ONPE
- Si pregunta sobre candidatos, explica cómo consultar información de candidatos
- Si pregunta sobre el proceso de votación, proporciona los pasos
- Si es otra consulta, responde de manera general pero profesional

Nota: Actualmente no puedo analizar el contenido visual de la imagen, pero puedo ayudarte con información sobre el sistema ONPE.`;

      const response = await this.chat(analysisPrompt);
      
      return `📷 **Imagen recibida**\n\n${response}\n\n💡 *Nota: Por el momento no puedo analizar visualmente las imágenes, pero puedo ayudarte con información sobre el sistema ONPE. Describe lo que ves en la imagen y te ayudaré mejor.*`;
    } catch (error) {
      console.error('Error en análisis de imagen:', error);
      throw error;
    }
  },
};
