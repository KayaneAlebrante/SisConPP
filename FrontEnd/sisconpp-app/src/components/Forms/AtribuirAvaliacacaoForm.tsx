import React from "react";
import { toast } from "react-toastify";
import { Comissao } from "../../types/Comissao";
import { ComissaoProvaPraticaForm } from "../../types/Comissao";
import {
    listarCategorias,
    buscarProvasPraticas,
    listarBlocosProva,
    atribuirAvaliacaoComissao,
} from "../../services/api";
import { Categoria } from "../../types/Categoria";
import { ProvaPratica, BlocoProva } from "../../types/ProvaPratica";

interface Props {
    comissao: Comissao;
    onClose: () => void;
    onSaved?: () => void;
}

type TipoAtribuicao = "CATEGORIA" | "PROVA" | "BLOCO";

export default function AtribuicaoAvaliacaoForm({
    comissao,
    onClose,
    onSaved,
}: Props) {
    const [tipo, setTipo] = React.useState<TipoAtribuicao>("CATEGORIA");

    const [categorias, setCategorias] = React.useState<Categoria[]>([]);
    const [provas, setProvas] = React.useState<ProvaPratica[]>([]);
    const [blocos, setBlocos] = React.useState<BlocoProva[]>([]);

    const [categoriaId, setCategoriaId] = React.useState<number | undefined>();
    const [provaPraticaId, setProvaPraticaId] = React.useState<number | undefined>();
    const [blocoProvaId, setBlocoProvaId] = React.useState<number | undefined>();

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [categoriasResp, provasResp, blocosResp] = await Promise.all([
                    listarCategorias(),
                    buscarProvasPraticas(),
                    listarBlocosProva(),
                ]);
                setCategorias(categoriasResp as Categoria[]);
                setProvas(provasResp as ProvaPratica[]);
                setBlocos(blocosResp as BlocoProva[]);
            } catch {
                toast.error("Erro ao carregar dados");
            }
        }

        fetchData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload: ComissaoProvaPraticaForm = {
            comissaoId: comissao.idComissao,
            categoriaId: categoriaId,
            provaPraticaId: provaPraticaId,
            blocoProvaId: blocoProvaId,
        };

        try {
            await atribuirAvaliacaoComissao(payload);

            toast.success("Avaliação atribuída com sucesso!");
            onSaved?.();
            onClose();
        } catch {
            toast.error("Erro ao atribuir avaliação");
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                Atribuir Avaliação à Comissão
            </h1>
            <h3 className="text-xl font-semibold text-primary-onFixed mb-6 mt-6">
                Comissão: <strong>{comissao.nomeComissao}</strong>
            </h3>

            <form onSubmit={handleSubmit} >
                <div className="flex gap-6 mb-4">
                    {(["CATEGORIA", "PROVA", "BLOCO"] as TipoAtribuicao[]).map((t) => (
                        <label className="text-sm font-medium mb-1" key={t}>
                            <input
                                type="radio"
                                checked={tipo === t}
                                onChange={() => setTipo(t)}
                            />{" "}
                            {t === "CATEGORIA"
                                ? "Categoria"
                                : t === "PROVA"
                                    ? "Prova Prática"
                                    : "Bloco"}
                        </label>
                    ))}
                </div>

                {tipo === "CATEGORIA" && (
                    <select
                        className="w-full mb-4 rounded-lg p-2 bg-surface-containerHigh border border-outline"
                        value={categoriaId ?? ""}
                        onChange={(e) => setCategoriaId(Number(e.target.value))}
                    >
                        <option value="">Selecione a categoria</option>
                        {categorias.map((c) => (
                            <option key={c.idCategoria} value={c.idCategoria}>
                                {c.nomeCategoria}
                            </option>
                        ))}
                    </select>
                )}

                {tipo === "PROVA" && (
                    <select
                        className="w-full mb-4 rounded-lg p-2 bg-surface-containerHigh border border-outline"
                        value={provaPraticaId ?? ""}
                        onChange={(e) => setProvaPraticaId(Number(e.target.value))}
                    >
                        <option value="">Selecione a prova prática</option>
                        {provas.map((p) => (
                            <option key={p.idProvaPratica} value={p.idProvaPratica}>
                                {p.nomeProva}
                            </option>
                        ))}
                    </select>
                )}

                {tipo === "BLOCO" && (
                    <select
                        className="w-full mb-4 rounded-lg p-2 bg-surface-containerHigh border border-outline"
                        value={blocoProvaId ?? ""}
                        onChange={(e) => setBlocoProvaId(Number(e.target.value))}
                    >
                        <option value="">Selecione o bloco</option>
                        {blocos.map((b) => (
                            <option key={b.idBloco} value={b.idBloco}>
                                {b.nomeBloco}
                            </option>
                        ))}
                    </select>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-secondary-container text-white rounded-lg"
                    >
                        Atribuir
                    </button>
                </div>
            </form>
        </div>
    );
}