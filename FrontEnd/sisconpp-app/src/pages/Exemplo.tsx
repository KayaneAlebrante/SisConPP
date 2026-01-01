import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import Modal from "../components/Modal/Modal";
import ProvaPraticaForm from "../components/Forms/ProvasForms/provaPraticaForm";
import { buscarPorCategoria, listarCategorias } from "../services/api";
import { Categoria } from "../types/Categoria";
import { ProvaPratica, BlocoProva, Quesitos, SubQuesitos } from "../types/ProvaPratica";
import { ChevronDown, ChevronRight, Plus, ListChecks } from "lucide-react";
import { toast } from "react-toastify";
import SubQuesitosForm from "../components/Forms/ProvasForms/subQuesitosForm";
import QuesitoForm from "../components/Forms/ProvasForms/quesitosForm";
import BlocoProvaForm from "../components/Forms/ProvasForms/blocoProvaForm";

interface ProvaAccordion extends ProvaPratica {
    isOpen?: boolean;
}

type ModalType = 'PROVAPRATICA' | 'BLOCO' | 'QUESITO' | 'SUB_QUESITO' | null;

export default function ProvaPraticaCriacao() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [provas, setProvas] = useState<ProvaAccordion[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedBloco, setSelectedBloco] = useState<BlocoProva | undefined>(undefined);
    const [selectedQuesito, setSelectedQuesito] = useState<Quesitos | undefined>(undefined);
    const [selectedSub, setSelectedSub] = useState<SubQuesitos | undefined>(undefined);
    const [parentBlocoId, setParentBlocoId] = useState<number | undefined>(undefined);
    const [parentQuesitoId, setParentQuesitoId] = useState<number | undefined>(undefined);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    /** 🔹 Buscar categorias */
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await listarCategorias();
                setCategorias(response as Categoria[]);
            } catch {
                toast.error("Erro ao carregar categorias");
            }
        };
        fetchCategorias();
    }, []);

    /** 🔹 Buscar provas por categoria */
    useEffect(() => {
        if (!categoriaSelecionada) {
            setProvas([]);
            return;
        }

        const fetchProvas = async () => {
            setLoading(true);
            try {
                const response = await buscarPorCategoria(categoriaSelecionada);
                const provasComEstado = (response as ProvaPratica[]).map(p => ({
                    ...p,
                    isOpen: false
                }));
                setProvas(provasComEstado);
            } catch {
                toast.error("Erro ao carregar provas práticas");
            } finally {
                setLoading(false);
            }
        };

        fetchProvas();
    }, [categoriaSelecionada, refreshTrigger]);

    /** 🔹 Abrir modais */
    const openBlocoModal = (bloco?: BlocoProva) => {
        setModalType('BLOCO');
        setSelectedBloco(bloco);
        setIsModalOpen(true);
    };

    const openQuesitoModal = (quesito?: Quesitos, blocoId?: number) => {
        setModalType('QUESITO');
        setSelectedQuesito(quesito);
        setParentBlocoId(blocoId);
        setIsModalOpen(true);
    };

    const openSubModal = (sub?: SubQuesitos, quesitoId?: number) => {
        setModalType('SUB_QUESITO');
        setSelectedSub(sub);
        setParentQuesitoId(quesitoId);
        setIsModalOpen(true);
    };

    const handleRefresh = () => {
        setIsModalOpen(false);
        setRefreshTrigger(prev => !prev);
    };

    /** 🔹 Toggle da prova */
    const toggleProva = (id: number) => {
        setProvas(prev =>
            prev.map(p =>
                p.idProvaPratica === id ? { ...p, isOpen: !p.isOpen } : p
            )
        );
    };

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
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nomeCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold text-white mb-2 ml-1">
                                Adicionar Prova Prática
                            </label>

                            <button
                                onClick={() => { setModalType('PROVAPRATICA'); setIsModalOpen(true); }}
                                className="w-full bg-secondary-container text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-dark transition flex items-center justify-center gap-2 shadow-md"
                            >
                                <Plus size={20} />
                                Adicionar Prova Prática
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🔹 Lista de Provas */}
                <div className="w-full max-w-6xl bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg mb-4 space-y-4 min-h-[500px]">

                    {loading && (
                        <p className="text-center text-gray-500">Carregando provas...</p>
                    )}

                    {!loading && provas.length === 0 && categoriaSelecionada && (
                        <div className="text-center py-10 text-gray-500">
                            Nenhuma prova prática cadastrada para esta categoria.
                        </div>
                    )}

                    {provas.map((prova) => (
                        <div
                            key={prova.idProvaPratica}
                            className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-sm
            ${prova.isOpen ? 'border-primary ring-1 ring-primary/30' : 'border-neutral-outline'}`}
                        >
                            {/* 🔹 HEADER DA PROVA */}
                            <div
                                onClick={() => toggleProva(prova.idProvaPratica)}
                                className={`flex items-center justify-between p-4 cursor-pointer transition-colors
                ${prova.isOpen ? 'bg-surface-containerHigh' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div
                                        className={`p-2 rounded-lg transition-colors
                        ${prova.isOpen ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                                    >
                                        {prova.isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-onBackground">
                                            {prova.nomeProva}
                                        </h3>
                                        <span className="text-sm text-gray-500 font-medium">
                                            Nota Máx: {prova.notaMaxima}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 🔹 CONTEÚDO DA PROVA */}
                            {prova.isOpen && (
                                <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 space-y-4 animate-fadeIn">

                                    {prova.blocosProvas.length === 0 && (
                                        <p className="text-sm text-gray-400 italic">
                                            Nenhum bloco cadastrado nesta prova.
                                        </p>
                                    )}

                                    {prova.blocosProvas.map((bloco) => (
                                        <div
                                            key={bloco.idBloco}
                                            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                                        >
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-100 pb-3 mb-3">
                                                <h4 className="font-bold text-gray-800 text-md">
                                                    {bloco.nomeBloco}
                                                </h4>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    Nota Máx: {bloco.notaMaximaBloco}
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                {bloco.quesitos?.map((quesito) => (
                                                    <div
                                                        key={quesito.idQuesito}
                                                        className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="bg-secondary/10 p-1.5 rounded text-secondary">
                                                                <ListChecks size={16} />
                                                            </div>
                                                            <strong className="text-gray-800">
                                                                {quesito.nomeQuesito}
                                                            </strong>
                                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border">
                                                                Max: {quesito.notaMaximaQuesito}
                                                            </span>
                                                        </div>

                                                        <div className="ml-6 space-y-2">
                                                            {quesito.subQuesitos?.map((sub) => (
                                                                <div
                                                                    key={sub.idSubequestios}
                                                                    className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                                                                >
                                                                    <span className="text-sm text-gray-700">
                                                                        {sub.nomeSubquesito}
                                                                    </span>
                                                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 rounded">
                                                                        {sub.notaSubequesito} pts
                                                                    </span>
                                                                </div>
                                                            ))}

                                                            <button
                                                                onClick={() => openSubModal(undefined, quesito.idQuesito)}
                                                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 font-bold"
                                                            >
                                                                <Plus size={18} />
                                                                Adicionar SubQuesito
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => openQuesitoModal(undefined, bloco.idBloco)}
                                                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 font-bold"
                                                >
                                                    <Plus size={18} />
                                                    Adicionar Quesito
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => openBlocoModal(undefined)}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all flex justify-center items-center gap-2 font-bold"
                                    >
                                        <Plus size={18} />
                                        Adicionar Bloco Prova
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === 'PROVAPRATICA' && (
                    <ProvaPraticaForm onClose={handleRefresh} />
                )}

                {modalType === 'BLOCO' && (
                    <BlocoProvaForm
                        onClose={handleRefresh}
                        blocoToEdit={selectedBloco}
                    />
                )}

                {modalType === 'QUESITO' && (
                    <QuesitoForm
                        onClose={handleRefresh}
                        quesitoToEdit={selectedQuesito}
                        blocoId={parentBlocoId}
                    />
                )}

                {modalType === 'SUB_QUESITO' && (
                    <SubQuesitosForm
                        onClose={handleRefresh}
                        subQuesitoToEdit={selectedSub}
                        quesitoId={parentQuesitoId}
                    />
                )}
            </Modal>
        </div>
    );
}
