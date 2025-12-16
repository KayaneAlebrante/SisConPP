import React, { useState, useEffect } from 'react';
import { BlocoProva } from '../../../types/ProvaPratica';
import { toast } from 'react-toastify';
import { criarBlocoProva } from '../../../services/api';

export interface BlocoProvaFormState {
    idBloco?: number;
    nomeBloco: string;
    notaMaximaBloco: number;
    provaPraticaId: number;
}

interface BlocoProvaFormProps {
    onClose: () => void;
    blocoToEdit?: BlocoProva;
    provaPraticaId?: number; 
}

export default function BlocoProvaForm({ onClose, blocoToEdit, provaPraticaId }: BlocoProvaFormProps) {

    const [formData, setFormData] = useState<BlocoProvaFormState>({
        nomeBloco: '',
        notaMaximaBloco: 0,
        provaPraticaId: provaPraticaId || 0,
    });

    useEffect(() => {
        if (blocoToEdit) {
            setFormData({
                idBloco: blocoToEdit.idBloco,
                nomeBloco: blocoToEdit.nomeBloco,
                notaMaximaBloco: blocoToEdit.notaMaximaBloco,
                provaPraticaId: blocoToEdit.provaPraticaId,
            });
        } else if (provaPraticaId) {
            setFormData(prev => ({ ...prev, provaPraticaId: provaPraticaId }));
        }
    }, [blocoToEdit, provaPraticaId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'notaMaximaBloco' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validação Básica
            if (formData.nomeBloco.trim() === '' || formData.notaMaximaBloco <= 0) {
                toast.warning('Preencha o nome do bloco e a nota máxima.');
                return;
            }

            const payload: BlocoProva = {
                idBloco: formData.idBloco || 0,
                nomeBloco: formData.nomeBloco,
                notaMaximaBloco: formData.notaMaximaBloco,
                provaPraticaId: formData.provaPraticaId,
                quesitos: blocoToEdit?.quesitos || []
            };

            console.log('Salvando Bloco:', payload);
            await criarBlocoProva(payload);            
            toast.success(blocoToEdit ? 'Bloco atualizado!' : 'Bloco criado!');
            onClose();

        } catch (error) {
            console.error("Erro ao salvar bloco:", error);
            toast.error('Erro ao salvar bloco.');
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {blocoToEdit ? 'Editar' : 'Criar'} Bloco de Prova
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1" htmlFor="nomeBloco">
                        Nome do Bloco
                    </label>
                    <input
                        type="text"
                        id="nomeBloco"
                        name="nomeBloco"
                        value={formData.nomeBloco}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Bloco Artístico"
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="text-sm font-medium mb-1" htmlFor="notaMaximaBloco">
                        Nota Máxima do Bloco
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        id="notaMaximaBloco"
                        name="notaMaximaBloco"
                        value={formData.notaMaximaBloco}
                        onChange={handleChange}
                        required
                        min="0"
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
                        {blocoToEdit ? 'Salvar alterações' : 'Criar Bloco'}
                    </button>
                </div>
            </form>
        </div>
    );
}