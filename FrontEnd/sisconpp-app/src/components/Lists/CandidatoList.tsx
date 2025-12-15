import { useEffect, useState } from "react";
import { Candidato } from "../../types/Candidato";
import { CTG } from "../../types/CTG";
import { Categoria } from "../../types/Categoria";
import { toast } from "react-toastify";
import { Pencil, Trash2, Search } from "lucide-react";
import Dialog from "../Modal/Dialog";
import { listarCTGs, listarCategorias, listarCandidatos, deletarCandidato, buscarCandidatoPorId } from "../../services/api";
import Modal from "../Modal/Modal";
import CandidatoView from "../View/CandidadoView";

interface CandidatoListProps {
    onEdit: (candidato: Candidato) => void;
    onVisualizar: (candidato: Candidato) => void;
    onCredenciar: (candidato: Candidato) => void;
}

interface CandidatoCompleto extends Candidato {
    ctg?: CTG;
    categoria?: Categoria;
}

export default function CandidatoList({ onEdit }: CandidatoListProps) {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [ctgs, setCTGs] = useState<CTG[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [candidatoSelecionadoId, setCandidatoSelecionadoId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCandidato, setSelectedCandidato] = useState<CandidatoCompleto | null>(null);


    const fetchCandidatos = async () => {
        try {
            const response = await listarCandidatos() as Candidato[];
            const candidatosFormatados = response.map((candidato) => ({
                ...candidato,
                nomeCompleto: candidato.nomeCompleto || '',
                cidade: candidato.cidade || '',
                estado: candidato.estado || '',
                CTGId: candidato.CTGId || 0,
                numCarteirinha: candidato.numCarteirinha || '',
                CPF: candidato.CPF || '',
                RG: candidato.RG || '',
                endereco: candidato.endereco || '',
                numEndereco: candidato.numEndereco || 0,
                bairro: candidato.bairro || '',
                escolaridade: candidato.escolaridade || '',
                filiacaoPai: candidato.filiacaoPai || '',
                filiacaoMae: candidato.filiacaoMae || '',
                categoriaId: candidato.categoriaId || 0
            }));
            setCandidatos(candidatosFormatados);
        } catch (error) {
            toast.error("Erros ao carregar candidatos");
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

    const fetchCategorias = async () => {
        try {
            const response = await listarCategorias();
            setCategorias(response as Categoria[]);
        } catch (error) {
            console.error("Erro ao buscar Categorias:", error);
        }
    };

    useEffect(() => {
        fetchCandidatos();
        fetchCTGs();
        fetchCategorias();
    }, []);

    const handleVisualizarCandidato = async (id: number) => {
        try {
            const candidatoCompleto = await buscarCandidatoPorId(id);
            setSelectedCandidato(candidatoCompleto as CandidatoCompleto);
            console.log("Candidato selecionado para visualização:", candidatoCompleto); 
        } catch (error) {
            console.error("Erro ao buscar detalhes do candidato:", error);
            toast.error("Erro ao buscar detalhes do candidato.");
        }
    };

    const handleConfirmDelete = async (id: number) => {
        try {
            const response = await deletarCandidato(id);
            if (response !== null && response !== undefined) {
                await fetchCandidatos();
                toast.success("Candidato excluído com sucesso!");
                setIsDialogOpen(false);
                setCandidatoSelecionadoId(null);
            } else {
                throw new Error("Falha ao excluir candidato");
            }
        } catch (error) {
            console.error("Erro ao excluir candidato:", error);
            toast.error("Erro ao excluir candidato. Tente novamente.");
        }
    };

    const getCTGNameById = (idCTG: number | undefined) => {
        if (!idCTG) return "CTG não informado";
        const ctg = ctgs.find((ctg) => ctg.idCTG === idCTG);
        return ctg?.nomeCTG || "CTG não encontrado";
    };

    const getCategoriaNameById = (idCategoria: number | undefined) => {
        if (!idCategoria) return "Categoria não informada";
        const categoria = categorias.find((categoria) => categoria.idCategoria === idCategoria);
        return categoria?.nomeCategoria || "Categoria não encontrada";
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Candidatos</h2>
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome Completo</th>
                        <th className="p-3">CTG</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3 last:rounded-tr-xl">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatos.map((candidato) => (
                        <tr key={candidato.idCandidato}>
                            <td className="p-3">{candidato.nomeCompleto || "---"}</td>
                            <td className="p-3">{getCTGNameById(candidato.CTGId)}</td>
                            <td className="p-3">{getCategoriaNameById(candidato.categoriaId)}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={() => {
                                        handleVisualizarCandidato(candidato.idCandidato);
                                        setIsViewModalOpen(true);
                                    }}
                                >
                                    <Search size={18} />
                                </button>
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => onEdit(candidato)}
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => {
                                        setCandidatoSelecionadoId(candidato.idCandidato);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setCandidatoSelecionadoId(null);
                }}
                onConfirm={() => {
                    if (candidatoSelecionadoId !== null) {
                        handleConfirmDelete(candidatoSelecionadoId);
                    }
                }}
                message="Tem certeza que deseja excluir este candidato?"
            />

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            >
                {selectedCandidato && (
                    <CandidatoView 
                        candidato={selectedCandidato}                  
                        onVoltar={() => setIsViewModalOpen(false)}
                    />
                )}
            </Modal>
        </div>
    );
}
