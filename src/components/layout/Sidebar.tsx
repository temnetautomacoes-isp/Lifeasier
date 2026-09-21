import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  ShoppingCart,
  Target,
  Calendar,
  Heart,
  GraduationCap,
  School,
  PlayCircle,
  HelpCircle,
  FileText,
  CalendarDays,
  BarChart3,
  Bell,
  Settings,
  User,
  Users,
  Database,
  MoreVertical,
  LogOut,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';
import { NavigationPage } from '../../types';

interface SidebarProps {
  store: AppStore;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  store,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { userMode, setUserMode, activePage, setActivePage, setIsSchemaModalOpen } = store;

  const navigateTo = (page: NavigationPage) => {
    setActivePage(page);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = (page: NavigationPage) => {
    const isActive = activePage === page;
    if (isActive) {
      return 'flex items-center gap-3 px-3 py-2 rounded-xl transition-all bg-[#FFE600] text-[#0F172A] font-bold shadow-[0_1px_2px_rgba(15,23,42,0.05)] cursor-pointer';
    }
    return 'flex items-center gap-3 px-3 py-2 rounded-xl text-[#475569] hover:bg-[#E6E8EA] hover:text-[#0F172A] transition-all cursor-pointer';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-hidden transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Sync Header */}
          <div className="p-5 flex items-center justify-between border-b border-[#F1F5F9]/70">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigateTo('dashboard')}
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFE600] flex items-center justify-center font-extrabold text-[#0F172A] text-lg shadow-xs">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#0F172A] leading-tight tracking-tight">
                  Lifeasier
                </span>
                <span className="text-[11px] font-medium text-[#64748B] -mt-0.5">
                  Gestão Integrada
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F2F4F6] px-2.5 py-1 rounded-full text-[#10B981] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Sync
            </div>
          </div>

          {/* Mode Switcher (Individual vs. Casal) */}
          <div className="px-4 py-3">
            <div className="bg-[#F2F4F6] p-1 rounded-xl flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setUserMode('individual')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  userMode === 'individual'
                    ? 'bg-white text-[#0F172A] shadow-[0_1px_3px_rgba(15,23,42,0.08)]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <User size={15} />
                Individual
              </button>
              <button
                type="button"
                onClick={() => setUserMode('couple')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  userMode === 'couple'
                    ? 'bg-white text-[#0F172A] shadow-[0_1px_3px_rgba(15,23,42,0.08)]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Users size={15} />
                Casal
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </button>
            </div>
          </div>

          {/* Navigation Links (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
            {/* GERAL */}
            <nav className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Geral
              </div>
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className={`w-full ${navItemClass('dashboard')}`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm">Dashboard</span>
              </button>
            </nav>

            {/* PAINEL PESSOAL */}
            <nav className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Painel Pessoal
              </div>
              <button
                type="button"
                onClick={() => navigateTo('financas')}
                className={`w-full ${navItemClass('financas')}`}
              >
                <Wallet size={18} />
                <span className="text-sm">Finanças</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('mercado')}
                className={`w-full ${navItemClass('mercado')}`}
              >
                <ShoppingCart size={18} />
                <span className="text-sm">Mercado</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('objetivos')}
                className={`w-full ${navItemClass('objetivos')}`}
              >
                <Target size={18} />
                <span className="text-sm">Objetivos</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('programacoes')}
                className={`w-full ${navItemClass('programacoes')}`}
              >
                <Calendar size={18} />
                <span className="text-sm">Programações</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('saude')}
                className={`w-full ${navItemClass('saude')}`}
              >
                <Heart size={18} />
                <span className="text-sm">Saúde &amp; Hábitos</span>
              </button>
            </nav>

            {/* PAINEL ESTUDOS */}
            <nav className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Painel Estudos
              </div>
              <button
                type="button"
                onClick={() => navigateTo('concurso')}
                className={`w-full ${navItemClass('concurso')}`}
              >
                <GraduationCap size={18} />
                <span className="text-sm">Concurso Público</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('faculdade')}
                className={`w-full ${navItemClass('faculdade')}`}
              >
                <School size={18} />
                <span className="text-sm">Faculdade</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('cursos')}
                className={`w-full ${navItemClass('cursos')}`}
              >
                <PlayCircle size={18} />
                <span className="text-sm">Cursos</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('banco-de-questoes')}
                className={`w-full ${navItemClass('banco-de-questoes')}`}
              >
                <HelpCircle size={18} />
                <span className="text-sm">Banco de Questões</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('anotacoes')}
                className={`w-full ${navItemClass('anotacoes')}`}
              >
                <FileText size={18} />
                <span className="text-sm">Anotações</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('plano-de-estudos')}
                className={`w-full ${navItemClass('plano-de-estudos')}`}
              >
                <CalendarDays size={18} />
                <span className="text-sm">Plano de Estudos</span>
              </button>
            </nav>

            {/* OUTROS */}
            <nav className="space-y-1 pt-1 border-t border-[#F1F5F9]">
              <div className="px-3 py-1 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Outros
              </div>
              <button
                type="button"
                onClick={() => navigateTo('relatorios')}
                className={`w-full ${navItemClass('relatorios')}`}
              >
                <BarChart3 size={18} />
                <span className="text-sm">Relatórios</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('notificacoes')}
                className={`w-full ${navItemClass('notificacoes')}`}
              >
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  <span className="text-sm">Notificações</span>
                </div>
                <span className="bg-[#EF4444] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                  3
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsSchemaModalOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#475569] hover:bg-[#E6E8EA] hover:text-[#0F172A] transition-all cursor-pointer"
                title="Ver Migrations Supabase PostgreSQL"
              >
                <div className="flex items-center gap-3">
                  <Database size={18} className="text-[#0051D5]" />
                  <span className="text-sm font-semibold">Schema Supabase</span>
                </div>
                <span className="text-[10px] bg-blue-50 text-[#0051D5] px-2 py-0.5 rounded font-mono font-bold">
                  SQL
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('configuracoes')}
                className={`w-full ${navItemClass('configuracoes')}`}
              >
                <Settings size={18} />
                <span className="text-sm">Configurações</span>
              </button>
            </nav>
          </div>

          {/* User Profile Footer & Environment Badge */}
          <div className="p-3 bg-[#F2F4F6]/70 border-t border-[#E2E8F0]/70 mt-auto space-y-2">
            {/* Active Environment Indicator */}
            <div className="flex items-center justify-between px-2 py-1 bg-white rounded-lg border border-[#E2E8F0]/70 text-[11px]">
              <span className="text-[#64748B] font-semibold">Ambiente:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  store.selectedEnvironment === 'studies'
                    ? 'bg-blue-50 text-[#0051D5]'
                    : 'bg-amber-50 text-[#D97706]'
                }`}
              >
                {store.selectedEnvironment === 'studies' ? 'Painel Estudos' : 'Painel Pessoal'}
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#E6E8EA] transition-colors">
              <div
                className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                onClick={() => navigateTo('configuracoes')}
              >
                <div className="relative shrink-0">
                  <img
                    alt="Lucas Silveira"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white"
                    src={store.profile.avatarUrl}
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-white" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs font-bold text-[#0F172A] leading-tight truncate">
                    {store.profile.fullName}
                  </span>
                  <span className="text-[11px] text-[#64748B] truncate max-w-[110px]">
                    {store.profile.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => store.logout()}
                  className="text-[#64748B] hover:text-[#EF4444] p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Sair / Trocar Painel"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
