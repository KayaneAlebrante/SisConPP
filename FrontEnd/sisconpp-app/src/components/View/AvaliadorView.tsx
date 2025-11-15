import { Usuario } from "../../types/Usuario";
import { ArrowLeft } from "lucide-react";
import { CTG } from "../../types/CTG";

interface Props {
    avaliador: Usuario;
    ctg?: CTG;
    onVoltar: () => void;
}

export default function VisualizacaoAvaliador({ avaliador, ctg, onVoltar }: Props) {
    return (
        <div className="w-full max-w-xl">
            <button className="text-green-600 mb-4 flex items-center" onClick={onVoltar}>
                <ArrowLeft className="mr-1" size={20} /> Voltar
            </button>

            <div className="flex-1 space-y-1 text-sm text-gray-800">
                <div className="flex justify-between">
                    <p><strong>Nome Completo:</strong> {avaliador.nomeCompleto}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Cidade:</strong> {avaliador.cidade}</p>
                    <p><strong>Estado:</strong> {avaliador.estado}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>CTG:</strong> {ctg?.nomeCTG || "CTG não encontrado"}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Número da Carteirinha:</strong> {avaliador.numCarteirinha}</p>
                </div>

                <div className="flex justify-between">
                    <p><strong>Função:</strong> {avaliador.funcao}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Credenciamento:</strong> {avaliador.credenciamento}</p>
                    <p><strong>Número Credenciamento:</strong>{avaliador.numCredenciamento}</p>
                </div>

                <div>
                    <p><strong>Login:</strong> {avaliador.login}</p>
                </div>
            </div>
        </div>
    );
}