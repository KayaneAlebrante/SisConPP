import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { BlocoProvaDTO } from "../../types/Avaliacao";
import QuesitoCard from "./QuesitoCard";

interface Props {
  bloco: BlocoProvaDTO;
  notas: Record<number, number>;
  onChangeNota: (subQuesitoId: number, nota: number) => void;
}

export default function BlocoAccordion({
  bloco,
  notas,
  onChangeNota,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-white rounded-xl border transition-all overflow-hidden shadow-sm ${
        open
          ? "border-secondary ring-1 ring-secondary/30"
          : "border-neutral-outline"
      }`}
    >
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              open ? "bg-secondary text-white" : "bg-gray-200"
            }`}
          >
            {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>

          <div>
            <h4 className="font-semibold">{bloco.nomeBloco}</h4>
            <span className="text-xs text-gray-500">
              Nota Máx: {bloco.notaMaximaBloco}
            </span>
          </div>
        </div>
      </div>

      {open && (
        <div className="p-4 bg-gray-50 space-y-4">
          {bloco.quesitos.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum quesito cadastrado.
            </p>
          )}

          {bloco.quesitos.map((quesito) => (
            <QuesitoCard
              key={quesito.idQuesito}
              quesito={quesito}
              notas={notas}
              onChangeNota={onChangeNota}
            />
          ))}
        </div>
      )}
    </div>
  );
}
