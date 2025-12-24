import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Quesitos,
    BlocoProva,
} from "../../../types/ProvaPratica";
import { criarQuesito, listarBlocosProva } from "../../../services/api";

interface QuesitoFormProps {
    onClose: () => void;
    quesitoToEdit?: Quesitos;
    blocoId?: number;
}

interface QuesitoFormState {
    idQuesito?: number;
    nomeQuesito: string;
    notaMaximaQuesito: number;
    opcional: boolean;
    blocoProvaIdBloco?: number;
}

export default function QuesitoForm({
    onClose,
    quesitoToEdit,
    blocoId,
}: QuesitoFormProps) {
    const [listaBlocos, setListaBlocos] = useState<BlocoProva[]>([]);

    const [formData, setFormData] = useState<QuesitoFormState>({
        nomeQuesito: "",
        notaMaximaQuesito: 0,
        opcional: false,
        blocoProvaIdBloco: blocoId,
    });

    useEffect(() => {
        const carregarBlocos = async () => {
            try {
                const response = await listarBlocosProva();
                setListaBlocos(response as BlocoProva[]);
            } catch {
                toast.error("Erro ao carregar blocos de prova");
            }
        };

        carregarBlocos();
    }, []);

    useEffect(() => {
        if (quesitoToEdit) {
            setFormData({
                idQuesito: quesitoToEdit.idQuesito,
                nomeQuesito: quesitoToEdit.nomeQuesito,
                notaMaximaQuesito: quesitoToEdit.notaMaximaQuesito,
                opcional: quesitoToEdit.opcional,
                blocoProvaIdBloco: quesitoToEdit.blocoProvaIdBloco,
            });
        } else if (blocoId) {
            setFormData((prev) => ({ ...prev, blocoProvaId: blocoId }));
        }
    }, [quesitoToEdit, blocoId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
            return;
        }

        if (name === "notaMaximaQuesito" || name === "blocoProvaId") {
            setFormData((prev) => ({
                ...prev,
                [name]: Number(value),
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nomeQuesito.trim() || formData.notaMaximaQuesito <= 0) {
            toast.warning("Preencha nome e nota máxima");
            return;
        }

        if (!formData.blocoProvaIdBloco) {
            toast.warning("Selecione um Bloco de Prova");
            return;
        }

        const payload: Quesitos = {
            idQuesito: formData.idQuesito ?? 0,
            nomeQuesito: formData.nomeQuesito,
            notaMaximaQuesito: formData.notaMaximaQuesito,
            blocoProvaIdBloco: formData.blocoProvaIdBloco,
            opcional: formData.opcional,
            subQuesitos: quesitoToEdit?.subQuesitos || [],
        };

        try {
            console.log("Salvando Quesito:", payload);
            await criarQuesito(payload);
            toast.success(quesitoToEdit ? "Quesito atualizado!" : "Quesito criado!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar quesito");
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4">
                {quesitoToEdit ? "Editar" : "Criar"} Quesito
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Nome do Quesito</label>
                    <input
                        type="text"
                        name="nomeQuesito"
                        value={formData.nomeQuesito}
                        onChange={handleChange}
                        className="w-full rounded-lg p-2 border"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Nota Máxima</label>
                    <input
                        type="number"
                        name="notaMaximaQuesito"
                        value={formData.notaMaximaQuesito}
                        onChange={handleChange}
                        min={0}
                        className="w-full rounded-lg p-2 border"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Bloco de Prova</label>
                    <select
                        name="blocoProvaId"
                        value={formData.blocoProvaIdBloco ?? ""}
                        onChange={handleChange}
                        className="w-full rounded-lg p-2 border"
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        {listaBlocos.map((b) => (
                            <option key={b.idBloco} value={b.idBloco}>
                                {b.nomeBloco}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.opcional}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData((prev) => ({
                                ...prev,
                                opcional: checked,
                            }));
                        }}
                    />
                    <span>Este quesito é opcional?</span>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-secondary text-white rounded"
                    >
                        {quesitoToEdit ? "Salvar" : "Criar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
