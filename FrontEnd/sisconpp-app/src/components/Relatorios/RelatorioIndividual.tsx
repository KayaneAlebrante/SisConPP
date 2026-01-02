import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RelatorioIndividual } from "../../services/api";
import { RelatorioIndividualDTO } from "../../types/Relatorios";
import { User, FileText, CheckCircle, MessageSquare, Trophy } from "lucide-react";

interface Props {
  candidatoId: number;
}

export default function RelatorioIndividualDetalhado({ candidatoId }: Props) {
  const [relatorio, setRelatorio] = useState<RelatorioIndividualDTO | null>(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await RelatorioIndividual(Number(candidatoId));
        setRelatorio(response as RelatorioIndividualDTO);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
        toast.error("Erro ao carregar relatório individual");
      }
    };

    if (candidatoId) {
      fetchRelatorio();
    }
  }, [candidatoId]);

  if (!relatorio) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3 animate-pulse">
        <FileText size={40} />
        <p className="text-lg font-medium">Carregando relatório...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100 print:shadow-none print:border-none print:p-0">
      
      {/* --- CABEÇALHO DO CANDIDATO (AJUSTADO) --- */}
      <div className="border-b-2 border-gray-100 pb-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Lado Esquerdo: Nome e Dados */}
        <div className="flex-1 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            {relatorio.nomeCandidato}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-100">
              {relatorio.categoria}
            </span>
            <span className="flex items-center gap-1">
               <Trophy size={14} className="text-yellow-500" />
               {relatorio.concurso}
            </span>
          </div>
        </div>
      </div>

      {/* --- LISTA DE AVALIADORES --- */}
      <div className="space-y-10">
        {relatorio.avaliadores.map((av, idx) => (
          <div key={idx} className="relative">
            
            {/* Cabeçalho do Avaliador */}
            <div className="flex items-center gap-3 mb-4 sticky top-0 bg-white z-10 py-2 print:static">
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={20} className="text-gray-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">{av.nomeAvaliador}</h4>
              <div className="flex-1 border-b border-dashed border-gray-300 mx-4"></div>
              <span className="text-sm font-semibold bg-gray-800 text-white px-3 py-1 rounded-full whitespace-nowrap">
                Total: {Number(av.totalAvaliador).toFixed(2)}
              </span>
            </div>

            {/* Blocos de Avaliação */}
            <div className="grid gap-6 md:grid-cols-1">
              {av.blocos.map((bloco, bIdx) => (
                <div key={bIdx} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden break-inside-avoid">
                  
                  {/* Título do Bloco */}
                  <div className="bg-gray-100 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h5 className="font-bold text-gray-700 flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      {bloco.nomeBloco}
                    </h5>
                    <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                      Bloco: {Number(bloco.totalBloco).toFixed(2)}
                    </span>
                  </div>

                  {/* Lista de Quesitos */}
                  <div className="p-4 space-y-4">
                    {bloco.quesitos.map((q, qIdx) => {
                      const temComentario = q.comentario && q.comentario.trim() !== "";

                      return (
                        <div key={qIdx} className="last:mb-0">
                          
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 text-sm">{q.nomeQuesito}</p>
                            </div>

                            <div className="font-bold text-gray-900 bg-white border border-gray-200 min-w-[3.5rem] text-center py-1 rounded shadow-sm text-sm">
                              {Number(q.notaQuesito).toFixed(2)}
                            </div>
                          </div>

                          {q.subquesitos && q.subquesitos.length > 0 && (
                            <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
                              {q.subquesitos.map((sq, sqIdx) => (
                                <div key={sqIdx} className="flex justify-between items-center text-xs group hover:bg-white hover:shadow-sm rounded p-1 transition-all">
                                  <span className="text-gray-600 group-hover:text-gray-900">
                                    {sq.nomeSubQuesito}
                                  </span>
                                  <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded group-hover:bg-gray-200">
                                    {Number(sq.nota).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className={`mt-3 ml-1 flex gap-2 items-start p-3 rounded-md border text-xs transition-colors
                            ${temComentario 
                              ? "bg-yellow-50 border-yellow-100 text-yellow-800"
                              : "bg-white border-gray-100 text-gray-400"
                            }`}
                          >
                            <MessageSquare size={14} className="mt-0.5 shrink-0 opacity-70" />
                            <span className="italic font-medium">
                              {temComentario ? `"${q.comentario}"` : "Sem comentários do avaliador."}
                            </span>
                          </div>
                          
                          {/* Divisor */}
                          {qIdx < bloco.quesitos.length - 1 && (
                            <hr className="mt-6 border-gray-200 border-dashed" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t-2 border-gray-800 flex justify-end items-center gap-4 print:mt-4 break-inside-avoid">
        <span className="text-lg font-medium text-gray-600 uppercase">Pontuação Final</span>
        <div className="text-3xl font-black bg-gray-900 text-black px-6 py-2 rounded-lg shadow-lg print:shadow-none print:border print:border-black print:text-black print:bg-white">
          {relatorio.totalFinal}
        </div>
      </div>
    </div>
  );
}