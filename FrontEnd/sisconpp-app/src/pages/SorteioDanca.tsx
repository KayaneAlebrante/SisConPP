import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { listarCandidatos, listarCategorias, getDancasTradicionais, getDancasSalao, criarPreferencia, } from "../services/api";
import { DancaSalaoTradicional, Quesito } from "../types/SorteioDanca";
import { Candidato } from "../types/Candidato";
import { Categoria } from "../types/Categoria";
import DancaForm from "../components/Forms/DancaForm";
import DancaList from "../components/Lists/DancaList";
import Modal from "../components/Modal/Modal";
import { toast } from "react-toastify";
import RoletaSorteio from "../components/Roleta/RoletaSorteio";

export default function SorteioDancas() {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [dancas, setDancas] = useState<Quesito[]>([]);
    const [tipoDanca, setTipoDanca] = useState<DancaSalaoTradicional | null>(null);
    const [selecionados, setSelecionados] = useState<number[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState<number | null>(null);
    const [preferenciasSalvas, setPreferenciasSalvas] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [resultadoFinal, setResultadoFinal] = useState<Quesito | null>(null); 

    const candidatosFiltrados = categoriaSelecionada
        ? candidatos.filter((c) => c.categoriaId === categoriaSelecionada)
        : candidatos;

    const categoriaAtual = categorias.find((c) => c.idCategoria === categoriaSelecionada);
    const maxSelecionados = categoriaAtual?.sorteioDanca ?? null;

    useEffect(() => {
        listarCandidatos().then((res) => setCandidatos(res as Candidato[]));
        listarCategorias().then((res) => setCategorias(res as Categoria[]));
    }, []);

    const buscarDancas = async (tipo: DancaSalaoTradicional) => {
        setTipoDanca(tipo);
        const dancasTradicionais =
            tipo === DancaSalaoTradicional.DANCA_TRADICIONAL
                ? await getDancasTradicionais()
                : await getDancasSalao();
        setDancas(dancasTradicionais);
    };

    const toggleSelecionado = (id: number) => {
        setSelecionados((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const salvarPreferencias = async () => {
        if (!candidatoSelecionado || !tipoDanca) {
            toast.error("Selecione candidato e tipo de dança antes de salvar.");
            return;
        }

        const preferencias = {
            nomeSorteioDanca: tipoDanca,
            candidatoId: candidatoSelecionado,
            quesitos: selecionados,
        };

        try {
            await criarPreferencia(preferencias);
            toast.success("Preferências salvas com sucesso!");
            setPreferenciasSalvas(true);
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar preferências.");
        }
    };

    return (
        <div className="flex flex-row min-h-screen w-full bg-neutral-background">
            <SideNavBar />
            <div className="flex-1 p-6 bg-neutral-background flex flex-col items-center overflow-y-auto">
                <div className="w-full max-w-6xl bg-secondary-light p-8 rounded-2xl shadow-lg mb-4">
                    <DancaForm
                        categorias={categorias}
                        candidatos={candidatosFiltrados}
                        categoriaSelecionada={categoriaSelecionada}
                        setCategoriaSelecionada={setCategoriaSelecionada}
                        candidatoSelecionado={candidatoSelecionado}
                        setCandidatoSelecionado={setCandidatoSelecionado}
                        tipoDanca={tipoDanca}
                        buscarDancas={buscarDancas}
                    />
                </div>

                <div className="w-full flex justify-center my-8">
                    {!preferenciasSalvas ? (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-primary text-white px-10 py-3 rounded-full shadow-md font-semibold hover:bg-primary-dark transition"
                        >
                            Salvar Preferências
                        </button>
                    ) : (
                        candidatoSelecionado &&
                        tipoDanca && (
                            <RoletaSorteio
                                candidatoId={candidatoSelecionado}
                                usuarioId={1} 
                                tipoDanca={tipoDanca}
                                quesitos={dancas.filter((d) => selecionados.includes(d.idQuesito))}
                                onFinish={(resultado) =>{
                                    setResultadoFinal(resultado);
                                }
                                }
                            />
                        )
                    )}
                </div>

                {!preferenciasSalvas && (
                    <div className="w-full max-w-6xl bg-secondary-light p-8 rounded-2xl shadow-lg mb-4">
                        <DancaList
                            dancas={dancas}
                            selecionados={selecionados}
                            toggleSelecionado={toggleSelecionado}
                            maxSelecionados={maxSelecionados}
                        />
                    </div>
                )}
            </div>

            <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold mb-4">Confirme as danças selecionadas</h2>
                    <ul className="list-disc pl-6 text-left">
                        {dancas
                            .filter((d) => selecionados.includes(d.idQuesito))
                            .map((d) => (
                                <li key={d.idQuesito}>{d.nomeQuesito}</li>
                            ))}
                    </ul>

                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={salvarPreferencias}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                        >
                            Confirmar
                        </button>
                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!resultadoFinal} onClose={() => {
                setResultadoFinal(null);
                window.location.reload();
            }}>
                <div className="bg-white p-8 rounded-xl text-center">
                    <h2 className="text-2xl font-bold text-gray-950 mb-4">Resultado do Sorteio</h2>
                    {resultadoFinal && (
                        <p className="text-4xl font-extrabold text-primary">
                            {resultadoFinal.nomeQuesito}
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    );
}