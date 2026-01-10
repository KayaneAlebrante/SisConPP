import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import Modal from "../components/Modal/Modal";
import ProvaAccordion from "../components/Provas/ProvaAccordion";
import ProvaPraticaForm from "../components/Forms/ProvasForms/provaPraticaForm";
import BlocoProvaForm from "../components/Forms/ProvasForms/blocoProvaForm";
import QuesitoForm from "../components/Forms/ProvasForms/quesitosForm";
import SubQuesitosForm from "../components/Forms/ProvasForms/subQuesitosForm";
import { buscarPorCategoria, buscarProvasPraticas, listarCategorias, } from "../services/api";
import { Categoria } from "../types/Categoria";
import { ProvaPratica, BlocoProva, Quesitos, SubQuesitos, } from "../types/ProvaPratica";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

type ModalType = "PROVA" | "BLOCO" | "QUESITO" | "SUB" | null;

interface ProvaAccordionState extends ProvaPratica {
  isOpen?: boolean;
}

export default function ProvaPraticaCriacao() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(
    null
  );
  const [provas, setProvas] = useState<ProvaAccordionState[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProva, setSelectedProva] = useState<ProvaPratica>();
  const [selectedBloco, setSelectedBloco] = useState<BlocoProva>();
  const [selectedQuesito, setSelectedQuesito] = useState<Quesitos>();
  const [selectedSub, setSelectedSub] = useState<SubQuesitos>();
  const [parentProvaId, setParentProvaId] = useState<number>();
  const [parentBlocoId, setParentBlocoId] = useState<number>();
  const [parentQuesitoId, setParentQuesitoId] = useState<number>();
  const [provasAbertas, setProvasAbertas] = useState<Set<number>>(new Set());
  const [blocosAbertos, setBlocosAbertos] = useState<Set<number>>(new Set());
  const [quesitosAbertos, setQuesitosAbertos] = useState<Set<number>>(new Set());


  const [refresh, setRefresh] = useState(false);

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
          ? await buscarPorCategoria(categoriaSelecionada)
          : await buscarProvasPraticas();

        const provasComEstado = (response as ProvaPratica[]).map((p) => ({
          ...p,
          isOpen: provasAbertas.has(p.idProvaPratica)
        }));

        setProvas(provasComEstado);
      } catch {
        toast.error("Erro ao carregar provas práticas");
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

  const toggleBloco = (blocoId: number) => {
    setBlocosAbertos(prev => {
      const novo = new Set(prev);
      if (novo.has(blocoId)) {
        novo.delete(blocoId);
      } else {
        novo.add(blocoId);
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

  const openProvaModal = (prova?: ProvaPratica) => {
    setSelectedProva(prova);
    setModalType("PROVA");
    setIsModalOpen(true);
  };

  const openBlocoModal = (bloco?: BlocoProva, provaId?: number) => {
    setSelectedBloco(bloco);
    setParentProvaId(provaId);
    setModalType("BLOCO");
    setIsModalOpen(true);
  };

  const openQuesitoModal = (quesito?: Quesitos, blocoId?: number) => {
    setSelectedQuesito(quesito);
    setParentBlocoId(blocoId);
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
        <div className="w-full max-w-full bg-secondary-light p-8 rounded-2xl shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="font-semibold text-white mb-2 block">
                Categoria
              </label>
              <select
                className="w-full p-3 rounded-lg"
                value={categoriaSelecionada ?? ""}
                onChange={(e) => {
                  const valor = e.target.value ? Number(e.target.value) : null;
                  console.log("Categoria selecionada:", valor);
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
              Adicionar Prova Prática
            </button>
          </div>
        </div>

        <div className="w-full max-w-full bg-secondary-light p-6 md:p-8 rounded-2xl shadow-lg mb-4 space-y-4 min-h-[500px]">
          {loading && (
            <p className="text-center text-secondary-onFixed">Carregando provas...</p>
          )}

          {!loading && provas.length === 0 && (
            <p className="text-center text-secondary-onFixed">
              Nenhuma prova encontrada para esta categoria.
            </p>
          )}

          {!loading &&
            provas.map((prova) => (
              <ProvaAccordion
                key={prova.idProvaPratica}
                prova={prova}
                isOpen={provasAbertas.has(prova.idProvaPratica)}
                onToggle={toggleProva}
                blocosAbertos={blocosAbertos}
                onToggleBloco={toggleBloco}
                quesitosAbertos={quesitosAbertos}
                onToggleQuesito={toggleQuesito}
                onAddBloco={(id) => openBlocoModal(undefined, id)}
                onAddQuesito={(id) => openQuesitoModal(undefined, id)}
                onAddSub={(id) => openSubModal(undefined, id)}
              />

            ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "PROVA" && (
          <ProvaPraticaForm
            onClose={closeModalAndRefresh}
            provaToEdit={selectedProva}
          />
        )}

        {modalType === "BLOCO" && (
          <BlocoProvaForm
            onClose={closeModalAndRefresh}
            blocoToEdit={selectedBloco}
            provaPraticaId={parentProvaId}
          />
        )}

        {modalType === "QUESITO" && (
          <QuesitoForm
            onClose={closeModalAndRefresh}
            quesitoToEdit={selectedQuesito}
            blocoId={parentBlocoId}
            provaTeoricaId={0}
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
    </div >
  );
}