import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Candidato, FichaCandidato } from "../types/Candidato";
import { Categoria } from "../types/Categoria";
import { ProvaTeoricaAccordionDTO } from "../types/Avaliacao";
import {
    listarCandidatos,
    listarCategorias,
    buscarEstruturaTeorica,
    criarAvaliacaoTeorica,
    buscarFichaCandidatoPorId,
} from "../services/api";
import { toast } from "react-toastify";
import AvaliacaoAccordion from "../components/AvalicaoTeorica/AvaliacaoTeorica";

export default function AvaliacaoTeoricaPage() {
    const [candidatoSelecionado, setCandidatoSelecionado] = useState<number | null>(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [provasSelecionadas, setProvasSelecionadas] = useState<ProvaTeoricaAccordionDTO[]>([]);
    const [notas, setNotas] = useState<Record<number, number>>({});
    const [comentarios, setComentarios] = useState<Record<number, string>>({});
    const [ficha, setFicha] = useState<FichaCandidato | null>(null);

    const usuarioLogado = (() => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
            return usuario?.id ?? null;
        } catch {
            return null;
        }
    })();

    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await listarCandidatos();
                setCandidatos(response as Candidato[]);
            } catch {
                toast.error("Erro ao carregar candidatos");
            }
        };
        fetchCandidatos();
    }, []);

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
        const fetchEstrutura = async () => {
            if (!candidatoSelecionado) {
                setProvasSelecionadas([]);
                return;
            }

            try {
                const response = await buscarEstruturaTeorica(Number(candidatoSelecionado));
                setProvasSelecionadas(response as ProvaTeoricaAccordionDTO[]);
            } catch {
                toast.error("Erro ao carregar estrutura da prova teórica");
            }
        };

        fetchEstrutura();
    }, [candidatoSelecionado]);


    useEffect(() => {
        const fetchFicha = async () => {
            if (!candidatoSelecionado) {
                setFicha(null);
                return;
            }
            try {
                const response = await buscarFichaCandidatoPorId(Number(candidatoSelecionado));
                setFicha(response as FichaCandidato);
            } catch {
                toast.error("Erro ao carregar ficha do candidato");
            }
        };
        fetchFicha();
    }, [candidatoSelecionado]);

    const resetPagina = () => {
        setCandidatoSelecionado(null);
        setCategoriaSelecionada(null);
        setProvasSelecionadas([]);
        setNotas({});
        setComentarios({});
        setFicha(null);
    };


    const handleSalvarAvaliacao = async () => {
        try {
            if (!candidatoSelecionado || !ficha) {
                toast.error("Candidato ou ficha não carregados");
                return;
            }
            console.log("FICHA NO SALVAR:", ficha);


            for (const prova of provasSelecionadas) {
                const payload = {
                    candidatoId: Number(candidatoSelecionado),
                    avaliadorId: usuarioLogado,
                    provaTeoricaId: prova.idprovaTeorica,
                    quesitos: prova.quesitos.map((quesito) => ({
                        quesitoId: quesito.idQuesito,
                        notaQuesito: notas[quesito.idQuesito] ?? 0,
                        comentario: comentarios[quesito.idQuesito] ?? undefined,
                        subQuesitos: quesito.subQuesitos?.map((sub) => ({
                            subQuesitoId: sub.idSubequestios,
                            notaSubQuesito: notas[sub.idSubequestios] ?? 0,
                        })),
                    })),
                    ficha: {
                        idFicha: ficha.idFicha,
                        concursoId: ficha.concursoId,
                        notaFinalProvaTeorica: ficha.notaFinalProvaTeorica ?? 0,
                        anexoGabarito: ficha.anexoGabarito ?? "",
                        anexoRedacao: ficha.anexoRedacao ?? "",
                    },
                };

                console.log(payload);
                await criarAvaliacaoTeorica(payload);
                resetPagina();
            }

            toast.success("Avaliação teórica salva com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar avaliação teórica");
        }
    };


    return (
        <div className="flex min-h-screen w-full bg-neutral-background">
            <SideNavBar />

            <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
                <div className="w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-semibold text-white mb-2 block">Categoria</label>
                            <select
                                className="w-full p-3 rounded-lg"
                                value={categoriaSelecionada ?? ""}
                                onChange={(e) =>
                                    setCategoriaSelecionada(e.target.value ? Number(e.target.value) : null)
                                }
                            >
                                <option value="">Selecione</option>
                                {categorias.map((cat) => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nomeCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold text-white mb-2 block">Candidato</label>
                            <select
                                className="w-full p-3 rounded-lg"
                                value={candidatoSelecionado ?? ""}
                                onChange={(e) => {
                                    const id = e.target.value ? Number(e.target.value) : null;
                                    setCandidatoSelecionado(id);
                                    if (id) {
                                        const candidato = candidatos.find((c) => c.idCandidato === id);
                                        if (candidato) {
                                            setCategoriaSelecionada(candidato.categoriaId ?? null);
                                        }
                                    } else {
                                        setCategoriaSelecionada(null);
                                    }
                                }}
                            >
                                <option value="">Selecione</option>
                                {candidatos
                                    .filter((c) =>
                                        categoriaSelecionada ? c.categoriaId === categoriaSelecionada : true
                                    )
                                    .map((c) => (
                                        <option key={c.idCandidato} value={c.idCandidato}>
                                            {c.nomeCompleto}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg min-h-[500px]">
                    {!candidatoSelecionado ? (
                        <div className="text-center text-gray-200 py-20">
                            <p className="text-lg font-semibold">Selecione um candidato e categoria</p>
                        </div>
                    ) : (
                        <AvaliacaoAccordion
                            provas={provasSelecionadas}
                            notas={notas}
                            comentarios={comentarios}
                            onChangeNota={(id, nota) => setNotas((prev) => ({ ...prev, [id]: nota }))}
                            onChangeComentario={(id, comentario) =>
                                setComentarios((prev) => ({ ...prev, [id]: comentario }))
                            }
                            onSalvar={handleSalvarAvaliacao}
                            onChangeAnexoGabarito={(file) => {
                                if (file) {
                                    setFicha((prev) => prev ? { ...prev, anexoGabarito: file.name } : prev);
                                }
                            }}
                            onChangeAnexoRedacao={(file) => {
                                if (file) {
                                    setFicha((prev) => prev ? { ...prev, anexoRedacao: file.name } : prev);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div >
    );
}