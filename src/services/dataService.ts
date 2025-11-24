// Servicio de datos simulado (Backend en Frontend)

// Interfaces
export interface Candidato {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  partidoId: string;
  tipo: 'presidente' | 'alcalde';
  foto: string;
  biografia?: string;
  propuestas?: string[];
}

export interface PartidoPolitico {
  id: string;
  nombre: string;
  siglas: string;
  logo: string;
  fundacion: string;
  ideologia: string;
  color: string;
}

export interface Usuario {
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  rol: 'Administrador' | 'Usuario';
  foto: string;
  fechaRegistro: string;
}

export interface Voto {
  id: string;
  usuarioDni: string;
  candidatoId: string;
  tipo: 'presidente' | 'alcalde';
  fecha: string;
}

// Datos iniciales
const PARTIDOS_INICIALES: PartidoPolitico[] = [
  { id: 'p1', nombre: 'Partido Morado', siglas: 'PM', logo: '', fundacion: '2017', ideologia: 'Centro', color: '#800080' },
  { id: 'p2', nombre: 'Victoria Nacional', siglas: 'VN', logo: '', fundacion: '2020', ideologia: 'Centro-derecha', color: '#FF6B00' },
  { id: 'p3', nombre: 'Alianza Para el Progreso', siglas: 'APP', logo: '', fundacion: '2001', ideologia: 'Centro', color: '#0066CC' },
  { id: 'p4', nombre: 'Fuerza Popular', siglas: 'FP', logo: '', fundacion: '2010', ideologia: 'Derecha', color: '#FF6600' },
  { id: 'p5', nombre: 'Juntos por el Perú', siglas: 'JP', logo: '', fundacion: '2016', ideologia: 'Izquierda', color: '#DC143C' },
  { id: 'p6', nombre: 'Renovación Popular', siglas: 'RP', logo: '', fundacion: '2019', ideologia: 'Derecha', color: '#00BFFF' },
  { id: 'p7', nombre: 'Avanza País', siglas: 'AP', logo: '', fundacion: '2020', ideologia: 'Centro-derecha', color: '#FF1493' },
  { id: 'p8', nombre: 'Acción Popular', siglas: 'AP', logo: '', fundacion: '1956', ideologia: 'Centro', color: '#FF0000' },
  { id: 'p9', nombre: 'Podemos Perú', siglas: 'PP', logo: '', fundacion: '2018', ideologia: 'Centro', color: '#8B4513' },
  { id: 'p10', nombre: 'Somos Perú', siglas: 'SP', logo: '', fundacion: '1998', ideologia: 'Centro', color: '#FFA500' },
  { id: 'p11', nombre: 'Partido Popular Cristiano', siglas: 'PPC', logo: '', fundacion: '1966', ideologia: 'Centro-derecha', color: '#0000FF' },
  { id: 'p12', nombre: 'Frente Amplio', siglas: 'FA', logo: '', fundacion: '2013', ideologia: 'Izquierda', color: '#8B0000' },
  { id: 'p13', nombre: 'Perú Patria Segura', siglas: 'PPS', logo: '', fundacion: '2020', ideologia: 'Centro-derecha', color: '#4B0082' },
];

