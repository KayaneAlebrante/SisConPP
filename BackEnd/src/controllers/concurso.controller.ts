import { Request, Response } from "express";
import concursoService from "../services/concurso.service";
import AppError from "../errors/AppError";

class ConcursoController{
    async criarConcurso(req: Request, res: Response){
        const{
            nomeConcurso,
            lancamentoEdital,
            inscricoesInicio,
            inscricoesFinal,
            dataProvaEscrita,
            dataProvasPraticas,
            dataResultado,
            local

        } = req.body;

        if(!nomeConcurso || !lancamentoEdital || !inscricoesInicio || !inscricoesFinal || !inscricoesFinal || !dataProvaEscrita || !dataProvasPraticas || !dataResultado || !local){
            return res.status(400).json({mensagem: "nomeConcurso, ancamentoEdital, inscricoesInicio, inscricoesFinal, dataProvaEscrita, dataProvasPraticas, dataResultado, local são Obrigatórios"});
        }

        try{
            const concurso = await concursoService.criarConcurso(
                nomeConcurso,
                lancamentoEdital,
                inscricoesInicio,
                inscricoesFinal,
                dataProvaEscrita,
                dataProvasPraticas,
                dataResultado,
                local
            );

            return res.status(201).json(concurso);
        }catch(error:unknown){
            if(error instanceof Error){
                console.error("Erro ao criar concurso:", error);
                return res.status(400).json({mensagem: error.message});
            }else{
                console.error("Erro desconhecido:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async atualizarConcurso(req: Request, res: Response){
        const { id } = req.params;
        const data = req.body;

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({ mensagem: "Dados para atualização são obrigatórios." });
        }

        try{
            const{
                nomeConcurso,
                lancamentoEdital,
                inscricoesInicio,
                inscricoesFinal,
                dataProvaEscrita,
                dataProvasPraticas,
                dataResultado,
                local
            } = data;

            const concurso = {
                nomeConcurso,
                lancamentoEdital,
                inscricoesInicio,
                inscricoesFinal,
                dataProvaEscrita,
                dataProvasPraticas, 
                dataResultado,
                local
            };

            const Concurso = await concursoService.atualizarConcurso(Number(id), concurso);
            return res.status(200).json(Concurso);
        }catch(error: unknown){
            if(error instanceof Error){
                return res.status(400).json({ mensagem: error.message });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(400).json({ mensagem: "Erro desconhecido." });
            }
        }
    }

    async buscarConcursoPorId(req: Request, res: Response){
        const{ id } = req.params;

        try{
            const concurso = await concursoService.buscarConcursoPorId(Number(id));
            return res.status(200).json(concurso);
        }catch(error: unknown){
            if(error instanceof Error){
                console.log("Erro ao buscar concurso:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }
    
    async buscarConcursos(req: Request, res: Response){
        try{
            const concursos = await concursoService.buscarConcursos();
            return res.status(200).json(concursos);
        }catch(error: unknown){
            if(error instanceof Error){
                console.log("Erro ao buscar concursos:", error);
                return res.status(400).json({mensagem: "Erro desconhecido."});
            }
        }
    }

    async deletarConcurso(req: Request, res: Response){
        const { id } = req.params;

        try{
            await concursoService.deletarConcuro(Number(id));
            return res.status(204).send();
        }catch(error: unknown){
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            console.error("Erro desconhecido ao deletar concurso:", error);
            return res.status(500).json({ message: "Erro desconhecido." });
        }
    }

    async anexarEdital(req: Request, res: Response){
        const { id } = req.params;
        const{
            anexoEdital,
        } = req.body;

        try{
            const concurso = await concursoService.anexarEdital(Number(id), anexoEdital);
            return res.status(200).json(concurso);
        }catch(error: unknown){
            if(error instanceof Error){
                console.error("Erro ao anexar Edital.");
                return res.status(400).json({mensahem: error.message});
            }
            return res.status(400).json({mensagem: "Erro desconhecido."});
        }
    }
}

export default new ConcursoController();