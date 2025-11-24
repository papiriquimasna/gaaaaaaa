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

interface Partido {
  id: number;
  nombre: string;
  siglas: string;
  logo: string;
  representantePresidente: string;
  representantesAlcaldes: {
    departamento: string;
    nombreCompleto: string;
  }[];
  estado: 'Activo' | 'Inactivo';
}

interface CreatePartidoProps {
  isOpen: boolean;
  onClose: () => void;
  partido: Partido | null;
  onSave: (partido: Omit<Partido, 'id' | 'representantePresidente' | 'representantesAlcaldes'>) => void;
  isEditing: boolean;
}

export default function CreatePartido({
  isOpen,
  onClose,
  partido,
  onSave,
  isEditing,
}: CreatePartidoProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    siglas: '',
    logo: '',
    estado: 'Activo' as 'Activo' | 'Inactivo',
  });

  useEffect(() => {
    if (partido && isEditing) {
      setFormData({
        nombre: partido.nombre,
        siglas: partido.siglas,
        logo: partido.logo,
        estado: partido.estado,
      });
    } else {
      setFormData({
        nombre: '',
        siglas: '',
        logo: '',
        estado: 'Activo',
      });
    }
  }, [partido, isEditing, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isDismissable={false}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">
              {isEditing ? 'Editar Partido Político' : 'Agregar Nuevo Partido Político'}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Logo del Partido */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Logo del Partido
                </label>
                <div className="flex flex-col items-center gap-3">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="w-32 h-32 rounded-lg object-cover border-4 border-slate-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-slate-100 border-4 border-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">Sin logo</span>
                    </div>
                  )}
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

              {/* Datos del partido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre del Partido
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="Partido Nacional Democrático"
                  />
                </div>

                {/* Siglas */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Siglas
                  </label>
                  <input
                    type="text"
                    value={formData.siglas}
                    onChange={(e) =>
                      handleInputChange('siglas', e.target.value.toUpperCase().slice(0, 10))
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
                    placeholder="PND"
                    maxLength={10}
                  />
                </div>

                {/* Estado */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estado
                  </label>
                  <Select
                    selectedKeys={[formData.estado]}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    variant="bordered"
                    placeholder="Selecciona un estado"
                    aria-label="Estado"
                    disallowEmptySelection={false}
                    classNames={{
                      trigger:
                        'border-2 border-slate-200/60 rounded-xl hover:border-slate-400 h-[42px]',
                      value: 'text-sm',
                    }}
                  >
                    <SelectItem key="Activo">Activo</SelectItem>
                    <SelectItem key="Inactivo">Inactivo</SelectItem>
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
              {isEditing ? 'Guardar Cambios' : 'Agregar Partido'}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
