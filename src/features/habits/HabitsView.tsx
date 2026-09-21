import React from 'react';
import { Heart, Flame, CheckCircle2, Plus, Droplets, Dumbbell, BookOpen, Moon } from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface HabitsViewProps {
  store: AppStore;
}

export const HabitsView: React.FC<HabitsViewProps> = ({ store }) => {
  const { habits, toggleHabit } = store;

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Saúde &amp; Hábitos
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Consistência diária para sustentar rotinas de alto rendimento
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
            {completedCount} de {habits.length} concluídos hoje
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              habit.completed
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-white border-[#E2E8F0] shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    habit.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-[#0051D5]'
                  }`}
                >
                  <Heart size={18} />
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame size={13} />
                  {habit.streakDays} dias
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0F172A] mt-3">{habit.name}</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Alvo diário: {habit.target}</p>
            </div>

            <button
              type="button"
              onClick={() => toggleHabit(habit.id)}
              className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                habit.completed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A]'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{habit.completed ? 'Concluído Hoje' : 'Marcar Concluído'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
