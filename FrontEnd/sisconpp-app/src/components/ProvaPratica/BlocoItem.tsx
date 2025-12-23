import { useState } from "react";
import { BlocoProva } from "../../types/ProvaPratica";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import QuesitoItem from "./QuesitoItem";

interface Props {
  bloco: BlocoProva;
  onAddQuesito: (blocoId: number) => void;
  onAddSub: (quesitoId: number) => void;
  onEdit?: () => void;
}

export default function BlocoItem({
  bloco,
  onAddQuesito,
  onAddSub,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="flex items-center justify-between p-3">
        <div>
          <strong className="text-gray-800">{bloco.nomeBloco}</strong>
          <p className="text-xs text-gray-500">
            Nota máx: {bloco.notaMaximaBloco}
          </p>
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
        <div className="p-3 space-y-3 border-t bg-gray-50">
          {bloco.quesitos && bloco.quesitos.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum quesito cadastrado neste bloco.
            </p>
          )}

          {bloco.quesitos?.map((q) => (
            <QuesitoItem
              key={q.idQuesito}
              quesito={q}
              onAddSub={() => onAddSub(q.idQuesito!)}
            />
          ))}

          <button
            type="button"
            onClick={() => onAddQuesito(bloco.idBloco!)}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 text-sm font-semibold"
          >
            <Plus size={16} />
            Adicionar Quesito
          </button>
        </div>
      )}
    </div>
  );
}
