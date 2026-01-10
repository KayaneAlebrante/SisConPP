import { useEffect, useState } from "react";
import { RT } from "../../types/RT";
import { listarRTs, deleteRT } from "../../services/api";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Dialog from "../Modal/Dialog";

interface RTListProps {
  onEdit: (rt: RT) => void;
}

export default function RTList({ onEdit }: RTListProps) {
  const [rts, setRTs] = useState<RT[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rtSelecionadoId, setRtSelecionadoId] = useState<number | null>(null);

  const fetchRTs = async () => {
    try {
      const response = (await listarRTs()) as RT[];
      setRTs(response);
    } catch (error) {
      toast.error("Erro ao carregar RTs");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRTs();
  }, []);

  const handleConfirmDelete = async () => {
    if (!rtSelecionadoId) return;

    try {
      await deleteRT(rtSelecionadoId);

      toast.success("RT exluído com sucesso!");
      fetchRTs();
      setIsDialogOpen(false);
      setRtSelecionadoId(null);
    } catch (error: unknown) {
      let msg = "Erro ao deletar RT.";

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        msg = axiosError.response?.data?.message ?? msg;
      }

      toast.error(msg);
      setIsDialogOpen(false);
      setRtSelecionadoId(null);
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Regiões Tradicionalistas</h2>
      <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead>
          <tr className="text-left bg-secondary-dark text-secondary-light">
            <th className="p-3 first:rounded-tl-xl">Nome</th>
            <th className="p-3">Número</th>
            <th className="p-3 last:rounded-tr-xl">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rts.map((rt) => (
            <tr key={rt.idRT} className="border-t hover:bg-secondary-light/20 transition">
              <td className="p-3">{rt.nomeRT}</td>
              <td className="p-3">{rt.numeroRT}</td>
              <td className="p-3 flex gap-2">
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => onEdit(rt)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    setRtSelecionadoId(rt.idRT);
                    setIsDialogOpen(true);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setRtSelecionadoId(null);
        }}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir esta RT?"
      />
    </div>
  );
}