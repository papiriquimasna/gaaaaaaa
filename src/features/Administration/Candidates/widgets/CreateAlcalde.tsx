import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from '@heroui/react';
import { X, Save } from 'lucide-react';
import defaultPerfil from '../../../../assets/defaultperfil.jpg';

interface Alcalde {
  id: number;
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  departamento: string;
  partidoPolitico: string;
  fotoPostulante: string;
  fotoPartido: string;
  estadoPostulacion: 'Aprobado' | 'Pendiente' | 'Rechazado';
}

interface Partido {
  id: number;
  nombre: string;
  logo: string;
  estado: 'Activo' | 'Inactivo';
}

interface CreateAlcaldeProps {
  isOpen: boolean;
  onClose: () => void;
  alcalde: Alcalde | null;
  onSave: (alcalde: Omit<Alcalde, 'id'>) => void;
  isEditing: boolean;
  partidos: Partido[];
}

const departamentos = [
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

export default function CreateAlcalde({
  isOpen,
  onClose,
  alcalde,
  onSave,
  isEditing,
  partidos,
}: CreateAlcaldeProps) {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    departamento: '',
    partidoPolitico: '',
    fotoPostulante: '',
    fotoPartido: '',
    estadoPostulacion: 'Pendiente' as 'Aprobado' | 'Pendiente' | 'Rechazado',
  });

  useEffect(() => {
    if (alcalde && isEditing) {
      setFormData({
        dni: alcalde.dni,
        nombre: alcalde.nombre,
        apellidoPaterno: alcalde.apellidoPaterno,
        apellidoMaterno: alcalde.apellidoMaterno,
        genero: alcalde.genero,
        departamento: alcalde.departamento,
        partidoPolitico: alcalde.partidoPolitico,
        fotoPostulante: alcalde.fotoPostulante,
        fotoPartido: alcalde.fotoPartido,
        estadoPostulacion: alcalde.estadoPostulacion,
      });
    } else {
      setFormData({
        dni: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        genero: '',
        departamento: '',
        partidoPolitico: '',
        fotoPostulante: '',
        fotoPartido: '',
        estadoPostulacion: 'Pendiente',
      });
    }
  }, [alcalde, isEditing, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePartidoChange = (partidoId: string) => {
    const partido = partidos.find((p) => p.id.toString() === partidoId);
    if (partido) {
      setFormData({
        ...formData,
        partidoPolitico: partido.nombre,
        fotoPartido: partido.logo,
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, fotoPostulante: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      isDismissable={false}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">
              {isEditing ? 'Editar Candidato a Alcalde' : 'Agregar Nuevo Candidato a Alcalde'}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Fotos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Foto del Postulante */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Foto del Postulante
                  </label>
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={formData.fotoPostulante || defaultPerfil}
                      alt="Postulante"
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <span className="inline-block py-2 px-4 rounded-lg border-0 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                        Seleccionar archivo
                      </span>
                    </label>
                  </div>
                </div>

                {/* Vista Previa del Logo del Partido */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo del Partido
                  </label>
                  <div className="flex flex-col items-center gap-3">
                    {formData.fotoPartido ? (
                      <img
                        src={formData.fotoPartido}
                        alt="Partido"
                        className="w-32 h-32 rounded-lg object-cover border-4 border-slate-200"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-slate-100 border-4 border-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">Selecciona un partido</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 text-center">
                      El logo se asigna automáticamente al seleccionar el partido
                    </p>
                  </div>
                </div>
              </div>

              {/* Datos personales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DNI */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">DNI</label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) =>
                      handleInputChange('dni', e.target.value.replace(/\D/g, '').slice(0, 8))
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="12345678"
                    maxLength={8}
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="Juan Carlos"
                  />
                </div>

                {/* Apellido Paterno */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    value={formData.apellidoPaterno}
                    onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="Pérez"
                  />
                </div>

                {/* Apellido Materno */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    value={formData.apellidoMaterno}
                    onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="García"
                  />
                </div>

                {/* Género */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Género
                  </label>
                  <Select
                    selectedKeys={[formData.genero]}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                    variant="bordered"
                    placeholder="Selecciona un género"
                    aria-label="Género"
                    disallowEmptySelection={false}
                    classNames={{
                      trigger:
                        'border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]',
                      value: 'text-sm',
                    }}
                  >
                    <SelectItem key="Masculino">Masculino</SelectItem>
                    <SelectItem key="Femenino">Femenino</SelectItem>
                    <SelectItem key="Otro">Otro</SelectItem>
                  </Select>
                </div>

                {/* Departamento */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Departamento
                  </label>
                  <Select
                    selectedKeys={[formData.departamento]}
                    onChange={(e) => handleInputChange('departamento', e.target.value)}
                    variant="bordered"
                    placeholder="Selecciona un departamento"
                    aria-label="Departamento"
                    disallowEmptySelection={false}
                    classNames={{
                      trigger:
                        'border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]',
                      value: 'text-sm',
                    }}
                  >
                    {departamentos.map((dept) => (
                      <SelectItem key={dept}>{dept}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Partido Político */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Partido Político
                  </label>
                  <Select
                    selectedKeys={
                      formData.partidoPolitico
                        ? [
                            partidos
                              .find((p) => p.nombre === formData.partidoPolitico)
                              ?.id.toString() || '',
                          ]
                        : []
                    }
                    onChange={(e) => handlePartidoChange(e.target.value)}
                    variant="bordered"
                    placeholder="Selecciona un partido"
                    aria-label="Partido Político"
                    disallowEmptySelection={false}
                    classNames={{
                      trigger:
                        'border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]',
                      value: 'text-sm',
                    }}
                    renderValue={(items) => {
                      return items.map((item) => {
                        const partido = partidos.find((p) => p.id.toString() === item.key);
                        return partido ? (
                          <div key={item.key} className="flex items-center gap-2">
                            {partido.logo && (
                              <img
                                src={partido.logo}
                                alt={partido.nombre}
                                className="w-5 h-5 rounded object-cover"
                              />
                            )}
                            <span>{partido.nombre}</span>
                          </div>
                        ) : null;
                      });
                    }}
                  >
                    {partidos
                      .filter((p) => p.estado === 'Activo')
                      .map((partido) => (
                        <SelectItem key={partido.id.toString()} textValue={partido.nombre}>
                          <div className="flex items-center gap-2">
                            {partido.logo && (
                              <img
                                src={partido.logo}
                                alt={partido.nombre}
                                className="w-6 h-6 rounded object-cover"
                              />
                            )}
                            <span>{partido.nombre}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </Select>
                </div>

                {/* Estado de Postulación */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estado de Postulación
                  </label>
                  <Select
                    selectedKeys={[formData.estadoPostulacion]}
                    onChange={(e) => handleInputChange('estadoPostulacion', e.target.value)}
                    variant="bordered"
                    placeholder="Selecciona un estado"
                    aria-label="Estado de Postulación"
                    disallowEmptySelection={false}
                    classNames={{
                      trigger:
                        'border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]',
                      value: 'text-sm',
                    }}
                  >
                    <SelectItem key="Pendiente">Pendiente</SelectItem>
                    <SelectItem key="Aprobado">Aprobado</SelectItem>
                    <SelectItem key="Rechazado">Rechazado</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              <X className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
            <Button onPress={handleSave} className="bg-slate-700 text-white">
              <Save className="w-4 h-4 mr-1" />
              {isEditing ? 'Guardar Cambios' : 'Agregar Candidato'}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
