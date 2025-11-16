import React, { useEffect, useState } from "react";
import { Comissao } from "../../types/Comissao";
import { Concurso } from "../../types/Concurso";
import { criarComissao, listarConcurso, atualizarComissao } from "../../services/api";
import { toast } from 'react-toastify';

interface ComissaoFormProps {
    onClose: () => void;
    comissaoToEdit?: Comissao;
}

export default function ComissaoForm({ onClose, comissaoToEdit }: ComissaoFormProps) {
    const [formData, setFormData] = useState<Comissao>({
        idComissao: 0,
        nomeComissao: '',
        concursoId: 0,
        concurso: {
            idConcurso: 0,
            nomeConcurso: '',
            lancamentoEdital: '',
            inscricoesInicio: '',
            inscricoesFinal: '',
            dataProvaEscrita: '',
            dataProvasPraticas: '',
            dataResultado: '',
            local: '',
            anexoEdital: null,
        },
        usuarios: [],
    });

    const [concursos, setConcursos] = useState<Concurso[]>([]);

    useEffect(() => {
        const fetchConcursos = async () => {
            const response = await listarConcurso();
            setConcursos(response as Concurso[]);
        };
        fetchConcursos();
    }, []);

    useEffect(() => {
        if (comissaoToEdit) {
            setFormData({
                ...comissaoToEdit,
                concursoId: Number(comissaoToEdit.concursoId),
            });
        }
    }, [comissaoToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: Comissao) => ({
            ...prev,
            [name]: name === 'idComissao' ? Number(value) : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setFormData((prev) => ({
            ...prev,
            concursoId: selectedId,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(formData.idComissao > 0){
                await atualizarComissao(formData);
                toast.success("Comissão atualizada com sucesso!");
                onClose();
                return;
            }else{
                await criarComissao(formData);
                toast.success("Comissão cadastrada com sucesso!");
                onClose();
                return;
            }
            onClose();
        } catch (error) {
            console.error('Erro ao salvar Comissão:', error);
            toast.error('Erro ao salvar Comissão. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="w-full max-w-xl">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                Comissão Avaliadora
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-neutral-onBackground mb-1">
                        Nome comissão Avaliadora
                    </label>
                    <input
                        type="text"
                        name="nomeComissao"
                        value={formData.nomeComissao}
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
                        placeholder="Comissão Prova de Dotes Juvenil"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-neutral-onBackground mb-1">
                        Concurso
                    </label>
                    <select
                        name="concursoId"
                        value={formData.concursoId || ""}
                        onChange={handleSelectChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
                        required
                    >
                        <option value="">Selecione um Concurso</option>
                        {concursos.map((concurso) => (
                            <option key={concurso.idConcurso} value={concurso.idConcurso}>
                                {concurso.nomeConcurso}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-secondary text-secondary-on font-medium rounded-lg hover:bg-secondary-dark transition"
                    >
                        {comissaoToEdit ? 'Salvar alterações' : 'Cadastrar Comissão'}
                    </button>
                </div>
            </form>
        </div>
    );
}