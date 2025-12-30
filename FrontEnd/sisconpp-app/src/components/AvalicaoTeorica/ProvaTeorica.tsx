import { useState } from "react";
import { ProvaTeoricaAccordionDTO } from "../../types/Avaliacao";
import QuesitoCard from "./QuesitoCard";

interface Props {
  prova: ProvaTeoricaAccordionDTO;
  notas: Record<number, number>;
  onChangeNota: (id: number, nota: number) => void;
}

export default function ProvaTeoricaAccordion({
  prova,
  notas,
  onChangeNota,
}: Props) {
  const [open] = useState(true);

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm ${open ? "border-primary ring-1 ring-primary/30" : "border-neutral-outline"
        }`}
    >
      <div
        className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-bold">{prova.nomeProva}</h3>
          </div>
        </div>
      </div>

      {open && (
        <div className="p-4 bg-gray-50 space-y-4">
          {prova.quesitos.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum quesito cadastrado.
            </p>
          )}

          {prova.quesitos.map((quesito) => (
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