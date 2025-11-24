import { useState } from 'react';
import { Button, Input, Textarea, Select, SelectItem } from '@heroui/react';
import { Send, Upload, X, FileImage } from 'lucide-react';
import libroImg from '../../../../assets/libro.png';
import VerificateReclamacion from '../widgets/VerificateReclamacion';

export default function Reclamaciones() {
  const [tipo, setTipo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivos, setArchivos] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numeroRegistro, setNumeroRegistro] = useState('');

  const tiposReclamacion = [
    { value: 'queja', label: 'Queja' },
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'sugerencia', label: 'Sugerencia' },
    { value: 'consulta', label: 'Consulta' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevosArchivos = Array.from(e.target.files);
      setArchivos(prev => [...prev, ...nuevosArchivos]);
    }
  };

  const eliminarArchivo = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Abrir modal en estado "Procesando"
    setIsModalOpen(true);
    setIsProcessing(true);
    
    // Convertir archivos a base64
    const archivosBase64 = await Promise.all(
      archivos.map(async (file) => {
        return new Promise<{ name: string; type: string; size: number; data: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              data: reader.result as string
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    
    // Simular procesamiento de 5 segundos
    setTimeout(() => {
      const numRegistro = `REC-${Date.now()}`;
      setIsProcessing(false);
      setNumeroRegistro(numRegistro);
      
      // Guardar reclamación en localStorage
      const nuevaReclamacion = {
        id: numRegistro,
        tipo: tipo,
        asunto: asunto,
        descripcion: descripcion,
        fecha: new Date().toISOString(),
        estado: 'pendiente',
        cantidadArchivos: archivos.length,
        archivos: archivosBase64
      };
      
      // Obtener reclamaciones existentes
      const reclamacionesGuardadas = localStorage.getItem('reclamaciones');
      const reclamaciones = reclamacionesGuardadas ? JSON.parse(reclamacionesGuardadas) : [];
      
      // Agregar nueva reclamación
      reclamaciones.push(nuevaReclamacion);
      
      // Guardar en localStorage
      localStorage.setItem('reclamaciones', JSON.stringify(reclamaciones));
    }, 5000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsProcessing(false);
    // Limpiar formulario
    setTipo('');
    setAsunto('');
    setDescripcion('');
    setArchivos([]);
    setNumeroRegistro('');
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 flex items-center justify-center py-8">
      <div className="w-full max-w-3xl px-4 md:px-6">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-2xl font-bold text-slate-600 mb-3">
              Libro de Reclamaciones
            </h1>
            <div className="flex justify-center mb-4">
              <img 
                src={libroImg} 
                alt="Libro de Reclamaciones" 
                className="w-32 h-auto object-contain"
              />
            </div>
            <p className="text-slate-600 text-sm">
              Registra tus quejas, reclamos o sugerencias
            </p>
          </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Tipo de Reclamación"
                      placeholder="Selecciona un tipo"
                      selectedKeys={tipo ? [tipo] : []}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        setTipo(selected as string);
                      }}
                      isRequired
                      classNames={{
                        trigger: "bg-white border-slate-300"
                      }}
                    >
                      {tiposReclamacion.map((item) => (
                        <SelectItem key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
                      label="Asunto"
                      placeholder="Resumen breve del problema"
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      isRequired
                      classNames={{
                        inputWrapper: "bg-white border-slate-300"
                      }}
                    />
                  </div>

                  <Textarea
                    label="Descripción Detallada"
                    placeholder="Describe tu reclamación con el mayor detalle posible..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    minRows={4}
                    isRequired
                    classNames={{
                      inputWrapper: "bg-white border-slate-300"
                    }}
                  />

                  {/* Adjuntar evidencias */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">
                      Adjuntar Evidencias <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Debes adjuntar al menos una imagen como evidencia (máx. 5 archivos)
                    </p>
                    
                    <div className="border-2 border-slate-300 rounded-lg p-6">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {archivos.length === 0 ? (
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload className="w-10 h-10 text-slate-400" />
                          <span className="text-xs font-medium text-slate-400">
                            Haz clic para subir archivos
                          </span>
                          <span className="text-xs text-slate-400">
                            PNG, JPG, PDF, DOC (máx. 10MB por archivo)
                          </span>
                        </label>
                      ) : (
                        <div className="space-y-3">
                          {/* Lista de archivos adjuntos */}
                          {archivos.map((archivo, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <FileImage className="w-5 h-5 text-slate-500 shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-slate-500 truncate">
                                    {archivo.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {(archivo.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => eliminarArchivo(index)}
                                className="p-1 hover:bg-red-100 rounded-full transition-colors shrink-0"
                                aria-label="Eliminar archivo"
                              >
                                <X className="w-5 h-5 text-red-300" />
                              </button>
                            </div>
                          ))}
                          
                          {/* Botón para agregar más archivos */}
                          {archivos.length < 5 && (
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                            >
                              <Upload className="w-5 h-5 text-slate-600" />
                              <span className="text-sm font-medium text-slate-600">
                                Agregar más archivos
                              </span>
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      color="default"
                      size="md"
                      startContent={<Send className="w-4 h-4" />}
                      isDisabled={archivos.length === 0}
                    >
                      Enviar Reclamación
                    </Button>
                  </div>
                </form>
        </div>
      </div>

      {/* Modal de verificación */}
      <VerificateReclamacion
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isProcessing={isProcessing}
        numeroRegistro={numeroRegistro}
      />
    </div>
  );
}
