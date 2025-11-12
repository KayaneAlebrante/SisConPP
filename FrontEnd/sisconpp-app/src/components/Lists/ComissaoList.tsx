import { useEffect, useState } from "react";
import { listarComissoes } from "../../services/api";
import { toast } from "react-toastify";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import AvaliadorComissaoForm from "../Forms/AvaliadorComissaoForm";
import Modal from "../Modal/Modal"; 

interface Usuario {
    idUsuario: number;
    nomeCompleto: string;
    funcao: "AVALIADOR" | "AUXILIAR";
}

interface Comissao {
    idComissao: number;
    nomeComissao: string;
    usuarios: {
        Usuarios: Usuario;
    }[];
}

const ComissaoList = () => {
    const [selectedComissao, setSelectedComissao] = useState<Comissao | null>(null);
    const [comissoes, setComissoes] = useState<Comissao[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listarComissoes() as Comissao[];
                setComissoes(data);
            } catch (error) {
                toast.error("Erro ao carregar comissões");
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Concursos</h2>
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
                            (u) => u.Usuarios.funcao === "AVALIADOR"
                        );
                        const auxiliar = comissao.usuarios.find(
                            (u) => u.Usuarios.funcao === "AUXILIAR"
                        );

                        return (
                            <tr key={comissao.idComissao} className="border-t">
                                <td className="px-3 py-2">{comissao.nomeComissao}</td>
                                <td className="px-3 py-2">
                                    <ul className="list-disc pl-4">
                                        {avaliadores.map((a) => (
                                            <li key={a.Usuarios.idUsuario}>
                                                {a.Usuarios.nomeCompleto}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                
                                <td className="px-3 py-2">
                                    {auxiliar?.Usuarios.nomeCompleto || <span className="text-gray-400 italic">Nenhum</span>}
                                </td>
                                <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => setSelectedComissao(comissao)}
                                >
                                    <UserPlus size={18} />
                                </button>
                                {selectedComissao?.idComissao === comissao.idComissao && (
                                    <Modal isOpen={selectedComissao?.idComissao === comissao.idComissao} onClose={() => setSelectedComissao(null)}>
                                        <AvaliadorComissaoForm comissao={selectedComissao} onClose={() => setSelectedComissao(null)} />
                                    </Modal>
                                )}
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
  );
};

export default ComissaoList;