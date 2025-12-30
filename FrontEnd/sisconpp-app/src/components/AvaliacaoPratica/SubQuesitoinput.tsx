import { SubQuesitoDTO } from "../../types/Avaliacao";
import { toast } from "react-toastify";

interface Props {
  subQuesito: SubQuesitoDTO;
  value?: number;
  onChange?: (subQuesitoId: number, nota: number) => void;
}

export default function SubQuesitoInput({
  subQuesito,
  value,
  onChange,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nota = Number(e.target.value);

    if (nota > subQuesito.notaSubequesito) {
      toast.warning(
        `A nota não pode ser maior que ${subQuesito.notaSubequesito} pts`
      );
      return;
    }

    if (nota < 0) {
      toast.error("A nota não pode ser negativa");
      return;
    }

    if (nota === subQuesito.notaSubequesito) {
      toast.info(
        `Você atribuiu a nota máxima (${subQuesito.notaSubequesito} pts) para este subquesito`
      );
    }

    if (onChange) {
      onChange(subQuesito.idSubequestios, nota);
    }
  };

  return (
    <div className="flex items-center justify-between border rounded-md px-4 py-2 bg-white">
      <span className="text-sm text-gray-800">
        {subQuesito.nomeSubquesito}
      </span>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {subQuesito.notaSubequesito} pts
        </span>

        <input
          type="number"
          min={0}
          max={subQuesito.notaSubequesito}
          step={0.1}
          value={value ?? ""}
          onChange={handleChange}
          className="w-20 h-8 border rounded-md text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
}