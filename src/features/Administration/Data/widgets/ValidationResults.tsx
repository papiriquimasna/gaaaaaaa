import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface ValidationResultsProps {
  validCount: number;
  errorCount: number;
  warningCount: number;
  errors: string[];
  warnings: string[];
}

export default function ValidationResults({
  validCount,
  errorCount,
  warningCount,
  errors,
  warnings,
}: ValidationResultsProps) {
  return (
    <div className="space-y-4">
      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-700">{validCount}</p>
              <p className="text-xs text-green-600">Válidos</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">{warningCount}</p>
              <p className="text-xs text-yellow-600">Advertencias</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">{errorCount}</p>
              <p className="text-xs text-red-600">Errores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de errores */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-48 overflow-y-auto">
          <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Errores encontrados:
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-xs text-red-700">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lista de advertencias */}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-48 overflow-y-auto">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Advertencias:
          </h4>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-xs text-yellow-700">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
