import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { ProvaPratica, BlocoProva } from "../../types/ProvaPratica";
import BlocoItem from "./BlocoItem";

interface Props {
  prova: ProvaPratica & { isOpen?: boolean };
  onToggle: (provaId: number) => void;
  onAddBloco: (provaId: number) => void;
  onEditBloco: (bloco: BlocoProva, provaId: number) => void;
  onAddQuesito: (blocoId: number) => void;
  onAddSub: (quesitoId: number) => void;
}

export default function ProvaAccordion({
  prova,
  onToggle,
  onAddBloco,
  onAddQuesito,
  onAddSub,
}: Props) {
  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
        prova.isOpen
          ? "border-primary ring-1 ring-primary/30"
          : "border-neutral-outline"
      }`}
    >
      {/* HEADER DA PROVA */}
      <div
        onClick={() => onToggle(prova.idProvaPratica)}
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          prova.isOpen ? "bg-surface-containerHigh" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`p-2 rounded-lg transition-colors ${
              prova.isOpen
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {prova.isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>

          <div>
            <h3 className="text-lg font-bold text-neutral-onBackground">
              {prova.nomeProva}
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              Nota Máx: {prova.notaMaxima}
            </span>
          </div>
        </div>
      </div>

      {/* CONTEÚDO DA PROVA */}
      {prova.isOpen && (
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 space-y-4 animate-fadeIn">
          {prova.blocosProvas.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum bloco cadastrado nesta prova.
            </p>
          )}

          {prova.blocosProvas.map((bloco) => (
            <BlocoItem
              key={bloco.idBloco}
              bloco={bloco}
              onAddQuesito={onAddQuesito}
              onAddSub={onAddSub}
            />
          ))}

          <button
            onClick={() => onAddBloco(prova.idProvaPratica)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 font-bold"
          >
            <Plus size={18} />
            Adicionar Bloco Prova
          </button>
        </div>
      )}
    </div>
  );
}
