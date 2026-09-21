import React, { useState } from 'react';
import {
  Settings,
  User,
  Users,
  Database,
  Shield,
  Bell,
  Check,
  CreditCard,
  QrCode,
  Link,
  ChevronRight,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface SettingsViewProps {
  store: AppStore;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ store }) => {
  const { profile, userMode, setUserMode, setIsSchemaModalOpen } = store;
  const [splitRatio, setSplitRatio] = useState('50/50');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Configurações do Ecossistema
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Gerencie perfis, regras de casal, preferências e banco de dados Supabase
        </p>
      </div>

      {/* Perfil & Vínculo de Casal */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0]/70 space-y-5">
        <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
          <Users size={18} className="text-[#0051D5]" />
          <span>Vínculo de Casal (Lifeasier Duo)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User A: Lucas */}
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FFE600]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#0F172A]">{profile.fullName}</span>
                <span className="text-[10px] bg-[#FFE600] text-[#0F172A] font-extrabold px-1.5 py-0.2 rounded">
                  VOCÊ
                </span>
              </div>
              <span className="text-xs text-[#64748B] block">{profile.email}</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                Conta Conectada
              </span>
            </div>
          </div>

          {/* User B: Mariana */}
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center gap-3">
            <img
              src={profile.partnerAvatarUrl}
              alt="Mariana"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#0F172A]">Mariana Silveira</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  PARCEIRA
                </span>
              </div>
              <span className="text-xs text-[#64748B] block">mariana@lifeasier.com.br</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                Sincronização Ativa em Tempo Real
              </span>
            </div>
          </div>
        </div>

        {/* Regra de divisão de despesas */}
        <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
          <label className="block text-xs font-bold text-[#0F172A]">
            Regra Padrão de Divisão das Contas Compartilhadas:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: '50/50', label: '50% / 50% (Meio a meio)', desc: 'Despesas divididas igualmente' },
              { id: '60/40', label: '60% Lucas / 40% Mariana', desc: 'Proporcional por faixa salarial' },
              { id: 'custom', label: 'Por Lançamento', desc: 'Definido no momento da compra' },
            ].map((rule) => (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSplitRatio(rule.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  splitRatio === rule.id
                    ? 'border-[#0051D5] bg-blue-50/50 text-[#0F172A]'
                    : 'border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]'
                }`}
              >
                <div className="font-bold text-xs text-[#0F172A]">{rule.label}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">{rule.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Supabase Schema & Realtime Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database size={18} className="text-[#FFE600]" />
            <h2 className="text-base font-bold text-white">
              Arquitetura de Dados &amp; Supabase RLS
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Visualize as migrations SQL completas com tabelas `profiles`, `partnerships`, `transactions`, `grocery_items`, `study_sessions` e políticas de segurança RLS.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSchemaModalOpen(true)}
          className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Database size={15} />
          <span>Ver Migrations SQL</span>
        </button>
      </div>

      {/* Save action */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          {saved ? (
            <>
              <Check size={16} />
              <span>Salvo com sucesso!</span>
            </>
          ) : (
            <span>Salvar Alterações</span>
          )}
        </button>
      </div>
    </div>
  );
};
