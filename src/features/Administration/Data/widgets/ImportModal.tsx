import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip, Checkbox } from '@heroui/react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { parseCSV, readFileAsText } from '../utils/csvParser';
import { checkDuplicateDNI } from '../utils/dataValidator';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'presidentes' | 'alcaldes';
  onImportSuccess: () => void;
}

interface RowData {
  data: any;
  selected: boolean;
  hasErrors: boolean;
  errors: string[];
}

export default function ImportModal({ isOpen, onClose, type, onImportSuccess }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [allRows, setAllRows] = useState<RowData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'validation' | 'success'>('upload');
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);

  const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const cleanData = (data: any) => {
    // Mapear nombres de columnas del CSV a nombres internos
    const fieldMapping: any = {
      'DNI': 'dni',
      'Nombre': 'nombre',
      'ApellidoPaterno': 'apellidoPaterno',
      'ApellidoMaterno': 'apellidoMaterno',
      'Genero': 'genero',
      'Departamento': 'departamento',
      'PartidoPolitico': 'partidoPolitico',
      'Estado': 'estadoPostulacion',
    };

    const cleaned: any = {};
    Object.keys(data).forEach(key => {
      const mappedKey = fieldMapping[key] || key;
      const value = data[key];
      
      if (typeof value === 'string') {
        let cleanedValue = value.trim();
        
        if (cleanedValue) {
          // Capitalizar según el tipo de campo
          if (mappedKey === 'nombre' || mappedKey === 'apellidoPaterno' || 
              mappedKey === 'apellidoMaterno' || mappedKey === 'partidoPolitico') {
            // Para nombres: capitalizar cada palabra
            cleanedValue = capitalizeWords(cleanedValue);
          } else if (mappedKey === 'genero') {
            // Para género: normalizar a Masculino/Femenino
            const lower = cleanedValue.toLowerCase();
            cleanedValue = lower === 'masculino' ? 'Masculino' : 
                          lower === 'femenino' ? 'Femenino' : cleanedValue;
          } else if (mappedKey === 'estadoPostulacion') {
            // Para estado: normalizar a Aprobado/Pendiente/Rechazado
            const lower = cleanedValue.toLowerCase();
            cleanedValue = lower === 'aprobado' ? 'Aprobado' : 
                          lower === 'pendiente' ? 'Pendiente' : 
                          lower === 'rechazado' ? 'Rechazado' : cleanedValue;
          } else if (mappedKey === 'departamento') {
            // Para departamento: capitalizar correctamente
            cleanedValue = capitalizeWords(cleanedValue);
          }
        }
        
        cleaned[mappedKey] = cleanedValue;
      } else {
        cleaned[mappedKey] = value;
      }
    });
    
    return cleaned;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Por favor selecciona un archivo CSV');
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const csvText = await readFileAsText(selectedFile);
      const { data, errors: parseErrors } = parseCSV(csvText);

      if (parseErrors.length > 0) {
        alert('Error al parsear CSV: ' + parseErrors.join(', '));
        setIsProcessing(false);
        return;
      }

      const existingData = JSON.parse(
        localStorage.getItem(type === 'presidentes' ? 'candidatosPresidenciales' : 'candidatosAlcaldes') || '[]'
      );

      // Cargar partidos políticos registrados
      const partidosRegistrados = JSON.parse(localStorage.getItem('partidos') || '[]');

      // Función para normalizar texto (sin tildes, minúsculas)
      const normalizeText = (text: string) => {
        return text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      // Función para buscar partido por nombre flexible
      const findPartido = (nombrePartido: string) => {
        const normalized = normalizeText(nombrePartido);
        return partidosRegistrados.find((p: any) => 
          normalizeText(p.nombre) === normalized
        );
      };

      // Procesar TODAS las filas
      const rows: RowData[] = data.map((row) => {
        const cleanedRow = cleanData(row);
        const rowErrors: string[] = [];
        const rowWarnings: string[] = [];
        
        // Validar campos requeridos
        if (!cleanedRow.dni || cleanedRow.dni.length !== 8) {
          rowErrors.push('DNI inválido (debe tener 8 dígitos)');
        }
        if (!cleanedRow.nombre) rowErrors.push('Nombre vacío');
        if (!cleanedRow.apellidoPaterno) rowErrors.push('Apellido paterno vacío');
        if (!cleanedRow.apellidoMaterno) rowErrors.push('Apellido materno vacío');
        if (!cleanedRow.genero || !['Masculino', 'Femenino'].includes(cleanedRow.genero)) {
          rowErrors.push('Género inválido');
        }
        if (!cleanedRow.partidoPolitico) {
          rowErrors.push('Partido político vacío');
        } else {
          // Buscar el partido en el sistema
          const partidoEncontrado = findPartido(cleanedRow.partidoPolitico);
          if (partidoEncontrado) {
            // Asignar el nombre correcto y el logo del partido
            cleanedRow.partidoPolitico = partidoEncontrado.nombre;
            cleanedRow.fotoPartido = partidoEncontrado.logo;
          } else {
            rowWarnings.push(`Partido "${cleanedRow.partidoPolitico}" no está registrado`);
          }
        }
        if (!cleanedRow.estadoPostulacion || !['Aprobado', 'Pendiente', 'Rechazado'].includes(cleanedRow.estadoPostulacion)) {
          rowErrors.push('Estado inválido');
        }

        if (type === 'alcaldes') {
          const validDepts = [
            'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao',
            'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque',
            'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno',
            'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
          ];
          if (!cleanedRow.departamento || !validDepts.includes(cleanedRow.departamento)) {
            rowErrors.push('Departamento inválido');
          }
        }

        // Verificar DNI duplicado
        if (cleanedRow.dni && checkDuplicateDNI(cleanedRow.dni, existingData)) {
          rowErrors.push('DNI ya existe');
        }

        // Combinar errores y advertencias
        const allMessages = [...rowErrors, ...rowWarnings.map(w => `⚠️ ${w}`)];

        return {
          data: cleanedRow,
          selected: rowErrors.length === 0, // Auto-seleccionar solo si no tiene errores (advertencias sí permiten selección)
          hasErrors: rowErrors.length > 0,
          errors: allMessages,
        };
      });

      // Para presidentes: validar que no haya partidos duplicados
      if (type === 'presidentes') {
        const partidosEnCSV: { [key: string]: number[] } = {};
        
        // Contar partidos en el CSV
        rows.forEach((row, index) => {
          const partido = row.data.partidoPolitico;
          if (partido) {
            if (!partidosEnCSV[partido]) {
              partidosEnCSV[partido] = [];
            }
            partidosEnCSV[partido].push(index);
          }
        });

        // Verificar partidos duplicados en el CSV
        Object.keys(partidosEnCSV).forEach(partido => {
          if (partidosEnCSV[partido].length > 1) {
            partidosEnCSV[partido].forEach(index => {
              rows[index].errors.push(`Partido duplicado en CSV (solo 1 presidente por partido)`);
              rows[index].hasErrors = true;
              rows[index].selected = false;
            });
          }
        });

        // Verificar partidos que ya existen en el sistema
        existingData.forEach((existing: any) => {
          const partido = existing.partidoPolitico;
          if (partido && partidosEnCSV[partido]) {
            partidosEnCSV[partido].forEach(index => {
              if (!rows[index].errors.includes(`Partido "${partido}" ya tiene un presidente registrado`)) {
                rows[index].errors.push(`Partido "${partido}" ya tiene un presidente registrado`);
                rows[index].hasErrors = true;
                rows[index].selected = false;
              }
            });
          }
        });
      }

      // Para alcaldes: validar que no haya duplicados de partido+departamento
      if (type === 'alcaldes') {
        const partidoDeptEnCSV: { [key: string]: number[] } = {};
        
        // Contar combinaciones partido+departamento en el CSV
        rows.forEach((row, index) => {
          const partido = row.data.partidoPolitico;
          const dept = row.data.departamento;
          if (partido && dept) {
            const key = `${partido}|${dept}`;
            if (!partidoDeptEnCSV[key]) {
              partidoDeptEnCSV[key] = [];
            }
            partidoDeptEnCSV[key].push(index);
          }
        });

        // Verificar duplicados en el CSV
        Object.keys(partidoDeptEnCSV).forEach(key => {
          if (partidoDeptEnCSV[key].length > 1) {
            const [partido, dept] = key.split('|');
            partidoDeptEnCSV[key].forEach(index => {
              rows[index].errors.push(`Duplicado: ${partido} ya tiene alcalde en ${dept}`);
              rows[index].hasErrors = true;
              rows[index].selected = false;
            });
          }
        });

        // Verificar combinaciones que ya existen en el sistema
        existingData.forEach((existing: any) => {
          const partido = existing.partidoPolitico;
          const dept = existing.departamento;
          if (partido && dept) {
            const key = `${partido}|${dept}`;
            if (partidoDeptEnCSV[key]) {
              partidoDeptEnCSV[key].forEach(index => {
                const errorMsg = `${partido} ya tiene alcalde registrado en ${dept}`;
                if (!rows[index].errors.includes(errorMsg)) {
                  rows[index].errors.push(errorMsg);
                  rows[index].hasErrors = true;
                  rows[index].selected = false;
                }
              });
            }
          }
        });
      }

      setAllRows(rows);
      setStep('validation');
    } catch (error) {
      alert(`Error al procesar archivo: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = () => {
    const selectedRows = allRows.filter(row => row.selected);
    
    if (selectedRows.length === 0) {
      alert('No hay registros seleccionados para importar');
      return;
    }

    // Verificar que los seleccionados no tengan errores críticos
    const hasErrors = selectedRows.some(row => {
      const d = row.data;
      return !d.dni || d.dni.length !== 8 || !d.nombre || !d.apellidoPaterno || 
             !d.apellidoMaterno || !d.genero || !d.partidoPolitico || !d.estadoPostulacion;
    });

    if (hasErrors) {
      alert('Algunos registros seleccionados tienen campos vacíos. Por favor completa todos los campos antes de importar.');
      return;
    }

    const storageKey = type === 'presidentes' ? 'candidatosPresidenciales' : 'candidatosAlcaldes';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Generar IDs únicos
    const maxId = existingData.length > 0 ? Math.max(...existingData.map((d: any) => d.id)) : 0;
    const newData = selectedRows.map((row, index) => ({
      ...row.data,
      id: maxId + index + 1,
    }));

    // Guardar en localStorage
    const updatedData = [...existingData, ...newData];
    localStorage.setItem(storageKey, JSON.stringify(updatedData));

    // Actualizar partidos
    updatePartidos(newData, type);

    setStep('success');
    setTimeout(() => {
      onImportSuccess();
      handleClose();
    }, 2000);
  };

  const updatePartidos = (candidates: any[], candidateType: 'presidentes' | 'alcaldes') => {
    const partidos = JSON.parse(localStorage.getItem('partidos') || '[]');
    
    const updatedPartidos = partidos.map((partido: any) => {
      if (candidateType === 'presidentes') {
        const presidente = candidates.find(c => c.partidoPolitico === partido.nombre);
        if (presidente) {
          return {
            ...partido,
            representantePresidente: `${presidente.nombre} ${presidente.apellidoPaterno} ${presidente.apellidoMaterno}`,
          };
        }
      } else {
        const alcaldesDelPartido = candidates.filter(c => c.partidoPolitico === partido.nombre);
        if (alcaldesDelPartido.length > 0) {
          const representantesAlcaldes = partido.representantesAlcaldes || [];
          alcaldesDelPartido.forEach((alcalde: any) => {
            const existingIndex = representantesAlcaldes.findIndex(
              (a: any) => a.departamento === alcalde.departamento
            );
            const alcaldeNombre = `${alcalde.nombre} ${alcalde.apellidoPaterno} ${alcalde.apellidoMaterno}`;
            
            if (existingIndex >= 0) {
              representantesAlcaldes[existingIndex] = {
                departamento: alcalde.departamento,
                nombreCompleto: alcaldeNombre,
              };
            } else {
              representantesAlcaldes.push({
                departamento: alcalde.departamento,
                nombreCompleto: alcaldeNombre,
              });
            }
          });
          return { ...partido, representantesAlcaldes };
        }
      }
      return partido;
    });

    localStorage.setItem('partidos', JSON.stringify(updatedPartidos));
  };

  const handleCellEdit = (rowIndex: number, field: string, value: string) => {
    const updatedRows = [...allRows];
    updatedRows[rowIndex].data[field] = value;
    
    // Re-validar la fila
    const row = updatedRows[rowIndex].data;
    const rowErrors: string[] = [];
    
    if (!row.dni || row.dni.length !== 8) rowErrors.push('DNI inválido');
    if (!row.nombre) rowErrors.push('Nombre vacío');
    if (!row.apellidoPaterno) rowErrors.push('Apellido paterno vacío');
    if (!row.apellidoMaterno) rowErrors.push('Apellido materno vacío');
    if (!row.genero || !['Masculino', 'Femenino'].includes(row.genero)) rowErrors.push('Género inválido');
    if (!row.partidoPolitico) rowErrors.push('Partido político vacío');
    if (!row.estadoPostulacion || !['Aprobado', 'Pendiente', 'Rechazado'].includes(row.estadoPostulacion)) rowErrors.push('Estado inválido');
    
    if (type === 'alcaldes') {
      const validDepts = [
        'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao',
        'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque',
        'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno',
        'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
      ];
      if (!row.departamento || !validDepts.includes(row.departamento)) rowErrors.push('Departamento inválido');
    }
    
    updatedRows[rowIndex].hasErrors = rowErrors.length > 0;
    updatedRows[rowIndex].errors = rowErrors;
    
    setAllRows(updatedRows);
  };

  const handleCellClick = (rowIndex: number, field: string) => {
    setEditingCell({ rowIndex, field });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const revalidateDuplicates = (rows: RowData[]) => {
    if (type === 'presidentes') {
      // Para presidentes: validar partidos duplicados solo entre seleccionados
      const selectedPartidos: { [key: string]: number[] } = {};
      
      rows.forEach((row, index) => {
        if (row.selected && row.data.partidoPolitico) {
          const partido = row.data.partidoPolitico;
          if (!selectedPartidos[partido]) {
            selectedPartidos[partido] = [];
          }
          selectedPartidos[partido].push(index);
        }
      });

      // Limpiar errores de duplicados y re-aplicar solo a los seleccionados
      rows.forEach((row) => {
        // Remover errores de duplicados previos
        row.errors = row.errors.filter(e => 
          !e.includes('Partido duplicado en CSV') && 
          !e.includes('ya tiene un presidente registrado')
        );
        
        const partido = row.data.partidoPolitico;
        if (row.selected && partido && selectedPartidos[partido] && selectedPartidos[partido].length > 1) {
          row.errors.push(`Partido duplicado en CSV (solo 1 presidente por partido)`);
        }
        
        // Actualizar estado de error
        row.hasErrors = row.errors.length > 0;
      });
    }

    if (type === 'alcaldes') {
      // Para alcaldes: validar partido+departamento duplicados solo entre seleccionados
      const selectedPartidoDept: { [key: string]: number[] } = {};
      
      rows.forEach((row, index) => {
        if (row.selected && row.data.partidoPolitico && row.data.departamento) {
          const key = `${row.data.partidoPolitico}|${row.data.departamento}`;
          if (!selectedPartidoDept[key]) {
            selectedPartidoDept[key] = [];
          }
          selectedPartidoDept[key].push(index);
        }
      });

      // Limpiar errores de duplicados y re-aplicar solo a los seleccionados
      rows.forEach((row) => {
        // Remover errores de duplicados previos
        row.errors = row.errors.filter(e => 
          !e.includes('Duplicado:') && 
          !e.includes('ya tiene alcalde')
        );
        
        const partido = row.data.partidoPolitico;
        const dept = row.data.departamento;
        if (row.selected && partido && dept) {
          const key = `${partido}|${dept}`;
          if (selectedPartidoDept[key] && selectedPartidoDept[key].length > 1) {
            row.errors.push(`Duplicado: ${partido} ya tiene alcalde en ${dept}`);
          }
        }
        
        // Actualizar estado de error
        row.hasErrors = row.errors.length > 0;
      });
    }

    return rows;
  };

  const toggleRowSelection = (rowIndex: number) => {
    const updatedRows = [...allRows];
    updatedRows[rowIndex].selected = !updatedRows[rowIndex].selected;
    
    // Re-validar duplicados después de cambiar selección
    const revalidatedRows = revalidateDuplicates(updatedRows);
    setAllRows(revalidatedRows);
  };

  const toggleAllSelection = () => {
    const allSelected = allRows.every(row => row.selected);
    const updatedRows = allRows.map(row => ({
      ...row,
      selected: !allSelected,
    }));
    
    // Re-validar duplicados después de cambiar selección
    const revalidatedRows = revalidateDuplicates(updatedRows);
    setAllRows(revalidatedRows);
  };

  const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao',
    'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque',
    'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno',
    'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
  ];



  const handleClose = () => {
    setFile(null);
    setAllRows([]);
    setStep('upload');
    setEditingCell(null);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size="5xl" 
      isDismissable={false}
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh]",
        body: "py-6",
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-800">
              Importar {type === 'presidentes' ? 'Candidatos Presidenciales' : 'Candidatos a Alcalde'}
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Revisa y edita los datos antes de importar
            </p>
          </ModalHeader>
          <ModalBody>
            {step === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600 mb-6">
                    Selecciona un archivo CSV para importar
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-slate-700 text-white rounded-lg cursor-pointer hover:bg-slate-600 transition-colors font-medium"
                  >
                    Seleccionar archivo CSV
                  </label>
                  {file && (
                    <p className="text-sm text-slate-600 mt-6">
                      <span className="font-semibold">{file.name}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 'validation' && (
              <div className="space-y-6">
                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-slate-800">{allRows.length}</p>
                    <p className="text-xs text-slate-600 mt-1">Total registros</p>
                  </div>
                  <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-700">{allRows.filter(r => !r.hasErrors).length}</p>
                    <p className="text-xs text-green-700 mt-1">Sin errores</p>
                  </div>
                  <div className="bg-linear-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-red-700">{allRows.filter(r => r.hasErrors).length}</p>
                    <p className="text-xs text-red-700 mt-1">Con errores</p>
                  </div>
                </div>
                
                {allRows.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-slate-800">
                        Vista Previa - <span className="text-blue-600">{allRows.filter(r => r.selected).length}</span> de {allRows.length} seleccionados
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-100 rounded"></span>
                          Haz clic para editar
                        </span>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="max-h-[400px] overflow-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-linear-to-r from-slate-100 to-slate-50 sticky top-0 z-10">
                            <tr>
                              <th className="px-3 py-3 border-b border-slate-200">
                                <Checkbox
                                  isSelected={allRows.length > 0 && allRows.every(r => r.selected)}
                                  onValueChange={toggleAllSelection}
                                  size="sm"
                                  classNames={{
                                    wrapper: "after:bg-slate-700 after:text-white"
                                  }}
                                />
                              </th>
                              <th className="px-3 py-3 text-center text-xs font-semibold text-slate-700 border-b border-slate-200">Estado</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">DNI</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Nombre</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Ap. Pat.</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Ap. Mat.</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Género</th>
                              {type === 'alcaldes' && (
                                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Departamento</th>
                              )}
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Partido</th>
                              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 border-b border-slate-200">Estado</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100">
                            {allRows.map((row, index) => (
                              <tr key={index} className={`hover:bg-slate-50 transition-colors ${row.hasErrors ? 'bg-red-50/30' : ''}`}>
                                {/* Checkbox */}
                                <td className="px-3 py-3 border-b border-slate-100">
                                  <Checkbox
                                    isSelected={row.selected}
                                    onValueChange={() => toggleRowSelection(index)}
                                    size="sm"
                                    classNames={{
                                      wrapper: "after:bg-slate-700 after:text-white"
                                    }}
                                  />
                                </td>
                                
                                {/* Estado de validación */}
                                <td className="px-3 py-3 border-b border-slate-100 text-center">
                                  {row.hasErrors ? (
                                    <Tooltip
                                      content={
                                        <div className="px-2 py-2 max-w-xs">
                                          <div className="text-xs font-bold mb-1 text-red-600">Errores encontrados:</div>
                                          <div className="text-xs space-y-1">
                                            {row.errors.map((err, i) => (
                                              <div key={i} className="flex items-start gap-1">
                                                <span className="text-red-500 mt-0.5">•</span>
                                                <span>{err}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      }
                                      placement="right"
                                      classNames={{
                                        base: "max-w-md",
                                        content: "bg-white border border-red-200 shadow-lg"
                                      }}
                                    >
                                      <div className="flex items-center justify-center cursor-help">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                      </div>
                                    </Tooltip>
                                  ) : (
                                    <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                                  )}
                                </td>
                                
                                {/* DNI */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'dni')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'dni' ? (
                                    <input
                                      type="text"
                                      value={row.data.dni || ''}
                                      onChange={(e) => handleCellEdit(index, 'dni', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                  ) : (
                                    <span className={row.data.dni ? 'font-medium' : 'text-red-500 italic font-medium'}>
                                      {row.data.dni || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Nombre */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'nombre')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'nombre' ? (
                                    <input
                                      type="text"
                                      value={row.data.nombre || ''}
                                      onChange={(e) => handleCellEdit(index, 'nombre', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                  ) : (
                                    <span className={row.data.nombre ? '' : 'text-red-500 italic font-medium'}>
                                      {row.data.nombre || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Apellido Paterno */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'apellidoPaterno')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'apellidoPaterno' ? (
                                    <input
                                      type="text"
                                      value={row.data.apellidoPaterno || ''}
                                      onChange={(e) => handleCellEdit(index, 'apellidoPaterno', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                  ) : (
                                    <span className={row.data.apellidoPaterno ? '' : 'text-red-500 italic font-medium'}>
                                      {row.data.apellidoPaterno || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Apellido Materno */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'apellidoMaterno')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'apellidoMaterno' ? (
                                    <input
                                      type="text"
                                      value={row.data.apellidoMaterno || ''}
                                      onChange={(e) => handleCellEdit(index, 'apellidoMaterno', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                  ) : (
                                    <span className={row.data.apellidoMaterno ? '' : 'text-red-500 italic font-medium'}>
                                      {row.data.apellidoMaterno || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Género */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'genero')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'genero' ? (
                                    <select
                                      value={row.data.genero || ''}
                                      onChange={(e) => handleCellEdit(index, 'genero', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                      <option value="">Seleccionar</option>
                                      <option value="Masculino">Masculino</option>
                                      <option value="Femenino">Femenino</option>
                                    </select>
                                  ) : (
                                    <span className={row.data.genero ? '' : 'text-red-500 italic font-medium'}>
                                      {row.data.genero || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Departamento (solo alcaldes) */}
                                {type === 'alcaldes' && (
                                  <td 
                                    className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                    onClick={() => handleCellClick(index, 'departamento')}
                                  >
                                    {editingCell?.rowIndex === index && editingCell?.field === 'departamento' ? (
                                      <select
                                        value={row.data.departamento || ''}
                                        onChange={(e) => handleCellEdit(index, 'departamento', e.target.value)}
                                        onBlur={handleCellBlur}
                                        autoFocus
                                        className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                      >
                                        <option value="">Seleccionar</option>
                                        {departamentos.map(dept => (
                                          <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                      </select>
                                    ) : (
                                      <span className={row.data.departamento ? '' : 'text-red-500 italic font-medium'}>
                                        {row.data.departamento || 'Vacío'}
                                      </span>
                                    )}
                                  </td>
                                )}
                                
                                {/* Partido Político */}
                                <td 
                                  className="px-3 py-3 text-slate-700 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'partidoPolitico')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'partidoPolitico' ? (
                                    <input
                                      type="text"
                                      value={row.data.partidoPolitico || ''}
                                      onChange={(e) => handleCellEdit(index, 'partidoPolitico', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                  ) : (
                                    <span className={row.data.partidoPolitico ? '' : 'text-red-500 italic font-medium'}>
                                      {row.data.partidoPolitico || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Estado */}
                                <td 
                                  className="px-3 py-3 cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors"
                                  onClick={() => handleCellClick(index, 'estadoPostulacion')}
                                >
                                  {editingCell?.rowIndex === index && editingCell?.field === 'estadoPostulacion' ? (
                                    <select
                                      value={row.data.estadoPostulacion || ''}
                                      onChange={(e) => handleCellEdit(index, 'estadoPostulacion', e.target.value)}
                                      onBlur={handleCellBlur}
                                      autoFocus
                                      className="w-full px-2 py-1.5 border-2 border-blue-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                      <option value="">Seleccionar</option>
                                      <option value="Aprobado">Aprobado</option>
                                      <option value="Pendiente">Pendiente</option>
                                      <option value="Rechazado">Rechazado</option>
                                    </select>
                                  ) : (
                                    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                      row.data.estadoPostulacion === 'Aprobado' 
                                        ? 'bg-green-100 text-green-700'
                                        : row.data.estadoPostulacion === 'Pendiente'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : row.data.estadoPostulacion === 'Rechazado'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                      {row.data.estadoPostulacion || 'Vacío'}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  ¡Importación exitosa!
                </h3>
                <p className="text-sm text-slate-600">
                  Se importaron {allRows.filter(r => r.selected).length} registros correctamente
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
                <p className="ml-4 text-slate-600">Procesando archivo...</p>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="border-t border-slate-200 pt-4">
            {step === 'upload' && (
              <Button 
                variant="light" 
                onPress={handleClose}
                className="font-semibold"
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </Button>
            )}
            {step === 'validation' && (
              <>
                <Button 
                  variant="light" 
                  onPress={handleClose}
                  className="font-semibold"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button
                  onPress={handleImport}
                  className="bg-linear-to-r from-slate-700 to-slate-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  isDisabled={allRows.filter(r => r.selected).length === 0}
                  startContent={<CheckCircle className="w-4 h-4" />}
                >
                  Importar {allRows.filter(r => r.selected).length} registros
                </Button>
              </>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
