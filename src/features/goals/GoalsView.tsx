import React, { useState } from 'react';
import { Target, Plus, TrendingUp, Calendar, Check, DollarSign } from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface GoalsViewProps {
  store: AppStore;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ store }) => {
  const { goals, contributeToGoal, setIsNewRecordOpen, setNewRecordDefaultTab } = store;
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState('500');

  const handleContribute = (goalId: string) => {
    const val = parseFloat(contributionAmount) || 0;
    if (val > 0) {
      contributeToGoal(goalId, val);
      setSelectedGoalId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Metas &amp; Objetivos
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Planejamento financeiro de curto, médio e longo prazo do casal e individual
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewRecordDefaultTab('goal');
            setIsNewRecordOpen(true);
          }}
          className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Nova Meta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

          return (
            <div
              key={goal.id}
              className="bg-white rounded-2xl p-5 shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {goal.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {goal.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] mt-3">{goal.title}</h3>

                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#0F172A]">
                      R$ {goal.currentAmount.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-[#64748B]">
                      Alvo: R$ {goal.targetAmount.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="bg-[#0051D5] h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                    <span>{percent}% acumulado</span>
                    <span>Faltam R$ {remaining.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Prazo estipulado:</span>
                    <span className="font-bold text-[#0F172A]">{goal.targetDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Aporte mensal sugerido:</span>
                    <span className="font-bold text-[#10B981]">
                      R$ {goal.monthlySuggested.toLocaleString('pt-BR')} / mês
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                {selectedGoalId === goal.id ? (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F172A]">Aporte R$:</span>
                      <input
                        type="number"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-24 h-8 px-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-bold text-[#0F172A]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleContribute(goal.id)}
                        className="flex-1 py-1.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Confirmar Aporte
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedGoalId(null)}
                        className="px-2 py-1.5 bg-[#F2F4F6] text-[#64748B] rounded-lg text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedGoalId(goal.id)}
                    className="w-full py-2 bg-[#F2F4F6] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <DollarSign size={14} />
                    <span>Registrar Aporte</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
