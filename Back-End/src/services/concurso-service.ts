import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class ConcursoService{
    constructor(prisma: PrismaClient){}

}

const concursoService = new ConcursoService(prisma);
export default concursoService;