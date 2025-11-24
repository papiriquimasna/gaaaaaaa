import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: string;
  foto: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Intentar cargar datos del usuario desde localStorage
    const savedUserData = localStorage.getItem('userData');
    const userDni = localStorage.getItem('userDni');
    
    if (savedUserData && userDni) {
      try {
        const parsed = JSON.parse(savedUserData);
        // Verificar que el DNI coincida con el usuario actual
        if (parsed.dni === userDni) {
          return parsed;
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    }
    
    // Datos por defecto vacíos (se llenarán en el login)
    return {
      nombre: 'Usuario',
      apellido: 'Invitado',
      dni: '',
      email: '',
      rol: 'Usuario',
      foto: '',
    };
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => {
      const newData = { ...prev, ...data };
      // Guardar en localStorage específico del usuario
      const userDni = localStorage.getItem('userDni');
      if (userDni) {
        localStorage.setItem(`userData_${userDni}`, JSON.stringify(newData));
        localStorage.setItem('userData', JSON.stringify(newData));
      }
      return newData;
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider');
  }
  return context;
};
