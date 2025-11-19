import { useEffect, useState } from "react";
import { Concurso } from "../../types/Concurso";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import Dialog from "../Modal/Dialog";
import { listarConcurso, deletarConcurso } from "../../services/api";
import Modal from "../Modal/Modal";
import ConcursoView from "../View/ConcursoView";

interface ConcursoListProps {
    onEdit: (concurso: Concurso) => void;
    onVisualizar: (concurso: Concurso) => void;
    onCredenciar: (concurso: Concurso) => void;
}

export default function ConcursoList({ onEdit }: ConcursoListProps) {
    const [concursos, setConcursos] = useState<Concurso[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [concursoSelecionadoId, setConcursoSelecionadoId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedConcurso, setSelectedConcurso] = useState<Concurso | null>(null);

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

    const handleConfirmDelete = async () => {
        if (!concursoSelecionadoId) return;

        try {
            await deletarConcurso(concursoSelecionadoId);

            toast.success("Concurso excluído com sucesso!");
            fetchConcursos();
            setIsDialogOpen(false);
            setConcursoSelecionadoId(null);

        } catch (error: unknown) {
            let msg = "Erro ao deletar concurso.";

            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                msg = axiosError.response?.data?.message ?? msg;
            }

            toast.error(msg);
            setIsDialogOpen(false);
            setConcursoSelecionadoId(null);
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
                                    onClick={() => {
                                        setSelectedConcurso(concurso);
                                        setIsViewModalOpen(true);
                                    }}
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
                        handleConfirmDelete();
                        setIsDialogOpen(false);
                    }
                }}
                message="Tem certeza que deseja excluir este concurso?"
            />
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            >
                {selectedConcurso && (
                    <ConcursoView
                        concurso={selectedConcurso}
                        onVoltar={() => setIsViewModalOpen(false)}
                    />
                )}
            </Modal>

        </div>
    );
}
