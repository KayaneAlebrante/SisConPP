import { useEffect, useState, useRef } from "react";
import { RelatorioRankingDTO } from "../../types/Relatorios";
import { rankingPorCategoria } from "../../services/api";
import { toast } from "react-toastify";

interface RankingCategoriaListProps {
  concursoId: number;
  categoriaId: number;
}

export default function RankingCategoriaList({
  concursoId,
  categoriaId,
}: RankingCategoriaListProps) {
  const [ranking, setRanking] = useState<RelatorioRankingDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const rankingRef = useRef<HTMLDivElement>(null);

  const fetchRanking = async () => {
    try {
      setLoading(true);
      const response = await rankingPorCategoria(concursoId, categoriaId);
      setRanking(response as RelatorioRankingDTO[]);
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
      toast.error("Erro ao carregar ranking da categoria");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (concursoId && categoriaId) {
      fetchRanking();
    }
  }, [concursoId, categoriaId]);

  return (
    <div className="flex flex-col h-full" ref={rankingRef}>
      {loading && (
        <p className="text-center text-gray-500">Carregando Relatorio...</p>
      )}

      {!loading && ranking.length === 0 && (
        <p className="text-center text-gray-500">
          Nenhum resultado encontrado.
        </p>
      )}

      {!loading && ranking.length > 0 && (
        <table className="w-full bg-neutral-surface rounded-xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-secondary-dark text-secondary-light text-left">
              <th className="p-3 text-center first:rounded-tl-xl">Posição</th>
              <th className="p-3">Candidato</th>
              <th className="p-3">Categoria</th>
              <th className="p-3 text-center last:rounded-tr-xl">Nota Final</th>
            </tr>
          </thead>

          <tbody>
            {ranking.map((item) => (
              <tr
                key={item.candidatoId}
                className="border-t hover:bg-neutral-container"
              >
                <td className="p-3 text-center font-bold">
                  {item.classificacao}º
                </td>
                <td className="p-3">{item.nomeCandidato || "---"}</td>
                <td className="p-3">{item.categoria || "---"}</td>
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