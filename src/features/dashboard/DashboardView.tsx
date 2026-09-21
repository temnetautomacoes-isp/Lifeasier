import React from 'react';
import {
  CheckSquare,
  Wallet,
  Target,
  GraduationCap,
  Heart,
  Calendar,
  Clock,
  Play,
  ArrowUpRight,
  ShoppingCart,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Sparkles,
  Plus,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface DashboardViewProps {
  store: AppStore;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ store }) => {
  const {
    profile,
    userMode,
    routine,
    toggleRoutineItem,
    groceries,
    toggleGroceryItem,
    setActivePage,
    setIsNewRecordOpen,
    setNewRecordDefaultTab,
    goals,
  } = store;

  const completedRoutine = routine.filter((r) => r.completed).length;
  const pendingRoutine = routine.length - completedRoutine;
  const routinePercentage = Math.round((completedRoutine / routine.length) * 100);

  const pendingGroceries = groceries.filter((g) => !g.isPurchased).slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0051D5]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#FFE600]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#FFE600] text-[#0F172A] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                {profile.level}
              </span>
              <span className="text-slate-400 text-xs font-medium">
                Segunda-feira, 24 de Outubro
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <Sparkles size={13} />
                {profile.activeFocus}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bom dia, {profile.fullName.split(' ')[0]}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {userMode === 'couple'
                ? 'Painel compartilhado ativo com Mariana. Suas rotinas, finanças conjuntas e metas estão sincronizadas.'
                : 'Modo individual ativo. Foco total em sua preparação, finanças pessoais e hábitos diários.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setNewRecordDefaultTab('task');
                setIsNewRecordOpen(true);
              }}
              className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Adicionar Tarefa / Evento</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Bento 5 KPIs Header Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1: Tarefas */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Tarefas de Hoje</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0051D5] flex items-center justify-center">
              <CheckSquare size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">
              {pendingRoutine}{' '}
              <span className="text-xs font-semibold text-[#64748B]">pendentes</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0051D5] h-full rounded-full transition-all"
                  style={{ width: `${routinePercentage}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-[#64748B] shrink-0">
                {routinePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Saldo Disponível */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Saldo Disponível</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">R$ 14.850,20</div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#10B981] font-semibold">
              <ArrowUpRight size={14} />
              <span>+8,4% este mês</span>
              <span className="text-[#64748B] text-[10px] ml-auto">
                {userMode === 'couple' ? 'Casal + Indiv.' : 'Individual'}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Objetivos Ativos */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Objetivos Ativos</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">4 ativos</div>
            <div className="flex items-center justify-between mt-2 text-xs font-medium text-[#64748B]">
              <span>Média 72%</span>
              <span className="text-[#0051D5] font-semibold">Meta 2025</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Estudos Semanais */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Estudos Semanal</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">
              12h30{' '}
              <span className="text-xs font-semibold text-[#64748B]">/ 15h</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs font-medium text-[#64748B]">
              <span className="text-[#10B981] font-bold">83% da meta</span>
              <span className="text-[11px] text-[#64748B]">Faltam 2h30</span>
            </div>
          </div>
        </div>

        {/* KPI 5: Hábitos de Saúde */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Hábitos de Saúde</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">3 de 4</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Água
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Treino
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Leitura
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Rotina, Finanças da Semana, Objetivos */}
        <div className="lg:col-span-8 space-y-6">
          {/* Rotina de Hoje */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-[#0051D5]" />
                <h2 className="text-base font-bold text-[#0F172A]">Sua Rotina de Hoje</h2>
                <span className="bg-[#F2F4F6] text-[#475569] text-xs font-bold px-2 py-0.5 rounded-full">
                  {completedRoutine}/{routine.length} Concluídas
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('programacoes')}
                className="text-xs font-semibold text-[#0051D5] hover:underline flex items-center gap-1"
              >
                <span>Ver cronograma completo</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {routine.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.completed
                      ? 'bg-[#F8FAFC]/80 border-[#E2E8F0] opacity-75'
                      : item.priority
                      ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                      : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleRoutineItem(item.id)}
                      className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all ${
                        item.completed
                          ? 'bg-[#10B981] border-[#10B981] text-white'
                          : 'border-[#CBD5E1] bg-white hover:border-[#0051D5]'
                      }`}
                    >
                      {item.completed && <span className="text-xs font-black">✓</span>}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock size={11} />
                          {item.time}
                        </span>
                        <h3
                          className={`text-sm font-bold text-[#0F172A] ${
                            item.completed ? 'line-through text-[#64748B]' : ''
                          }`}
                        >
                          {item.title}
                        </h3>
                        {item.priority && !item.completed && (
                          <span className="bg-[#FFE600] text-[#0F172A] text-[10px] font-black px-1.5 py-0.2 rounded">
                            FOCO ATUAL
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0 pl-8 sm:pl-0">
                    {item.category === 'Estudos' && !item.completed && (
                      <button
                        type="button"
                        onClick={() => setActivePage('concurso')}
                        className="bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <Play size={13} fill="#0F172A" />
                        <span>Começar Agora</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setActivePage('anotacoes')}
                      className="bg-[#F2F4F6] text-[#475569] hover:text-[#0F172A] text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <BookOpen size={13} />
                      <span>Ver Anotação</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Financeiro da Semana */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Resumo Financeiro da Semana
                </h2>
                <p className="text-xs text-[#64748B]">
                  Comparativo diário de receitas e despesas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('financas')}
                className="text-xs font-semibold text-[#0051D5] hover:underline flex items-center gap-1"
              >
                <span>Ver extrato completo</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Smart warning pill */}
            <div className="mb-4 bg-amber-50 border border-amber-200/80 p-3 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 font-medium">
              <AlertTriangle size={16} className="text-[#F59E0B] shrink-0" />
              <span>
                <strong>Atenção:</strong> Fatura Nubank Casal vence em 3 dias (R$ 1.840,00). Saldo em conta suficiente para débito.
              </span>
            </div>

            {/* Weekly bar chart visualization */}
            <div className="grid grid-cols-7 gap-2 pt-2">
              {[
                { day: 'Seg', rec: 120, desp: 450, isToday: false },
                { day: 'Ter', rec: 0, desp: 120, isToday: false },
                { day: 'Qua', rec: 3500, desp: 890, isToday: false },
                { day: 'Qui', rec: 0, desp: 320, isToday: false },
                { day: 'Sex', rec: 1400, desp: 1240, isToday: false },
                { day: 'Sáb', rec: 0, desp: 640, isToday: false },
                { day: 'Dom', rec: 80, desp: 1200, isToday: true },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="h-32 w-full max-w-[38px] bg-[#F1F5F9] rounded-xl flex items-end justify-center p-1 relative group">
                    {/* Tooltip */}
                    <div className="absolute -top-8 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-lg">
                      R$ {bar.desp} gastos
                    </div>
                    {/* Expense bar */}
                    <div
                      className="w-full bg-[#EF4444] rounded-lg transition-all"
                      style={{
                        height: `${Math.min(100, Math.max(15, (bar.desp / 1300) * 100))}%`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold mt-2 ${
                      bar.isToday ? 'text-[#0051D5]' : 'text-[#64748B]'
                    }`}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between text-xs text-[#64748B]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  Receitas da semana: <strong>R$ 5.100,00</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  Despesas da semana: <strong>R$ 4.860,00</strong>
                </span>
              </div>
              <span className="font-semibold text-emerald-600">Saldo Semanal: +R$ 240,00</span>
            </div>
          </div>

          {/* Objetivos em Destaque */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Objetivos em Destaque</h2>
                <p className="text-xs text-[#64748B]">Projeção e progresso de metas de curto e longo prazo</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNewRecordDefaultTab('goal');
                  setIsNewRecordOpen(true);
                }}
                className="text-xs font-bold text-[#0051D5] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                <Plus size={14} />
                <span>Nova Meta</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.slice(0, 2).map((goal) => {
                const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
                return (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white transition-all cursor-pointer"
                    onClick={() => setActivePage('objetivos')}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded">
                        {goal.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {goal.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] mt-2">{goal.title}</h3>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-base font-extrabold text-[#0F172A]">
                        R$ {goal.currentAmount.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-xs text-[#64748B]">
                        de R$ {goal.targetAmount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden mt-2.5">
                      <div
                        className="bg-[#0051D5] h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-[#64748B]">
                      <span>{percent}% atingido</span>
                      <span>Prazo: {goal.targetDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Painel de Estudos, Mercado & Casa, Lembretes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Painel de Estudos Lateral */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-[#0051D5]" />
                  <h2 className="text-sm font-bold text-[#0F172A]">Painel de Estudos</h2>
                </div>
                <span className="text-[11px] font-bold text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded">
                  Ciclo Ativo
                </span>
              </div>

              {/* Circular Progress Ring */}
              <div className="flex flex-col items-center justify-center my-4 py-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-[#E2E8F0]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-[#FFE600]"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="42.7" // 83%
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-[#0F172A]">83%</span>
                    <span className="text-[11px] font-medium text-[#64748B]">12h30 / 15h</span>
                  </div>
                </div>
                <p className="text-xs text-center text-[#64748B] mt-2">
                  Meta semanal de horas líquidas em ritmo acelerado
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Última matéria revisada:</span>
                  <span className="font-bold text-[#0F172A]">Direito Administrativo</span>
                </div>
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Desempenho no bloco:</span>
                  <span className="font-bold text-[#10B981]">24 questões (91% acertos)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActivePage('concurso')}
              className="mt-4 w-full bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play size={14} fill="#0F172A" />
              <span>Iniciar Sessão de Foco Pomodoro</span>
            </button>
          </div>

          {/* Mercado & Casa Rápido */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#F59E0B]" />
                <h2 className="text-sm font-bold text-[#0F172A]">Mercado &amp; Casa</h2>
              </div>
              <span className="text-[11px] text-[#64748B] font-medium">
                {groceries.filter((g) => g.isPurchased).length}/{groceries.length} comprados
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {pendingGroceries.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleGroceryItem(item.id)}
                      className="w-4 h-4 rounded border border-[#CBD5E1] bg-white flex items-center justify-center"
                    >
                      {item.isPurchased && <span className="text-[10px] font-bold">✓</span>}
                    </button>
                    <div>
                      <span className="text-xs font-semibold text-[#0F172A] block leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        {item.quantity} • {item.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0F172A]">
                    R$ {item.estimatedPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActivePage('mercado')}
              className="mt-3 w-full py-2 bg-[#F2F4F6] hover:bg-[#E6E8EA] text-[#0F172A] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver lista completa</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Lembretes Inteligentes */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles size={14} />
                Lembretes Inteligentes
              </span>
              <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                Hoje
              </span>
            </div>

            <ul className="mt-3 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] mt-1.5 shrink-0" />
                <span>Vacina de reforço agendada para quarta-feira (14:30).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] mt-1.5 shrink-0" />
                <span>Publicação do edital TRF prevista em 5 dias corridos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                <span>Meta mensal de poupança já atingiu 92% do esperado.</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-700/80 text-[11px] italic text-slate-400">
              "A constância é a mãe da maestria. Mantenha os blocos de estudo afiados hoje."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
