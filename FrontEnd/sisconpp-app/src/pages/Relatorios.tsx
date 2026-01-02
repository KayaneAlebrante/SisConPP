import { useEffect, useState, useRef } from "react";
import RelatorioGeralList from "../components/Lists/RelatorioGeralList";
import RankingCategoriaList from "../components/Lists/RankingCategoriaList";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import ReportHeader from "../components/PDFModelo/timbradoSisConPP";
import RelatorioIndividualDetalhado from "../components/Relatorios/RelatorioIndividual";
import { listarConcurso, listarCategorias, listarCandidatos } from "../services/api";
import { Concurso } from "../types/Concurso";
import { Categoria } from "../types/Categoria";
import { Candidato } from "../types/Candidato";
import { toast } from "react-toastify";
import { FileText, Trophy, Printer } from "lucide-react";

export default function Relatorios() {
  const [concursos, setConcursos] = useState<Concurso[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [concursoGeralId, setConcursoGeralId] = useState<number | null>(null);
  const [concursoRankingId, setConcursoRankingId] = useState<number | null>(null);
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const componentRefGeral = useRef(null);
  const componentRefRanking = useRef(null);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<number | null>(null);
  const [categoriaSelecionada,  setCategoriaSelecionada] = useState<number | null>(null);

  const usuarioLogado = (() => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      return usuario.nome || "Usuário";
    } catch {
      return "Usuário";
    }
  })();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [concursosData, categoriasData] = await Promise.all([
          listarConcurso(),
          listarCategorias()
        ]);
        setConcursos(concursosData as Concurso[]);
        setCategorias(categoriasData as Categoria[]);
      } catch {
        toast.error("Erro ao carregar dados.");
      }
    };
    fetchData();
  }, []);

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

  const getNomeConcurso = (id: number | null) =>
    concursos.find(c => c.idConcurso === id)?.nomeConcurso || "";

  const getNomeCategoria = (id: number | null) =>
    categorias.find(c => c.idCategoria === id)?.nomeCategoria || "";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen w-full bg-neutral-background">
      <div className="print:hidden">
        <SideNavBar />
      </div>

      <div className="flex-1 p-6 bg-neutral-background flex flex-col overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
        <div className="w-full mb-6 print:hidden">
          <h1 className="text-2xl font-bold text-neutral-onBackground flex items-center gap-2">
            <FileText className="text-primary" />
            Relatórios
          </h1>
        </div>

        <div className="w-full flex-1 flex flex-col gap-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full h-full print:block">

            <div className="bg-secondary-light rounded-2xl shadow-lg p-6 flex flex-col h-full min-h-[600px] print:bg-white print:p-0 print:shadow-none print:min-h-0 print:mb-10">

              <div className="print:hidden">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <FileText className="text-white" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Relatório Geral</h2>
                  </div>
                  {concursoGeralId && (
                    <button
                      onClick={handlePrint}
                      className="bg-white text-secondary font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
                    >
                      <Printer size={18} /> Imprimir
                    </button>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-white mb-2 ml-1">Selecione o Concurso</label>
                  <select
                    className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-primary text-gray-700 shadow-sm"
                    value={concursoGeralId ?? ""}
                    onChange={(e) => setConcursoGeralId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">Selecione...</option>
                    {concursos.map((concurso) => (
                      <option key={concurso.idConcurso} value={concurso.idConcurso}>
                        {concurso.nomeConcurso}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div ref={componentRefGeral} className="bg-white rounded-xl p-4 flex-1 shadow-inner flex flex-col overflow-hidden print:shadow-none print:p-0 print:overflow-visible">

                {concursoGeralId && (
                  <ReportHeader
                    title="Relatório Geral"
                    subtitle={getNomeConcurso(concursoGeralId)}
                    user={usuarioLogado}
                  />
                )}

                {concursoGeralId ? (
                  <div className="flex-1 overflow-auto print:overflow-visible">
                    <RelatorioGeralList concursoId={concursoGeralId} />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60 print:hidden">
                    <FileText size={48} />
                    <p className="text-lg font-medium">Aguardando seleção...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-secondary-light rounded-2xl shadow-lg p-6 flex flex-col h-full min-h-[600px] print:bg-white print:p-0 print:shadow-none print:min-h-0 print:mt-10">

              <div className="print:hidden">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Trophy className="text-white" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Relatorio por Categoria</h2>
                  </div>
                  {concursoRankingId && categoriaId && (
                    <button
                      onClick={handlePrint}
                      className="bg-white text-secondary font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
                    >
                      <Printer size={18} /> Imprimir
                    </button>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-white mb-2 ml-1">Concurso</label>
                    <select
                      className="w-full p-3 rounded-lg border-none text-gray-700 shadow-sm"
                      value={concursoRankingId ?? ""}
                      onChange={(e) => {
                        setConcursoRankingId(e.target.value ? Number(e.target.value) : null);
                        setCategoriaId(null);
                      }}
                    >
                      <option value="">Selecione...</option>
                      {concursos.map((c) => (
                        <option key={c.idConcurso} value={c.idConcurso}>{c.nomeConcurso}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="text-sm font-semibold text-white mb-2 ml-1">Categoria</label>
                    <select
                      className="w-full p-3 rounded-lg border-none text-gray-700 shadow-sm disabled:bg-white/50"
                      value={categoriaId ?? ""}
                      onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : null)}
                      disabled={!concursoRankingId}
                    >
                      <option value="">{!concursoRankingId ? "Aguardando..." : "Selecione..."}</option>
                      {categorias.map((c) => (
                        <option key={c.idCategoria} value={c.idCategoria}>{c.nomeCategoria}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div ref={componentRefRanking} className="bg-white rounded-xl p-4 flex-1 shadow-inner flex flex-col overflow-hidden print:shadow-none print:p-0 print:overflow-visible">

                {concursoRankingId && categoriaId && (
                  <ReportHeader
                    title="Ranking Oficial"
                    subtitle={`${getNomeConcurso(concursoRankingId)} - ${getNomeCategoria(categoriaId)}`}
                    user={usuarioLogado}
                  />
                )}

                {concursoRankingId && categoriaId ? (
                  <div className="flex-1 overflow-auto print:overflow-visible">
                    <RankingCategoriaList
                      concursoId={concursoRankingId}
                      categoriaId={categoriaId}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60 print:hidden">
                    <Trophy size={48} />
                    <p className="text-lg font-medium">Aguardando filtros...</p>
                  </div>
                )}
              </div>
            </div>

            {/* RELATÓRIO INDIVIDUAL */}
            <div className="bg-secondary-light rounded-2xl shadow-lg p-6 flex flex-col h-full min-h-[600px] print:bg-white print:p-0 print:shadow-none print:min-h-0 print:mt-10">

              {/* Cabeçalho e botão imprimir */}
              <div className="print:hidden flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Relatório Individual</h2>
                </div>

                {candidatoSelecionado && (
                  <button
                    onClick={handlePrint}
                    className="bg-white text-secondary font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
                  >
                    <Printer size={18} /> Imprimir
                  </button>
                )}
              </div>

              {/* Selects de Categoria e Candidato */}
              <div className="print:hidden flex flex-col md:flex-row gap-4 mb-4">
                {/* Categoria */}
                <div className="flex-1">
                  <label className="text-sm font-semibold text-white mb-2 ml-1">Categoria</label>
                  <select
                    className="w-full p-3 rounded-lg"
                    value={categoriaSelecionada ?? ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : null;
                      setCategoriaSelecionada(value);
                      setCandidatoSelecionado(null); // reset candidato ao trocar categoria
                    }}
                  >
                    <option value="">Selecione...</option>
                    {categorias.map((cat) => (
                      <option key={cat.idCategoria} value={cat.idCategoria}>
                        {cat.nomeCategoria}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Candidato */}
                <div className="flex-1">
                  <label className="text-sm font-semibold text-white mb-2 ml-1">Candidato</label>
                  <select
                    className="w-full p-3 rounded-lg disabled:opacity-60"
                    value={candidatoSelecionado ?? ""}
                    onChange={(e) =>
                      setCandidatoSelecionado(e.target.value ? Number(e.target.value) : null)
                    }
                    disabled={!categoriaSelecionada}
                  >
                    <option value="">
                      {!categoriaSelecionada ? "Selecione a categoria" : "Selecione..."}
                    </option>
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

              {/* Área do relatório */}
              <div
                className="bg-white rounded-xl p-4 flex-1 shadow-inner flex flex-col overflow-hidden print:shadow-none print:p-0 print:overflow-visible"
              >
                {candidatoSelecionado ? (
                  <>
                    <ReportHeader
                      title="Relatório Individual do Candidato"
                      subtitle={getNomeCategoria(categoriaSelecionada)}
                      user={usuarioLogado}
                    />
                    <RelatorioIndividualDetalhado candidatoId={candidatoSelecionado} />
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60 print:hidden">
                    <FileText size={48} />
                    <p className="text-lg font-medium">Selecione uma categoria e um candidato</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}