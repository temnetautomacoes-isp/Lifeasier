import React, { useState } from 'react';
import {
  School,
  PlayCircle,
  HelpCircle,
  FileText,
  CalendarDays,
  BarChart3,
  Bell,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Search,
  Plus,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface OtherViewProps {
  store: AppStore;
}

export const OtherViews: React.FC<OtherViewProps> = ({ store }) => {
  const { activePage, setActivePage } = store;

  if (activePage === 'faculdade') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Faculdade &amp; Pós-Graduação</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">MBA em Engenharia de Software &amp; Gestão</p>
          </div>
          <span className="text-xs font-bold text-[#0051D5] bg-blue-50 px-3 py-1 rounded-full">
            Semestre 2024.2
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { discipline: 'Arquitetura de Microsserviços e Cloud', prof: 'Dr. Roberto Mendes', cr: '10.0', status: 'Em dia' },
            { discipline: 'Segurança da Informação e Criptografia', prof: 'Me. Camila Rios', cr: '9.4', status: 'Prova em 12 dias' },
            { discipline: 'Governança de Dados e LGPD', prof: 'Dra. Fernanda Castro', cr: '9.8', status: 'Trabalho entregue' },
            { discipline: 'Inteligência Artificial Aplicada', prof: 'Dr. Alan Vasconcelos', cr: '9.5', status: 'Projeto Final' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {item.status}
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mt-2">{item.discipline}</h3>
              <p className="text-xs text-[#64748B] mt-1">{item.prof}</p>
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Média Atual:</span>
                <span className="font-extrabold text-[#0051D5]">{item.cr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activePage === 'banco-de-questoes') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Banco de Questões</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Filtro por bancas FGV, Cebraspe, FCC e resolução comentada
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('concurso')}
            className="bg-[#FFE600] text-[#0F172A] px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs"
          >
            Fazer Simulado
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'q-1',
              subject: 'Direito Constitucional',
              board: 'FGV 2024',
              title: 'Acerca da Ação Direta de Inconstitucionalidade por Omissão (ADO), assinale a afirmativa correta:',
              tag: 'Controle Concentrado',
              answers: ['A', 'B', 'C', 'D', 'E'],
            },
            {
              id: 'q-2',
              subject: 'Direito Tributário',
              board: 'Cebraspe 2023',
              title: 'No que concerne às causas de exclusão do crédito tributário segundo o Código Tributário Nacional:',
              tag: 'Crédito Tributário',
              answers: ['Certo', 'Errado'],
            },
          ].map((q) => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#0051D5] px-2 py-0.5 rounded">
                  {q.board}
                </span>
                <span className="text-xs font-bold text-[#0F172A]">{q.subject}</span>
                <span className="text-xs text-[#64748B] ml-auto">{q.tag}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#0F172A] font-medium leading-relaxed">{q.title}</p>
              <div className="flex items-center gap-2 pt-2">
                {q.answers.map((ans, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="px-3 py-1 rounded-lg border border-[#CBD5E1] hover:bg-[#FFE600] hover:text-[#0F172A] text-xs font-bold transition-colors"
                  >
                    Opção {ans}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activePage === 'anotacoes') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Anotações &amp; Resumos</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Caderno digital sincronizado de doutrina, jurisprudência e fórmulas
            </p>
          </div>
          <button
            type="button"
            className="bg-[#FFE600] text-[#0F172A] px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Nova Anotação</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'CTN Art. 151 - Suspensão da Exigibilidade',
              preview: 'MODILAPA: Moratória, Depósito do montante integral, Impugnações e recursos, Liminar em MS...',
              tag: 'Tributário',
              updated: 'Ontem',
            },
            {
              title: 'Legitimados Universais e Especiais ADI',
              preview: 'Mesa do Congresso, Presidente, PGR, CFOAB (Universais). Governadores e Mesas de Assembleias (Especiais)...',
              tag: 'Constitucional',
              updated: 'Há 3 dias',
            },
            {
              title: 'CPC / Regras de Concorrência e Event Loop',
              preview: 'Call Stack -> Web APIs -> Callback Queue (Task Queue) -> Microtask Queue (Promises tem prioridade)...',
              tag: 'Tech',
              updated: '18/10/2024',
            },
          ].map((note, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded">
                  {note.tag}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-2">{note.title}</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{note.preview}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center justify-between">
                <span>Modificado: {note.updated}</span>
                <span className="text-[#0051D5] font-semibold">Editar</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activePage === 'notificacoes') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Central de Notificações</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">Alertas do ecossistema, vencimentos e estudos</p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            3 novas
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              title: 'Fatura Nubank Casal vence em 3 dias',
              desc: 'Valor: R$ 1.840,00. Débito automático agendado.',
              time: 'Hoje, 09:15',
              type: 'finance',
            },
            {
              title: 'Mariana adicionou 3 itens na lista de Mercado',
              desc: 'Leite Integral, Iogurte Grego e Sabão Líquido adicionados ao carrinho.',
              time: 'Hoje, 08:30',
              type: 'market',
            },
            {
              title: 'Ciclo de Revisão Espaçada (24h) pronto',
              desc: 'Tópico: Direito Tributário - Suspensão e Extinção do Crédito.',
              time: 'Ontem, 20:00',
              type: 'study',
            },
          ].map((notif, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">{notif.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">{notif.desc}</p>
                <span className="text-[10px] text-[#64748B] mt-1 block">{notif.time}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#0051D5]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for cursos, plano-de-estudos, relatorios
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <h1 className="text-2xl font-extrabold text-[#0F172A] capitalize">
          {activePage.replace('-', ' ')}
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Módulo ativo e sincronizado no ecossistema Lifeasier
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] text-center space-y-3">
        <BarChart3 size={36} className="mx-auto text-[#0051D5]" />
        <h2 className="text-base font-bold text-[#0F172A]">Módulo Sincronizado</h2>
        <p className="text-xs text-[#64748B] max-w-md mx-auto">
          Os dados deste módulo são integrados em tempo real com o Dashboard Principal, Finanças e Estudos.
        </p>
        <button
          type="button"
          onClick={() => setActivePage('dashboard')}
          className="bg-[#FFE600] text-[#0F172A] px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-block mt-2"
        >
          Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
};
