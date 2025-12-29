import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Candidato } from "../types/Candidato";
import { UsuarioAvaliador } from "../types/Usuario";
import { ProvaAccordionDTO } from "../types/Avaliacao";
import { Categoria } from "../types/Categoria";
import {
  listarCandidatos,
  listarUsuriosAvaliadores,
  buscarEstruturaAvaliacao,
  listarCategorias,
  criarAvaliacaoCompleta
} from "../services/api";
import { toast } from "react-toastify";
import AvaliacaoAccordion from "../components/Avaliacao/AvaliacaoAccordion";

export default function AvaliacaoPage() {
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

  // Carregar candidatos
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

  // Carregar categorias
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

  // Carregar avaliadores
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

  // Buscar estrutura da avaliação
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

  const avaliadoresFiltrados = avaliadores;

  const handleSalvarAvaliacao = async () => {
    try {
      if (!avaliadorSelecionado || !candidatoSelecionado) {
        toast.error("Selecione candidato e avaliador");
        return;
      }

      const avaliador = avaliadores.find(a => a.idUsuario === avaliadorSelecionado);
      if (!avaliador) {
        toast.error("Avaliador inválido");
        return;
      }

      const comissaoId = avaliador.ComissaoUsuario?.comissaoId ?? 0;
      const blocoProvaId = blocoSelecionado ?? provasSelecionadas[0]?.blocosProvas[0]?.idBloco ?? 0;

      const payload = {
        comissaoId,
        avaliadorId: avaliadorSelecionado,
        candidatoId: candidatoSelecionado,
        blocoProvaId,
        quesitos: provasSelecionadas.flatMap((prova) =>
          prova.blocosProvas.flatMap((bloco) =>
            bloco.quesitos.map((quesito) => ({
              quesitoId: quesito.idQuesito,
              comentario: comentarios[quesito.idQuesito] ?? "",
              subQuesitos: quesito.subQuesitos.map((sub) => ({
                subQuesitoId: sub.idSubequestios,
                notaSubQuesito: notas[sub.idSubequestios] ?? 0,
              })),
            }))
          )
        ),
      };

      await criarAvaliacaoCompleta(payload);
      toast.success("Avaliação salva com sucesso!");

      // ✅ Limpar os campos após salvar
      setNotas({});
      setComentarios({});
      setCandidatoSelecionado(null);
      setAvaliadorSelecionado(null);
      setCategoriaSelecionada(null);
      setBlocoSelecionado(null);
      setProvasSelecionadas([]);
    } catch (error: unknown) {
      let msg = "Erro ao salvar avaliação.";
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
        msg = axiosError.response?.data?.message ?? msg;
        if (axiosError.response?.status === 409) {
          msg = "Já existe uma avaliação para este candidato e avaliador.";
        }
      }

      toast.error(msg);
      setNotas({});
      setComentarios({});
      setProvasSelecionadas([]);

    }
  };

  return (
    <div className="flex min-h-screen w-full bg-neutral-background">
      <SideNavBar />

      <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
        <div className="w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-6">
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

                  // Atualiza automaticamente a categoria ao escolher o candidato
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
                {avaliadoresFiltrados.map((a) => (
                  <option key={a.idUsuario} value={a.idUsuario}>
                    {a.nomeCompleto}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>


        <div className="w-full bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg min-h-[500px]">
          {!candidatoSelecionado || !avaliadorSelecionado ? (
            <div className="text-center text-gray-200 py-20">
              <p className="text-lg font-semibold">
                Selecione um candidato, categoria e avaliador
              </p>
            </div>
          ) : (
            <AvaliacaoAccordion
              provas={provasSelecionadas}
              notas={notas}
              onChangeNota={(id, nota) =>
                setNotas((prev) => ({ ...prev, [id]: nota }))
              }
              onSalvar={handleSalvarAvaliacao}
            />
          )}
        </div>
      </div>
    </div>
  );
}