const CANDIDATOS_PRESIDENTES_INICIALES: Candidato[] = [
  { id: 'cp1', nombre: 'Martín', apellidoPaterno: 'Vizcarra', apellidoMaterno: 'Cornejo', dni: '09876543', partidoId: 'p1', tipo: 'presidente', foto: '/candidatos/Vizcarra.jpg' },
  { id: 'cp2', nombre: 'George', apellidoPaterno: 'Forsyth', apellidoMaterno: 'Sommer', dni: '09876544', partidoId: 'p2', tipo: 'presidente', foto: '/candidatos/George.png' },
  { id: 'cp3', nombre: 'César', apellidoPaterno: 'Acuña', apellidoMaterno: 'Peralta', dni: '09876545', partidoId: 'p3', tipo: 'presidente', foto: '/candidatos/Acuna.jpg' },
  { id: 'cp4', nombre: 'Keiko', apellidoPaterno: 'Fujimori', apellidoMaterno: 'Higuchi', dni: '09876546', partidoId: 'p4', tipo: 'presidente', foto: '/candidatos/Keiko.jpg' },
  { id: 'cp5', nombre: 'Verónika', apellidoPaterno: 'Mendoza', apellidoMaterno: 'Frisch', dni: '09876547', partidoId: 'p5', tipo: 'presidente', foto: '/candidatos/Veronika.jpg' },
  { id: 'cp6', nombre: 'Rafael', apellidoPaterno: 'López Aliaga', apellidoMaterno: '', dni: '09876548', partidoId: 'p6', tipo: 'presidente', foto: '/candidatos/Rafael.jpg' },
  { id: 'cp7', nombre: 'Hernando', apellidoPaterno: 'de Soto', apellidoMaterno: 'Polar', dni: '09876549', partidoId: 'p7', tipo: 'presidente', foto: '/candidatos/Hernando.jpg' },
  { id: 'cp8', nombre: 'Yonhy', apellidoPaterno: 'Lescano', apellidoMaterno: 'Ancieta', dni: '09876550', partidoId: 'p8', tipo: 'presidente', foto: '/candidatos/Yonhy.jpg' },
  { id: 'cp9', nombre: 'Daniel', apellidoPaterno: 'Urresti', apellidoMaterno: 'Elera', dni: '09876551', partidoId: 'p9', tipo: 'presidente', foto: '/candidatos/Daniel.jpg' },
  { id: 'cp10', nombre: 'Julio', apellidoPaterno: 'Guzmán', apellidoMaterno: 'Cáceres', dni: '09876552', partidoId: 'p1', tipo: 'presidente', foto: '/candidatos/Julio.jpg' },
  { id: 'cp11', nombre: 'Alberto', apellidoPaterno: 'Beingolea', apellidoMaterno: 'Delgado', dni: '09876553', partidoId: 'p11', tipo: 'presidente', foto: '/candidatos/Alberto.jpg' },
  { id: 'cp12', nombre: 'Marco', apellidoPaterno: 'Arana', apellidoMaterno: 'Zegarra', dni: '09876554', partidoId: 'p12', tipo: 'presidente', foto: '/candidatos/Marco.jpg' },
];

const CANDIDATOS_ALCALDES_INICIALES: Candidato[] = [
  { id: 'ca1', nombre: 'Rafael', apellidoPaterno: 'López Aliaga', apellidoMaterno: '', dni: '08876543', partidoId: 'p6', tipo: 'alcalde', foto: '/candidatos/Rafael.jpg' },
  { id: 'ca2', nombre: 'Daniel', apellidoPaterno: 'Urresti', apellidoMaterno: 'Elera', dni: '08876544', partidoId: 'p9', tipo: 'alcalde', foto: '/candidatos/Daniel.jpg' },
  { id: 'ca3', nombre: 'Yuri', apellidoPaterno: 'Castro', apellidoMaterno: 'Romero', dni: '08876545', partidoId: 'p5', tipo: 'alcalde', foto: '/candidatos/Yuri.jpg' },
  { id: 'ca4', nombre: 'Omar', apellidoPaterno: 'Chehade', apellidoMaterno: 'Moya', dni: '08876546', partidoId: 'p3', tipo: 'alcalde', foto: '/candidatos/Omar.jpg' },
  { id: 'ca5', nombre: 'Elizabeth', apellidoPaterno: 'León', apellidoMaterno: 'Minaya', dni: '08876547', partidoId: 'p10', tipo: 'alcalde', foto: '/candidatos/Elizabeth.jpg' },
  { id: 'ca6', nombre: 'Marco Tulio', apellidoPaterno: 'Gutiérrez', apellidoMaterno: 'Varas', dni: '08876548', partidoId: 'p7', tipo: 'alcalde', foto: '/candidatos/Marco Tulio.jpg' },
  { id: 'ca7', nombre: 'George', apellidoPaterno: 'Forsyth', apellidoMaterno: 'Sommer', dni: '08876549', partidoId: 'p2', tipo: 'alcalde', foto: '/candidatos/George Forsyth.png' },
  { id: 'ca8', nombre: 'Gonzalo', apellidoPaterno: 'Alegría', apellidoMaterno: 'Varona', dni: '08876550', partidoId: 'p1', tipo: 'alcalde', foto: '/candidatos/Gonzalo Alegria.jpg' },
  { id: 'ca9', nombre: 'Renzo', apellidoPaterno: 'Reggiardo', apellidoMaterno: 'Barreto', dni: '08876551', partidoId: 'p13', tipo: 'alcalde', foto: '/candidatos/Renzo.jpg' },
  { id: 'ca10', nombre: 'Alberto', apellidoPaterno: 'Beingolea', apellidoMaterno: 'Delgado', dni: '08876552', partidoId: 'p11', tipo: 'alcalde', foto: '/candidatos/Alberto Beingolea.jpg' },
  { id: 'ca11', nombre: 'Enrique', apellidoPaterno: 'Ocrospoma', apellidoMaterno: 'Pella', dni: '08876553', partidoId: 'p8', tipo: 'alcalde', foto: '/candidatos/Enrique Ocrospoma.jpg' },
  { id: 'ca12', nombre: 'Susel', apellidoPaterno: 'Paredes', apellidoMaterno: 'Piqué', dni: '08876554', partidoId: 'p4', tipo: 'alcalde', foto: '/candidatos/Susel Paredes.jpg' },
];

