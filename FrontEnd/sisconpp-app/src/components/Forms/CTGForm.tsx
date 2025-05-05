import React, { useState, useEffect } from 'react';
import { listarRTs, atualizarCTG, cadastrarCTG } from '../../services/api';
import { CTG } from '../../types/CTG';
import { toast } from 'react-toastify';

interface RT {
    idRT: number;
    nomeRT: string;
}

interface CTGFormProps {
    onClose: () => void;
    ctgToEdit?: CTG;
}

export default function CTGForm({ onClose, ctgToEdit }: CTGFormProps) {
    const [formData, setFormData] = useState<CTG>({
        idCTG: 0,
        nomeCTG: '',
        RTid: 0,
    });

    const [rts, setRTs] = useState<RT[]>([]); 
    const [selectedRT, setSelectedRT] = useState<number>(0); 

    useEffect(() => {
        const fetchRTs = async () => {
            const response = await listarRTs();
            setRTs(response as RT[]);
        };
        fetchRTs();
    }, []);

    useEffect(() => {
        if (ctgToEdit) {
            setFormData({
                ...ctgToEdit,
                RTid: Number(ctgToEdit.RTid),
            });
            setSelectedRT(Number(ctgToEdit.RTid));
        }
    }, [ctgToEdit]);  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: CTG) => ({
            ...prev,
            [name]: name === 'idCTG' ? Number(value) : value,
        }));
    };

    const handleRTChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRT(Number(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const ctgPayload: CTG = {
                idCTG: ctgToEdit ? ctgToEdit.idCTG : 0,
                nomeCTG: formData.nomeCTG,
                RTid: selectedRT,
            };

            if (ctgToEdit) {
                await atualizarCTG(ctgPayload);
                toast.success('CTG atualizado com sucesso!');
            } else {
                await cadastrarCTG(ctgPayload);
                toast.success('CTG cadastrado com sucesso!');
            }

            onClose();
        } catch (error) {
            console.error('Erro ao salvar CTG:', error);
            toast.error('Erro ao salvar CTG. Verifique os dados e tente novamente.');
        }
    };


    return (
        <div className="w-full max-w-xl">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {ctgToEdit ? 'Editar' : 'Cadastrar'} CTG - Centro de Tradições Gaúchas
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-neutral-onBackground mb-1">
                        Nome do CTG
                    </label>
                    <input
                        type="text"
                        name="nomeCTG"
                        value={formData.nomeCTG}
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground                      placeholder= CTG Herança do Pago"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-neutral-onBackground mb-1">
                        Região Tradicionalista
                    </label>
                    <select
                        name="RTId"
                        value={selectedRT || ""}
                        onChange={handleRTChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
                        required
                    >
                        <option value="">Selecione uma RT</option>
                        {rts.map((rt) => (
                            <option key={rt.idRT} value={rt.idRT}>
                                {rt.nomeRT}
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
                        {ctgToEdit ? 'Salvar alterações' : 'Cadastrar CTG'}
                    </button>
                </div>
            </form>
        </div>

    );
}