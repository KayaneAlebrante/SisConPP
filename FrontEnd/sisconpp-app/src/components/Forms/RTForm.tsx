import React, { useState } from 'react';
import { cadastrarRT } from '../../services/api';
import { RT } from '../../types/RT';
import { toast } from 'react-toastify';

export default function RTForm() {
  const [formData, setFormData] = useState<RT>({
    idRT: 0,
    nomeRT: '',
    numeroRT: 0,
  });

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
      await cadastrarRT(formData);
      toast.success('Região Tradicionalista cadastrada com sucesso!');
      setFormData({ idRT: 0, nomeRT: '', numeroRT: 0 });
    } catch (error) {
      console.error('Erro ao cadastrar RT:', error);
      toast.error('Erro ao cadastrar RT. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="flex flex-row h-screen w-full bg-neutral-background overflow-hidden">
      <div className="flex-grow p-4 bg-neutral-background flex justify-center">
        <div className="w-full max-w-4xl m-20 bg-surface-containerHigh p-8 rounded-lg shadow-lg aling-center">
          <h1 className="text-2xl font-bold text-neutral-onBackground mb-6">Cadastrar Região Tradicionalista</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-2">
              <label className="text-sm font-medium text-neutral-onBackground">
                Nome da Região Tradicionalista
              </label>
              <input
                type="text"
                name="nomeRT"
                value={formData.nomeRT}
                onChange={handleChange}
                className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
                placeholder="Nome da Região Tradicionalista"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="text-sm font-medium text-neutral-onBackground">
                Número da Região Tradicionalista
              </label>
              <input
                type="number"
                name="numeroRT"
                value={formData.numeroRT}
                onChange={handleChange}
                className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
                required
              />
            </div>

            <button
              className="w-full mt-4 py-2 bg-secondary text-secondary-on font-medium rounded-lg hover:bg-secondary-dark transition duration-200"
              type="submit"
            >
              Cadastrar Região Tradicionalista!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}