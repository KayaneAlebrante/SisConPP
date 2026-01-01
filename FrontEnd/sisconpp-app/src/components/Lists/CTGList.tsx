import { useEffect, useState } from "react";
import { listarCTGs, deleteCTG, listarRTs } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import { CTG } from "../../types/CTG";
import Dialog from "../Modal/Dialog";

interface CTGListProps {
  onEdit: (ctg: CTG) => void;
}

interface RT {
  idRT: number;
  nomeRT: string;
}

export default function CTGList({ onEdit }: CTGListProps) {
  const [ctgs, setCTGs] = useState<CTG[]>([]);
  const [rts, setRTs] = useState<RT[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ctgSelecionadoId, setCtgSelecionadoId] = useState<number | null>(null);

  const fetchCTGs = async () => {
    try {
      const response = (await listarCTGs()) as CTG[];
      setCTGs(response);
    } catch (error) {
      toast.error("Erro ao carregar CTGs");
      console.error(error);
    }
  };

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
    fetchCTGs();
    fetchRTs();
  }, []);

  const handleConfirmDelete = async () => {
    if (!ctgSelecionadoId) return;

    try {
      await deleteCTG(ctgSelecionadoId);

      toast.success("CTG exluído com sucesso!");
      fetchCTGs();
      setIsDialogOpen(false);
      setCtgSelecionadoId(null);
    } catch (error: unknown) {
      let msg = "Erro ao deletar CTG.";

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        msg = axiosError.response?.data?.message ?? msg;
      }

      toast.error(msg);
      setIsDialogOpen(false);
      setCtgSelecionadoId(null);
    }
  };

  const getRTNameById = (id: number) => {
    const rt = rts.find((rt) => rt.idRT === id);
    return rt ? rt.nomeRT : "RT não encontrada";
  };

  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-secondary-dark">Lista de CTGs</h2>
      <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead>
          <tr className="text-left bg-secondary-dark text-secondary-on">
            <th className="p-3 first:rounded-tl-xl">Nome CTG</th>
            <th className="p-3">Região Tradicionalista</th>
            <th className="p-3 last:rounded-tr-xl">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ctgs.map((ctg) => (
            <tr
              key={ctg.idCTG}
              className="border-t hover:bg-secondary-light/20 transition"
            >
              <td className="p-3">{ctg.nomeCTG}</td>
              <td className="p-3">{getRTNameById(ctg.RTid)}</td>
              <td className="p-3 flex gap-2">
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => onEdit(ctg)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    setCtgSelecionadoId(ctg.idCTG);
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
          setCtgSelecionadoId(null);
        }}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir este CTG?"
      />
    </div>
  );
}