const USUARIOS_INICIALES: Usuario[] = [
  {
    dni: '60946347',
    nombre: 'Sebastian Victor',
    apellidoPaterno: 'Bohorquez',
    apellidoMaterno: 'Perez',
    email: 'sebastian.bohorquez@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
    fechaRegistro: new Date().toISOString(),
  },
  {
    dni: '74992266',
    nombre: 'Josue Caleb',
    apellidoPaterno: 'Ochoa',
    apellidoMaterno: 'Reyes',
    email: 'josue.ochoa@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
    fechaRegistro: new Date().toISOString(),
  },
  {
    dni: '60762976',
    nombre: 'Milagros Naomi',
    apellidoPaterno: 'Villa',
    apellidoMaterno: 'Sandoval',
    email: 'milagros.villa@onpe.gob.pe',
    rol: 'Usuario',
    foto: '',
    fechaRegistro: new Date().toISOString(),
  },
  {
    dni: '12345678',
    nombre: 'Super',
    apellidoPaterno: 'Administrador',
    apellidoMaterno: 'Sistema',
    email: 'admin@onpe.gob.pe',
    rol: 'Administrador',
    foto: '',
    fechaRegistro: new Date().toISOString(),
  },
];

// Clase de servicio de datos
class DataService {
  private readonly KEYS = {
    VOTOS: 'onpe_votos',
    USER_DATA_PREFIX: 'onpe_user_',
  };

  // Datos hardcodeados (no se guardan en localStorage)
  private readonly PARTIDOS = PARTIDOS_INICIALES;
  private readonly CANDIDATOS_PRESIDENTES = CANDIDATOS_PRESIDENTES_INICIALES;
  private readonly CANDIDATOS_ALCALDES = CANDIDATOS_ALCALDES_INICIALES;
  private readonly USUARIOS = USUARIOS_INICIALES;

  // ========== PARTIDOS POLÍTICOS (Solo lectura - hardcodeados) ==========
  getPartidos(): PartidoPolitico[] {
    return [...this.PARTIDOS];
  }

  getPartidoById(id: string): PartidoPolitico | null {
    return this.PARTIDOS.find((p) => p.id === id) || null;
  }

  // ========== CANDIDATOS (Solo lectura - hardcodeados) ==========
  getCandidatos(tipo?: 'presidente' | 'alcalde'): Candidato[] {
    if (tipo === 'presidente') return [...this.CANDIDATOS_PRESIDENTES];
    if (tipo === 'alcalde') return [...this.CANDIDATOS_ALCALDES];
    return [...this.CANDIDATOS_PRESIDENTES, ...this.CANDIDATOS_ALCALDES];
  }

