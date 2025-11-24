const headerMapping: { [key: string]: string } = {
  'DNI': 'dni',
  'Nombre': 'nombre',
  'ApellidoPaterno': 'apellidoPaterno',
  'ApellidoMaterno': 'apellidoMaterno',
  'Genero': 'genero',
  'Departamento': 'departamento',
  'PartidoPolitico': 'partidoPolitico',
  'Estado': 'estadoPostulacion',
  'Siglas': 'siglas',
  'RepresentantePresidente': 'representantePresidente',
};

export const exportToCSV = (data: any[], filename: string, headers: string[]) => {
  if (data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Crear CSV
  const csvContent = [
    headers.join(','), // Headers
    ...data.map(row => 
      headers.map(header => {
        const key = headerMapping[header] || header.toLowerCase();
        let value = row[key] || '';
        // Escapar comas y comillas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any[], filename: string) => {
  if (data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportPresidentes = (format: 'csv' | 'json' = 'csv') => {
  const data = JSON.parse(localStorage.getItem('candidatosPresidenciales') || '[]');
  
  if (format === 'csv') {
    const headers = ['DNI', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Genero', 'PartidoPolitico', 'Estado'];
    exportToCSV(data, 'candidatos_presidenciales', headers);
  } else {
    exportToJSON(data, 'candidatos_presidenciales');
  }
};

export const exportAlcaldes = (format: 'csv' | 'json' = 'csv') => {
  const data = JSON.parse(localStorage.getItem('candidatosAlcaldes') || '[]');
  
  if (format === 'csv') {
    const headers = ['DNI', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Genero', 'Departamento', 'PartidoPolitico', 'Estado'];
    exportToCSV(data, 'candidatos_alcaldes', headers);
  } else {
    exportToJSON(data, 'candidatos_alcaldes');
  }
};

export const exportPartidos = (format: 'csv' | 'json' = 'csv') => {
  const data = JSON.parse(localStorage.getItem('partidos') || '[]');
  
  if (format === 'csv') {
    const headers = ['Nombre', 'Siglas', 'RepresentantePresidente', 'Estado'];
    exportToCSV(data, 'partidos_politicos', headers);
  } else {
    exportToJSON(data, 'partidos_politicos');
  }
};
