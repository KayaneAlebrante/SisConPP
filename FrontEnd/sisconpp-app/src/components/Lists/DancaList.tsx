import { Danca } from "../../types/SorteioDanca";
import { toast } from "react-toastify";

interface DancaListProps {
    dancas: Danca[]; 
    selecionados: number[];
    toggleSelecionado: (id: number) => void;
    maxSelecionados?: number | null;
}

export default function DancaList({
    dancas,
    selecionados,
    toggleSelecionado,
    maxSelecionados,
}: DancaListProps) {
    const limite = maxSelecionados ?? null;
    const limiteAtingido = limite !== null && selecionados.length >= limite;

    const handleToggle = (id: number, checked: boolean) => {
        if (!checked && limiteAtingido) {
            toast.warning(`Você só pode selecionar até ${limite} dança(s) nesta categoria.`);
            return;
        }
        toggleSelecionado(id);
    };

    return (
        <div className="w-full flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-secondary-on">Lista de Danças</h2>

            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="text-left bg-secondary-dark text-secondary-light">
                        <th className="p-3 first:rounded-tl-xl">Nome da Dança</th>
                        <th className="p-3 last:rounded-tr-xl">Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    {dancas.map((d) => {
                        const checked = selecionados.includes(d.idDanca);

                        return (
                            <tr
                                key={d.idDanca}
                                className="border-t hover:bg-secondary-light/20 transition"
                            >
                                <td className="p-3 text-secondary-onFixed">{d.nomeDanca}</td>
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => handleToggle(d.idDanca, checked)}
                                        className="accent-primary w-4 h-4"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}