import React, { useEffect, useState } from 'react';
import { Concurso } from '../../types/Concurso';
import { cadastrarConcurso, atualizarConcurso } from '../../services/api';
import { toast } from 'react-toastify';

interface ConcursoFormProps {
  onClose: () => void;
  concursoToEdit?: Concurso;
}

export default function ConcursoForm({ onClose, concursoToEdit }: ConcursoFormProps) {
  const [formData, setFormData] = useState<Concurso>({
    idConcurso: 0,
    nomeConcurso: '',
    lancamentoEdital: new Date(),
    inscricoesInicio: new Date(),
    inscricoesFinal: new Date(),
    dataProvaEscrita: new Date(),
    dataProvasPraticas: new Date(),
    dataResultado: new Date(),
    local: '',
    anexoEdital: undefined,
  });

  useEffect(() => {
    if (concursoToEdit) {
      setFormData(concursoToEdit);
    }
  }, [concursoToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'date' ? new Date(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        anexoEdital: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.idConcurso > 0 ) {
        await atualizarConcurso(formData);
        toast.success('Concurso atualizado com sucesso!');
      } else {
        await cadastrarConcurso(formData);
        toast.success('Concurso cadastrado com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar Concurso:', error);
      toast.error('Erro ao salvar Concurso. Verifique os dados e tente novamente.');
    }
  };

  const renderDate = (date: Date) => new Date(date).toISOString().split('T')[0];

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl font-semibold text-neutral-onBackground mb-4">
        {concursoToEdit ? 'Editar' : 'Cadastrar'} Concurso
      </h2>

      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nome do Concurso', name: 'nomeConcurso', type: 'text' },
          { label: 'Lançamento do Edital', name: 'lancamentoEdital', type: 'date' },
          { label: 'Início das Inscrições', name: 'inscricoesInicio', type: 'date' },
          { label: 'Final das Inscrições', name: 'inscricoesFinal', type: 'date' },
          { label: 'Data da Prova Escrita', name: 'dataProvaEscrita', type: 'date' },
          { label: 'Data das Provas Práticas', name: 'dataProvasPraticas', type: 'date' },
          { label: 'Data do Resultado', name: 'dataResultado', type: 'date' },
          { label: 'Local', name: 'local', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col mb-4">
            <label className="text-sm font-medium text-neutral-onBackground mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={
                type === 'date'
                  ? renderDate(formData[name as keyof Concurso] as Date)
                  : formData[name as keyof Concurso] as string
              }
              onChange={handleChange}
              className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary text-neutral-onBackground"
              required
            />
          </div>
        ))}

        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-neutral-onBackground mb-1">
            Anexo do Edital
          </label>
          <input
            type="file"
            name="anexoEdital"
            onChange={handleFileChange}
            className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
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
            {concursoToEdit ? 'Salvar alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
