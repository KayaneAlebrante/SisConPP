import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import Modal from "../components/Modal/Modal";
import ProvaTeoricaForm from "../components/Forms/ProvasForms/provaTeoricaForm";
import QuesitoForm from "../components/Forms/ProvasForms/quesitosForm";
import SubQuesitosForm from "../components/Forms/ProvasForms/subQuesitosForm";
import { listarCategorias, buscarProvasTeoricas, buscarProvasTeoricasPorCategoria } from "../services/api";
import { Categoria } from "../types/Categoria";
import { ProvaTeorica, Quesitos, SubQuesitos } from "../types/ProvaTeorica";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import ProvaAccordionTeorica from "../components/Provas/ProvaAccordionTeorica";

type ModalType = "PROVA" | "QUESITO" | "SUB" | null;

interface ProvaAccordionState extends ProvaTeorica {
    isOpen?: boolean;
}

export default function ProvaTeoricaCriacao() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [provas, setProvas] = useState<ProvaAccordionState[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuesito, setSelectedQuesito] = useState<Quesitos>();
    const [selectedSub, setSelectedSub] = useState<SubQuesitos>();
    const [parentProvaId, setParentProvaId] = useState<number>();
    const [parentQuesitoId, setParentQuesitoId] = useState<number>();
    const [refresh, setRefresh] = useState(false);
    const [provasAbertas, setProvasAbertas] = useState<Set<number>>(new Set());;
    const [quesitosAbertos, setQuesitosAbertos] = useState<Set<number>>(new Set());

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

    useEffect(() => {
        const fetchProvas = async () => {
            setLoading(true);
            try {
                const response = categoriaSelecionada
                    ? await buscarProvasTeoricasPorCategoria(categoriaSelecionada)
                    : await buscarProvasTeoricas();

                const provasComEstado = (response as ProvaTeorica[]).map((p) => ({
                    ...p,
                    isOpen: p.idprovaTeorica ? provasAbertas.has(p.idprovaTeorica) : false,
                }));

                setProvas(provasComEstado);
            } catch {
                toast.error("Erro ao carregar provas teóricas");
            } finally {
                setLoading(false);
            }
        };
        fetchProvas();
    }, [categoriaSelecionada, refresh, provasAbertas]);

    const toggleProva = (provaId: number) => {
        setProvasAbertas(prev => {
            const novo = new Set(prev);
            if (novo.has(provaId)) {
                novo.delete(provaId);
            } else {
                novo.add(provaId);
            }
            return novo;
        });
    };

    const toggleQuesito = (quesitoId: number) => {
        setQuesitosAbertos(prev => {
            const novo = new Set(prev);
            if (novo.has(quesitoId)) {
                novo.delete(quesitoId);
            } else {
                novo.add(quesitoId);
            }
            return novo;
        });
    };

    const closeModalAndRefresh = () => {
        setIsModalOpen(false);
        setRefresh((prev) => !prev);
    };

    const openProvaModal = () => {
        setModalType("PROVA");
        setIsModalOpen(true);
    };

    const openQuesitoModal = (quesito?: Quesitos, provaId?: number) => {
        setSelectedQuesito(quesito);
        setParentProvaId(provaId);
        setModalType("QUESITO");
        setIsModalOpen(true);
    };

    const openSubModal = (sub?: SubQuesitos, quesitoId?: number) => {
        setSelectedSub(sub);
        setParentQuesitoId(quesitoId);
        setModalType("SUB");
        setIsModalOpen(true);
    };

    return (
        <div className="flex min-h-screen w-full bg-neutral-background">
            <SideNavBar />

            <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
                <div className="w-full max-w-6xl bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label className="font-semibold text-white mb-2 block">Categoria</label>
                            <select
                                className="w-full p-3 rounded-lg"
                                value={categoriaSelecionada ?? ""}
                                onChange={(e) => {
                                    const valor = e.target.value ? Number(e.target.value) : null;
                                    setCategoriaSelecionada(valor);
                                }}
                            >
                                <option value="">Selecione</option>
                                {categorias.map((cat) => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nomeCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => openProvaModal()}
                            className="w-full bg-secondary-container text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Adicionar Prova Teórica
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-6xl bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg mb-4 space-y-4 min-h-[500px]">
                    {loading && <p className="text-center text-secondary-onFixed">Carregando provas...</p>}

                    {!loading && provas.length === 0 && (
                        <p className="text-center text-secondary-onFixed">
                            Nenhuma prova teórica encontrada para esta categoria.
                        </p>
                    )}

                    {!loading &&
                        provas.map((prova) => (
                            <ProvaAccordionTeorica
                                key={prova.idprovaTeorica}
                                prova={prova}
                                isOpen={!!prova.idprovaTeorica && provasAbertas.has(prova.idprovaTeorica)}
                                onToggle={toggleProva}
                                quesitosAbertos={quesitosAbertos}
                                onToggleQuesito={toggleQuesito}
                                onAddQuesito={(idQuesito) => openQuesitoModal(undefined, idQuesito)}
                                onAddSub={(idQuesito) => openSubModal(undefined, idQuesito)}
                            />
                        ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === "PROVA" && (
                    <ProvaTeoricaForm
                        onClose={closeModalAndRefresh}
                    />
                )}

                {modalType === "QUESITO" && (
                    <QuesitoForm
                        onClose={closeModalAndRefresh}
                        quesitoToEdit={selectedQuesito}
                        provaTeoricaId={parentProvaId!}
                    />
                )}

                {modalType === "SUB" && (
                    <SubQuesitosForm
                        onClose={closeModalAndRefresh}
                        subQuesitoToEdit={selectedSub}
                        quesitoId={parentQuesitoId}
                    />
                )}
            </Modal>
        </div>
    )
}   