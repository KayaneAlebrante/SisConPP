import React from 'react';
import { ComissaoUsuario} from '../../types/Comissao';
import { listarUsuriosAvaliadores } from '../../services/api';

interface AvaliadorComissaoFormProps {
    onClose: () => void;
    avaliadorToEdit?: ComissaoUsuario;
}

export default function AvaliadorComissaoForm({onClose, avaliadorToEdit}: AvaliadorComissaoFormProps) {
    const [formData, setFormData] = React.useState<ComissaoUsuario>({
        idComissaoUsuario: 0,
        comissaoId: avaliadorToEdit?.comissaoId || 0,
        usuarioId: avaliadorToEdit?.usuarioId || 0
    });

    const [avaliadores, setAvaliadores] = React.useState<{ idUsuario: number; nomeCompleto: string }[]>([]);

    React.useEffect(() => {
        const fetchAvaliadores = async () => {
            const response = await listarUsuriosAvaliadores()
            setAvaliadores(response as { idUsuario: number; nomeCompleto: string }[]);
        };
        fetchAvaliadores();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <form className="bg-secondary-light p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="w-full max-w-xl">
                <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                    Adicionar Avaliador à Comissão
                </h1>
                <div className="mb-4">
                    <label className="block text-neutral-onBackground mb-2" htmlFor="avaliador">
                        Avaliador
                    </label>
                    <select
                        id="avaliador"
                        name="avaliador"
                        value={formData.usuarioId}
                        onChange={(e) => setFormData({ ...formData, usuarioId: parseInt(e.target.value) })}
                        required
                        className="w-full p-2 border border-neutral-border rounded-lg bg-white"
                    >
                        <option value="">Selecione um avaliador</option>
                        {avaliadores.map((avaliador) => (
                            <option key={avaliador.idUsuario} value={avaliador.idUsuario}>
                                {avaliador.nomeCompleto}
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
    );
}