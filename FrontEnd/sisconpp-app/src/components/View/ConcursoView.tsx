import { ArrowLeft, CalendarCheck, MapPin, FileText } from "lucide-react";
import { Concurso } from "../../types/Concurso";

interface Props {
  concurso: Concurso;
  onVoltar: () => void;
}

export default function ConcursoView({ concurso, onVoltar }: Props) {
  const formatarData = (data: string | Date) => {
    const dateObj = new Date(data);
    return dateObj.toLocaleDateString("pt-BR");
  };

  return (
    <div className="w-full max-w-xl">
      {/* Botão voltar */}
      <button
        className="text-green-600 mb-4 flex items-center"
        onClick={onVoltar}
      >
        <ArrowLeft className="mr-1" size={20} /> Voltar
      </button>

      {/* Bloco principal */}
      <div className="flex gap-6">
        {/* Informações */}
        <div className="flex-1 space-y-1 text-sm text-gray-800">
          <p><strong>Nome do Concurso:</strong> {concurso.nomeConcurso}</p>

          <div className="flex justify-between">
            <p className="flex items-center gap-1">
              <MapPin size={14} />
              <strong>Local:</strong> {concurso.local}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="flex items-center gap-1">
              <CalendarCheck size={14} />
              <strong>Prova Escrita:</strong> {formatarData(concurso.dataProvaEscrita)}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="flex items-center gap-1">
              <CalendarCheck size={14} />
              <strong>Provas Práticas:</strong> {formatarData(concurso.dataProvasPraticas)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {[
          "Edital do Concurso"
        ].map((doc, i) => (
          <div key={i} className="flex items-center text-primary-onFixed">
            <FileText className="mr-2" size={16} />
            {doc}
          </div>
        ))}
      </div>
    </div>
  );
}
