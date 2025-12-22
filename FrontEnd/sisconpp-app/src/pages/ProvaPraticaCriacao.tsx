import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { listarCategorias } from "../services/api";
import { Categoria } from "../types/Categoria";
import { Plus } from "lucide-react";
import Modal from "../components/Modal/Modal";
import ProvaPraticaForm from "../components/Forms/AvaliaçãoForms/provaPraticaForm";

export default function ProvaPraticaCriacao() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await listarCategorias();
            setCategorias(response as Categoria[]);
        };

        fetchCategorias();
    }, []);

    return (
        <div className="flex flex-row min-h-screen w-full bg-neutral-background">
            <SideNavBar />

            <div className="flex-1 p-6 bg-neutral-background flex flex-col items-center overflow-y-auto">
                <div className="w-full max-w-6xl bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="flex flex-col">
                            <label className="font-semibold text-white mb-2 ml-1">
                                Categoria
                            </label>

                            <select
                                className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-primary text-gray-700 shadow-sm"
                                value={categoriaSelecionada ?? ""}
                                onChange={(e) =>
                                    setCategoriaSelecionada(
                                        e.target.value ? Number(e.target.value) : null
                                    )
                                }
                            >
                                <option value="">Selecione</option>
                                {categorias.map(cat => (
                                    <option
                                        key={cat.idCategoria}
                                        value={cat.idCategoria}
                                    >
                                        {cat.nomeCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-white mb-2 ml-1">
                                Adicionar Prova Prática
                            </label>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-secondary-container text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-dark transition duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md"
                            >
                                <Plus size={20} />
                                Adicionar Prova Prática
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ProvaPraticaForm
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}