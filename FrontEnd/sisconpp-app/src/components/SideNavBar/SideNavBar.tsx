import { FC, useState } from 'react';
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
  CopyPlus
} from 'lucide-react';
import imgLogoLight from '../../assets/Logo-Light-SisConPP.png';

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/tela-inicial" },
    { label: "CTGs", icon: Building2, href: "/ctg" },
    { label: "RTs", icon: CopyPlus, href: "/rt" },
    { label: "Concursos", icon: LayoutDashboard, href: "/concurso" },
    { label: "Candidatos", icon: Users, href: "/candidatos"},
    { label: "Avaliadores", icon: BookText, href: "/avaliadores" },
    { label: "Auxiliar", icon: User, href: "/auxiliares" },
    { label: "Comissões Avaliadoras", icon: Users, href: "/comissao" },
    { label: "Sortear Danças", icon: Music, href: "/sorteio-danca"},
    { label: "Adicionar planilhas Prova Prática", icon: AlertCircle, href: "/prova-pratica-criacao" },
    { label: "Adicionar Prova Teorica", icon: AlertCircle, href: "/prova-teorica-criacao" },
    { label: "Relatórios", icon: BookText },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 relative flex flex-col ${isOpen ? 'w-64' : 'w-20'
        } bg-primary-dark border-r border-primary text-primary-onContainer shadow-lg`}
    >
      {/* Botão toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-primary-dark border border-primary-light rounded-full p-1.5 hover:bg-primary-light hover:text-primary-dark text-primary-on transition-colors"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div>
        {/* Logo */}
        <div className="flex flex-col items-center py-6 px-4">
          {isOpen ? (
            <img src={imgLogoLight} alt="Icon SisConPP" className="w-24 h-24 mb-2" />
          ) : (
            <img src={imgLogoLight} alt="Icon SisConPP" className="w-13 h-13 mb-2" />
          )}
          {isOpen && (
            <>
              <div className="text-center text-secondary-onContainer font-semibold text-sm leading-tight">
                SisConPP<br />
                Sistema para Secretaria de Concursos de Prendas e Peões
              </div>
              <div className="border-t border-primary-light mt-4 w-full" />
            </>
          )}
        </div>
      </div>

      {/* Menu items */}
      <nav className="flex flex-col justify-between gap-1">
        {menuItems.map(({ label, icon: Icon }) => {
          return (
            <a
              key={label}
              href={menuItems.find((item) => item.label === label)?.href || '#'}
              className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-colors
              hover:bg-primary-light hover:text-primary-dark`}
            >
              <Icon size={20} />
              {isOpen && <span className="text-sm font-medium">{label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="mt-auto p-4 flex justify-end text-primary-light">
        <AlertCircle size={20} />
      </div>
    </div>
  );
};

export default Sidebar;