import { useEffect, useState } from "react";
import { listarUsuriosAvaliadores as listarAvaliadores, deleteUsuario as deleteAvaliador, listarCTGs } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import { Usuario, Funcao, Credenciamento } from "../../types/Usuario";
import { CTG } from "../../types/CTG";
import Dialog from "../Modal/Dialog";
import AvaliadorView from "../View/AvaliadorView";
import Modal from "../Modal/Modal";

interface AvaliadorListProps {
    onEdit: (avaliador: Usuario) => void;
    onVisualizar: (avaliador: Usuario) => void;
    onCredenciar: (avaliador: Usuario) => void;
}

export default function AvaliadorList({ onEdit }: AvaliadorListProps) {
    const [avaliadores, setAvaliadores] = useState<Usuario[]>([]);
    const [ctgs, setCTGs] = useState<CTG[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedAvaliador, setSelectedAvaliador] = useState<Usuario | null>(null);

    const fetchAvaliadores = async () => {
        try {
            type Usuario = {
                idUsuario: number;
                nomeCompleto: string;
                cidade: string;
                estado: string;
                CTGId: number;
                numCarteirinha: string;
                login: string;
                senha: string;
                funcao: Funcao;
                credenciamento: Credenciamento;
                numCredenciamento: number;
                comissaoUsuarioId?: number;
            };

            const response = await listarAvaliadores() as Usuario[];

            const avaliadores: Usuario[] = response.map((usuario) => ({
                idUsuario: usuario.idUsuario,
                nomeCompleto: usuario.nomeCompleto || "---",
                cidade: usuario.cidade || "",
                estado: usuario.estado || "",
                CTGId: usuario.CTGId || 0,
                numCarteirinha: usuario.numCarteirinha || "",
                login: usuario.login,
                senha: usuario.senha,
                funcao: usuario.funcao,
                credenciamento: usuario.credenciamento,
                numCredenciamento: usuario.numCredenciamento || 0,
                comissaoIdUsuario: usuario.comissaoUsuarioId,
            }));

            setAvaliadores(avaliadores);
        } catch (error) {
            toast.error("Erro ao carregar avaliadores");
            console.error(error);
        }
    };

    const fetchCTGs = async () => {
        try {
            const response = await listarCTGs() as CTG[];
            setCTGs(response);
        } catch (error) {
            toast.error("Erro ao carregar CTGs");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAvaliadores();
        fetchCTGs();
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [avaliadorSelecionadoId, setAvaliadorSelecionadoId] = useState<number | null>(null);


    const handleDeleteAvaliador = async (id: number) => {
        try {
            const response = await deleteAvaliador(id);
            console.log("Resposta da exclusão:", response);
            if (response !== null && response !== undefined) {
                await fetchAvaliadores();
                toast.success("Avaliador excluído com sucesso!");
                setIsDialogOpen(false);
                setAvaliadorSelecionadoId(null);
            } else {
                throw new Error("Falha ao excluir avaliador");
            }
        } catch (error) {
            console.error("Erro ao excluir avaliador:", error);
            toast.error(error instanceof Error ? error.message : "Erro ao excluir avaliador.");
            setIsDialogOpen(false);
            setAvaliadorSelecionadoId(null);
        }
    };

    const getCTGNameById = (idCTG: number | undefined) => {
        if (!idCTG) return "CTG não informado";
        const ctg = ctgs.find((ctg) => ctg.idCTG === idCTG);
        return ctg?.nomeCTG || "CTG não encontrado";
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Avaliadores</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome Completo</th>
                        <th className="p-3">Filiação</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {avaliadores.map((avaliador) => (
                        <tr key={avaliador.idUsuario}>
                            <td className="p-3">{avaliador.nomeCompleto || "---"}</td>
                            <td className="p-3">{getCTGNameById(avaliador.CTGId) || "---"}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => {
                                        setSelectedAvaliador(avaliador);
                                        setIsViewModalOpen(true);
                                    }}
                                >
                                    <Search size={18} />
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => onEdit(avaliador)}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => {
                                        setAvaliadorSelecionadoId(avaliador.idUsuario);
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
                    setAvaliadorSelecionadoId(null);
                }}
                onConfirm={() => {
                    if (avaliadorSelecionadoId !== null) {
                        handleDeleteAvaliador(avaliadorSelecionadoId);
                    }
                }}
                message="Tem certeza que deseja excluir este avaliador?"
            />
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            >
                {selectedAvaliador && (
                    <AvaliadorView
                        avaliador={selectedAvaliador}
                        ctg={ctgs.find((ctg) => ctg.idCTG === selectedAvaliador.CTGId)}
                        onVoltar={() => setIsViewModalOpen(false)}
                    />
                )}
            </Modal>

        </div>
    );
}
