import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  RotateCcw,
  Play,
  Pause,
  Plus,
  BookOpen,
  Calendar,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface StudiesViewProps {
  store: AppStore;
}

export const StudiesView: React.FC<StudiesViewProps> = ({ store }) => {
  const {
    studyBlocks,
    spacedRepetitions,
    markSpacedRepetitionCompleted,
    postponeSpacedRepetition,
    exams,
    setIsNewRecordOpen,
    setNewRecordDefaultTab,
  } = store;

  // Interactive Pomodoro Timer
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState(3);

  // Selected disciplined for verticalized edital modal
  const [selectedSubjectModal, setSelectedSubjectModal] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (pomodoroSeconds > 0) {
          setPomodoroSeconds((prev) => prev - 1);
        } else if (pomodoroMinutes > 0) {
          setPomodoroMinutes((prev) => prev - 1);
          setPomodoroSeconds(59);
        } else {
          // Timer finished
          setIsTimerRunning(false);
          if (timerMode === 'focus') {
            setCompletedPomodoros((prev) => prev + 1);
            setTimerMode('break');
            setPomodoroMinutes(5);
            setPomodoroSeconds(0);
          } else {
            setTimerMode('focus');
            setPomodoroMinutes(25);
            setPomodoroSeconds(0);
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, pomodoroMinutes, pomodoroSeconds, timerMode]);

  const toggleTimer = () => setIsTimerRunning((prev) => !prev);

  const resetTimer = (mins = 25) => {
    setIsTimerRunning(false);
    setTimerMode('focus');
    setPomodoroMinutes(mins);
    setPomodoroSeconds(0);
  };

  const disciplines = [
    { name: 'Direito Constitucional', theory: 92, questions: 94, totalTopics: 28, doneTopics: 26 },
    { name: 'Direito Tributário', theory: 78, questions: 82, totalTopics: 34, doneTopics: 27 },
    { name: 'Contabilidade Geral', theory: 65, questions: 76, totalTopics: 42, doneTopics: 28 },
    { name: 'Língua Portuguesa', theory: 88, questions: 89, totalTopics: 22, doneTopics: 19 },
    { name: 'Legislação Aduaneira', theory: 52, questions: 71, totalTopics: 30, doneTopics: 16 },
    { name: 'Direito Administrativo', theory: 90, questions: 91, totalTopics: 26, doneTopics: 24 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header with Active Focus & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Preparação para Concursos
            </h1>
            <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-2.5 py-0.5 rounded-full">
              Edital Previsto 2025
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 flex items-center gap-2">
            <span>Foco Ativo: <strong>Auditor Fiscal da Receita Federal / TRF</strong></span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Flame size={14} />
              18 dias seguidos
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setNewRecordDefaultTab('study');
              setIsNewRecordOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F2F4F6] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
          >
            <HelpCircle size={15} />
            <span>+ Registrar Questões</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setNewRecordDefaultTab('study');
              setIsNewRecordOpen(true);
            }}
            className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Nova Sessão</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Bento KPIs do Concurseiro */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1: Horas Líquidas */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Horas Líquidas (Mês)</span>
            <Clock size={16} className="text-[#0051D5]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">
              68h40 <span className="text-xs font-semibold text-[#64748B]">/ 80h</span>
            </div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1">
              85,8% da meta atingida
            </div>
          </div>
        </div>

        {/* KPI 2: Edital Concluído */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Edital Concluído</span>
            <BookOpen size={16} className="text-[#F59E0B]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">74% geral</div>
            <div className="text-[11px] text-[#64748B] mt-1">
              185 de 250 tópicos dominados
            </div>
          </div>
        </div>

        {/* KPI 3: Questões Feitas */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Questões Feitas</span>
            <HelpCircle size={16} className="text-purple-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#0F172A]">1.420</div>
            <div className="text-[11px] text-[#0051D5] font-semibold mt-1">
              +85 questões ontem
            </div>
          </div>
        </div>

        {/* KPI 4: Taxa de Acertos */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Taxa de Acertos</span>
            <TrendingUp size={16} className="text-[#10B981]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#10B981]">81,5%</div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1">
              +3,2% (últimas 400 questões)
            </div>
          </div>
        </div>

        {/* KPI 5: Revisões Hoje */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Revisões Hoje</span>
            <RotateCcw size={16} className="text-rose-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-[#EF4444]">3 tópicos</div>
            <div className="text-[11px] text-[#64748B] mt-1">
              Ciclo Anki / 24h, 7d, 30d
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Ciclo Atual, Disciplinas, Simulados */}
        <div className="lg:col-span-8 space-y-6">
          {/* Ciclo de Estudos Atual & Cronograma */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Ciclo de Estudos Atual &amp; Cronograma
                </h2>
                <p className="text-xs text-[#64748B]">Hoje • 4 blocos planejados</p>
              </div>
              <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-full">
                Bloco 2 de 4
              </span>
            </div>

            <div className="space-y-3">
              {studyBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    block.status === 'Concluído'
                      ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                      : block.status === 'Em Andamento'
                      ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                      : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        block.status === 'Concluído'
                          ? 'bg-emerald-100 text-emerald-800'
                          : block.status === 'Em Andamento'
                          ? 'bg-[#FFE600] text-[#0F172A]'
                          : 'bg-[#F2F4F6] text-[#64748B]'
                      }`}
                    >
                      {block.status === 'Concluído' ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#64748B]">
                          {block.timeRange}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-[#0051D5]">
                          {block.subject}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            block.status === 'Concluído'
                              ? 'bg-emerald-100 text-emerald-800'
                              : block.status === 'Em Andamento'
                              ? 'bg-amber-100 text-amber-900 animate-pulse'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {block.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                        {block.topic}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B]">
                        <span>{block.type}</span>
                        <span>•</span>
                        <span>{block.durationMinutes} minutos</span>
                        {block.institution && (
                          <>
                            <span>•</span>
                            <span className="font-bold text-[#0F172A]">
                              Banca: {block.institution}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {block.status === 'Em Andamento' && (
                      <button
                        type="button"
                        onClick={toggleTimer}
                        className="bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                        <span>{isTimerRunning ? 'Pausar Timer' : 'Continuar Bloco'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progresso por Disciplina do Edital */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Progresso por Disciplina do Edital
                </h2>
                <p className="text-xs text-[#64748B]">
                  Teoria verticalizada vs. aproveitamento de questões
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubjectModal('Edital Completo')}
                className="text-xs font-bold text-[#0051D5] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                <span>Edital Verticalizado</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {disciplines.map((d, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#0F172A] font-bold">{d.name}</span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-[#64748B]">
                        Teoria: <strong>{d.theory}%</strong> ({d.doneTopics}/{d.totalTopics} tópicos)
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[#10B981] font-bold">
                        Acertos: {d.questions}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#0051D5] h-full rounded-full transition-all"
                      style={{ width: `${d.theory}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulados Recentes & Diagnóstico */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">
                  Simulados Recentes &amp; Diagnóstico
                </h2>
                <p className="text-xs text-[#64748B]">
                  Média dos 3 últimos simulados: <strong>80,4%</strong>
                </p>
              </div>
              <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-full">
                Alta Competitividade
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded">
                      {exam.board}
                    </span>
                    <span className="text-[11px] text-[#64748B]">{exam.date}</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#0F172A] line-clamp-1">{exam.name}</h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-[#0F172A]">
                      {exam.percentage}%
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      {exam.correctCount}/{exam.totalCount} acertos
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                    <span className="font-semibold text-rose-600 block">Atenção em:</span>
                    <span className="truncate block">{exam.weakPoint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (4 cols): Revisão Espaçada, Pomodoro, Bancas, Dica */}
        <div className="lg:col-span-4 space-y-6">
          {/* Revisão Espaçada Anki */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <RotateCcw size={17} className="text-[#EF4444]" />
                <h2 className="text-sm font-bold text-[#0F172A]">Revisão Espaçada de Hoje</h2>
              </div>
              <span className="text-[11px] font-bold text-[#EF4444] bg-rose-50 px-2 py-0.5 rounded">
                Ciclos 24h • 7d • 30d
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {spacedRepetitions.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all ${
                    item.isCompleted
                      ? 'bg-emerald-50/60 border-emerald-200 opacity-70'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.stage === '24h'
                          ? 'bg-rose-100 text-rose-800'
                          : item.stage === '7d'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Ciclo {item.stage}
                    </span>
                    <span className="text-[11px] text-[#64748B]">{item.subject}</span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0F172A] mt-1.5 leading-snug">
                    {item.topic}
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{item.details}</p>

                  <div className="flex items-center justify-end gap-1.5 mt-2.5 pt-2 border-t border-[#E2E8F0]/70">
                    {!item.isCompleted ? (
                      <>
                        <button
                          type="button"
                          onClick={() => postponeSpacedRepetition(item.id)}
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-[#64748B] rounded-lg text-[11px] font-semibold border border-[#CBD5E1] transition-colors"
                        >
                          Adiar +1d
                        </button>
                        <button
                          type="button"
                          onClick={() => markSpacedRepetitionCompleted(item.id)}
                          className="px-2.5 py-1 bg-[#10B981] hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 size={12} />
                          <span>Marcar Revisado</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Revisado com sucesso
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pomodoro Timer Real-time */}
          <div className="bg-gradient-to-br from-[#0F172A] to-slate-800 text-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
                <Clock size={15} />
                Pomodoro de Alto Rendimento
              </span>
              <span className="text-[11px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                {completedPomodoros} blocos hoje
              </span>
            </div>

            <div className="flex flex-col items-center justify-center my-4">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                {timerMode === 'focus' ? 'Foco Total' : 'Pausa de Recuperação'}
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-widest my-1">
                {String(pomodoroMinutes).padStart(2, '0')}:
                {String(pomodoroSeconds).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`w-2 h-2 rounded-full ${
                      dot <= completedPomodoros % 4 || (completedPomodoros > 0 && dot === 4)
                        ? 'bg-[#FFE600]'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={toggleTimer}
                className="bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A] px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isTimerRunning ? <Pause size={16} /> : <Play size={16} fill="#0F172A" />}
                <span>{isTimerRunning ? 'Pausar' : 'Iniciar Foco'}</span>
              </button>
              <button
                type="button"
                onClick={() => resetTimer(25)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2.5 rounded-xl font-medium text-xs transition-colors"
                title="Resetar 25min"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Calibração por Banca Examinadora */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Calibração por Banca
              </h3>
              <Award size={16} className="text-[#0051D5]" />
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">Fundação Getulio Vargas (FGV)</span>
                <span className="font-extrabold text-[#10B981]">83,4%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">Cebraspe (C/E)</span>
                <span className="font-extrabold text-[#0051D5]">79,8%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">Fundação Carlos Chagas (FCC)</span>
                <span className="font-extrabold text-purple-600">88,2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
