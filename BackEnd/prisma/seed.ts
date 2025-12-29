import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // =========================
    // CATEGORIAS
    // =========================
    await prisma.categoria.createMany({
        data: [
            { idCategoria: 1, nomeCategoria: "Prenda Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 7, idadeLimite: 12 },
            { idCategoria: 2, nomeCategoria: "Peão Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 7, idadeLimite: 12 },
            { idCategoria: 3, nomeCategoria: "Prenda Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 12, idadeLimite: 17 },
            { idCategoria: 4, nomeCategoria: "Peão Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 12, idadeLimite: 17 },
            { idCategoria: 5, nomeCategoria: "Prenda Adulta", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0 },
            { idCategoria: 6, nomeCategoria: "Peão Adulto", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0 },
            { idCategoria: 7, nomeCategoria: "Prenda Veterana", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0 },
            { idCategoria: 8, nomeCategoria: "Peão Veterano", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0 },
            { idCategoria: 9, nomeCategoria: "Prenda Xirua", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0 },
            { idCategoria: 10, nomeCategoria: "Peão Xirú", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0 },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Categorias criadas com sucesso!");

    // =========================
    // PROVAS PRÁTICAS
    // =========================
    await prisma.provaPratica.createMany({
        data: [
            { nomeProva: "Prova Pratica Prenda Mirim", notaMaxima: 100 },
            { nomeProva: "Prova Pratica Peão Mirim", notaMaxima: 100 },
            { nomeProva: "Prova Pratica Prenda Juvenil, Adulta, Veterana e Xirua", notaMaxima: 100},
            { nomeProva: "Prova Pratica Peão Juvenil, Adulto, Veterano e Xiru", notaMaxima: 100},
        ]
    });

    await prisma.provaPratica.update({
        where: { idProvaPratica: 1 },
        data: {
            categorias: { connect: [{ idCategoria: 1 }] }
        }
    });

    await prisma.provaPratica.update({
        where: { idProvaPratica: 2 },
        data: {
            categorias: { connect: [{ idCategoria: 2 }] }
        }
    });

    await prisma.provaPratica.update({
        where: { idProvaPratica: 3 },
        data: {
            categorias: { connect: [{ idCategoria: 3 }, { idCategoria: 5 }, { idCategoria: 7 }, { idCategoria: 9 }] }
        }
    });

    await prisma.provaPratica.update({
        where: { idProvaPratica: 4 },
        data: {
            categorias: { connect: [{ idCategoria: 4 }, { idCategoria: 6 }, { idCategoria: 8 }, { idCategoria: 10 }] }
        }
    });

    console.log("✅ Provas Práticas criados com sucesso!");

    // =========================
    // BLOCO PROVA 
    // =========================
    await prisma.blocoProva.createMany({
        data: [
            { nomeBloco: "Prova Oral", notaMaximaBloco: 65, provaPraticaId: 1 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 18, provaPraticaId: 1 },

            { nomeBloco: "Prova Oral", notaMaximaBloco: 65, provaPraticaId: 2 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 18, provaPraticaId: 2 },
            { nomeBloco: "Prova Camepira", notaMaximaBloco: 17, provaPraticaId: 2 },

            { nomeBloco: "Prova Oral", notaMaximaBloco: 63, provaPraticaId: 3 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 25, provaPraticaId: 3 },
            { nomeBloco: "Prova Dotes", notaMaximaBloco: 12, provaPraticaId: 3 },

            { nomeBloco: "Prova Oral", notaMaximaBloco: 62, provaPraticaId: 4 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 19, provaPraticaId: 4 },
            { nomeBloco: "Prova Camepira", notaMaximaBloco: 19, provaPraticaId: 4 }

        ]
    });
    console.log("✅ Bloco Prova criados com sucesso!");

    // =========================
    // QUESITOS
    // =========================

    await prisma.quesitos.createMany({
        data: [
            { nomeQuesito: "Dança Gaúcha de Salão", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 1 },
            { nomeQuesito: "Dança Folclórica Tradicional", notaMaximaQuesito: 5, opcional: true, blocoProvaIdBloco: 1 }
        ]
    });
    // =========================
    // DANÇAS
    // =========================
    await prisma.danca.createMany({
        data: [
            // =========================
            // DANÇAS DE SALÃO
            // =========================
            { idDanca: 1, nomeDanca: "Valsa", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 2, nomeDanca: "Vaneira", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 3, nomeDanca: "Chamamé", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 4, nomeDanca: "Bugio", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 5, nomeDanca: "Milonga", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 6, nomeDanca: "Chote", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },
            { idDanca: 7, nomeDanca: "Rancheira", dancaSalaoTradicional: "DANCA_DE_SALAO", quesitoId: 1 },

            // =========================
            // DANÇAS TRADICIONAIS
            // =========================
            { idDanca: 8, nomeDanca: "Chico Sapateado", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 9, nomeDanca: "Chimarrita Balão", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 10, nomeDanca: "Chote Carreirinho", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 11, nomeDanca: "Chote de Duas Damas", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 12, nomeDanca: "Chote das Sete Voltas", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 13, nomeDanca: "Havaneira Marcada", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 14, nomeDanca: "Pezinho", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 15, nomeDanca: "Rancheira de Carreirinha", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 16, nomeDanca: "Tatu (Tatu de Castanholas)", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 17, nomeDanca: "Tatu com Volta no Meio", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
            { idDanca: 18, nomeDanca: "Tirana do Lenço", dancaSalaoTradicional: "DANCA_TRADICIONAL", quesitoId: 2 },
        ]
    });
    console.log("✅ Quesitos de dança criados com sucesso!");

    // =========================
    // SUBQUESITOS
    // =========================
    await prisma.subQuesitos.createMany({
        data: [
            { nomeSubquesito: "Harmonia do par", notaSubequesito: 1, quesitoId: 1 },
            { nomeSubquesito: "Correção coreográfica", notaSubequesito: 2, quesitoId: 1 },
            { nomeSubquesito: "Interpretação artística", notaSubequesito: 2, quesitoId: 1 },
            { nomeSubquesito: "Disposição do par na sala", notaSubequesito: 1, quesitoId: 1 }
        ]
    });
    console.log("✅ SubQuesitos criados com sucesso!");

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