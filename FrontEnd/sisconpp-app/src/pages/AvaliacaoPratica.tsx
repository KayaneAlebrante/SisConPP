import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Candidato, FichaCandidatoProvaPratica } from "../types/Candidato";
import { UsuarioAvaliador } from "../types/Usuario";
import { ProvaAccordionDTO } from "../types/Avaliacao";
import { Categoria } from "../types/Categoria";
import {
  listarCandidatos,
  listarUsuriosAvaliadores,
  buscarEstruturaAvaliacao,
  listarCategorias,
  criarAvaliacaoCompleta,
  buscarFichaCandidatoPorId
} from "../services/api";
import { toast } from "react-toastify";
import AvaliacaoAccordion from "../components/AvaliacaoPratica/AvaliacaoAccordion";

export default function AvaliacaoPage() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "null");
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<number | null>(null);
  const [avaliadorSelecionado, setAvaliadorSelecionado] = useState<number | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [blocoSelecionado, setBlocoSelecionado] = useState<number | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [avaliadores, setAvaliadores] = useState<UsuarioAvaliador[]>([]);
  const [provasSelecionadas, setProvasSelecionadas] = useState<ProvaAccordionDTO[]>([]);
  const [notas, setNotas] = useState<Record<number, number>>({});
  const [comentarios, setComentarios] = useState<Record<number, string>>({});
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [ficha, setFicha] = useState<FichaCandidatoProvaPratica | null>(null);

  useEffect(() => {
    if (usuarioLogado.funcao === "AVALIADOR") {
      setAvaliadorSelecionado(usuarioLogado.id);
    }
  }, [usuarioLogado]);

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
    const fetchAvaliadores = async () => {
      try {
        const response = await listarUsuriosAvaliadores();
        setAvaliadores(response as UsuarioAvaliador[]);
      } catch {
        toast.error("Erro ao carregar avaliadores");
      }
    };
    fetchAvaliadores();
  }, []);

  useEffect(() => {
    const fetchEstrutura = async () => {
      if (!candidatoSelecionado || !avaliadorSelecionado) {
        setProvasSelecionadas([]);
        return;
      }

      try {
        const response = await buscarEstruturaAvaliacao(
          avaliadorSelecionado,
          candidatoSelecionado
        );
        setProvasSelecionadas(response as ProvaAccordionDTO[]);
      } catch {
        toast.error("Erro ao carregar estrutura da avaliação");
      }
    };

    fetchEstrutura();
  }, [candidatoSelecionado, avaliadorSelecionado]);

  useEffect(() => {
    const fetchFicha = async () => {
      if (!candidatoSelecionado) {
        setFicha(null);
        return;
      }
      try {
        const response = await buscarFichaCandidatoPorId(Number(candidatoSelecionado));
        setFicha(response as FichaCandidatoProvaPratica);
      } catch {
        toast.error("Erro ao carregar ficha do candidato");
      }
    };
    fetchFicha();
  }, [candidatoSelecionado]);

  const handleSalvarAvaliacao = async () => {
    try {
      if (!avaliadorSelecionado || !candidatoSelecionado) {
        toast.error("Selecione candidato e avaliador");
        return;
      }

      const avaliadorId = usuarioLogado?.funcao === "AVALIADOR"
        ? usuarioLogado.id
        : avaliadorSelecionado;

      if (!avaliadorId) {
        toast.error("Avaliador inválido");
        return;
      }

      const avaliador = avaliadores.find(a => a.idUsuario === avaliadorId);
      const comissaoId = avaliador?.ComissaoUsuario?.comissaoId ?? 0;
      const provaPraticaId = provasSelecionadas[0]?.idProvaPratica ?? 0;

      for (const bloco of provasSelecionadas[0]?.blocosProvas ?? []) {
        const payload = {
          comissaoId,
          avaliadorId: avaliadorId,
          candidatoId: candidatoSelecionado,
          blocoProvaId: bloco.idBloco,
          provaPraticaId,
          quesitos: bloco.quesitos.map((quesito) => ({
            quesitoId: quesito.idQuesito,
            comentario: comentarios[quesito.idQuesito] ?? "",
            subQuesitos: quesito.subQuesitos.map((sub) => ({
              subQuesitoId: sub.idSubequestios,
              notaSubQuesito: Number(notas[sub.idSubequestios] ?? 0),
            })),
          })),
          ficha: {
            idFicha: ficha?.idFicha,
            concursoId: ficha?.concursoId,
            notaFinalProvaPratica: ficha?.notaFinalProvaPratica,
          },
        };

        await criarAvaliacaoCompleta(payload);
      }

      toast.success("Avaliações por bloco salvas com sucesso!");

      setNotas({});
      setComentarios({});
      setBlocoSelecionado(null);
      setCandidatoSelecionado(null);
      setAvaliadorSelecionado(null);
      setProvasSelecionadas([]);
      setFicha(null);

    } catch (error) {
      toast.error("Erro ao salvar avaliações");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-neutral-background">
      <SideNavBar />

      <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
        {/* Filtros */}
        <div className="w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
          <div className={`grid gap-6 ${usuarioLogado?.funcao === "AVALIADOR" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>

            {/* Categoria */}
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

            {/* Candidato */}
            <div>
              <label className="font-semibold text-white mb-2 block">Candidato</label>
              <select
                className="w-full p-3 rounded-lg"
                value={candidatoSelecionado ?? ""}
                onChange={(e) => {
                  const id = e.target.value ? Number(e.target.value) : null;
                  setCandidatoSelecionado(id);

                  if (id) {
                    const candidato = candidatos.find(c => c.idCandidato === id);
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

            {/* Avaliador só aparece se não for avaliador logado */}
            {usuarioLogado?.funcao !== "AVALIADOR" && (
              <div>
                <label className="font-semibold text-white mb-2 block">Avaliador</label>
                <select
                  className="w-full p-3 rounded-lg"
                  value={avaliadorSelecionado ?? ""}
                  onChange={(e) =>
                    setAvaliadorSelecionado(e.target.value ? Number(e.target.value) : null)
                  }
                >
                  <option value="">Selecione</option>
                  {avaliadores.map((a) => (
                    <option key={a.idUsuario} value={a.idUsuario}>
                      {a.nomeCompleto}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Área da planilha */}
        <div className="w-full bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg min-h-[500px]">
          {!candidatoSelecionado ||
            (!avaliadorSelecionado && usuarioLogado?.funcao !== "AVALIADOR") ? (
            <div className="text-center text-gray-200 py-20">
              <p className="text-lg font-semibold">
                Selecione um candidato, categoria {usuarioLogado?.funcao !== "AVALIADOR" && "e avaliador"}
              </p>
            </div>
          ) : (
            <AvaliacaoAccordion
              provas={provasSelecionadas}
              notas={notas}
              comentarios={comentarios}
              onChangeNota={(id, nota) =>
                setNotas((prev) => ({ ...prev, [id]: nota }))
              }
              onChangeComentario={(id, comentario) =>
                setComentarios((prev) => ({ ...prev, [id]: comentario }))
              }
              onSalvar={handleSalvarAvaliacao}
              categoriaSelecionada={categoriaSelecionada}
            />
          )}
        </div>
      </div>
    </div>
  );
}