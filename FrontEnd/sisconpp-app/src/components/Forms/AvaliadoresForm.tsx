import { useState, useEffect } from 'react';
import { Funcao, Usuario } from '../../types/Usuario';
import { CTG } from '../../types/CTG';
import { toast } from 'react-toastify';
import { cadastrarUsuario, listarCTGs, atualizarUsuario } from '../../services/api'; // <- 

interface AvaliadorFormProps {
    onClose: () => void;
    avaliadorToEdit?: Usuario;
}

const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];


export default function AvaliadoresForm({ onClose, avaliadorToEdit }: AvaliadorFormProps) {
    const [formData, setFormData] = useState<Usuario>({
        idUsuario: 0,
        pessoaId: 0,
        nomeCompleto: '',
        cidade: '',
        estado: '',
        CTGId: 0,
        numCarteirinha: '',
        login: '',
        senha: '',
        funcao: Funcao.AVALIADOR,
        comissaoIdUsuario: 0,
        concursoId: 0,
        numCredenciamento: '',
    });


    const [ctgs, setCTGs] = useState<{ id: string; nome: string }[]>([]);

    useEffect(() => {
        const fetchCTGs = async () => {
            try {
                const response = await listarCTGs();
                const mappedCTGs = (response as CTG[]).map(ctg => ({
                    id: ctg.idCTG.toString(),
                    nome: ctg.nomeCTG
                }));
                setCTGs(mappedCTGs);
            } catch (error) {
                console.error('Erro ao buscar CTGs:', error);
            }
        };
        fetchCTGs();
    }, []);

    useEffect(() => {
        if (avaliadorToEdit) {
            setFormData({
                idUsuario: avaliadorToEdit.idUsuario,
                pessoaId: avaliadorToEdit.pessoaId || 0,
                nomeCompleto: avaliadorToEdit.nomeCompleto || '',
                cidade: avaliadorToEdit.cidade || '',
                estado: avaliadorToEdit.estado || '',
                CTGId: avaliadorToEdit.CTGId || 0,
                numCarteirinha: avaliadorToEdit.numCarteirinha || '',
                login: avaliadorToEdit.login,
                senha: avaliadorToEdit.senha,
                funcao: avaliadorToEdit.funcao,
                concursoId: avaliadorToEdit.concursoId,
                comissaoIdUsuario: avaliadorToEdit.comissaoIdUsuario || 0,
                numCredenciamento: avaliadorToEdit.numCredenciamento || '',
            });
        }
    }, [avaliadorToEdit]);

    useEffect(() => {
        if (avaliadorToEdit) {
            setFormData({
                ...avaliadorToEdit,
                CTGId: avaliadorToEdit.CTGId,
                concursoId: avaliadorToEdit.concursoId
            });
        } else {
            setFormData({
                idUsuario: 0,
                pessoaId: 0,
                nomeCompleto: '',
                cidade: '',
                estado: '',
                CTGId: 0,
                numCarteirinha: '',
                login: '',
                senha: '',
                funcao: Funcao.AVALIADOR,
                concursoId: 0,
                comissaoIdUsuario: 0,
                numCredenciamento: '',
            });
        }
    }, [avaliadorToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
          ...prev,
          [name]: (name === 'concursoId' || name === 'CTGId') ? Number(value) : value
        }));
    };      

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const avaliadorPayload: Usuario = {
                idUsuario: formData.idUsuario,
                pessoaId: formData.pessoaId,
                nomeCompleto: formData.nomeCompleto,
                cidade: formData.cidade,
                estado: formData.estado,
                CTGId: formData.CTGId,
                numCarteirinha: formData.numCarteirinha,
                login: formData.login,
                senha: formData.senha,
                funcao: formData.funcao,
                concursoId: formData.concursoId,
                comissaoIdUsuario: formData.comissaoIdUsuario,
                numCredenciamento: formData.numCredenciamento,
            };
              
            if (formData.senha.trim()) {
                avaliadorPayload.senha = formData.senha;
            }

            console.log('Payload enviado:', avaliadorPayload);

            if (avaliadorToEdit) {
                await atualizarUsuario(avaliadorPayload);
                toast.success('Avaliador atualizado com sucesso!');
            } else {
                await cadastrarUsuario(avaliadorPayload);
                toast.success('Avaliador cadastrado com sucesso!');
            }

            onClose();
        } catch (error) {
            console.error('Erro ao salvar Avaliador:', error);
            toast.error('Erro ao salvar Avaliador. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="w-full max-w-xl">
            <h1 className="text-xl font-semibold text-neutral-onBackground mb-4">
                {avaliadorToEdit ? 'Editar' : 'Cadastrar'} Avaliador
            </h1>
            <form onSubmit={handleSubmit}>
                {/* Campos */}
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
                        <option value="" disabled>Selecione um CTG</option>
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
                    <input
                        type="text"
                        name="numCredenciamento"
                        value={formData.numCredenciamento}
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">ID do Concurso</label>
                    <input
                        type="number"
                        name="concursoId"
                        value={formData.concursoId}
                        onChange={handleChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
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
                        required={!avaliadorToEdit}
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
                        {avaliadorToEdit ? 'Salvar alterações' : 'Cadastrar Avaliador'}
                    </button>
                </div>
            </form>
        </div>
    );
}
