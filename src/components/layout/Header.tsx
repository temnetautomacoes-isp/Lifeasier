import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar as CalendarIcon,
  Bell,
  Plus,
  ChevronDown,
  Menu,
  ArrowDownRight,
  ArrowUpRight,
  ShoppingCart,
  GraduationCap,
  Target,
  CheckSquare,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface HeaderProps {
  store: AppStore;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ store, onOpenMobileMenu }) => {
  const {
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    setIsNewRecordOpen,
    setNewRecordDefaultTab,
    profile,
  } = store;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openNewRecord = (tab: 'transaction' | 'grocery' | 'study' | 'goal' | 'task') => {
    setNewRecordDefaultTab(tab);
    setIsNewRecordOpen(true);
    setIsDropdownOpen(false);
  };

  const isPersonalUniverse = ['financas', 'mercado', 'objetivos', 'programacoes', 'saude'].includes(activePage);
  const isStudyUniverse = ['concurso', 'faculdade', 'cursos', 'banco-de-questoes', 'anotacoes', 'plano-de-estudos'].includes(activePage);
  const isOverview = activePage === 'dashboard';

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0]/70 z-40 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Menu & Search & Universe Navigation */}
      <div className="flex items-center gap-3 sm:gap-5 flex-1 max-w-2xl">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-[#475569] hover:bg-[#F2F4F6] lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Box */}
        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tarefas, gastos, matérias..."
            className="w-full h-10 pl-9 pr-14 bg-[#F2F4F6] text-[#0F172A] placeholder:text-[#64748B] text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0051D5]/25 border border-transparent focus:border-[#CBD5E1] transition-all"
          />
          <div className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#E0E3E5] rounded text-[#64748B] text-[11px] font-bold select-none">
            Ctrl K
          </div>
        </div>

        {/* Quick Universe Switcher Pills */}
        <nav className="hidden xl:flex items-center bg-[#F2F4F6] p-1 rounded-xl shadow-2xs">
          <button
            type="button"
            onClick={() => setActivePage('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              isOverview
                ? 'bg-[#E0E3E5] text-[#0F172A] font-bold shadow-xs'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Visão Geral
          </button>
          <button
            type="button"
            onClick={() => setActivePage('financas')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              isPersonalUniverse
                ? 'bg-[#E0E3E5] text-[#0F172A] font-bold shadow-xs'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Pessoal
          </button>
          <button
            type="button"
            onClick={() => setActivePage('concurso')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              isStudyUniverse
                ? 'bg-[#E0E3E5] text-[#0F172A] font-bold shadow-xs'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Estudos
          </button>
        </nav>
      </div>

      {/* Right Actions: Date, Notification, + Novo Registro & Avatar */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-[#64748B] text-xs font-medium bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E2E8F0]/60">
          <CalendarIcon size={16} className="text-[#0051D5]" />
          <span>Segunda-feira, 24 de Outubro</span>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => setActivePage('notificacoes')}
          className="relative p-2 rounded-xl text-[#475569] hover:bg-[#F2F4F6] hover:text-[#0F172A] transition-colors"
          title="Ver 3 notificações pendentes"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" />
        </button>

        {/* Global "+ Novo Registro" Dropdown Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 bg-[#FFE600] text-[#0F172A] px-3.5 sm:px-4 py-2 rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:bg-[#F59E0B] active:scale-98 transition-all font-bold text-xs sm:text-sm cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Novo Registro</span>
            <ChevronDown size={15} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#F1F5F9]">
                Criar lançamento rápido
              </div>
              <button
                type="button"
                onClick={() => openNewRecord('transaction')}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-[#EF4444] flex items-center justify-center">
                  <ArrowDownRight size={16} />
                </div>
                <div>
                  <div className="leading-tight">Nova Despesa / Receita</div>
                  <div className="text-[11px] font-normal text-[#64748B]">Finanças pessoais ou casal</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openNewRecord('grocery')}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                  <ShoppingCart size={16} />
                </div>
                <div>
                  <div className="leading-tight">Item de Mercado</div>
                  <div className="text-[11px] font-normal text-[#64748B]">Adicionar à lista de compras</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openNewRecord('study')}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0051D5] flex items-center justify-center">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <div className="leading-tight">Sessão de Estudo</div>
                  <div className="text-[11px] font-normal text-[#64748B]">Questões, horas ou tópicos</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openNewRecord('goal')}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
                  <Target size={16} />
                </div>
                <div>
                  <div className="leading-tight">Nova Meta / Objetivo</div>
                  <div className="text-[11px] font-normal text-[#64748B]">Poupança ou conquista</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openNewRecord('task')}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors border-t border-[#F1F5F9] mt-1 pt-2"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CheckSquare size={16} />
                </div>
                <div>
                  <div className="leading-tight">Compromisso da Rotina</div>
                  <div className="text-[11px] font-normal text-[#64748B]">Timeline diária sincronizada</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar with dropdown to Settings */}
        <button
          type="button"
          onClick={() => setActivePage('configuracoes')}
          className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
          title="Ver perfil e configurações"
        >
          <img
            alt={profile.fullName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#E2E8F0]"
            src={profile.avatarUrl}
          />
        </button>
      </div>
    </header>
  );
};
