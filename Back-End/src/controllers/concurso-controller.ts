import { Request, Response } from "express";
import concursoService from "../services/concurso-service";

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
}

export default new ConcursoController();