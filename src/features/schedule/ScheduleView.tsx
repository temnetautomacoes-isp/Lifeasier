import React from 'react';
import { Calendar, Clock, Plus, CheckSquare, ChevronRight, User, Users } from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface ScheduleViewProps {
  store: AppStore;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ store }) => {
  const { routine, toggleRoutineItem, setIsNewRecordOpen, setNewRecordDefaultTab, userMode } = store;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Programações &amp; Rotina
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Timeline de compromissos pessoais, blocos de estudo e eventos do casal
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNewRecordDefaultTab('task');
            setIsNewRecordOpen(true);
          }}
          className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Novo Compromisso</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0]/70">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
            <Calendar size={18} className="text-[#0051D5]" />
            <span>Segunda-feira, 24 de Outubro</span>
          </div>
          <span className="text-xs text-[#64748B] font-medium">
            {routine.filter((r) => r.completed).length} de {routine.length} compromissos feitos
          </span>
        </div>

        <div className="space-y-3">
          {routine.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                item.completed
                  ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-75'
                  : 'bg-white border-[#CBD5E1]/70 hover:border-[#0051D5]'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleRoutineItem(item.id)}
                  className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-[#10B981] border-[#10B981] text-white'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {item.completed && <span className="text-xs font-black">✓</span>}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock size={12} />
                      {item.time}
                    </span>
                    <h3
                      className={`text-sm font-bold text-[#0F172A] ${
                        item.completed ? 'line-through text-[#64748B]' : ''
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">{item.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-[11px] font-semibold bg-[#F2F4F6] text-[#475569] px-2.5 py-1 rounded-lg">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
