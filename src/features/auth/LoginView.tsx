import React, { useState } from 'react';
import {
  Wallet,
  GraduationCap,
  User,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';
import { AuthEnvironment } from '../../types';

interface LoginViewProps {
  store: AppStore;
}

export const LoginView: React.FC<LoginViewProps> = ({ store }) => {
  const [selectedEnv, setSelectedEnv] = useState<AuthEnvironment>(
    store.selectedEnvironment || 'personal'
  );
  const [email, setEmail] = useState('lucas@lifeasier.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      store.login({
        email,
        password,
        environment: selectedEnv,
      });
      setIsLoading(false);
    }, 450);
  };

  const handleSelectDemoUser = (userName: 'Lucas' | 'Mariana') => {
    if (userName === 'Lucas') {
      setEmail('lucas@lifeasier.com.br');
    } else {
      setEmail('mariana@lifeasier.com.br');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0051D5]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl rounded-3xl lg:rounded-[36px] bg-[#0E1526]/80 backdrop-blur-2xl border border-slate-800/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] relative z-10">
        
        {/* LEFT COLUMN: Hero Branding */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#0D1527] via-[#0B111F] to-[#080D18]">
          {/* Subtle decorative grid/overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

          {/* Top: Logo & System Badge */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFE600] to-[#F59E0B] flex items-center justify-center font-black text-[#0F172A] text-2xl shadow-lg shadow-amber-500/20">
                L
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-2xl tracking-tight text-white">
                    Life<span className="text-[#FFE600]">asier</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Gestão Completa · Conexão Total
                </span>
              </div>
            </div>

            {/* Pill Badge matching OperaFácil screenshot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistema Integrado de Gestão Pessoal &amp; Estudos</span>
            </div>
          </div>

          {/* Center: Main Slogan matching OperaFácil */}
          <div className="relative z-10 my-8 sm:my-12 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              <span className="text-[#F97316]">Life</span>
              <span className="text-[#38BDF8]">asier</span>.<br />
              Para toda sua rotina,<br />
              uma solução.
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 max-w-md leading-relaxed">
              A tecnologia ágil, moderna e descomplicada para você gerenciar finanças de casal, mercado, hábitos diários e sua aprovação em estudos de alto rendimento.
            </p>

            {/* Micro Feature Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/40">
                <HeartHandshake size={14} className="text-[#F97316]" />
                Finanças Casal (50/50)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/40">
                <BookOpen size={14} className="text-[#38BDF8]" />
                Ciclo TRF &amp; Flashcards
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/40">
                <ShieldCheck size={14} className="text-emerald-400" />
                Sincronia Segura
              </span>
            </div>
          </div>

          {/* Bottom Left Note */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
            <Sparkles size={14} className="text-[#FFE600]" />
            <span>Versão Pro Multi-Ambiente habilitada</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Auth Card */}
        <div className="lg:col-span-6 bg-white text-[#0F172A] p-7 sm:p-10 lg:p-12 flex flex-col justify-between rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl shadow-xl">
          
          {/* Top: Icon & Title */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#F97316] text-white flex items-center justify-center shadow-md shadow-orange-500/25">
              <Layers size={28} strokeWidth={2.2} />
            </div>
            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
              Lifeasier
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium">
              Sua gestão diária completa
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="my-6 space-y-5">
            {/* AMBIENTE DE ACESSO */}
            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">
                Ambiente de Acesso:
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Option 1: Painel Pessoal */}
                <button
                  type="button"
                  onClick={() => setSelectedEnv('personal')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    selectedEnv === 'personal'
                      ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-md ring-2 ring-[#F97316]/30'
                      : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      selectedEnv === 'personal'
                        ? 'bg-[#F97316] text-white shadow-sm'
                        : 'bg-white text-[#F97316] border border-[#E2E8F0]'
                    }`}
                  >
                    <Wallet size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold truncate leading-tight">
                      Painel Pessoal
                    </div>
                    <div
                      className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${
                        selectedEnv === 'personal' ? 'text-slate-300' : 'text-[#64748B]'
                      }`}
                    >
                      Finanças &amp; Rotina
                    </div>
                  </div>
                </button>

                {/* Option 2: Painel de Estudos */}
                <button
                  type="button"
                  onClick={() => setSelectedEnv('studies')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    selectedEnv === 'studies'
                      ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-md ring-2 ring-[#38BDF8]/30'
                      : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      selectedEnv === 'studies'
                        ? 'bg-[#0284C7] text-white shadow-sm'
                        : 'bg-white text-[#0284C7] border border-[#E2E8F0]'
                    }`}
                  >
                    <GraduationCap size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold truncate leading-tight">
                      Painel Estudos
                    </div>
                    <div
                      className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${
                        selectedEnv === 'studies' ? 'text-slate-300' : 'text-[#64748B]'
                      }`}
                    >
                      Concursos &amp; Meta
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Input 1: E-mail / Login */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#0F172A]">
                  E-mail ou Login de Usuário:
                </label>
                {/* Quick switch chip */}
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#64748B]">Preencher:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectDemoUser('Lucas')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                      email.includes('lucas')
                        ? 'bg-[#FFE600] text-[#0F172A]'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Lucas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemoUser('Mariana')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                      email.includes('mariana')
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Mariana
                  </button>
                </div>
              </div>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@lifeasier.com.br ou usuário"
                  className="w-full h-11 pl-10 pr-4 bg-white text-[#0F172A] placeholder:text-[#94A3B8] text-xs sm:text-sm rounded-xl border-2 border-[#F97316] focus:outline-none focus:ring-4 focus:ring-[#F97316]/15 font-medium transition-all"
                />
              </div>
            </div>

            {/* Input 2: Senha */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#0F172A]">
                  Senha de Acesso:
                </label>
                <button
                  type="button"
                  className="text-[11px] font-semibold text-[#0051D5] hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <div className="relative">
                <Key
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full h-11 pl-10 pr-11 bg-white text-[#0F172A] placeholder:text-[#94A3B8] text-xs sm:text-sm rounded-xl border border-[#CBD5E1] focus:border-[#F97316] focus:outline-none focus:ring-4 focus:ring-[#F97316]/15 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-1 rounded transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#F97316] focus:ring-[#F97316] border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-[#64748B] font-medium">
                  Manter conectado neste dispositivo
                </span>
              </label>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 size={13} />
                <span>Ambiente Seguro</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {selectedEnv === 'personal'
                      ? 'Acessar Painel Pessoal'
                      : 'Acessar Painel de Estudos'}
                  </span>
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer of Auth Card */}
          <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-semibold text-[#64748B]">
              Lifeasier · v2.5 Pro
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px]">Dados persistidos localmente</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
