import { useEffect, useState } from "react";
import { listarComissoes, deletarComissao } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, UserPlus, UserMinus, ClipboardCheck } from "lucide-react";
import UsuarioComissaoForm from "../Forms/UsuarioComissaoForm";
import DeleteUsuarioForm from "../Forms/RemoverUsuariocomissãoForm";
import Modal from "../Modal/Modal";
import { Comissao } from "../../types/Comissao";
import Dialog from "../Modal/Dialog";
import AtribuicaoAvaliacaoForm from "../Forms/AtribuirAvaliacacaoForm";

interface ComissaoListProps {
    onEdit: (comissao: Comissao) => void;
}

export default function ComissaoList({ onEdit }: ComissaoListProps) {
    const [comissaoAtribuicao, setComissaoAtribuicao] = useState<Comissao | null>(null);
    const [comissaoUsuario, setComissaoUsuario] = useState<Comissao | null>(null);
    const [comissoes, setComissoes] = useState<Comissao[]>([]);
    const [modalDeleteComissao, setModalDeleteComissao] = useState<Comissao | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [comissoesSelecionadaId, setComissoesSelecionadaId] = useState<number | null>(null);

    const fetchComissoes = async () => {
        try {
            const data: Comissao[] = await listarComissoes();
            setComissoes(data);
        } catch (error) {
            toast.error("Erro ao carregar comissões");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComissoes();
    }, []);

    const handleConfirmDelete = async (idComissao: number) => {
        try {
            const response = await deletarComissao(idComissao);
            if (response) {
                await fetchComissoes();
                toast.success("Comissão excluída com sucesso!");
                setComissoesSelecionadaId(null);
                setIsDialogOpen(false);
            } else {
                throw new Error("Falha ao excluir comissão");
            }

        } catch {
            const response = await fetch("/api/comissoes", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idComissao }),
            });
            if (!response.ok) {
                const erroApi = await response.json();
                toast.error(erroApi.mensagem || "Erro ao excluir comissão.");
                setIsDialogOpen(false);
                setComissoesSelecionadaId(null);
            }
        }
    }

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-dark">
                Lista das Comissões
            </h2>

            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="text-left px-3 py-2">Nome da Comissão</th>
                        <th className="text-left px-3 py-2">Avaliadores</th>
                        <th className="text-left px-3 py-2">Auxiliar</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {comissoes.map((comissao) => {
                        const avaliadores = comissao.usuarios.filter(
                            (usuario) => usuario.Usuarios.funcao === "AVALIADOR"
                        );

                        const auxiliares = comissao.usuarios.filter(
                            (usuario) => usuario.Usuarios.funcao === "AUXILIAR"
                        );


                        return (
                            <tr key={comissao.idComissao} className="border-t">
                                <td className="px-3 py-2">{comissao.nomeComissao}</td>
                                <td className="px-3 py-2">
                                    <ul className="list-disc pl-4">
                                        {avaliadores.map((usuario) => (
                                            <li key={usuario.Usuarios.idUsuario}>{usuario.Usuarios.nomeCompleto}</li>
                                        ))}

                                        {avaliadores.length === 0 && (
                                            <span className="text-gray-400">Nenhum avaliador</span>
                                        )}
                                    </ul>
                                </td>

                                <td className="px-3 py-2">
                                    <ul className="list-disc pl-4">
                                        {auxiliares.map((usuario) => (
                                            <li key={usuario.Usuarios.idUsuario}>{usuario.Usuarios.nomeCompleto}</li>
                                        ))}

                                        {auxiliares.length === 0 && (
                                            <span className="text-gray-400">Nenhum auxiliar</span>
                                        )}
                                    </ul>
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button
                                        className="text-green-600 hover:text-green-800"
                                        onClick={() => setComissaoAtribuicao(comissao)}
                                    >
                                        <ClipboardCheck size={18} />
                                    </button>
                                    {comissaoAtribuicao?.idComissao === comissao.idComissao && (
                                        <Modal
                                            isOpen={true}
                                            onClose={() => setComissaoAtribuicao(null)}
                                        >
                                            <AtribuicaoAvaliacaoForm
                                                comissao={comissaoAtribuicao}
                                                onClose={() => setComissaoAtribuicao(null)}
                                                onSaved={fetchComissoes}
                                            />
                                        </Modal>
                                    )
                                    }

                                    <button
                                        className="text-green-600 hover:text-green-800"
                                        onClick={() => setComissaoUsuario(comissao)}
                                    >
                                        <UserPlus size={18} />
                                    </button>

                                    {comissaoUsuario?.idComissao === comissao.idComissao && (
                                        <Modal
                                            isOpen={true}
                                            onClose={() => setComissaoUsuario(null)}
                                        >
                                            <UsuarioComissaoForm
                                                comissao={comissaoUsuario}
                                                onClose={() => setComissaoUsuario(null)}
                                                onSaved={fetchComissoes}
                                            />
                                        </Modal>
                                    )}

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => setModalDeleteComissao(comissao)}
                                    >
                                        <UserMinus size={18} />
                                    </button>

                                    {modalDeleteComissao?.idComissao === comissao.idComissao && (
                                        <Modal
                                            isOpen={true}
                                            onClose={() => setModalDeleteComissao(null)}
                                        >
                                            <DeleteUsuarioForm
                                                comissao={modalDeleteComissao}
                                                onClose={() => setModalDeleteComissao(null)}
                                                onDeleted={fetchComissoes}
                                            />
                                        </Modal>
                                    )}

                                    <button className="text-blue-600 hover:text-blue-800"
                                        onClick={() => onEdit(comissao)}
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => {
                                            setComissoesSelecionadaId(comissao.idComissao);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

                <Dialog
                    isOpen={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false);
                        setComissoesSelecionadaId(null);
                    }}
                    onConfirm={() => {
                        if (comissoesSelecionadaId !== null) {
                            handleConfirmDelete(comissoesSelecionadaId);
                            setIsDialogOpen(false);
                        }
                    }}
                    message="Tem certeza que deseja excluir esta comissão?"
                />
            </table>
        </div >
    );
};