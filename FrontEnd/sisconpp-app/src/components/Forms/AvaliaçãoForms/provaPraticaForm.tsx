import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { listarCategorias,criarProvaPratica, atualizarProvaPratica} from "../../../services/api";
import { Categoria } from "../../../types/Categoria";
import { ProvaPratica } from "../../../types/ProvaPratica";

interface ProvaPraticaFormProps {
  onClose: () => void;
  provaToEdit?: ProvaPratica;
}

export default function ProvaPraticaForm({
  onClose,
  provaToEdit,
}: ProvaPraticaFormProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nomeProva, setNomeProva] = useState("");
  const [notaMaxima, setNotaMaxima] = useState<number | "">("");
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const isEditMode = !!provaToEdit;

  /* 🔹 Carregar categorias */
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

  /* 🔹 Preencher dados quando for edição */
  useEffect(() => {
    if (provaToEdit) {
      setNomeProva(provaToEdit.nomeProva);
      setNotaMaxima(provaToEdit.notaMaxima);
      setCategoriasSelecionadas(provaToEdit.categorias ?? []);
    }
  }, [provaToEdit]);

  const toggleCategoria = (id: number) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeProva.trim()) {
      toast.warning("Informe o nome da prova");
      return;
    }

    if (!notaMaxima || notaMaxima <= 0) {
      toast.warning("Informe uma nota máxima válida");
      return;
    }

    if (categoriasSelecionadas.length === 0) {
      toast.warning("Selecione ao menos uma categoria");
      return;
    }

    const payload = {
      idProvaPratica: provaToEdit?.idProvaPratica ?? 0,
      nomeProva: nomeProva.trim(),
      notaMaxima: Number(notaMaxima),
      categorias: categoriasSelecionadas,
      blocosProvas: [],
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await atualizarProvaPratica(payload);
        toast.success("Prova prática atualizada com sucesso");
      } else {
        await criarProvaPratica(payload);
        toast.success("Prova prática criada com sucesso");
      }

      onClose();
    } catch {
      toast.error(
        isEditMode
          ? "Erro ao atualizar prova prática"
          : "Erro ao criar prova prática"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? "Editar Prova Prática" : "Nova Prova Prática"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Nome da Prova</label>
          <input
            type="text"
            value={nomeProva}
            onChange={(e) => setNomeProva(e.target.value)}
            className="rounded-lg p-2 border focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Nota */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Nota Máxima</label>
          <input
            type="number"
            min={1}
            value={notaMaxima}
            onChange={(e) =>
              setNotaMaxima(e.target.value ? Number(e.target.value) : "")
            }
            className="rounded-lg p-2 border focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Categorias */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Categorias
          </label>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200 text-sm">
                <tr>
                  <th className="p-2 text-left">Categoria</th>
                  <th className="p-2 text-center">Selecionar</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr key={cat.idCategoria} className="border-t">
                    <td className="p-2">{cat.nomeCategoria}</td>
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={categoriasSelecionadas.includes(
                          cat.idCategoria
                        )}
                        onChange={() => toggleCategoria(cat.idCategoria)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-secondary text-white rounded-lg disabled:opacity-60"
          >
            {loading
              ? "Salvando..."
              : isEditMode
              ? "Atualizar Prova"
              : "Criar Prova"}
          </button>
        </div>
      </form>
    </div>
  );
}
