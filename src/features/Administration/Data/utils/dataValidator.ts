const departamentosValidos = [
  'Amazonas',
  'Áncash',
  'Apurímac',
  'Arequipa',
  'Ayacucho',
  'Cajamarca',
  'Callao',
  'Cusco',
  'Huancavelica',
  'Huánuco',
  'Ica',
  'Junín',
  'La Libertad',
  'Lambayeque',
  'Lima',
  'Loreto',
  'Madre de Dios',
  'Moquegua',
  'Pasco',
  'Piura',
  'Puno',
  'San Martín',
  'Tacna',
  'Tumbes',
  'Ucayali',
];

const generosValidos = ['Masculino', 'Femenino', 'Otro'];
const estadosValidos = ['Aprobado', 'Pendiente', 'Rechazado'];

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  cleanedData: any;
}

export const validatePresidente = (row: any, index: number): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const cleanedData: any = {};

  // DNI
  const dni = row.DNI?.trim();
  if (!dni) {
    errors.push(`Fila ${index + 1}: DNI es obligatorio`);
  } else if (!/^\d{8}$/.test(dni)) {
    errors.push(`Fila ${index + 1}: DNI debe tener 8 dígitos`);
  } else {
    cleanedData.dni = dni;
  }

  // Nombre
  const nombre = row.Nombre?.trim();
  if (!nombre) {
    errors.push(`Fila ${index + 1}: Nombre es obligatorio`);
  } else {
    cleanedData.nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }

  // Apellido Paterno
  const apellidoPaterno = row.ApellidoPaterno?.trim();
  if (!apellidoPaterno) {
    errors.push(`Fila ${index + 1}: Apellido Paterno es obligatorio`);
  } else {
    cleanedData.apellidoPaterno = apellidoPaterno.charAt(0).toUpperCase() + apellidoPaterno.slice(1).toLowerCase();
  }

  // Apellido Materno
  const apellidoMaterno = row.ApellidoMaterno?.trim();
  if (!apellidoMaterno) {
    errors.push(`Fila ${index + 1}: Apellido Materno es obligatorio`);
  } else {
    cleanedData.apellidoMaterno = apellidoMaterno.charAt(0).toUpperCase() + apellidoMaterno.slice(1).toLowerCase();
  }

  // Género
  const genero = row.Genero?.trim();
  if (!genero) {
    errors.push(`Fila ${index + 1}: Género es obligatorio`);
  } else if (!generosValidos.includes(genero)) {
    errors.push(`Fila ${index + 1}: Género debe ser Masculino, Femenino u Otro`);
  } else {
    cleanedData.genero = genero;
  }

  // Partido Político
  const partidoPolitico = row.PartidoPolitico?.trim();
  if (!partidoPolitico) {
    errors.push(`Fila ${index + 1}: Partido Político es obligatorio`);
  } else {
    cleanedData.partidoPolitico = partidoPolitico;
  }

  // Estado
  const estado = row.Estado?.trim() || 'Pendiente';
  if (!estadosValidos.includes(estado)) {
    warnings.push(`Fila ${index + 1}: Estado inválido, se usará "Pendiente"`);
    cleanedData.estadoPostulacion = 'Pendiente';
  } else {
    cleanedData.estadoPostulacion = estado;
  }

  // Campos adicionales
  cleanedData.fotoPostulante = '';
  cleanedData.fotoPartido = '';

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    cleanedData,
  };
};

export const validateAlcalde = (row: any, index: number): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const cleanedData: any = {};

  // DNI
  const dni = row.DNI?.trim();
  if (!dni) {
    errors.push(`Fila ${index + 1}: DNI es obligatorio`);
  } else if (!/^\d{8}$/.test(dni)) {
    errors.push(`Fila ${index + 1}: DNI debe tener 8 dígitos`);
  } else {
    cleanedData.dni = dni;
  }

  // Nombre
  const nombre = row.Nombre?.trim();
  if (!nombre) {
    errors.push(`Fila ${index + 1}: Nombre es obligatorio`);
  } else {
    cleanedData.nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }

  // Apellido Paterno
  const apellidoPaterno = row.ApellidoPaterno?.trim();
  if (!apellidoPaterno) {
    errors.push(`Fila ${index + 1}: Apellido Paterno es obligatorio`);
  } else {
    cleanedData.apellidoPaterno = apellidoPaterno.charAt(0).toUpperCase() + apellidoPaterno.slice(1).toLowerCase();
  }

  // Apellido Materno
  const apellidoMaterno = row.ApellidoMaterno?.trim();
  if (!apellidoMaterno) {
    errors.push(`Fila ${index + 1}: Apellido Materno es obligatorio`);
  } else {
    cleanedData.apellidoMaterno = apellidoMaterno.charAt(0).toUpperCase() + apellidoMaterno.slice(1).toLowerCase();
  }

  // Género
  const genero = row.Genero?.trim();
  if (!genero) {
    errors.push(`Fila ${index + 1}: Género es obligatorio`);
  } else if (!generosValidos.includes(genero)) {
    errors.push(`Fila ${index + 1}: Género debe ser Masculino, Femenino u Otro`);
  } else {
    cleanedData.genero = genero;
  }

  // Departamento
  const departamento = row.Departamento?.trim();
  if (!departamento) {
    errors.push(`Fila ${index + 1}: Departamento es obligatorio`);
  } else {
    // Normalizar departamento
    const deptNormalizado = departamentosValidos.find(
      d => d.toLowerCase() === departamento.toLowerCase()
    );
    if (!deptNormalizado) {
      errors.push(`Fila ${index + 1}: Departamento "${departamento}" no es válido`);
    } else {
      cleanedData.departamento = deptNormalizado;
    }
  }

  // Partido Político
  const partidoPolitico = row.PartidoPolitico?.trim();
  if (!partidoPolitico) {
    errors.push(`Fila ${index + 1}: Partido Político es obligatorio`);
  } else {
    cleanedData.partidoPolitico = partidoPolitico;
  }

  // Estado
  const estado = row.Estado?.trim() || 'Pendiente';
  if (!estadosValidos.includes(estado)) {
    warnings.push(`Fila ${index + 1}: Estado inválido, se usará "Pendiente"`);
    cleanedData.estadoPostulacion = 'Pendiente';
  } else {
    cleanedData.estadoPostulacion = estado;
  }

  // Campos adicionales
  cleanedData.fotoPostulante = '';
  cleanedData.fotoPartido = '';

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    cleanedData,
  };
};

export const checkDuplicateDNI = (dni: string, existingData: any[]): boolean => {
  return existingData.some(item => item.dni === dni);
};
