import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RelatorioIndividual} from "../../services/api";
import { RelatorioIndividualDTO } from "../../types/Relatorios";

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
      } catch {
        toast.error("Erro ao carregar relatório individual");
      }
    };
    if (candidatoId) {
      fetchRelatorio();
    }
  }, [candidatoId]);

  if (!relatorio) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
        <p className="text-lg font-medium">Carregando relatório...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md print:shadow-none print:p-0">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold mb-2">
          Relatório Individual - {relatorio.nomeCandidato}
        </h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <p><strong>Categoria:</strong> {relatorio.categoria}</p>
          <p><strong>Concurso:</strong> {relatorio.concurso}</p>
          <p><strong>Nota Final:</strong> {relatorio.notaCandidato}</p>

        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Avaliações</h3>
        {relatorio.avaliadores.map((av, idx) => (
          <div key={idx} className="mb-6 p-4 border rounded-lg shadow-sm">
            <h4 className="text-lg font-bold mb-2">{av.nomeAvaliador}</h4>

            {av.blocos.map((bloco, bIdx) => (
              <div key={bIdx} className="mb-6">
                <h5 className="font-semibold text-primary mb-2">
                  {bloco.nomeBloco} <span className="text-gray-600">(Total: {bloco.totalBloco})</span>
                </h5>

                {/* Tabela de Quesitos */}
                <table className="w-full text-sm border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Quesito</th>
                      <th className="p-2 text-center">Nota</th>
                      <th className="p-2 text-left">Comentário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloco.quesitos.map((q, qIdx) => (
                      <tr key={qIdx} className="border-b">
                        <td className="p-2">{q.nomeQuesito}</td>
                        <td className="p-2 text-center">{q.notaQuesito}</td>
                        <td className="p-2">{q.comentario ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Subquesitos */}
                {bloco.quesitos.map(
                  (q) =>
                    q.subquesitos.length > 0 && (
                      <table
                        key={q.nomeQuesito}
                        className="ml-6 mt-2 w-[95%] text-xs border-collapse"
                      >
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="p-1 text-left">Subquesito</th>
                            <th className="p-1 text-center">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {q.subquesitos.map((sq, sqIdx) => (
                            <tr key={sqIdx} className="border-b">
                              <td className="p-1">{sq.nomeSubQuesito}</td>
                              <td className="p-1 text-center">{sq.nota}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                )}
              </div>
            ))}

            <p className="mt-2 font-bold">Total Avaliador: {av.totalAvaliador}</p>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total Final: {relatorio.totalFinal}</p>
      </div>
    </div>
  );
}