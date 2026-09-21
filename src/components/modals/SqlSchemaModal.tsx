import React, { useState } from 'react';
import { X, Copy, Check, Database, ShieldCheck, Terminal } from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface SqlSchemaModalProps {
  store: AppStore;
}

const SUPABASE_MIGRATION_SQL = `-- ==============================================================================
-- LIFEASIER: SUPABASE DATABASE MIGRATION & RLS POLICIES
-- Ecossistema Integrado (Individual & Casal)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PARTNERSHIPS (Vínculo de Casal)
CREATE TABLE IF NOT EXISTS public.partnerships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_a_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_b_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    invite_code VARCHAR(12) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES (Perfis de Usuários)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    active_mode VARCHAR(20) DEFAULT 'couple' CHECK (active_mode IN ('individual', 'couple')),
    partnership_id UUID REFERENCES public.partnerships(id) ON DELETE SET NULL,
    active_focus TEXT DEFAULT 'Concurso TRF / Auditor Fiscal',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRANSACTIONS (Controle Financeiro)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    partnership_id UUID REFERENCES public.partnerships(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    subtitle TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('INCOME', 'EXPENSE', 'INVESTMENT')),
    category VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    paid_at DATE,
    status VARCHAR(20) DEFAULT 'PAID' CHECK (status IN ('PAID', 'PENDING')),
    is_shared BOOLEAN DEFAULT false,
    paid_by TEXT NOT NULL,
    split_ratio VARCHAR(20) DEFAULT '50/50',
    account_or_card TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GROCERY_ITEMS (Mercado & Despensa com Real-time)
CREATE TABLE IF NOT EXISTS public.grocery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partnership_id UUID REFERENCES public.partnerships(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    list_name TEXT DEFAULT 'Supermercado Mensal',
    name TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity TEXT DEFAULT '1 un',
    estimated_price NUMERIC(10, 2) DEFAULT 0,
    actual_price NUMERIC(10, 2),
    is_purchased BOOLEAN DEFAULT false,
    purchased_by TEXT,
    assigned_to TEXT,
    status VARCHAR(20) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'No Carrinho', 'Comprado')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. STUDY_SESSIONS & CYCLES (Estudos & Concurso)
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'Teoria',
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    questions_solved INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    institution TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SPACED_REPETITIONS (Revisão Espaçada 24h, 7d, 30d)
CREATE TABLE IF NOT EXISTS public.spaced_repetitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stage VARCHAR(10) NOT NULL CHECK (stage IN ('24h', '7d', '30d')),
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    flashcards_count INTEGER DEFAULT 10,
    is_completed BOOLEAN DEFAULT false,
    scheduled_for DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_repetitions ENABLE ROW LEVEL SECURITY;

-- Transactions RLS: User can see own records OR shared records of their active partnership
CREATE POLICY "Users can manage own or shared partnership transactions"
ON public.transactions
FOR ALL
USING (
    auth.uid() = user_id 
    OR (
        is_shared = true 
        AND partnership_id IN (
            SELECT id FROM public.partnerships 
            WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
        )
    )
);

-- Grocery Items RLS: Real-time shared access for couple
CREATE POLICY "Partnership members can view and manage grocery items"
ON public.grocery_items
FOR ALL
USING (
    auth.uid() = user_id 
    OR partnership_id IN (
        SELECT id FROM public.partnerships 
        WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
    )
);

-- Studies RLS: Personal only
CREATE POLICY "Users can only manage their own study sessions"
ON public.study_sessions
FOR ALL
USING (auth.uid() = user_id);

-- Enable Realtime for grocery items
ALTER PUBLICATION supabase_realtime ADD TABLE public.grocery_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
`;

export const SqlSchemaModal: React.FC<SqlSchemaModalProps> = ({ store }) => {
  const { isSchemaModalOpen, setIsSchemaModalOpen } = store;
  const [copied, setCopied] = useState(false);

  if (!isSchemaModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(SUPABASE_MIGRATION_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-[#0F172A] text-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0051D5] flex items-center justify-center text-white shadow-xs">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Supabase Schema &amp; RLS Migration
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                  <ShieldCheck size={12} />
                  RLS Hardened
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PostgreSQL DDL com isolamento individual vs. casal e publicação Realtime
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSchemaModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Terminal size={14} className="text-amber-400" />
            <span>supabase/migrations/20241024_lifeasier_schema.sql</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar SQL</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed whitespace-pre select-all">
          {SUPABASE_MIGRATION_SQL}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <span>Tabelas incluídas: profiles, partnerships, transactions, grocery_items, study_sessions</span>
          <button
            type="button"
            onClick={() => setIsSchemaModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
