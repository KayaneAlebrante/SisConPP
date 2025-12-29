import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import { Candidato } from "../types/Candidato";
import { Usuario } from "../types/Usuario";
import { ProvaAccordionDTO } from "../types/Avaliacao";
import {
  listarCandidatos,
  listarUsuriosAvaliadores,
  buscarEstruturaAvaliacao
} from "../services/api";
import { toast } from "react-toastify";
import AvaliacaoAccordion from "../components/Avaliacao/AvaliacaoAccordion";

export default function AvaliacaoPage() {
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<number | null>(null);
  const [avaliadorSelecionado, setAvaliadorSelecionado] = useState<number | null>(null);

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [avaliadores, setAvaliadores] = useState<Usuario[]>([]);

  const [provasSelecionadas, setProvasSelecionadas] = useState<ProvaAccordionDTO[]>([]);
  const [notas, setNotas] = useState<Record<number, number>>({});

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
    const fetchAvaliadores = async () => {
      try {
        const response = await listarUsuriosAvaliadores();
        setAvaliadores(response as Usuario[]);
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
        setProvasSelecionadas(response);
      } catch {
        toast.error("Erro ao carregar estrutura da avaliação");
      }
    };

    fetchEstrutura();
  }, [candidatoSelecionado, avaliadorSelecionado]);

  return (
    <div className="flex min-h-screen w-full bg-neutral-background">
      <SideNavBar />

      <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto">
        <div className="w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-white mb-2 block">
                Candidato
              </label>
              <select
                className="w-full p-3 rounded-lg"
                value={candidatoSelecionado ?? ""}
                onChange={(e) =>
                  setCandidatoSelecionado(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <option value="">Selecione</option>
                {candidatos.map((c) => (
                  <option key={c.idCandidato} value={c.idCandidato}>
                    {c.nomeCompleto}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-white mb-2 block">
                Avaliador
              </label>
              <select
                className="w-full p-3 rounded-lg"
                value={avaliadorSelecionado ?? ""}
                onChange={(e) =>
                  setAvaliadorSelecionado(
                    e.target.value ? Number(e.target.value) : null
                  )
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
          </div>
        </div>

        <div className="w-full bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg min-h-[500px]">
          {!candidatoSelecionado || !avaliadorSelecionado ? (
            <div className="text-center text-gray-200 py-20">
              <p className="text-lg font-semibold">
                Selecione um candidato e um avaliador
              </p>
            </div>
          ) : (
            <AvaliacaoAccordion
              provas={provasSelecionadas}
              notas={notas}
              onChangeNota={(id, nota) =>
                setNotas((prev) => ({ ...prev, [id]: nota }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
