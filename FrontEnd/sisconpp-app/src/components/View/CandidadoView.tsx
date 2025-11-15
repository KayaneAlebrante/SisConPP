import { Candidato } from "../../types/Candidato";
import { CTG } from "../../types/CTG";
import { Categoria } from "../../types/Categoria";
import { Paperclip, ArrowLeft } from "lucide-react";

interface Props {
  candidato: Candidato;
  ctg?: CTG;
  categoria?: Categoria;
  onVoltar: () => void;
}

export default function VisualizacaoCandidato({ candidato, ctg, categoria, onVoltar }: Props) {
  return (
    <div className="w-full max-w-xl">
      <button className="text-green-600 mb-4 flex items-center" onClick={onVoltar}>
        <ArrowLeft className="mr-1" size={20} /> Voltar
      </button>

      <div className="flex gap-6">
        {/* Foto/avatar */}
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-4xl">🌄</span>
        </div>

        {/* Dados */}
        <div className="flex-1 space-y-1 text-sm text-gray-800">
          <div className="flex justify-between">
            <p><strong>Nome Completo:</strong> {candidato.nomeCompleto}</p>
          </div>
          <div className="flex justify-between">
            <p><strong>CPF:</strong> {candidato.CPF}</p>
            <p><strong>RG:</strong> {candidato.RG}</p>
          </div>
          <div className="flex justify-between">
            <p><strong>Categoria:</strong> {categoria?.nomeCategoria || "Categoria não encontrada"}</p>
            <p><strong>Escolaridade:</strong> {candidato.escolaridade}</p>
          </div>
          <div className="flex justify-between">
            <p><strong>CTG:</strong> {ctg?.nomeCTG || "CTG não encontrado"}</p>
            <p><strong>RT:</strong> {ctg?.RTid || "RT não informada"}</p>
          </div>
          <div className="flex justify-between">
            <p><strong>Pai:</strong> {candidato.filiacao?.split("/")[0]}</p>
            <p><strong>Mãe:</strong> {candidato.filiacao?.split("/")[1]}</p>
          </div>
          <div>
            <p><strong>Endereço:</strong> Rua {candidato.endereco}, {candidato.numEndereco}, Bairro {candidato.bairro}, {candidato.cidade} - {candidato.estado}</p>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="mt-6 space-y-2">
        {[
          "Carteira Tradicionalista",
          "Copia Documento",
          "Comprovante Escolaridade",
          "Relatório Consisso da Vivência Tradicionalista",
          "Termo de Compromisso",
          "Termo de Autorização",
        ].map((doc, i) => (
          <div key={i} className="flex items-center text-primary-onFixed">
            <Paperclip className="mr-2" size={16} />
            {doc}
          </div>
        ))}
      </div>
    </div>
  );
}