# Configuración de Variables de Entorno en Vercel

Para que el chatbot funcione correctamente en producción, necesitas agregar la API key de Groq en Vercel.

## Pasos para configurar:

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega la siguiente variable:

```
Name: VITE_GROQ_API_KEY
Value: [COPIA LA KEY DE TU ARCHIVO .env LOCAL]
```

5. Selecciona los entornos donde aplicará:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Click en **Save**
7. Ve a **Deployments** y haz **Redeploy** del último deployment

## Verificación

Después del redeploy, el chatbot debería funcionar correctamente. Si aún hay problemas:

1. Verifica que la variable esté correctamente guardada en Settings
2. Asegúrate de que el nombre sea exactamente `VITE_GROQ_API_KEY` (con el prefijo VITE_)
3. Revisa los logs del deployment en Vercel para ver si hay errores

## Nota sobre la API Key

La API key de Groq es gratuita y no requiere tarjeta de crédito. Si necesitas generar una nueva:
- Ve a: https://console.groq.com/keys
- Crea una cuenta gratuita
- Genera una nueva API key
