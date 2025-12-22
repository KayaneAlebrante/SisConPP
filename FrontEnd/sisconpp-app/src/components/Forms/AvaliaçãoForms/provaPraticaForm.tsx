import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { listarCategorias, criarProvaPratica } from '../../../services/api';
import { ProvaPratica } from '../../../types/ProvaPratica';
import { Categoria } from '../../../types/Categoria';

interface ProvaPraticaFormData {
    nomeProva: string;
    notaMaxima: number | '';
    categoriasSelecionadas: number[];
}

interface ProvaPraticaFormProps {
    onClose: () => void;
    provaPraticaToEdit?: ProvaPratica;
}

export default function ProvaPraticaForm({
    onClose,
    provaPraticaToEdit
}: ProvaPraticaFormProps) {

    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [formData, setFormData] = useState<ProvaPraticaFormData>({
        nomeProva: '',
        notaMaxima: '',
        categoriasSelecionadas: []
    });

    useEffect(() => {
        listarCategorias()
            .then(res => setListaCategorias(res as Categoria[]))
            .catch(() => toast.error('Erro ao carregar categorias'));
    }, []);

    useEffect(() => {
        if (provaPraticaToEdit) {
            setFormData({
                nomeProva: provaPraticaToEdit.nomeProva,
                notaMaxima: provaPraticaToEdit.notaMaxima,
                categoriasSelecionadas: provaPraticaToEdit.categorias.map(
                    c => c.idCategoria
                )
            });
        }
    }, [provaPraticaToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'notaMaxima' ? Number(value) : value
        }));
    };

    const toggleCategoria = (idCategoria: number) => {
        setFormData(prev => ({
            ...prev,
            categoriasSelecionadas: prev.categoriasSelecionadas.includes(idCategoria)
                ? prev.categoriasSelecionadas.filter(id => id !== idCategoria)
                : [...prev.categoriasSelecionadas, idCategoria]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nomeProva.trim()) {
            toast.warning('Informe o nome da prova');
            return;
        }

        if (!formData.notaMaxima || Number(formData.notaMaxima) <= 0) {
            toast.warning('Informe uma nota máxima válida');
            return;
        }

        if (formData.categoriasSelecionadas.length === 0) {
            toast.warning('Selecione ao menos uma categoria');
            return;
        }

        const payload: Omit<ProvaPratica, 'idProvaPratica' | 'provaId'> = {
            nomeProva: formData.nomeProva,
            notaMaxima: Number(formData.notaMaxima),
            categorias: formData.categoriasSelecionadas
                .map(id => listaCategorias.find(cat => cat.idCategoria === id))
                .filter((cat): cat is Categoria => cat !== undefined),
            blocosProvas: []
        };

        try {
            await criarProvaPratica(payload as ProvaPratica);
            toast.success('Prova Prática criada com sucesso');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar prova prática');
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4">
                {provaPraticaToEdit ? 'Editar' : 'Nova'} Prova Prática
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">
                        Nome da Prova
                    </label>
                    <input
                        type="text"
                        name="nomeProva"
                        value={formData.nomeProva}
                        onChange={handleChange}
                        className="rounded-lg p-2 border"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">
                        Nota Máxima
                    </label>
                    <input
                        type="number"
                        name="notaMaxima"
                        value={formData.notaMaxima}
                        onChange={handleChange}
                        className="rounded-lg p-2 border"
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
                            {listaCategorias.map(categoria => {
                                const checked =
                                    formData.categoriasSelecionadas.includes(
                                        categoria.idCategoria
                                    );

                                return (
                                    <tr key={categoria.idCategoria} className="border-t">
                                        <td className="p-2">
                                            {categoria.nomeCategoria}
                                        </td>
                                        <td className="p-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    toggleCategoria(categoria.idCategoria)
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
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
                        className="px-4 py-2 bg-secondary text-secondary-on font-medium rounded-lg hover:bg-secondary-dark"
                    >
                        Criar
                    </button>
                </div>
            </form>
        </div>
    );
}
