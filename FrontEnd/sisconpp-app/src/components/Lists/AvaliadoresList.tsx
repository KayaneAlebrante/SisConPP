import { useEffect, useState } from "react";
import { listarUsuriosAvaliadores as listarAvaliadores, deleteUsuario as deleteAvaliador, listarCTGs } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import { Usuario, Funcao } from "../../types/Usuario";
import { CTG } from "../../types/CTG";

interface AvaliadorListProps {
    onEdit: (avaliador: Usuario) => void;
    onVisualizar: (avaliador: Usuario) => void;
    onCredenciar: (avaliador: Usuario) => void;
}

export default function AvaliadorList({ onEdit, onVisualizar }: AvaliadorListProps) {
    const [avaliadores, setAvaliadores] = useState<Usuario[]>([]);
    const [ctgs, setCTGs] = useState<CTG[]>([]);

    const fetchAvaliadores = async () => {
        try {
            type UsuarioComPessoa = {
                idUsuario: number;
                pessoaId: number;
                login: string;
                senha: string;
                funcao: Funcao;
                numCredenciamento: string;
                concursoId: number;
                comissaoUsuarioId: number;
                Pessoa?: {
                    nomeCompleto: string;
                    cidade: string;
                    estado: string;
                    CTGId: number;
                    numCarteirinha: string;
                };
            };
    
            const response = await listarAvaliadores() as UsuarioComPessoa[];
    
            const avaliadores: Usuario[] = response.map((usuario) => ({
                idUsuario: usuario.idUsuario,
                pessoaId: usuario.pessoaId,
                nomeCompleto: usuario.Pessoa?.nomeCompleto || "---",
                cidade: usuario.Pessoa?.cidade || "",
                estado: usuario.Pessoa?.estado || "",
                CTGId: usuario.Pessoa?.CTGId || 0,
                numCarteirinha: usuario.Pessoa?.numCarteirinha || "",
                login: usuario.login,
                senha: usuario.senha,
                funcao: usuario.funcao,
                numCredenciamento: usuario.numCredenciamento || "",
                concursoId: usuario.concursoId,
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

    const handleDelete = async (id: number) => {
        try {
            if (window.confirm("Tem certeza que deseja excluir este avaliador?")) {
                await deleteAvaliador(id);
                await fetchAvaliadores();
                toast.success("Avaliador excluído com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao excluir avaliador:", error);
            toast.error("Erro ao excluir avaliador. Tente novamente.");
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
                                    onClick={() => onVisualizar(avaliador)}
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
                                    onClick={() => handleDelete(avaliador.idUsuario)}
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
