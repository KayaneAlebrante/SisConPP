import { useEffect, useState } from "react";
import { RT } from "../../types/RT";
import { listarRTs, deleteRT } from "../../services/api";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
export default function RTList() {
  const [rts, setRTs] = useState<RT[]>([]);

  const fetchRTs = async () => {
    const response = await listarRTs() as RT[];
    setRTs(response);
  };

  useEffect(() => {
    fetchRTs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      if (window.confirm("Tem certeza que deseja excluir esta RT?")) {
        await deleteRT(id);
        await fetchRTs();
        toast.success("RT excluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir RT:", error);
      toast.error("Erro ao excluir RT. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Regiões Tradicionalistas</h2>
      <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead>
          <tr className="text-left bg-secondary-dark text-secondary-light">
            <th className="p-3 first:rounded-tl-xl last:rounded-tr-xl">Nome</th>
            <th className="p-3">Número</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rts.map((rt) => (
            <tr key={rt.idRT} className="border-t hover:bg-secondary-light/20 transition">
              <td className="p-3">{rt.nomeRT}</td>
              <td className="p-3">{rt.numeroRT}</td>
              <td className="p-3 flex gap-2">
                <button className="text-green-600 hover:text-green-800">
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(rt.idRT)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}