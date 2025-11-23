import { Categoria } from "../../types/Categoria";
import { Candidato } from "../../types/Candidato";
import { DancaSalaoTradicional } from "../../types/SorteioDanca";

interface DancaFormProps {
  categorias: Categoria[];
  candidatos: Candidato[];
  categoriaSelecionada: number | null;
  setCategoriaSelecionada: (id: number | null) => void;
  candidatoSelecionado: number | null;
  setCandidatoSelecionado: (id: number | null) => void;
  tipoDanca: DancaSalaoTradicional | null;
  buscarDancas: (tipo: DancaSalaoTradicional) => void;
}

export default function DancaForm({
  categorias,
  candidatos,
  categoriaSelecionada,
  setCategoriaSelecionada,
  candidatoSelecionado,
  setCandidatoSelecionado,
  tipoDanca,
  buscarDancas,
}: DancaFormProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
         <div>
          <label className="font-semibold text-secondary-on">Categoria</label>
          <select
            className="w-full p-2 border rounded-md mt-1"
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
          <label className="font-semibold text-secondary-on">Candidato</label>
          <select
            className="w-full p-2 border rounded-md mt-1"
            value={candidatoSelecionado ?? ""}
            onChange={(e) =>
              setCandidatoSelecionado(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Selecione</option>
            {candidatos.map((cand) => (
              <option key={cand.idCandidato} value={cand.idCandidato}>
                {cand.nomeCompleto}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full flex items-center gap-6 mt-6">
        <span className="font-semibold text-secondary-on">Danças</span>

        <label className="flex items-center gap-2 text-secondary-on">
          <input
            type="radio"
            name="tipoDanca"
            checked={tipoDanca === DancaSalaoTradicional.DANCA_TRADICIONAL}
            onChange={() => buscarDancas(DancaSalaoTradicional.DANCA_TRADICIONAL)}
          />
          Tradicionais
        </label>

        <label className="flex items-center gap-2 text-secondary-on">
          <input
            type="radio"
            name="tipoDanca"
            checked={tipoDanca === DancaSalaoTradicional.DANCA_DE_SALAO}
            onChange={() => buscarDancas(DancaSalaoTradicional.DANCA_DE_SALAO)}
          />
          Salão
        </label>
      </div>
    </div>
  );
}