# Usuarios de Prueba - Sistema Electoral ONPE

## Usuarios Disponibles

### Super Administrador
- **DNI:** 12345678
- **Nombre:** Super Administrador
- **Rol:** Administrador
- **Email:** admin@onpe.gob.pe

### Usuarios Normales

#### Usuario 1
- **DNI:** 60946347
- **Nombre:** Sebastian Victor Bohorquez Perez
- **Rol:** Usuario
- **Email:** sebastian.bohorquez@onpe.gob.pe

#### Usuario 2
- **DNI:** 74992266
- **Nombre:** Josue Caleb Ochoa Reyes
- **Rol:** Usuario
- **Email:** josue.ochoa@onpe.gob.pe

#### Usuario 3
- **DNI:** 60762976
- **Nombre:** Milagros Naomi Villa Sandoval
- **Rol:** Usuario
- **Email:** milagros.villa@onpe.gob.pe

## Características del Sistema

### Autenticación
- Cada usuario tiene su propia sesión independiente
- Los datos de cada usuario se guardan por separado en localStorage
- Los cambios realizados por un usuario no afectan a otros usuarios

### Funcionalidades
1. **Landing Page:** Página de inicio con información sobre las elecciones
2. **Login:** Sistema de autenticación por DNI
3. **Dashboard:** Panel de control personalizado para cada usuario
4. **Perfil:** Cada usuario puede editar su información personal
5. **Logout:** Cierre de sesión seguro

### Rutas del Sistema
- `/` - Landing Page (público)
- `/login` - Página de inicio de sesión (público)
- `/dashboard` - Dashboard principal (protegido)
- `/dashboard/perfil` - Perfil de usuario (protegido)
- Todas las demás rutas del dashboard están protegidas

## Notas Importantes
- Los datos de cada usuario se almacenan en `localStorage` con la clave `userData_{dni}`
- Al cerrar sesión, se limpian los datos de autenticación pero se mantienen los datos personalizados del usuario
- Cada usuario puede modificar su perfil sin afectar a otros usuarios
