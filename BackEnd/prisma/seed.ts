import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // =========================
    // QUESITOS
    // =========================
    await prisma.quesitos.createMany({
        data: [
            // =========================
            // DANÇAS DE SALÃO
            // =========================
            { nomeQuesito: "Valsa", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Vaneira", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Chamamé", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Bugio", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Milonga", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Chote", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { nomeQuesito: "Rancheira", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_DE_SALAO" },

            // =========================
            // DANÇAS TRADICIONAIS
            // =========================
            { nomeQuesito: "Chico Sapateado", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Chimarrita Balão", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Chote Carreirinho", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Chote de Duas Damas", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Chote das Sete Voltas", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Havaneira Marcada", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Pezinho", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Rancheira de Carreirinha", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Tatu (Tatu de Castanholas)", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Tatu com Volta no Meio", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { nomeQuesito: "Tirana do Lenço", notaMaximaQuesito: 5, danca: true, opcional: true, dancaSalaoTradicional: "DANCA_TRADICIONAL" },
        ]
    });
    console.log("✅ Quesitos de dança criados com sucesso!");

    // =========================
    // CATEGORIAS
    // =========================
    await prisma.categoria.createMany({
        data: [
            { nomeCategoria: "Prenda Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 7, idadeLimite: 12 },
            { nomeCategoria: "Peão Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 7, idadeLimite: 12 },
            { nomeCategoria: "Prenda Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 12, idadeLimite: 17 },
            { nomeCategoria: "Peão Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 12, idadeLimite: 17 },
            { nomeCategoria: "Prenda Adulta", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0 },
            { nomeCategoria: "Peão Adulto", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0 },
            { nomeCategoria: "Prenda Veterana", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0 },
            { nomeCategoria: "Peão Veterano", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0 },
            { nomeCategoria: "Prenda Xirua", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0 },
            { nomeCategoria: "Peão Xirú", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0 },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Categorias criadas com sucesso!");

    // =========================
    // REGIÕES TRADICIONALISTAS
    // =========================
    await prisma.rT.createMany({
        data: Array.from({ length: 18 }).map((_, index) => ({
            nomeRT: (index + 1) + " Região Tradicionalista",
            numeroRT: index + 1,
        })),
        skipDuplicates: true,
    });
    console.log("✅ RTs criadas com sucesso!");

    // =========================
    // CTG
    // =========================
    const ctg = await prisma.cTG.create({
        data: {
            nomeCTG: "CTG Fronteira da Amizade",
            RTid: 17,
        },
    });
    console.log("✅ CTG criado com sucesso!");

    // =========================
    // USUÁRIO SECRETÁRIO
    // =========================
    const senhaHash = await bcrypt.hash("12345", 10);
    await prisma.usuario.create({
        data: {
            nomeCompleto: "Kayane Alebrante",
            cidade: "União da Vitória",
            estado: "PR",
            CTGId: ctg.idCTG,
            numCarteirinha: "123456",
            login: "kayane",
            senha: senhaHash,
            funcao: "SECRETARIO",
            credenciamento: "CREDENCIADO",
            numCredenciamento: 10,
        },
    });
    console.log("🌱 Seed executado com sucesso!");
}
main()
    .catch((e) => {
        console.error("Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });