import React, { useState } from 'react';
import {
  X,
  ArrowDownRight,
  ArrowUpRight,
  ShoppingCart,
  GraduationCap,
  Target,
  CheckSquare,
  Check,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';
import { TransactionCategory, GroceryCategory, SplitRatio } from '../../types';

interface NewRecordModalProps {
  store: AppStore;
}

export const NewRecordModal: React.FC<NewRecordModalProps> = ({ store }) => {
  const {
    isNewRecordOpen,
    setIsNewRecordOpen,
    newRecordDefaultTab,
    addTransaction,
    addGroceryItem,
    contributeToGoal,
  } = store;

  const [activeTab, setActiveTab] = useState<'transaction' | 'grocery' | 'study' | 'goal' | 'task'>(
    newRecordDefaultTab
  );

  // Form states for transaction
  const [txDesc, setTxDesc] = useState('');
  const [txSubtitle, setTxSubtitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [txCat, setTxCat] = useState<TransactionCategory>('Moradia');
  const [txAccount, setTxAccount] = useState('Nubank Conjunta');
  const [txPaidBy, setTxPaidBy] = useState<'Lucas' | 'Mariana'>('Lucas');
  const [txSplit, setTxSplit] = useState<SplitRatio>('50/50');
  const [txDate, setTxDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Form states for grocery item
  const [gName, setGName] = useState('');
  const [gCat, setGCat] = useState<GroceryCategory>('Hortifrúti');
  const [gQty, setGQty] = useState('1 un');
  const [gPrice, setGPrice] = useState('');
  const [gAssigned, setGAssigned] = useState<'Lucas' | 'Mariana'>('Lucas');

  // Form states for study session
  const [studySubject, setStudySubject] = useState('Direito Tributário');
  const [studyTopic, setStudyTopic] = useState('');
  const [studyDuration, setStudyDuration] = useState('60');
  const [studyQuestions, setStudyQuestions] = useState('20');
  const [studyCorrect, setStudyCorrect] = useState('18');

  // Form states for goal
  const [goalTitle, setGoalTitle] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDate, setGoalDate] = useState('Outubro/2025');

  // Form states for routine task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('14:00');
  const [taskCat, setTaskCat] = useState<'Saúde' | 'Estudos' | 'Finanças' | 'Cursos'>('Estudos');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isNewRecordOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'transaction') {
      if (!txDesc || !txAmount) return;
      addTransaction({
        description: txDesc,
        subtitle: txSubtitle || undefined,
        amount: parseFloat(txAmount.replace(',', '.')) || 0,
        type: txType,
        category: txCat,
        dueDate: txDate,
        paidAt: txDate,
        status: 'PAID',
        isShared: txSplit !== '100/0',
        paidBy: txPaidBy,
        responsibleName: txSplit === '100/0' ? txPaidBy : 'Casal',
        accountOrCard: txAccount,
        splitRatio: txSplit,
      });
    } else if (activeTab === 'grocery') {
      if (!gName) return;
      addGroceryItem({
        listId: 'list-mensal',
        name: gName,
        category: gCat,
        quantity: gQty || '1 un',
        estimatedPrice: parseFloat(gPrice.replace(',', '.')) || 10.0,
        isPurchased: false,
        status: 'Pendente',
        assignedTo: gAssigned,
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsNewRecordOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Novo Registro</h2>
            <p className="text-xs text-[#64748B]">Adicione dados sincronizados à sua rotina e finanças</p>
          </div>
          <button
            type="button"
            onClick={() => setIsNewRecordOpen(false)}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#E0E3E5] hover:text-[#0F172A] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#F1F5F9] p-2 bg-[#F8FAFC] gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('transaction')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'transaction'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <ArrowDownRight size={15} className="text-[#EF4444]" />
            Finanças
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('grocery')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'grocery'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <ShoppingCart size={15} className="text-[#F59E0B]" />
            Mercado
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'study'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <GraduationCap size={15} className="text-[#0051D5]" />
            Estudos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('goal')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'goal'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Target size={15} className="text-[#10B981]" />
            Objetivo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('task')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'task'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <CheckSquare size={15} className="text-purple-600" />
            Rotina
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          {activeTab === 'transaction' && (
            <>
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-[#F2F4F6] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTxType('EXPENSE')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    txType === 'EXPENSE'
                      ? 'bg-white text-[#EF4444] shadow-xs'
                      : 'text-[#64748B]'
                  }`}
                >
                  <ArrowDownRight size={16} />
                  Despesa
                </button>
                <button
                  type="button"
                  onClick={() => setTxType('INCOME')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    txType === 'INCOME'
                      ? 'bg-white text-[#10B981] shadow-xs'
                      : 'text-[#64748B]'
                  }`}
                >
                  <ArrowUpRight size={16} />
                  Receita
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  required
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  placeholder="Ex: Supermercado Pão de Açúcar, Aluguel, Salário..."
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20 focus:border-[#0051D5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="text"
                    required
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    placeholder="Ex: 250,00"
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20 focus:border-[#0051D5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Categoria
                  </label>
                  <select
                    value={txCat}
                    onChange={(e) => setTxCat(e.target.value as TransactionCategory)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20"
                  >
                    <option value="Moradia">Moradia &amp; Contas</option>
                    <option value="Alimentação">Alimentação &amp; Mercado</option>
                    <option value="Renda">Renda &amp; Salário</option>
                    <option value="Estudos">Estudos &amp; Cursos</option>
                    <option value="Lazer">Lazer &amp; Restaurante</option>
                    <option value="Saúde">Saúde &amp; Farmácia</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Outros">Outros / Investimentos</option>
                  </select>
                </div>
              </div>

              {/* Casal / Split Details */}
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-2.5">
                <span className="text-xs font-bold text-[#0F172A] block">
                  Responsabilidade &amp; Divisão do Casal
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#64748B] block mb-1">Quem pagou?</span>
                    <select
                      value={txPaidBy}
                      onChange={(e) => setTxPaidBy(e.target.value as 'Lucas' | 'Mariana')}
                      className="w-full h-9 px-2 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                    >
                      <option value="Lucas">Lucas</option>
                      <option value="Mariana">Mariana</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[#64748B] block mb-1">Proporção</span>
                    <select
                      value={txSplit}
                      onChange={(e) => setTxSplit(e.target.value as SplitRatio)}
                      className="w-full h-9 px-2 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                    >
                      <option value="50/50">50% Casal (50/50)</option>
                      <option value="60/40">60% Lucas / 40% Mari</option>
                      <option value="100/0">100% Individual (Sem divisão)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Conta ou Cartão
                  </label>
                  <input
                    type="text"
                    value={txAccount}
                    onChange={(e) => setTxAccount(e.target.value)}
                    placeholder="Ex: Nubank Conjunta, Inter..."
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'grocery' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Nome do Item
                </label>
                <input
                  type="text"
                  required
                  value={gName}
                  onChange={(e) => setGName(e.target.value)}
                  placeholder="Ex: Café em grãos gourmet, Maçã Gala..."
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20 focus:border-[#0051D5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Categoria
                  </label>
                  <select
                    value={gCat}
                    onChange={(e) => setGCat(e.target.value as GroceryCategory)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  >
                    <option value="Hortifrúti">Hortifrúti</option>
                    <option value="Carnes & Proteínas">Carnes &amp; Proteínas</option>
                    <option value="Mercearia">Mercearia</option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Padaria">Padaria</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Quantidade
                  </label>
                  <input
                    type="text"
                    value={gQty}
                    onChange={(e) => setGQty(e.target.value)}
                    placeholder="Ex: 2 kg, 1 pct, 3 un..."
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Preço Estimado (R$)
                  </label>
                  <input
                    type="text"
                    value={gPrice}
                    onChange={(e) => setGPrice(e.target.value)}
                    placeholder="Ex: 25,00"
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Responsável
                  </label>
                  <select
                    value={gAssigned}
                    onChange={(e) => setGAssigned(e.target.value as 'Lucas' | 'Mariana')}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  >
                    <option value="Lucas">Lucas</option>
                    <option value="Mariana">Mariana</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'study' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Disciplina / Matéria
                </label>
                <select
                  value={studySubject}
                  onChange={(e) => setStudySubject(e.target.value)}
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                >
                  <option value="Direito Constitucional">Direito Constitucional</option>
                  <option value="Direito Tributário">Direito Tributário</option>
                  <option value="Contabilidade Geral">Contabilidade Geral</option>
                  <option value="Língua Portuguesa">Língua Portuguesa</option>
                  <option value="Legislação Aduaneira">Legislação Aduaneira</option>
                  <option value="Direito Administrativo">Direito Administrativo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Tópico ou Capítulo
                </label>
                <input
                  type="text"
                  value={studyTopic}
                  onChange={(e) => setStudyTopic(e.target.value)}
                  placeholder="Ex: Atos Administrativos, DRE, Sintaxe..."
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Tempo (min)
                  </label>
                  <input
                    type="number"
                    value={studyDuration}
                    onChange={(e) => setStudyDuration(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Questões
                  </label>
                  <input
                    type="number"
                    value={studyQuestions}
                    onChange={(e) => setStudyQuestions(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Acertos
                  </label>
                  <input
                    type="number"
                    value={studyCorrect}
                    onChange={(e) => setStudyCorrect(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'goal' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Título da Meta
                </label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="Ex: Viagem Casal Japão 2026, Novo Notebook..."
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Valor Alvo (R$)
                  </label>
                  <input
                    type="text"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="Ex: 30.000"
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Prazo
                  </label>
                  <input
                    type="text"
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                    placeholder="Ex: Dezembro/2025"
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'task' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Compromisso / Tarefa
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Ex: Revisar petição, Consulta Médica, Treino..."
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Categoria
                  </label>
                  <select
                    value={taskCat}
                    onChange={(e) => setTaskCat(e.target.value as any)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A]"
                  >
                    <option value="Estudos">Estudos</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Finanças">Finanças</option>
                    <option value="Cursos">Cursos</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F1F5F9]">
            <button
              type="button"
              onClick={() => setIsNewRecordOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check size={16} className="text-[#0F172A]" />
                  <span>Salvo com sucesso!</span>
                </>
              ) : (
                <span>Salvar Registro</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
