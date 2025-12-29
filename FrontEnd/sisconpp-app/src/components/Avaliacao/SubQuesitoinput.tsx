import { SubQuesitoDTO } from "../../types/Avaliacao";

interface Props {
  subQuesito: SubQuesitoDTO;
  value?: number;
  onChange: (subQuesitoId: number, nota: number) => void;
}

export default function SubQuesitoInput({
  subQuesito,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-between border rounded-md px-4 py-2 bg-white">
      {/* Nome do subquesito */}
      <span className="text-sm text-gray-800">
        {subQuesito.nomeSubquesito}
      </span>

      {/* Nota máxima + input */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {subQuesito.notaSubequesito} pts
        </span>

        <input
          type="number"
          min={0}
          max={subQuesito.notaSubequesito}
          value={value ?? ""}
          onChange={(e) =>
            onChange(
              subQuesito.idSubequestios,
              Number(e.target.value)
            )
          }
          className="w-16 h-8 border rounded-md text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
}
