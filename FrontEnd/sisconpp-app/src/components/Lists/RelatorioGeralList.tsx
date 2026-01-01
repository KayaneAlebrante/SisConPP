import { useEffect, useState, useRef } from "react";
import { relatorioGeral } from "../../services/api";
import { RelatorioGeralCandidatoDTO } from "../../types/Relatorios";

interface Props {
  concursoId: number;
}

export default function RelatorioGeralList({ concursoId }: Props) {
  const [dados, setDados] = useState<RelatorioGeralCandidatoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const relatorioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const result = await relatorioGeral(concursoId);
        setDados(result);
      } catch (error) {
        console.error("Erro ao carregar relatório", error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [concursoId]);

  return (
    <div className="flex flex-col h-full" ref={relatorioRef}>
      {loading && (
        <p className="text-center text-gray-500">Carregando Relatorio...</p>
      )}

      {dados.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
      ) : (
        <table className="w-full bg-neutral-surface rounded-xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-secondary-dark text-secondary-light text-left">
              <th className="p-3 first:rounded-tl-xl">Candidato</th>
              <th className="p-3">Categoria</th>
              <th className="p-3 text-center">Teórica</th>
              <th className="p-3 text-center">Práticas</th>
              <th className="p-3 text-center last:rounded-tr-xl font-bold">
                Final
              </th>
            </tr>
          </thead>

          <tbody>
            {dados.map((item) => (
              <tr key={item.candidatoId} className="border-t hover:bg-neutral-container">
                <td className="p-3">{item.nomeCandidato || "---"}</td>
                <td className="p-3">{item.categoria || "---"}</td>
                <td className="p-3 text-center">
                  {item.notaProvaTeorica?.toFixed(2) ?? "---"}
                </td>
                <td className="p-3 text-center">
                  {item.notaProvasPraticas?.toFixed(2) ?? "---"}
                </td>
                <td className="p-3 text-center font-bold">
                  {item.notaFinal?.toFixed(2) ?? "---"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}