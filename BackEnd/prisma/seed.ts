import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
     // =========================
    // PROVAS PRÁTICAS
    // =========================
    await prisma.provaPratica.createMany({
        data: [
            { idProvaPratica: 1, nomeProva: "Prova Pratica Prenda Mirim", notaMaxima: 100},
            { idProvaPratica: 2, nomeProva: "Prova Pratica Peão Mirim", notaMaxima: 100},
            { idProvaPratica: 3, nomeProva: "Prova Pratica Prenda Juvenil, Adulta, Veterana e Xirua", notaMaxima: 100},
            { idProvaPratica: 4, nomeProva: "Prova Pratica Peão Juvenil, Adulto, Veterano e Xiru", notaMaxima: 100},
        ]
    });

    console.log("✅ Provas Práticas criados com sucesso!");

    // =========================
    // CATEGORIAS
    // =========================
    await prisma.categoria.createMany({
        data: [
            { idCategoria: 1, nomeCategoria: "Prenda Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 7, idadeLimite: 12, provaPraticaId: 1 },
            { idCategoria: 2, nomeCategoria: "Peão Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 7, idadeLimite: 12, provaPraticaId: 2 },
            { idCategoria: 3, nomeCategoria: "Prenda Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 12, idadeLimite: 17, provaPraticaId: 3},
            { idCategoria: 4, nomeCategoria: "Peão Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 12, idadeLimite: 17, provaPraticaId: 4 },
            { idCategoria: 5, nomeCategoria: "Prenda Adulta", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0, provaPraticaId: 3},
            { idCategoria: 6, nomeCategoria: "Peão Adulto", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeLimite: 0, provaPraticaId: 4  },
            { idCategoria: 7, nomeCategoria: "Prenda Veterana", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0, provaPraticaId: 3 },
            { idCategoria: 8, nomeCategoria: "Peão Veterano", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeLimite: 0, provaPraticaId: 4  },
            { idCategoria: 9, nomeCategoria: "Prenda Xirua", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0, provaPraticaId: 3 },
            { idCategoria: 10, nomeCategoria: "Peão Xirú", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeLimite: 0, provaPraticaId: 4  },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Categorias criadas com sucesso!");

    // =========================
    // BLOCO PROVA 
    // =========================
    await prisma.blocoProva.createMany({
        data: [
            //Prova Pratica Prenda Mirim
            { nomeBloco: "Prova Oral", notaMaximaBloco: 65, provaPraticaId: 1 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 18, provaPraticaId: 1 },

            //Prova Pratica Peão Mirim
            { nomeBloco: "Prova Oral", notaMaximaBloco: 65, provaPraticaId: 2 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 18, provaPraticaId: 2 },
            { nomeBloco: "Prova Campeira", notaMaximaBloco: 17, provaPraticaId: 2 },

            //Prova Pratica Prenda Juvenil, Adulta, Veterana e Xirua
            { nomeBloco: "Prova Oral", notaMaximaBloco: 63, provaPraticaId: 3 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 25, provaPraticaId: 3 },
            { nomeBloco: "Prova Dotes", notaMaximaBloco: 12, provaPraticaId: 3 },

            //Prova Pratica Peão Juvenil, Adulto, Veterano e Xiru
            { nomeBloco: "Prova Oral", notaMaximaBloco: 62, provaPraticaId: 4 },
            { nomeBloco: "Prova Artística", notaMaximaBloco: 19, provaPraticaId: 4 },
            { nomeBloco: "Prova Campeira", notaMaximaBloco: 19, provaPraticaId: 4 }
        ]
    });
    console.log("✅ Bloco Prova criados com sucesso!");

    // // =========================
    // // QUESITOS
    // // =========================

    // await prisma.quesitos.createMany({
    //     data: [
    //         //Prova Oral Prenda Mirim 
    //         { nomeQuesito: "Vivência Tradicionalista Gaúcha", notaMaximaQuesito: 33, opcional: false, blocoProvaIdBloco: 1 },
    //         { nomeQuesito: "Projeto Principal - Executado na Atual Gestão", notaMaximaQuesito: 10, opcional: false, blocoProvaIdBloco: 1 },
    //         { nomeQuesito: "Outros Projetos e Ações Executados", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 1 },
    //         { nomeQuesito: "Comunicação Oral", notaMaximaQuesito: 12, opcional: false, blocoProvaIdBloco: 1 },
    //         { nomeQuesito: "Desenvoltura e Expressão", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 1 },
    //         { nomeQuesito: "Indumentária", notaMaximaQuesito: -5, opcional: false, blocoProvaIdBloco: 1 },

    //         //Prova Artística Prenda Mirim
    //         { nomeQuesito: "Dança Gaúcha de Salão", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Artesanato", notaMaximaQuesito: 6, opcional: false, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Declamação", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Intérprete Vocal/Cantar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Execução Instrumental", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Dança Folclórica Tradicional", notaMaximaQuesito: 5, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Contar uma Lenda", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Contar Causo", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Prova Campeira Regulamentada", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Encilhar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 2 },
    //         { nomeQuesito: "Desenvolura e expressão", notaMaximaQuesito: 2, opcional: false, blocoProvaIdBloco: 2 },

    //         //Prova Oral Peão Mirim 
    //         { nomeQuesito: "Vivência Tradicionalista Gaúcha", notaMaximaQuesito: 33, opcional: false, blocoProvaIdBloco: 3 },
    //         { nomeQuesito: "Projeto Principal - Executado na Atual Gestão", notaMaximaQuesito: 10, opcional: false, blocoProvaIdBloco: 3 },
    //         { nomeQuesito: "Outros Projetos e Ações Executados", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 3 },
    //         { nomeQuesito: "Comunicação Oral", notaMaximaQuesito: 12, opcional: false, blocoProvaIdBloco: 3 },
    //         { nomeQuesito: "Desenvoltura e Expressão", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 3 },
    //         { nomeQuesito: "Indumentária", notaMaximaQuesito: -5, opcional: false, blocoProvaIdBloco: 3 },

    //         //Prova Artística Peão Mirim
    //         { idQuesito: 7, nomeQuesito: "Dança Gaúcha de Salão", notaMaximaQuesito: 4, opcional: false, blocoProvaIdBloco: 4 },
    //         { idQuesito: 9, nomeQuesito: "Declamação", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 10, nomeQuesito: "Intérprete Vocal/Cantar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 11, nomeQuesito: "Execução Instrumental", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 12, nomeQuesito: "Dança Folclórica Tradicional", notaMaximaQuesito: 5, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 13, nomeQuesito: "Contar uma Lenda", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 14, nomeQuesito: "Contar Causo", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 15, nomeQuesito: "Chula", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 4 },
    //         { idQuesito: 17, nomeQuesito: "Desenvolura e expressão", notaMaximaQuesito: 2, opcional: false, blocoProvaIdBloco: 4 },

    //         //Prova Campeira Peão Mirim
    //         { idQuesito: 18, nomeQuesito: "Artesanato", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 5 },
    //         { idQuesito: 19, nomeQuesito: "Laçar a cavalo ou vaca parada", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 20, nomeQuesito: "Prova de rédeas", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 21, nomeQuesito: "Reconhecimento de pelagem", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 22, nomeQuesito: "Reconhecimento das peças da encilha", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 23, nomeQuesito: "Encilhar", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 24, nomeQuesito: "Preparar chimarrão", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },
    //         { idQuesito: 25, nomeQuesito: "Nó de lenço", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 5 },

    //         //Prova Oral Prenda Juvenil, Adulta, Veterana e Xirua
    //         { idQuesito: 26, nomeQuesito: "Vivência Tradicionalista Gaúcha", notaMaximaQuesito: 33, opcional: false, blocoProvaIdBloco: 6 },
    //         { idQuesito: 27, nomeQuesito: "Projeto Principal - Executado na Atual Gestão", notaMaximaQuesito: 10, opcional: false, blocoProvaIdBloco: 6 },
    //         { idQuesito: 28, nomeQuesito: "Outros Projetos e Ações Executados", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 6 },
    //         { idQuesito: 29, nomeQuesito: "Pesquisa Histórica", notaMaximaQuesito: 12, opcional: false, blocoProvaIdBloco: 6 },
    //         { idQuesito: 30, nomeQuesito: "Desenvoltura e Expressão", notaMaximaQuesito: 3, opcional: false, blocoProvaIdBloco: 6 },
    //         { idQuesito: 31, nomeQuesito: "Indumentária", notaMaximaQuesito: -5, opcional: false, blocoProvaIdBloco: 6 },

    //         //Prova Artística Prenda Juvenil, Adulta, Veterana e Xirua
    //         { idQuesito: 32, nomeQuesito: "Dança Gaúcha de Salão", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 7 },
    //         { idQuesito: 34, nomeQuesito: "Declamação", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 35, nomeQuesito: "Intérprete Vocal/Cantar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 36, nomeQuesito: "Execução Instrumental", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 37, nomeQuesito: "Dança Folclórica Tradicional", notaMaximaQuesito: 5, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 38, nomeQuesito: "Contar uma Lenda", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 39, nomeQuesito: "Contar Causo", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 40, nomeQuesito: "Prova Campeira Regulamentada", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 41, nomeQuesito: "Prova Esportiva Regulamentada", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 42, nomeQuesito: "Encilhar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 7 },
    //         { idQuesito: 43, nomeQuesito: "Desenvolura e expressão", notaMaximaQuesito: 4, opcional: false, blocoProvaIdBloco: 7 },

    //         //Prova Dotes Prenda Juvenil, Adulta, Veterana e Xirua
    //         { idQuesito: 44, nomeQuesito: "Culinária", notaMaximaQuesito: 6, opcional: false, blocoProvaIdBloco: 8 },
    //         { idQuesito: 45, nomeQuesito: "Artesanato", notaMaximaQuesito: 6, opcional: false, blocoProvaIdBloco: 8 },

    //         //Prova Oral Peão Juvenil, Adulto, Veterano e Xiru
    //         { idQuesito: 46, nomeQuesito: "Vivência Tradicionalista Gaúcha", notaMaximaQuesito: 33, opcional: false, blocoProvaIdBloco: 9 },
    //         { idQuesito: 47, nomeQuesito: "Projeto Principal - Executado na Atual Gestão", notaMaximaQuesito: 10, opcional: false, blocoProvaIdBloco: 9 },
    //         { idQuesito: 48, nomeQuesito: "Outros Projetos e Ações Executados", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 9 },
    //         { idQuesito: 49, nomeQuesito: "Pesquisa Histórica", notaMaximaQuesito: 10, opcional: false, blocoProvaIdBloco: 9 },
    //         { idQuesito: 50, nomeQuesito: "Desenvoltura e Expressão", notaMaximaQuesito: 4, opcional: false, blocoProvaIdBloco: 9 },
    //         { idQuesito: 51, nomeQuesito: "Indumentária", notaMaximaQuesito: -5, opcional: false, blocoProvaIdBloco: 9 },

    //         //Prova Artística Peão Juvenil, Adulto, Veterano e Xiru
    //         { idQuesito: 52, nomeQuesito: "Dança Gaúcha de Salão", notaMaximaQuesito: 4, opcional: false, blocoProvaIdBloco: 10 },
    //         { idQuesito: 54, nomeQuesito: "Declamação", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 55, nomeQuesito: "Intérprete Vocal/Cantar", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 56, nomeQuesito: "Execução Instrumental", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 57, nomeQuesito: "Dança Folclórica Tradicional", notaMaximaQuesito: 5, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 58, nomeQuesito: "Contar uma Lenda", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 59, nomeQuesito: "Contar Causo", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 60, nomeQuesito: "Chula", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 61, nomeQuesito: "Prova Esportiva Regulamentada", notaMaximaQuesito: 6, opcional: true, blocoProvaIdBloco: 10 },
    //         { idQuesito: 63, nomeQuesito: "Desenvolura e expressão", notaMaximaQuesito: 3, opcional: false, blocoProvaIdBloco: 10 },

    //         //Prova Campeira Peão Juvenil, Adulto, Veterano e Xiru
    //         { idQuesito: 64, nomeQuesito: "Encilhar", notaMaximaQuesito: 6, opcional: false, blocoProvaIdBloco: 11 },
    //         { idQuesito: 65, nomeQuesito: "Artesanato", notaMaximaQuesito: 5, opcional: false, blocoProvaIdBloco: 11 },
    //         { idQuesito: 66, nomeQuesito: "Laçar a cavalo ou vaca parada", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 67, nomeQuesito: "Prova de rédeas", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 68, nomeQuesito: "Preparar Churrasco", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 69, nomeQuesito: "Preparar chimarrão", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 70, nomeQuesito: "Charquear", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 71, nomeQuesito: "Tosar", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 72, nomeQuesito: "Tosquiar", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //         { idQuesito: 73, nomeQuesito: "Culinária Campeira", notaMaximaQuesito: 4, opcional: true, blocoProvaIdBloco: 11 },
    //     ]
    // });
    // console.log("✅ Quesitos criados com sucesso!"); 
    
    // // =========================
    // // SUBQUESITOS
    // // =========================
    // await prisma.subQuesitos.createMany({
    //     data: [
    //         { nomeSubquesito: "Harmonia do par", notaSubequesito: 1, quesitoId: 1 },
    //         { nomeSubquesito: "Correção coreográfica", notaSubequesito: 2, quesitoId: 1 },
    //         { nomeSubquesito: "Interpretação artística", notaSubequesito: 2, quesitoId: 1 },
    //         { nomeSubquesito: "Disposição do par na sala", notaSubequesito: 1, quesitoId: 1 }
    //     ]
    // });
    // console.log("✅ SubQuesitos criados com sucesso!");

    // =========================
    // DANÇAS
    // =========================
    await prisma.danca.createMany({
        data: [
            // =========================
            // DANÇAS DE SALÃO
            // =========================
            { idDanca: 1, nomeDanca: "Valsa", dancaSalaoTradicional: "DANCA_DE_SALAO"},
            { idDanca: 2, nomeDanca: "Vaneira", dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { idDanca: 3, nomeDanca: "Chamamé", dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { idDanca: 4, nomeDanca: "Bugio", dancaSalaoTradicional: "DANCA_DE_SALAO"},
            { idDanca: 5, nomeDanca: "Milonga", dancaSalaoTradicional: "DANCA_DE_SALAO" },
            { idDanca: 6, nomeDanca: "Chote", dancaSalaoTradicional: "DANCA_DE_SALAO"},
            { idDanca: 7, nomeDanca: "Rancheira", dancaSalaoTradicional: "DANCA_DE_SALAO"},

            // =========================
            // DANÇAS TRADICIONAIS
            // =========================
            { idDanca: 8, nomeDanca: "Chico Sapateado", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 9, nomeDanca: "Chimarrita Balão", dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { idDanca: 10, nomeDanca: "Chote Carreirinho", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 11, nomeDanca: "Chote de Duas Damas", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 12, nomeDanca: "Chote das Sete Voltas", dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { idDanca: 13, nomeDanca: "Havaneira Marcada", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 14, nomeDanca: "Pezinho", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 15, nomeDanca: "Rancheira de Carreirinha", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
            { idDanca: 16, nomeDanca: "Tatu (Tatu de Castanholas)", dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { idDanca: 17, nomeDanca: "Tatu com Volta no Meio", dancaSalaoTradicional: "DANCA_TRADICIONAL" },
            { idDanca: 18, nomeDanca: "Tirana do Lenço", dancaSalaoTradicional: "DANCA_TRADICIONAL"},
        ]
    });
    console.log("✅ Quesitos de dança criados com sucesso!");

   
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