  getCandidatoById(id: string): Candidato | null {
    const candidatos = this.getCandidatos();
    return candidatos.find((c) => c.id === id) || null;
  }

  // ========== USUARIOS (Solo lectura - hardcodeados) ==========
  getUsuarios(): Usuario[] {
    return [...this.USUARIOS];
  }

  getUsuarioByDni(dni: string): Usuario | null {
    return this.USUARIOS.find((u) => u.dni === dni) || null;
  }

  // ========== VOTOS (Se guardan en localStorage por usuario) ==========
  private getVotosKey(usuarioDni: string): string {
    return `${this.KEYS.USER_DATA_PREFIX}${usuarioDni}_votos`;
  }

  getVotosByUsuario(usuarioDni: string): Voto[] {
    const key = this.getVotosKey(usuarioDni);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  hasVotado(usuarioDni: string, tipo: 'presidente' | 'alcalde'): boolean {
    const votos = this.getVotosByUsuario(usuarioDni);
    return votos.some((v) => v.tipo === tipo);
  }

  registrarVoto(usuarioDni: string, candidatoId: string, tipo: 'presidente' | 'alcalde'): Voto | null {
    if (this.hasVotado(usuarioDni, tipo)) {
      return null; // Ya votó
    }

    const votos = this.getVotosByUsuario(usuarioDni);
    const newVoto: Voto = {
      id: `v${Date.now()}`,
      usuarioDni,
      candidatoId,
      tipo,
      fecha: new Date().toISOString(),
    };
    votos.push(newVoto);
    
    const key = this.getVotosKey(usuarioDni);
    localStorage.setItem(key, JSON.stringify(votos));
    return newVoto;
  }

  // Obtener todos los votos (para estadísticas generales)
  getAllVotos(): Voto[] {
    const allVotos: Voto[] = [];
    this.USUARIOS.forEach((usuario) => {
      const votosUsuario = this.getVotosByUsuario(usuario.dni);
      allVotos.push(...votosUsuario);
    });
    return allVotos;
  }

  // ========== DATOS DE USUARIO (Perfil, configuraciones, etc.) ==========
  getUserData(usuarioDni: string): any {
    const key = `${this.KEYS.USER_DATA_PREFIX}${usuarioDni}_data`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  saveUserData(usuarioDni: string, data: any): void {
    const key = `${this.KEYS.USER_DATA_PREFIX}${usuarioDni}_data`;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ========== ESTADÍSTICAS ==========
  getEstadisticas() {
    const votos = this.getAllVotos();
    const candidatos = this.getCandidatos();
    
    const votosPorCandidato: Record<string, number> = {};
    votos.forEach((voto) => {
      votosPorCandidato[voto.candidatoId] = (votosPorCandidato[voto.candidatoId] || 0) + 1;
    });

    return {
      totalVotos: votos.length,
      votosPresidente: votos.filter((v) => v.tipo === 'presidente').length,
      votosAlcalde: votos.filter((v) => v.tipo === 'alcalde').length,
      totalUsuarios: this.USUARIOS.length,
      usuariosQueVotaron: new Set(votos.map((v) => v.usuarioDni)).size,
      votosPorCandidato,
      candidatos: candidatos.map((c) => ({
        ...c,
        partido: this.getPartidoById(c.partidoId),
        votos: votosPorCandidato[c.id] || 0,
        porcentaje: votos.length > 0 ? ((votosPorCandidato[c.id] || 0) / votos.length * 100).toFixed(2) : '0.00',
      })),
    };
  }

  // ========== UTILIDADES ==========
  clearUserData(usuarioDni: string) {
    const votosKey = this.getVotosKey(usuarioDni);
    const dataKey = `${this.KEYS.USER_DATA_PREFIX}${usuarioDni}_data`;
    localStorage.removeItem(votosKey);
    localStorage.removeItem(dataKey);
  }

  exportData() {
    return {
      partidos: this.getPartidos(),
      candidatos: this.getCandidatos(),
      usuarios: this.getUsuarios(),
      votos: this.getAllVotos(),
      estadisticas: this.getEstadisticas(),
    };
  }
}

// Exportar instancia única
export const dataService = new DataService();
