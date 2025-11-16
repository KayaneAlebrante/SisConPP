import { toast } from "react-toastify";
import { deletarUsuarioComissao } from "../../services/api";
import { Comissao } from "../../types/Comissao";
import { Trash2 } from "lucide-react";

interface Props {
    comissao: Comissao;
    onClose: () => void;
    onDeleted: () => void;
}

export default function DeleteUsuarioForm({ comissao, onClose, onDeleted }: Props) {
    const handleDelete = async (usuarioId: number) => {
        try {
            await deletarUsuarioComissao(usuarioId, comissao.idComissao);
            toast.success("Usuário removido da comissão!");
            onDeleted();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao remover usuário");
        }
    };

    return (
        <div className="bg-secondary-light p-6 rounded-lg shadow-md relative">
            <h2 className="text-xl font-semibold text-neutral-onBackground mb-4">
                Remover usuário da comissão
            </h2>

            <p className="mb-3 font-medium text-neutral-onSurfaceVariant">
                Comissão: {comissao.nomeComissao}
            </p>

            <ul className="space-y-3">
                {comissao.usuarios.map((u) => (
                    <li
                        key={u.idComissaoUsuario}
                        className="flex justify-between items-center bg-white p-2 rounded-lg border border-neutral-border"
                    >
                        <span className="font-medium">{u.Usuarios.nomeCompleto}</span>

                        <button
                            onClick={() => handleDelete(u.Usuarios.idUsuario)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                        >
                            <Trash2 size={18} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}