export interface ParsedData {
  data: any[];
  errors: string[];
  warnings: string[];
}

export const parseCSV = (csvText: string): ParsedData => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const data: any[] = [];

  try {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      errors.push('El archivo CSV está vacío o no tiene datos');
      return { data, errors, warnings };
    }

    // Obtener headers
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Procesar cada línea
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Saltar líneas vacías

      const values = line.split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        warnings.push(`Fila ${i + 1}: Número de columnas no coincide con los headers`);
        continue;
      }

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      data.push(row);
    }

    return { data, errors, warnings };
  } catch (error) {
    errors.push(`Error al parsear CSV: ${error}`);
    return { data, errors, warnings };
  }
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};
