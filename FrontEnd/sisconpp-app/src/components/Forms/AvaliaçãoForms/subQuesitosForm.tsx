import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { criarSubQuesito } from '../../../services/api';

export interface SubQuesitos {
    idSubequestios?: number;
    nomeSubquesito: string;
    notaSubequesito: number;
    quesitoId: number;
}

interface SubQuesitosFormProps {
    onClose: () => void;
    subQuesitoToEdit?: SubQuesitos;
}

export default function SubQuesitosForm({ onClose, subQuesitoToEdit }: SubQuesitosFormProps) {
    
    const [formData, setFormData] = useState({
        nomeSubquesito: '',
        notaSubequesito: 0,
        quesitoId: 0
    });

    useEffect(() => {
        if (subQuesitoToEdit) {
            setFormData({
                nomeSubquesito: subQuesitoToEdit.nomeSubquesito,
                notaSubequesito: subQuesitoToEdit.notaSubequesito,
                quesitoId: subQuesitoToEdit.quesitoId
            });
        }
    }, [subQuesitoToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'notaSubequesito' || name === 'quesitoId' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (formData.nomeSubquesito.trim() === '' || formData.notaSubequesito <= 0 || formData.quesitoId <= 0) {
                toast.warning('Preencha todos os campos obrigatórios.');
                return;
            }

            // Simulação do payload
            const payload = {
                idSubequestios: subQuesitoToEdit?.idSubequestios || 0,
                ...formData
            };

            console.log('Salvando:', payload);
            await criarSubQuesito(payload);
            toast.success(subQuesitoToEdit ? 'Subquesito atualizado!' : 'Subquesito criado!');
            onClose();

        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar.');
        }
    };

    return (
        <div className="w-full">
             <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {subQuesitoToEdit ? 'Editar' : 'Criar'} Subquesito
            </h1>
            
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1" htmlFor="nomeSubquesito">
                        Nome do Subquesito
                    </label>
                    <input 
                        type="text"
                        id="nomeSubquesito"
                        name="nomeSubquesito"
                        value={formData.nomeSubquesito}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"     
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1" htmlFor="notaSubequesito">
                        Nota Máxima
                    </label>
                    <input 
                        type="number"
                        step="0.1"
                        id="notaSubequesito"
                        name="notaSubequesito"
                        value={formData.notaSubequesito}
                        onChange={handleChange}
                        required
                        min="0"
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="text-sm font-medium mb-1" htmlFor="quesitoId">
                        ID do Quesito Pai
                    </label>
                    <input
                        type="number"
                        id="quesitoId"
                        name="quesitoId"
                        value={formData.quesitoId}
                        onChange={handleChange}
                        required
                        min="1"
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex justify-end gap-2">
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
                        {subQuesitoToEdit ? 'Salvar alterações' : 'Criar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
