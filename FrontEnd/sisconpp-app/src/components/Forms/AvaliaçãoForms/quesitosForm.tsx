import React, { useState, useEffect } from 'react';
import { Quesitos, DancaSalaoTradicional } from '../../../types/ProvaPratica';
import { toast } from 'react-toastify';

export interface QuesitoFormState {
    idQuesito?: number;
    nomeQuesito: string;
    notaMaximaQuesito: number;
    danca: boolean;
    dancaSalaoTradicional: DancaSalaoTradicional;
    blocoProvaId?: number;
}

interface QuesitoFormProps {
    onClose: () => void;
    quesitoToEdit?: Quesitos;
    blocoId?: number;
}

export default function QuesitoForm({ onClose, quesitoToEdit, blocoId }: QuesitoFormProps) {

    const [formData, setFormData] = useState<QuesitoFormState>({
        nomeQuesito: '',
        notaMaximaQuesito: 0,
        danca: false,
        dancaSalaoTradicional: DancaSalaoTradicional.NENHUMA, 
        blocoProvaId: blocoId || 0,
    });

    useEffect(() => {
        if (quesitoToEdit) {
            setFormData({
                idQuesito: quesitoToEdit.idQuesito,
                nomeQuesito: quesitoToEdit.nomeQuesito,
                notaMaximaQuesito: quesitoToEdit.notaMaximaQuesito,
                danca: quesitoToEdit.danca,
                dancaSalaoTradicional: quesitoToEdit.dancaSalaoTradicional,
                blocoProvaId: quesitoToEdit.blocoProvaId,
            });
        } else if (blocoId) {
             setFormData(prev => ({ ...prev, blocoProvaId: blocoId }));
        }
    }, [quesitoToEdit, blocoId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        // Verificação segura para checkbox
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'notaMaximaQuesito' ? Number(value) : value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.nomeQuesito.trim() === '' || formData.notaMaximaQuesito <= 0) {
                toast.warning('Preencha nome e nota máxima.');
                return;
            }

            const payload: Quesitos = {
                idQuesito: formData.idQuesito || 0,
                nomeQuesito: formData.nomeQuesito,
                notaMaximaQuesito: formData.notaMaximaQuesito,
                danca: formData.danca,
                dancaSalaoTradicional: formData.dancaSalaoTradicional,
                blocoProvaId: formData.blocoProvaId,
                subQuesitos: quesitoToEdit?.subQuesitos || []
            };

            console.log('Salvando Quesito:', payload);
            // Aqui entraria a chamada da API (await criarQuesito...)
            
            toast.success(quesitoToEdit ? 'Quesito atualizado!' : 'Quesito criado!');
            onClose();
        } catch (error) {
            console.error("Erro ao salvar quesito:", error);
            toast.error('Erro ao salvar quesito.');
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {quesitoToEdit ? 'Editar' : 'Criar'} Quesito
            </h1>

            <form onSubmit={handleSubmit}>
                
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1" htmlFor="nomeQuesito">
                        Nome do Quesito
                    </label>
                    <input
                        type="text"
                        id="nomeQuesito"
                        name="nomeQuesito"
                        value={formData.nomeQuesito}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1" htmlFor="notaMaximaQuesito">
                        Nota Máxima
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        id="notaMaximaQuesito"
                        name="notaMaximaQuesito"
                        value={formData.notaMaximaQuesito}
                        onChange={handleChange}
                        required
                        min="0"
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex items-center mb-4 gap-2">
                    <input
                        type="checkbox"
                        id="danca"
                        name="danca"
                        checked={formData.danca}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label className="text-sm font-medium" htmlFor="danca">
                        Este quesito envolve avaliação de Dança?
                    </label>
                </div>

                {formData.danca && (
                    <div className="flex flex-col mb-6">
                        <label className="text-sm font-medium mb-1" htmlFor="dancaSalaoTradicional">
                            Tipo de Dança
                        </label>
                        <select
                            id="dancaSalaoTradicional"
                            name="dancaSalaoTradicional"
                            value={formData.dancaSalaoTradicional}
                            onChange={handleChange}
                            className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value={DancaSalaoTradicional.NENHUMA}>Nenhuma</option>
                            <option value={DancaSalaoTradicional.SALAO}>Dança de Salão</option>
                            <option value={DancaSalaoTradicional.TRADICIONAL}>Dança Tradicional</option>
                        </select>
                    </div>
                )}

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
                        {quesitoToEdit ? 'Salvar alterações' : 'Criar'}
                    </button>
                </div>
            </form>
        </div>
    );
}