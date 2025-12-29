import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { QuesitoDTO } from "../../types/Avaliacao";
import SubQuesitoInput from "./SubQuesitoinput";

interface Props {
  quesito: QuesitoDTO;
  notas: Record<number, number>;
  onChangeNota: (subQuesitoId: number, nota: number) => void;
  onChangeComentario?: (quesitoId: number, comentario: string) => void; // novo callback opcional
}

export default function QuesitoCard({
  quesito,
  notas,
  onChangeNota,
  onChangeComentario,
}: Props) {
  const [open, setOpen] = useState(true);
  const [comentario, setComentario] = useState("");

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComentario(value);
    if (onChangeComentario) {
      onChangeComentario(quesito.idQuesito, value);
    }
  };

  return (
    <div className="border rounded-lg bg-gray-50">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {quesito.nomeQuesito}
          </span>
          <span className="text-xs text-gray-500">
            Nota Máx: {quesito.notaMaximaQuesito} pts
          </span>
        </div>

        <div
          className={`p-2 rounded-lg ${open
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
        >
          {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          {quesito.subQuesitos.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhum subquesito cadastrado.
            </p>
          )}

          {quesito.subQuesitos.map((sub) => (
            <SubQuesitoInput
              key={sub.idSubequestios}
              subQuesito={sub}
              value={notas[sub.idSubequestios] ?? ""}
              onChange={onChangeNota}
            />
          ))}

          {/* Campo de comentário */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Comentário do quesito
            </label>
            <textarea
              value={comentario}
              onChange={handleComentarioChange}
              className="w-full p-3 rounded-md bg-white 
               border border-gray-200 text-gray-700 text-sm 
               focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              rows={3}
              placeholder="Escreva um comentário sobre este quesito..."
            />
          </div>
        </div>
      )}
    </div>
  );
}