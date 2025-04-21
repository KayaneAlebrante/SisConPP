import React, { useEffect, useState } from 'react';
import { cadastrarRT, atualizarRT } from '../../services/api';
import { RT } from '../../types/RT';
import { toast } from 'react-toastify';

interface RTFormProps {
  onClose: () => void;
  rtToEdit?: RT;
}

export default function RTForm({ onClose, rtToEdit }: RTFormProps) {
  const [formData, setFormData] = useState<RT>({
    idRT: 0,
    nomeRT: '',
    numeroRT: 0,
  });

  useEffect(() => {
    if (rtToEdit) {
      setFormData(rtToEdit);
    }
  }, [rtToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numeroRT' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (rtToEdit) {
        await atualizarRT(formData);
        toast.success('RT atualizada com sucesso!');
      } else {
        await cadastrarRT(formData);
        toast.success('RT cadastrada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar RT:', error);
      toast.error('Erro ao salvar RT. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl font-semibold text-neutral-onBackground mb-4">
        {rtToEdit ? 'Editar' : 'Cadastrar'} Região Tradicionalista
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-neutral-onBackground mb-1">
            Nome da Região Tradicionalista
          </label>
          <input
            type="text"
            name="nomeRT"
            value={formData.nomeRT}
            onChange={handleChange}
            className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-neutral-onBackground mb-1">
            Número da Região Tradicionalista
          </label>
          <input
            type="number"
            name="numeroRT"
            value={formData.numeroRT}
            onChange={handleChange}
            className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
            required
          />
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
            {rtToEdit ? 'Salvar alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}