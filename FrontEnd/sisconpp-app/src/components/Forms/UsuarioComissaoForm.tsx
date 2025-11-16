import React from 'react';
import { toast } from 'react-toastify';
import { Comissao, ComissaoUsuario } from '../../types/Comissao';
import { listarUsuriosAvaliadores, listarUsuriosAuxiliares, adicionarAuxiliarComissao, adicionarAvaliadorComissao} from '../../services/api';

interface UsuarioComissaoFormProps {
    onClose: () => void;
    comissao: Comissao;
    usuarioToEdit?: ComissaoUsuario;
    onSaved?: () => void;
}

export default function UsuarioComissaoForm({ comissao, onClose, onSaved }: UsuarioComissaoFormProps) {

    const [formData, setFormData] = React.useState({
        usuarioId: 0,
        comissaoId: comissao.idComissao
    });

    const [tipoUsuario, setTipoUsuario] = React.useState<"AVALIADOR" | "AUXILIAR">("AVALIADOR");
    const [usuarios, setUsuarios] = React.useState<{ idUsuario: number; nomeCompleto: string }[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (tipoUsuario === "AVALIADOR") {
                const listaAvaliadores = await listarUsuriosAvaliadores();
                setUsuarios(listaAvaliadores);
            } else {
                const listaAuxiliares = await listarUsuriosAuxiliares();
                setUsuarios(listaAuxiliares);
            }
        };

        fetchData();
    }, [tipoUsuario]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        try{
            if(tipoUsuario === "AVALIADOR"){
                await adicionarAvaliadorComissao(formData.usuarioId, formData.comissaoId);
                toast.success("Avaliador adicionado com sucesso!");
                if (onSaved) onSaved();
                onClose();
            } else{
                await adicionarAuxiliarComissao(formData.usuarioId, formData.comissaoId);
                toast.success("Auxiliar adicionado com sucesso!");
                if (onSaved) onSaved();
                onClose();
            }
        } catch (err) {
            console.error(err);
            toast.error("Erro ao adicionar usuário à comissão");
        }
    };

    return (
        <div>
            <form className="bg-secondary-light p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="w-full max-w-xl">
                    <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                        Adicionar Usuário à Comissão
                    </h1>

                    <label>
                        <input
                            type="radio"
                            value="AVALIADOR"
                            checked={tipoUsuario === "AVALIADOR"}
                            onChange={() => setTipoUsuario("AVALIADOR")}
                        />
                        Avaliador
                    </label>

                    <label className="ml-4">
                        <input
                            type="radio"
                            value="AUXILIAR"
                            checked={tipoUsuario === "AUXILIAR"}
                            onChange={() => setTipoUsuario("AUXILIAR")}
                        />
                        Auxiliar
                    </label>

                    <div className="mb-4 mt-4">
                        <select
                            className="w-full p-2 border border-neutral-border rounded-lg bg-white"
                            value={formData.usuarioId}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    usuarioId: Number(e.target.value)
                                })
                            }
                        >
                            <option value={0}>Selecione</option>
                            {usuarios.map((u) => (
                                <option key={u.idUsuario} value={u.idUsuario}>
                                    {u.nomeCompleto}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300"
                    >
                        {tipoUsuario === "AVALIADOR"
                            ? "Adicionar Avaliador"
                            : "Adicionar Auxiliar"}
                    </button>
                </div>
            </form>
        </div>
    );
}