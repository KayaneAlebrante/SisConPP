import { FC, useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookText,
  User,
  Users,
  Music,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  FilePlus,
  CopyPlus,
  BookPlus,
  BookType,
  SquareMenu,
} from "lucide-react";
import imgLogoLight from "../../assets/Logo-Light-SisConPP.png";

type UserRole = "SECRETARIO" | "AVALIADOR" | "AUXILIAR";

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Recupera usuário do localStorage
  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      setUserRole(usuario.funcao as UserRole);
    }
  }, []);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/tela-inicial", roles: ["SECRETARIO", "AVALIADOR", "AUXILIAR"] },
    { label: "CTGs", icon: Building2, href: "/ctg", roles: ["SECRETARIO"] },
    { label: "RTs", icon: CopyPlus, href: "/rt", roles: ["SECRETARIO"] },
    { label: "Concursos", icon: LayoutDashboard, href: "/concurso", roles: ["SECRETARIO"] },
    { label: "Candidatos", icon: Users, href: "/candidatos", roles: ["SECRETARIO", "AUXILIAR"] },
    { label: "Avaliadores", icon: BookText, href: "/avaliadores", roles: ["SECRETARIO"] },
    { label: "Auxiliar", icon: User, href: "/auxiliares", roles: ["SECRETARIO"] },
    { label: "Comissões Avaliadoras", icon: Users, href: "/comissao", roles: ["SECRETARIO"] },
    { label: "Sortear Danças", icon: Music, href: "/sorteio-danca", roles: ["SECRETARIO", "AUXILIAR"] },
    { label: "Adicionar planilhas Prova Prática", icon: FilePlus, href: "/prova-pratica-criacao", roles: ["SECRETARIO"] },
    { label: "Adicionar Prova Teorica", icon: BookPlus, href: "/prova-teorica-criacao", roles: ["SECRETARIO"] },
    { label: "Adicionar Avaliação Prática", icon: SquareMenu, href: "/avaliacao-pratica", roles: ["SECRETARIO", "AVALIADOR"] },
    { label: "Adicionar Avaliação Teorica", icon: BookType, href: "/avaliacao-teorica", roles: ["SECRETARIO", "AVALIADOR"] },
    { label: "Relatórios", icon: BookText, href: "/relatorios", roles: ["SECRETARIO"] },
  ];

  // Filtra os menus de acordo com a função
  const filteredMenuItems = userRole
    ? menuItems.filter((item) => item.roles.includes(userRole))
    : [];

  return (
    <div
      className={`h-full min-h-screen transition-all duration-300 relative flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } bg-primary-dark border-r border-primary text-primary-onContainer shadow-lg`}
    >
      {/* Botão toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-primary-dark border border-primary-light rounded-full p-1.5 hover:bg-primary-light hover:text-primary-dark text-primary-on transition-colors"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center py-6 px-4">
        <img
          src={imgLogoLight}
          alt="Icon SisConPP"
          className={isOpen ? "w-24 h-24 mb-2" : "w-13 h-13 mb-2"}
        />
        {isOpen && (
          <>
            <div className="text-center text-secondary-onContainer font-semibold text-sm leading-tight">
              SisConPP <br />
              Sistema para Secretaria de Concursos de Prendas e Peões
            </div>
            <div className="border-t border-primary-light mt-4 w-full" />
          </>
        )}
      </div>

      {/* Menu filtrado */}
      <nav className="flex flex-col justify-between gap-1">
        {filteredMenuItems.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-colors hover:bg-primary-light hover:text-primary-dark"
          >
            <Icon size={20} />
            {isOpen && <span className="text-sm font-medium">{label}</span>}
          </a>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="mt-auto p-4 flex justify-end text-primary-light">
        <AlertCircle size={20} />
      </div>
    </div>
  );
};

export default Sidebar;