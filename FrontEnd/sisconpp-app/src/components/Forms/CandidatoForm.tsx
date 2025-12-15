import React, { useEffect, useState } from "react";
import { Candidato, ProvaCampeiraEsportiva } from "../../types/Candidato";
import { CTG } from '../../types/CTG';
import { atualizarCandidato, cadastrarCandidato, listarCTGs, listarCategorias } from '../../services/api';
import { Categoria } from "../../types/Categoria";
import { toast } from "react-toastify";

interface CandidatoFormProps {
    onClose: () => void;
    candidatoToEdit?: Candidato;
}

const estados = [
    'Paraná', 'Santa Catarina', 'Rio Grande do Sul'
];

export default function CandidatoForm({ onClose, candidatoToEdit }: CandidatoFormProps) {
    const [formData, setFormData] = useState<Candidato>({
        idCandidato: 0,
        nomeCompleto: '',
        cidade: '',
        estado: '',
        CTGId: 0,
        numCarteirinha: '',
        CPF: '',
        RG: '',
        endereco: '',
        numEndereco: 0,
        bairro: '',
        escolaridade: '',
        filiacaoPai: '', // Inicializando separado
        filiacaoMae: '', // Inicializando separado
        ProvaCampeiraEsportiva: undefined,
        anexoFoto: undefined,
        anexoDocumento: undefined,
        anexoCarteirinha: undefined,
        anexoEscolaridade: undefined,
        anexoResidencia: undefined,
        anexoAtaConcurso: undefined,
        fichaInscricao: undefined,
        anexoTermoCandidato: undefined,
        anexoRelatorioVivencia: undefined,
        anexoResponsavel: undefined,
        anexoProvaEsportivaCampeira: undefined,
        categoriaId: 0
    });

    const [ctgs, setCTGs] = useState<{ id: string; nome: string }[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

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
        const fetchCategorias = async () => {
            try {
                const response = await listarCategorias();
                setCategorias(response as Categoria[]);
            } catch (error) {
                console.error('Erro ao buscar Categorias:', error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        if (candidatoToEdit) {
            setFormData({
                idCandidato: candidatoToEdit.idCandidato,
                nomeCompleto: candidatoToEdit.nomeCompleto || '',
                cidade: candidatoToEdit.cidade || '',
                estado: candidatoToEdit.estado || '',
                CTGId: candidatoToEdit.CTGId || 0,
                numCarteirinha: candidatoToEdit.numCarteirinha || '',
                CPF: candidatoToEdit.CPF || '',
                RG: candidatoToEdit.RG || '',
                endereco: candidatoToEdit.endereco || '',
                numEndereco: candidatoToEdit.numEndereco || 0,
                bairro: candidatoToEdit.bairro || '',
                escolaridade: candidatoToEdit.escolaridade || '',
                filiacaoPai: candidatoToEdit.filiacaoPai || '', // Carrega Pai
                filiacaoMae: candidatoToEdit.filiacaoMae || '', // Carrega Mãe
                ProvaCampeiraEsportiva: candidatoToEdit.ProvaCampeiraEsportiva,
                anexoFoto: candidatoToEdit.anexoFoto,
                anexoDocumento: candidatoToEdit.anexoDocumento,
                anexoCarteirinha: candidatoToEdit.anexoCarteirinha,
                anexoEscolaridade: candidatoToEdit.anexoEscolaridade,
                anexoResidencia: candidatoToEdit.anexoResidencia,
                anexoAtaConcurso: candidatoToEdit.anexoAtaConcurso,
                fichaInscricao: candidatoToEdit.fichaInscricao,
                anexoTermoCandidato: candidatoToEdit.anexoTermoCandidato,
                anexoRelatorioVivencia: candidatoToEdit.anexoRelatorioVivencia,
                anexoResponsavel: candidatoToEdit.anexoResponsavel,
                anexoProvaEsportivaCampeira: candidatoToEdit.anexoProvaEsportivaCampeira,
                categoriaId: candidatoToEdit.categoriaId || 0
            });
        }
    }, [candidatoToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'CTGId' || name === 'numEndereco' || name === 'categoriaId' ? Number(value) : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const candidatoPayload: Candidato ={
                idCandidato: formData.idCandidato,
                nomeCompleto: formData.nomeCompleto,
                cidade: formData.cidade,
                estado: formData.estado,
                CTGId: formData.CTGId,
                numCarteirinha: formData.numCarteirinha,
                categoriaId: formData.categoriaId,
                CPF: formData.CPF,
                RG: formData.RG,
                endereco: formData.endereco,
                numEndereco: formData.numEndereco,
                bairro: formData.bairro,
                escolaridade: formData.escolaridade,
                filiacaoPai: formData.filiacaoPai, // Envia Pai
                filiacaoMae: formData.filiacaoMae, // Envia Mãe
                ProvaCampeiraEsportiva: formData.ProvaCampeiraEsportiva,
                anexoFoto: formData.anexoFoto || undefined,
                anexoDocumento: formData.anexoDocumento || undefined,
                anexoCarteirinha: formData.anexoCarteirinha || undefined,
                anexoEscolaridade: formData.anexoEscolaridade || undefined,
                anexoResidencia: formData.anexoResidencia || undefined,
                anexoAtaConcurso: formData.anexoAtaConcurso || undefined,
                fichaInscricao: formData.fichaInscricao || undefined,
                anexoTermoCandidato: formData.anexoTermoCandidato || undefined,
                anexoRelatorioVivencia: formData.anexoRelatorioVivencia || undefined,
                anexoResponsavel: formData.anexoResponsavel || undefined,
                anexoProvaEsportivaCampeira: formData.anexoProvaEsportivaCampeira || undefined,
            };

            console.log(candidatoPayload);

            if (formData.idCandidato > 0) {
                await atualizarCandidato(candidatoPayload);
                toast.success('Candidato atualizado com sucesso!');
            } else {
                await cadastrarCandidato(candidatoPayload);
                toast.success('Candidato cadastrado com sucesso!');
            }
            
            onClose();
        }catch(error){
            console.error("Erro ao salvar Candidato", error);
            toast.error("Erro ao salvar Cadidato. Verefique os dados e tente novamente");
        }

    };
    

    return (
        <div className="w-full">
            <h1 className="xt-xl font-semibold text-neutral-onBackground mb-4">
                {candidatoToEdit ? 'Editar' : 'Cadastrar'} Candidato
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
                    <label className="text-sm font-medium mb-1">CPF</label>
                    <input
                        type="text"
                        name="CPF"
                        value={formData.CPF}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">RG</label>
                    <input
                        type="text"
                        name="RG"
                        value={formData.RG}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Endereço Residencial</label>
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Número</label>
                    <input
                        type="number"
                        name="numEndereco"
                        value={formData.numEndereco}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Bairro</label>
                    <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Escolaridade</label>
                    <select
                        name="escolaridade"
                        value={formData.escolaridade}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Selecione uma Opção</option>
                        <option value="Analfabeto">Analfabeto</option>
                        <option value="Ensino Fundamental - Cursando">Ensino Fundamental - Cursando</option>
                        <option value="Ensino Fundamental - Completo">Ensino Fundamental - Completo</option>
                        <option value="Ensino Médio - Cursando">Ensino Médio - Cursando</option>
                        <option value="Ensino Médio - Completo">Ensino Médio - Completo</option>
                        <option value="Ensino Técnico - Cursando">Ensino Técnico - Cursando</option>
                        <option value="Ensino Técnico - Completo">Ensino Técnico - Completo</option>
                        <option value="Ensino Superior - Cursando">Ensino Superior - Cursando</option>
                        <option value="Ensino Superior - Completo">Ensino Superior - Completo</option>
                        <option value="Pós-graduação - Cursando">Pós-graduação - Cursando</option>
                        <option value="Pós-graduação - Completo">Pós-graduação - Completo</option>
                        <option value="Mestrado - Cursando">Mestrado - Cursando</option>
                        <option value="Mestrado - Completo">Mestrado - Completo</option>
                        <option value="Doutorado - Cursando">Doutorado - Cursando</option>
                        <option value="Doutorado - Completo">Doutorado - Completo</option>
                    </select>
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">Filiação</h3>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Pai</label>
                    <input
                        type="text"
                        name="filiacaoPai"
                        value={formData.filiacaoPai}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Mãe</label>
                    <input
                        type="text"
                        name="filiacaoMae"
                        value={formData.filiacaoMae}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Categoria</label>
                    <select
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Selecione uma Categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nomeCategoria}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Prova Campeira e Esportiva</label>
                    <select
                        name="ProvaCampeiraEsportiva"
                        value={formData.ProvaCampeiraEsportiva}
                        onChange={handleChange}
                        required
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Selecione uma Opção</option>
                        <option value={ProvaCampeiraEsportiva.AMBAS}>Campeira e Esportiva</option>
                        <option value={ProvaCampeiraEsportiva.CAMPEIRA}>Campeira</option>
                        <option value={ProvaCampeiraEsportiva.ESPORTIVA}>Esportiva</option>
                        <option value={ProvaCampeiraEsportiva.NENHUMA}>Nenhuma</option>
                    </select>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Foto Candidato</label>
                    <input
                        type="file"
                        name="anexoFoto"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Documento com Foto</label>
                    <input
                        type="file"
                        name="anexoDocumento"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Carteirinha do MTG-PR</label>
                    <input
                        type="file"
                        name="anexoCarteirinha"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Comprovante de Escolaridade</label>
                    <input
                        type="file"
                        name="anexoEscolaridade"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Comprovante de Residência</label>
                    <input
                        type="file"
                        name="anexoResidencia"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Ata Concruso</label>
                    <input
                        type="file"
                        name="anexoAtaConcurso"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Ficha de Inscrição</label>
                    <input
                        type="file"
                        name="fichaInscricao"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Termo de Responsabilidade do Candidato</label>
                    <input
                        type="file"
                        name="anexoTermoCandidato"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Termo de Responsabilidade do Responsavel</label>
                    <input
                        type="file"
                        name="anexoResponsavel"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Relatorio da vivência Tradicionalista</label>
                    <input
                        type="file"
                        name="anexoRelatorioVivencia"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Relação de Prova Campeira e Esportiva</label>
                    <input
                        type="file"
                        name="anexoProvaEsportivaCampeira"
                        onChange={handleFileChange}
                        className="rounded-lg p-2 bg-surface-containerHigh border border-outline"
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
                        {candidatoToEdit ? 'Salvar alterações' : 'Cadastrar Candidato'}
                    </button>
                </div>
            </form>
        </div>
    );
}