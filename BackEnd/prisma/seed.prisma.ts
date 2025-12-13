import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // =========================
  // CATEGORIAS
  // =========================
  await prisma.categoria.createMany({
    data: [
      { nomeCategoria: "Prenda Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 7, idadeFinal: 12 },
      { nomeCategoria: "Peão Mirim", escolaridade: "Ter concluído ou cursando o 2 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 7, idadeFinal: 12 },
      { nomeCategoria: "Prenda Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 1, idadeInicial: 12, idadeFinal: 17 },
      { nomeCategoria: "Peão Juvenil", escolaridade: "Ter concluído ou cursando o 6 ano do Ensino Fundamental", sorteioDanca: 3, idadeInicial: 12, idadeFinal: 17 },
      { nomeCategoria: "Prenda Adulta", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeFinal: 0 },
      { nomeCategoria: "Peão Adulto", escolaridade: "Ter concluído ou cursando o Ensino Médio", sorteioDanca: 5, idadeInicial: 18, idadeFinal: 0 },
      { nomeCategoria: "Prenda Veterana", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeFinal: 0 },
      { nomeCategoria: "Peão Veterano", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 30, idadeFinal: 0 },
      { nomeCategoria: "Prenda Xirua", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeFinal: 0 },
      { nomeCategoria: "Peão Xirú", escolaridade: "Ter concluído ou cursando o Ensino Fundamental", sorteioDanca: 1, idadeInicial: 50, idadeFinal: 0 },
    ],
  });

  // =========================
  // REGIÕES TRADICIONALISTAS
  // =========================
  await prisma.rT.createMany({
    data: Array.from({ length: 18 }).map((_, index) => ({
      nomeRT: "Região Tradicionalista",
      numeroRT: index + 1,
    })),
  });

  // =========================
  // CTG
  // =========================
  const ctg = await prisma.cTG.create({
    data: {
      nomeCTG: "CTG Fronteira da Amizade",
      RTid: 17,
    },
  });

  // =========================
  // USUÁRIO
  // =========================
  await prisma.usuario.create({
    data: {
      nomeCompleto: "Kayane Alebrante",
      cidade: "União da Vitória",
      estado: "PR",
      CTGId: ctg.idCTG,
      numCarteirinha: "123456",
      login: "kayane",
      senha: "12345",
      funcao: "SECRETARIO",
      credenciamento: "CREDENCIADO",
      numCredenciamento: 10,
    },
  });

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
