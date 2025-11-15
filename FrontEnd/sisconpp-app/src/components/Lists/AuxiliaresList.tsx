import { useEffect, useState } from "react";
import { listarUsuriosAuxiliares as listarAuxiliares, deleteUsuario, listarCTGs} from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import { Usuario, Funcao, Credenciamento} from "../../types/Usuario";
import { CTG } from "../../types/CTG";
import Dialog from "../Modal/Dialog";
import AuxiliarView from "../View/AuxiliarView";
import Modal from "../Modal/Modal";

interface AuxiliaresListProps {
    onEdit: (auxiliar: Usuario) => void;
    onVisualizar: (auxiliar: Usuario) => void;
    onCredenciar: (auxiliar: Usuario) => void;
}

export default function AuxiliaresList({ onEdit}: AuxiliaresListProps) {
    const [auxiliares, setAuxiliares] = useState<Usuario[]>([]);
    const [ctgs, setCTGs] = useState<CTG[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedAuxiliar, setSelectedAuxiliar] = useState<Usuario | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [auxiliarSelecionadoId, setAuxiliarSelecionadoId] = useState<number | null>(null);

    const fetchAuxiliares = async () => {
        try {
            type UsuarioComPessoa = {
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

            const response = await listarAuxiliares() as UsuarioComPessoa[];

            const auxiliares: Usuario[] = response.map((usuario) => ({
                idUsuario: usuario.idUsuario,
                nomeCompleto: usuario.nomeCompleto || "---",
                cidade: usuario.cidade || "",
                estado: usuario.estado || "",
                CTGId: usuario.CTGId || 0,
                numCarteirinha: usuario.numCarteirinha || "",
                login: usuario.login,
                senha: usuario.senha,
                funcao: usuario.funcao,
                credenciamento: usuario.numCredenciamento === 1 ? Credenciamento.CREDENCIADO : Credenciamento.NAO_CREDENCIADO, // Mapeamento explícito
                numCredenciamento: usuario.numCredenciamento || 0,
                comissaoIdUsuario: usuario.comissaoUsuarioId,
            }));

            setAuxiliares(auxiliares);

        } catch (error) {
            toast.error("Erro ao carregar auxiliares");
            console.error(error);
        }
    };

    const fetchCTGs = async () => {
        try {
            const response = await listarCTGs();
            setCTGs(response as CTG[]);
        } catch (error) {
            toast.error("Erro ao carregar CTGs");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAuxiliares();
        fetchCTGs();
    }, []);

    const handleConfirmDelete = async (id: number) => {
        try {
            const response = await deleteUsuario(id);
            console.log("Resposta da exclusão:", response);
            if (response !== null && response !== undefined) {
                await fetchAuxiliares();
                toast.success("Auxiliar excluído com sucesso!");
                setIsDialogOpen(false);
                setAuxiliarSelecionadoId(null);
            } else {
                throw new Error("Falha ao excluir auxiliar");
            }
        } catch (error) {
            console.error("Erro ao excluir auxiliar:", error);
            toast.error("Erro ao excluir auxiliar. Tente novamente.");
        }
    };

    const getCTGNameById = (idCTG: number | undefined) => {
        if (!idCTG) return "CTG não informado";
        const ctg = ctgs.find((ctg) => ctg.idCTG === idCTG);
        return ctg?.nomeCTG || "CTG não encontrado";
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Auxiliares</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome Completo</th>
                        <th className="p-3">Filiação</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {auxiliares.map((auxiliar) => (
                        <tr key={auxiliar.idUsuario}>
                            <td className="p-3">{auxiliar.nomeCompleto || "---"}</td>
                            <td className="p-3">{getCTGNameById(auxiliar.CTGId) || "---"}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => {
                                        setSelectedAuxiliar(auxiliar);
                                        setIsViewModalOpen(true);
                                    }}
                                >
                                    <Search size={18} />
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => onEdit(auxiliar)}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => {
                                        setAuxiliarSelecionadoId(auxiliar.idUsuario);
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
                                setAuxiliarSelecionadoId(null);
                            }}
                            onConfirm={() => {
                                if (auxiliarSelecionadoId !== null) {
                                    handleConfirmDelete(auxiliarSelecionadoId);
                                }
                            }}
                            message="Tem certeza que deseja excluir este avaliador?"
            />

            <Modal 
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                >
                {selectedAuxiliar && (
                    <AuxiliarView
                        auxiliar={selectedAuxiliar}
                        ctg={ctgs.find(ctg => ctg.idCTG === selectedAuxiliar.CTGId)}
                        onVoltar={() => setIsViewModalOpen(false)}
                    />
                )}
            </Modal>
                    

        </div>
    );
}