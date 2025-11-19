import { Usuario } from "../../types/Usuario";
import { ArrowLeft } from "lucide-react";
import { CTG } from "../../types/CTG";

interface Props {
    auxiliar: Usuario;
    ctg?: CTG;
    onVoltar: () => void;
}

const formtFuncao = (funcao: string | undefined) => {
    switch (funcao) {
        case "AVALIADOR": return "Avaliador";
        case "AUXILIAR": return "Auxiliar";
        default:
            return funcao || "Não informado";
    }
};

const formtCredenciamento = (cred: string | undefined) => {
    switch (cred) {
        case "CREDENCIADO": return "Credenciado";
        case "NAO_CREDENCIADO": return "Não Credenciado";
        default:
            return cred || "Não informado";
    }
};

export default function VisualizacaoAuxiliar({ auxiliar, ctg, onVoltar }: Props) {

    return (
        <div className="w-full max-w-xl">
            <button className="text-green-600 mb-4 flex items-center" onClick={onVoltar}>
                <ArrowLeft className="mr-1" size={20} /> Voltar
            </button>

            <div className="flex-1 space-y-1 text-sm text-gray-800">
                <div className="flex justify-between">
                    <p><strong>Nome Completo:</strong> {auxiliar.nomeCompleto}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Cidade:</strong> {auxiliar.cidade}</p>
                    <p><strong>Estado:</strong> {auxiliar.estado}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>CTG:</strong> {ctg?.nomeCTG || "CTG não encontrado"}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Número da Carteirinha:</strong> {auxiliar.numCarteirinha}</p>
                </div>

                <div className="flex justify-between">
                    <p><strong>Função:</strong> {formtFuncao(auxiliar.funcao)}</p>
                </div>
                <div className="flex justify-between">
                    <p><strong>Credenciamento:</strong> {formtCredenciamento(auxiliar.credenciamento)}</p>
                    <p><strong>Número Credenciamento:</strong>{auxiliar.numCredenciamento}</p>
                </div>

                <div>
                    <p><strong>Login:</strong> {auxiliar.login}</p>
                </div>
            </div>
        </div>
    );
}