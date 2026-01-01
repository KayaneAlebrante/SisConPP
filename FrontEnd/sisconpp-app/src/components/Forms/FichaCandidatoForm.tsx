import React, { useEffect, useState } from "react";
import { FichaCandidatoPayload } from "../../types/Candidato";
import { Concurso } from "../../types/Concurso";
import { criarFichaCandidato, listarConcurso } from "../../services/api";
import { toast } from "react-toastify";

interface FichaCandidatoProps {
    onClose: () => void;
    candidatoToEdit: FichaCandidatoPayload;
}

export default function FichaCandidatoForm({
    onClose,
    candidatoToEdit,
}: FichaCandidatoProps) {
    const [formData, setFormData] = useState<FichaCandidatoPayload>({
        candidatoId: 0,
        concursoId: 0,
    });

    const [concursos, setConcursos] = useState<Concurso[]>([]);

    useEffect(() => {
        if (candidatoToEdit) {
            setFormData({
                candidatoId: candidatoToEdit.candidatoId,
                concursoId: candidatoToEdit.concursoId ?? 0,
            });
        }
    }, [candidatoToEdit]);

    useEffect(() => {
        const fetchConcursos = async () => {
            try {
                const response = (await listarConcurso()) as Concurso[];
                setConcursos(response);
            } catch (error) {
                console.error("Erro ao buscar concursos", error);
            }
        };

        fetchConcursos();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fichaCandidatoPayload: FichaCandidatoPayload = {
            candidatoId: formData.candidatoId,
            concursoId: formData.concursoId,
        };

        console.log("Payload enviado:", fichaCandidatoPayload);

        await criarFichaCandidato(fichaCandidatoPayload);
        toast.success("Ficha Candidato criacada com sucesso!");

        onClose();
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                Ficha Candidato
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">
                        Concurso
                    </label>

                    <select
                        name="concursoId"
                        value={formData.concursoId}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value={0} disabled>
                            Selecione um concurso
                        </option>

                        {concursos.map((concurso) => (
                            <option
                                key={concurso.idConcurso}
                                value={concurso.idConcurso}
                            >
                                {concurso.nomeConcurso}
                            </option>
                        ))}
                    </select>
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
                        Salvar Ficha Candidato
                    </button>
                </div>
            </form>
        </div>
    );
}
