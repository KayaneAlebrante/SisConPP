import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { listarCategorias, criarProvaPratica } from '../../../services/api';
import { Categoria } from '../../../types/Categoria';

interface ProvaPraticaFormProps {
    onClose: () => void;
}

export default function ProvaPraticaForm({ onClose }: ProvaPraticaFormProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nomeProva, setNomeProva] = useState('');
    const [notaMaxima, setNotaMaxima] = useState<number | ''>('');
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await listarCategorias();
                setCategorias(response as Categoria[]);
            } catch {
                toast.error('Erro ao carregar categorias');
            }
        };

        fetchCategorias();
    }, []);

    const toggleCategoria = (id: number) => {
        setCategoriasSelecionadas(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nomeProva.trim()) {
            toast.warning('Informe o nome da prova');
            return;
        }

        if (!notaMaxima || notaMaxima <= 0) {
            toast.warning('Informe uma nota máxima válida');
            return;
        }

        if (categoriasSelecionadas.length === 0) {
            toast.warning('Selecione ao menos uma categoria');
            return;
        }

        const porvaPraticaPayload = {
            idProvaPratica: 0,
            nomeProva,
            notaMaxima: Number(notaMaxima),
            categorias: categoriasSelecionadas,
            blocosProvas: []
        };

        try {
            await criarProvaPratica(porvaPraticaPayload);
            toast.success('Prova prática criada com sucesso');
            onClose();
        } catch {
            toast.error('Erro ao criar prova prática');
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                Nova Prova Prática
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">
                        Nome da Prova
                    </label>
                    <input
                        type="text"
                        value={nomeProva}
                        onChange={e => setNomeProva(e.target.value)}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">
                        Nota Máxima
                    </label>
                    <input
                        type="number"
                        value={notaMaxima}
                        onChange={e => setNotaMaxima(Number(e.target.value))}
                                                className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"

                        required
                    />
                </div>

                <div className="mb-6">
                    <table className="w-full border rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 text-left">Categoria</th>
                                <th className="p-2 text-center">Selecionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(cat => (
                                <tr key={cat.idCategoria} className="border-t">
                                    <td className="p-2">{cat.nomeCategoria}</td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={categoriasSelecionadas.includes(cat.idCategoria)}
                                            onChange={() => toggleCategoria(cat.idCategoria)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-secondary text-secondary-on font-medium rounded-lg hover:bg-secondary-dark transition"
                    >
                        Criar
                    </button>
                </div>
            </form>
        </div>
    );
}
