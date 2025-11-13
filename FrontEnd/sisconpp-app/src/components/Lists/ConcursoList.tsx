import { useEffect, useState } from "react";
import { Concurso } from "../../types/Concurso";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import Dialog from "../Modal/Dialog";
import { listarConcurso, deletarConcurso } from "../../services/api";

interface ConcursoListProps {
    onEdit: (concurso: Concurso) => void;
    onVisualizar: (concurso: Concurso) => void;
    onCredenciar: (concurso: Concurso) => void;
}

export default function ConcursoList({ onEdit }: ConcursoListProps) {
    const [concursos, setConcursos] = useState<Concurso[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [concursoSelecionadoId, setConcursoSelecionadoId] = useState<number | null>(null);

    const fetchConcursos = async () => {
        try {
            const response = await listarConcurso();
            setConcursos(response as Concurso[]);
        } catch (error) {
            toast.error("Erro ao carregar concursos.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchConcursos();
    }, []);

    const handleConfirmDelete = async (id: number) => {
        try {
            const response = await deletarConcurso(id);
            if (response) {
                await fetchConcursos();
                toast.success("Concurso excluído com sucesso!");
                setIsDialogOpen(false);
                setConcursoSelecionadoId(null);
            } else {
                throw new Error("Falha ao excluir concurso");
            }
        } catch (error) {
            toast.error("Erro ao excluir concurso.");
            console.error(error);
        }
    };

    const formatarData = (data: Date | string) => {
        const dateObj = new Date(data);
        const dia = String(dateObj.getUTCDate()).padStart(2, "0");
        const mes = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
        const ano = dateObj.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };    

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Concursos</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome do Concurso</th>
                        <th className="p-3">Data da Prova Escrita</th>
                        <th className="p-3">Data da Provas Praticas</th>
                        <th className="p-3">Local</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {concursos.map((concurso) => (
                        <tr key={concurso.idConcurso} className="border-t hover:bg-secondary-light/20 transition">
                            <td className="p-3">{concurso.nomeConcurso}</td>
                            <td className="p-3">{formatarData(concurso.dataProvaEscrita)}</td>
                            <td className="p-3">{formatarData(concurso.dataProvasPraticas)}</td>
                            <td className="p-3">{concurso.local}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                >
                                    <Search size={18} />
                                </button>
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => onEdit(concurso)}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => {
                                        setConcursoSelecionadoId(concurso.idConcurso);
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
                    setConcursoSelecionadoId(null);
                }}
                onConfirm={() => {
                    if (concursoSelecionadoId !== null) {
                        handleConfirmDelete(concursoSelecionadoId);
                    }
                }}
                menssage="Tem certeza que deseja excluir este concurso?"
            />
        </div>
    );
}
