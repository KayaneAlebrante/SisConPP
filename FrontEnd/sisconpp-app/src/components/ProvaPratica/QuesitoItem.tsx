import { useState } from "react";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { Quesitos } from "../../types/ProvaPratica";

interface Props {
  quesito: Quesitos;
  onAddSub: (quesitoId: number) => void;
}

export default function QuesitoItem({ quesito, onAddSub }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {quesito.nomeQuesito}
          </span>
          <span className="text-xs text-gray-500">
            Nota máx: {quesito.notaMaximaQuesito} pts
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`p-2 rounded-lg transition-colors ${
            isOpen
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="p-3 pt-0 space-y-2">
          {quesito.subQuesitos && quesito.subQuesitos.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum subquesito cadastrado.
            </p>
          )}

          {quesito.subQuesitos && quesito.subQuesitos.length > 0 && (
            <div className="space-y-1 pl-3 border-l">
              {quesito.subQuesitos.map((sub) => (
                <div
                  key={sub.idSubequestios}
                  className="flex justify-between items-center bg-white p-2 rounded border border-gray-200"
                >
                  <span className="text-sm text-gray-700">
                    {sub.nomeSubquesito}
                  </span>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 rounded">
                    {sub.notaSubequesito} pts
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => onAddSub(quesito.idQuesito!)}
            className="w-full mt-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 text-sm font-semibold"
          >
            <Plus size={16} />
            Adicionar SubQuesito
          </button>
        </div>
      )}
    </div>
  );
}
