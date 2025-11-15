import React from 'react';
import { ComissaoUsuario } from '../../types/Comissao';
import { listarUsuriosAvaliadores, listarUsuriosAuxiliares, adicionarAuxiliarComissao, adicionarAvaliadorComissao } from '../../services/api';

interface UsuarioComissaoFormProps {
    onClose: () => void;
    comissao: Comissao;
    usuarioToEdit?: ComissaoUsuario;
}

interface Comissao {
    idComissao: number;
    nomeComissao: string;
}

export default function UsuarioComissaoForm({ comissao, onClose }: UsuarioComissaoFormProps) {
    const [formData, setFormData] = React.useState<ComissaoUsuario>({
        idComissaoUsuario: 0,
        comissaoId: comissao.idComissao,
        usuarioId: 0
    });

    const [tipoUsuario, setTipoUsuario] = React.useState<"avaliador" | "auxiliar">("avaliador");
    const [usuarios, setUsuarios] = React.useState<{ idUsuario: number; nomeCompleto: string }[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (tipoUsuario === "avaliador") {
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

        if (tipoUsuario === "avaliador") {
            await adicionarAvaliadorComissao(formData.usuarioId, formData.comissaoId);
        } else {
            await adicionarAuxiliarComissao(formData.usuarioId, formData.comissaoId);
        }

        onClose();
    };

    return (
        <div>
            <form className="bg-secondary-light p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="w-full max-w-xl">
                    <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                        Adicionar Usuario à Comissão
                    </h1>
                    <label>
                        <input
                            type="radio"
                            value="avaliador"
                            checked={tipoUsuario === "avaliador"}
                            onChange={() => setTipoUsuario("avaliador")}
                        />
                        Avaliador
                    </label>

                    <label className="ml-4">
                        <input
                            type="radio"
                            value="auxiliar"
                            checked={tipoUsuario === "auxiliar"}
                            onChange={() => setTipoUsuario("auxiliar")}
                        />
                        Auxiliar
                    </label>

                    <div className="mb-4">
                        <select
                            className="w-full p-2 border border-neutral-border rounded-lg bg-white"
                            value={formData.usuarioId}
                            onChange={(e) => setFormData({ ...formData, usuarioId: parseInt(e.target.value) })}
                        >
                            <option value="">Selecione</option>
                            {usuarios.map((u) => (
                                <option key={u.idUsuario} value={u.idUsuario}>
                                    {u.nomeCompleto}
                                </option>
                            ))}
                        </select>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-secondary-container text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out"
                    >
                        Adicionar Avaliador
                    </button>
                </div>
            </form>
        </div>
    );
}