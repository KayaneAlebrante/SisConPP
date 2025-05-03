import { useState, useEffect } from 'react';
import { Credenciamento, Funcao, Usuario } from '../../types/Usuario';
import { CTG } from '../../types/CTG';
import { toast } from 'react-toastify';
import { cadastrarUsuario, listarCTGs, atualizarUsuario } from '../../services/api';

interface AuxiliarFormProps {
    onClose: () => void;
    auxiliarToEdit?: Usuario;
}

const estados = ['Paraná', 'Santa Catarina', 'Rio Grande do Sul'];

export default function AuxiliarForm({ onClose, auxiliarToEdit }: AuxiliarFormProps) {
    const [formData, setFormData] = useState<Usuario>({
        idUsuario: 0,
        nomeCompleto: '',
        cidade: '',
        estado: '',
        CTGId: 0,
        numCarteirinha: '',
        login: '',
        senha: '',
        funcao: Funcao.AUXILIAR,
        numCredenciamento: Credenciamento.NAO_CREDENCIADO,
        comissaoUsuarioId: 0,
    });

    const [ctgs, setCTGs] = useState<{ id: string; nome: string }[]>([]);

    useEffect(() => {
        const fetchCTGs = async () => {
            try {
                const response = await listarCTGs();
                const mappedCTGs = (response as CTG[]).map(ctg => ({
                    id: ctg.idCTG.toString(),
                    nome: ctg.nomeCTG,
                }));
                setCTGs(mappedCTGs);
            } catch (error) {
                console.error('Erro ao buscar CTGs:', error);
            }
        };
        fetchCTGs();
    }, []);

    useEffect(() => {
        if (auxiliarToEdit) {
            setFormData({
                ...auxiliarToEdit,
                CTGId: auxiliarToEdit.CTGId,
                funcao: Funcao.AUXILIAR, 
            });
        } else {
            setFormData({
                idUsuario: 0,
                nomeCompleto: '',
                cidade: '',
                estado: '',
                CTGId: 0,
                numCarteirinha: '',
                login: '',
                senha: '',
                funcao: Funcao.AUXILIAR,
                numCredenciamento: Credenciamento.NAO_CREDENCIADO,
                comissaoUsuarioId: 0,
            });
        }
    }, [auxiliarToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: ['CTGId', 'comissaoUsuarioId'].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const auxiliarPayload: Usuario = {
                ...formData,
                funcao: Funcao.AUXILIAR,
            };

            console.log("Auxiliar", auxiliarPayload);

            if (formData.senha.trim()) {
                auxiliarPayload.senha = formData.senha;
            }

            console.log('Payload enviado:', auxiliarPayload);

            if (formData.idUsuario > 0) {
                await atualizarUsuario(auxiliarPayload);
                toast.success('Auxiliar atualizado com sucesso!');
            } else {
                await cadastrarUsuario(auxiliarPayload);
                toast.success('Auxiliar cadastrado com sucesso!');
            }

            onClose();
        } catch (error) {
            console.error('Erro ao salvar Auxiliar:', error);
            toast.error('Erro ao salvar Auxiliar. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="w-full max-w-xl">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {auxiliarToEdit ? 'Editar' : 'Cadastrar'} Auxiliar
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Nome Completo</label>
                    <input
                        type="text"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Cidade</label>
                    <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Estado</label>
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="" disabled>Selecione um estado</option>
                        {estados.map(estado => (
                            <option key={estado} value={estado}>{estado}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">CTG</label>
                    <select
                        name="CTGId"
                        value={formData.CTGId}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Selecione um CTG</option>
                        {ctgs.map(ctg => (
                            <option key={ctg.id} value={ctg.id}>{ctg.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Número da Carteirinha</label>
                    <input
                        type="text"
                        name="numCarteirinha"
                        value={formData.numCarteirinha}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Número de Credenciamento</label>
                    <select
                        name="numCredenciamento"
                        value={formData.numCredenciamento}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Selecione uma Opção</option>
                        <option value={Credenciamento.CREDENCIADO}>Credenciado</option>
                        <option value={Credenciamento.NAO_CREDENCIADO}>Não Credenciado</option>
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Login</label>
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="text-sm font-medium mb-1">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required={!auxiliarToEdit}
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
                        {auxiliarToEdit ? 'Salvar alterações' : 'Cadastrar Auxiliar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
