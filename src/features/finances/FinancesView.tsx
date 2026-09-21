import React, { useState, useMemo } from 'react';
import {
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Filter,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  CreditCard,
  Plus,
  RefreshCw,
  QrCode,
  Share2,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';
import { TransactionCategory, TransactionType, TransactionStatus } from '../../types';

interface FinancesViewProps {
  store: AppStore;
}

export const FinancesView: React.FC<FinancesViewProps> = ({ store }) => {
  const {
    userMode,
    setUserMode,
    transactions,
    displayTransactions,
    toggleTransactionStatus,
    deleteTransaction,
    setIsNewRecordOpen,
    setNewRecordDefaultTab,
    setIsPixModalOpen,
  } = store;

  // Local filters
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterResponsible, setFilterResponsible] = useState<string>('all');

  // Filtered transactions
  const filteredList = useMemo(() => {
    return displayTransactions.filter((tx) => {
      const matchSearch =
        tx.description.toLowerCase().includes(filterSearch.toLowerCase()) ||
        (tx.subtitle && tx.subtitle.toLowerCase().includes(filterSearch.toLowerCase())) ||
        tx.accountOrCard.toLowerCase().includes(filterSearch.toLowerCase());

      const matchCategory = filterCategory === 'all' || tx.category === filterCategory;
      const matchType = filterType === 'all' || tx.type === filterType;
      const matchStatus = filterStatus === 'all' || tx.status === filterStatus;
      const matchResponsible =
        filterResponsible === 'all' ||
        tx.paidBy === filterResponsible ||
        tx.responsibleName === filterResponsible;

      return matchSearch && matchCategory && matchType && matchStatus && matchResponsible;
    });
  }, [displayTransactions, filterSearch, filterCategory, filterType, filterStatus, filterResponsible]);

  // Totals calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalPending = transactions
    .filter((t) => t.status === 'PENDING')
    .reduce((acc, t) => acc + t.amount, 0);

  // Category breakdown
  const categoryExpenses = useMemo(() => {
    const map: Record<string, number> = {
      Moradia: 2219,
      Alimentação: 1585,
      Estudos: 951,
      Investimentos: 951,
      Lazer: 634,
    };
    return map;
  }, []);

  const handleExportCSV = () => {
    const headers = ['Descrição', 'Valor', 'Tipo', 'Categoria', 'Vencimento', 'Status', 'Responsável'];
    const rows = filteredList.map((t) => [
      `"${t.description}"`,
      t.amount.toFixed(2),
      t.type,
      t.category,
      t.dueDate,
      t.status,
      t.paidBy,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'extrato_lifeasier_outubro.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header with Mode Toggle & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Controle Financeiro
            </h1>
            <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Outubro 2024
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            {userMode === 'couple'
              ? 'Visão compartilhada consolidada • Sincronizado com Mariana há 10 min'
              : 'Visão individual • Mostrando apenas despesas e rendas de Lucas'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Couple vs Individual Toggle */}
          <div className="bg-[#F2F4F6] p-1 rounded-xl flex items-center shadow-inner text-xs font-semibold">
            <button
              type="button"
              onClick={() => setUserMode('individual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                userMode === 'individual'
                  ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                  : 'text-[#64748B]'
              }`}
            >
              Meu (Individual)
            </button>
            <button
              type="button"
              onClick={() => setUserMode('couple')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                userMode === 'couple'
                  ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                  : 'text-[#64748B]'
              }`}
            >
              <span>Nosso (Casal)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setNewRecordDefaultTab('transaction');
              setIsNewRecordOpen(true);
            }}
            className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Nova Despesa</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Bento KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Card 1: Saldo Consolidado */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Saldo Consolidado</span>
            <Wallet size={16} className="text-[#0051D5]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">R$ 18.420,50</div>
            <div className="text-[11px] text-[#64748B] mt-1">
              Inter + Nubank + XP • <span className="text-[#10B981] font-bold">98.2% protegida</span>
            </div>
          </div>
        </div>

        {/* Card 2: Receitas do Mês */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Receitas do Mês</span>
            <ArrowUpRight size={16} className="text-[#10B981]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#10B981]">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>+5,2% vs mês anterior</span>
            </div>
          </div>
        </div>

        {/* Card 3: Despesas do Mês */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Despesas do Mês</span>
            <ArrowDownRight size={16} className="text-[#EF4444]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#EF4444]">
              R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1">
              -12% economia atingida
            </div>
          </div>
        </div>

        {/* Card 4: Saldo Projetado */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Saldo Projetado Fim/Mês</span>
            <TrendingUp size={16} className="text-[#0051D5]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">R$ 24.580,30</div>
            <div className="text-[11px] text-[#0051D5] font-semibold mt-1">
              + R$ 3.500 meta poupança
            </div>
          </div>
        </div>

        {/* Card 5: Contas a Pagar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Contas a Pagar (7 dias)</span>
            <AlertCircle size={16} className="text-[#F59E0B]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#F59E0B]">
              R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#64748B] mt-1">
              3 faturas • Próx. 26/10 Internet
            </div>
          </div>
        </div>
      </div>

      {/* 3. Analytics Section: Donut Breakdown & Divisão do Casal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Distribuição por Categoria (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Distribuição por Categoria
                </h2>
                <p className="text-xs text-[#64748B]">Mês vigente • Despesas totais</p>
              </div>
              <span className="text-xs font-bold text-[#0F172A] bg-[#F2F4F6] px-2.5 py-1 rounded-lg">
                R$ 6.340,20
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-4">
              {/* Donut Chart SVG */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Moradia 35% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#0051D5"
                      strokeWidth="12"
                      strokeDasharray="83.5 238.7"
                      strokeDashoffset="0"
                    />
                    {/* Alimentação 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="12"
                      strokeDasharray="59.6 238.7"
                      strokeDashoffset="-83.5"
                    />
                    {/* Estudos 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#8B5CF6"
                      strokeWidth="12"
                      strokeDasharray="35.8 238.7"
                      strokeDashoffset="-143.1"
                    />
                    {/* Investimentos 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="12"
                      strokeDasharray="35.8 238.7"
                      strokeDashoffset="-178.9"
                    />
                    {/* Lazer 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#EF4444"
                      strokeWidth="12"
                      strokeDasharray="23.8 238.7"
                      strokeDashoffset="-214.7"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-[#64748B]">Teto</span>
                    <span className="text-sm font-extrabold text-[#0F172A]">63%</span>
                  </div>
                </div>
              </div>

              {/* Legend with percentages */}
              <div className="sm:col-span-7 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0051D5]" />
                    <span>Moradia (35%)</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">R$ 2.219,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Alimentação (25%)</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">R$ 1.585,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Estudos &amp; Cursos (15%)</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">R$ 951,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span>Investimentos (15%)</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">R$ 951,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span>Lazer &amp; Outros (10%)</span>
                  </span>
                  <span className="font-bold text-[#0F172A]">R$ 634,20</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B] flex items-center justify-between">
            <span>Você utilizou 63% do teto estipulado de gastos mensais (R$ 10.000,00)</span>
            <span className="text-[#10B981] font-bold">Dentro da meta</span>
          </div>
        </div>

        {/* Divisão de Responsabilidade do Casal (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Divisão de Responsabilidade do Casal
                </h2>
                <p className="text-xs text-[#64748B]">
                  Equilíbrio financeiro e divisão de despesas compartilhadas
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Em dia
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A] mb-1.5">
                <span>Lucas (32% • R$ 2.028)</span>
                <span>Mariana (28% • R$ 1.775)</span>
                <span>Conjunto (40% • R$ 2.536)</span>
              </div>
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                <div className="bg-[#0051D5] h-full" style={{ width: '32%' }} />
                <div className="bg-[#F59E0B] h-full" style={{ width: '28%' }} />
                <div className="bg-[#10B981] h-full" style={{ width: '40%' }} />
              </div>
            </div>

            {/* Interactive Acerto de Contas Card */}
            <div className="mt-5 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0051D5] block">
                  Acerto de Contas do Mês
                </span>
                <p className="text-xs text-[#0F172A] mt-0.5">
                  Mariana deve pagar <strong>R$ 126,77</strong> para Lucas para equilibrar a regra 50/50.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPixModalOpen(true)}
                className="bg-[#0051D5] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <QrCode size={15} />
                <span>Liquidar PIX</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B] flex items-center justify-between">
            <span>Regra de divisão: 50/50 nas contas conjuntas</span>
            <button
              type="button"
              onClick={() => store.setActivePage('configuracoes')}
              className="text-[#0051D5] font-semibold hover:underline"
            >
              Ajustar regra
            </button>
          </div>
        </div>
      </div>

      {/* 4. Advanced Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Buscar fornecedor, boleto, conta..."
              className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20 focus:border-[#0051D5]"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-9 px-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Moradia">Moradia</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Renda">Renda</option>
            <option value="Estudos">Estudos</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="hidden sm:block h-9 px-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
          >
            <option value="all">Todos os Tipos</option>
            <option value="EXPENSE">Despesa</option>
            <option value="INCOME">Receita</option>
            <option value="INVESTMENT">Investimento</option>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-3 bg-[#F8FAFC] hover:bg-[#F2F4F6] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 transition-colors"
          >
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* 5. Transactions Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#E2E8F0]/70 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#F1F5F9] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Lançamentos Recentes</h2>
            <p className="text-xs text-[#64748B]">
              Mostrando {filteredList.length} de {transactions.length} registros
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold border-b border-[#F1F5F9] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 sm:px-6 py-3">Descrição</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Vencimento</th>
                <th className="px-4 py-3">Quem Pagou</th>
                <th className="px-4 py-3">Conta / Cartão</th>
                <th className="px-4 py-3 text-right">Valor</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 sm:px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredList.map((tx) => {
                const isIncome = tx.type === 'INCOME';
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isIncome
                              ? 'bg-emerald-50 text-[#10B981]'
                              : 'bg-rose-50 text-[#EF4444]'
                          }`}
                        >
                          {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                            {tx.description}
                          </div>
                          {tx.subtitle && (
                            <div className="text-[11px] text-[#64748B]">{tx.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="bg-[#F2F4F6] text-[#475569] font-medium px-2 py-0.5 rounded text-[11px]">
                        {tx.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-[#64748B] whitespace-nowrap">
                      {tx.dueDate.split('-').reverse().join('/')}
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          tx.paidBy === 'Lucas'
                            ? 'bg-blue-50 text-[#0051D5]'
                            : 'bg-amber-50 text-[#F59E0B]'
                        }`}
                      >
                        {tx.paidBy} ({tx.splitRatio})
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-[#64748B]">{tx.accountOrCard}</td>

                    <td className="px-4 py-3.5 text-right font-extrabold whitespace-nowrap">
                      <span className={isIncome ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                        {isIncome ? '+' : '-'} R${' '}
                        {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleTransactionStatus(tx.id)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center gap-1 mx-auto transition-all ${
                          tx.status === 'PAID'
                            ? 'bg-emerald-50 text-[#10B981]'
                            : 'bg-amber-50 text-[#F59E0B]'
                        }`}
                        title="Clique para alternar Pago / Pendente"
                      >
                        {tx.status === 'PAID' ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Pago</span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} />
                            <span>Pendente</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-4 sm:px-6 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg text-[#64748B] hover:text-[#EF4444] hover:bg-rose-50 transition-colors"
                        title="Excluir lançamento"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
