import { useEffect, useState } from "react";
import { listarCTGs, deleteCTG, listarRTs } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import { CTG } from "../../types/CTG";

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

    const fetchCTGs = async () => {
        try {
            const response = await listarCTGs() as CTG[];
            setCTGs(response);
        } catch (error) {
            toast.error("Erro ao carregar CTGs");
            console.error(error);
        }
    };

    const fetchRTs = async () => {
        try {
            const response = await listarRTs() as RT[];
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

    const handleDelete = async (id: number) => {
        try {
            if (window.confirm("Tem certeza que deseja excluir este CTG?")) {
                await deleteCTG(id);
                await fetchCTGs();
                toast.success("CTG excluído com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao excluir CTG:", error);
            toast.error("Erro ao excluir CTG. Tente novamente.");
        }
    };

    const getRTNameById = (id: number) => {
        const rt = rts.find((rt) => rt.idRT === id);
        return rt ? rt.nomeRT: "RT não encontrada";
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de CTGs</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome CTG</th>
                        <th className="p-3">Região Tradicionalista</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ctgs.map((ctg) => (
                        <tr key={ctg.idCTG} className="border-t hover:bg-secondary-light/20 transition">
                            <td className="p-3">{ctg.nomeCTG}</td>
                            <td className="p-3">{getRTNameById(ctg.RTId                              
                            )}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => onEdit(ctg)}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(ctg.idCTG)}
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
