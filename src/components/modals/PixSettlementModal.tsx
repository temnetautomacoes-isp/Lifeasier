import React, { useState } from 'react';
import { X, QrCode, Copy, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppStore } from '../../store/useAppStore';

interface PixSettlementModalProps {
  store: AppStore;
}

export const PixSettlementModal: React.FC<PixSettlementModalProps> = ({ store }) => {
  const { isPixModalOpen, setIsPixModalOpen, addTransaction } = store;
  const [copied, setCopied] = useState(false);
  const [settled, setSettled] = useState(false);

  if (!isPixModalOpen) return null;

  const pixKey = 'lucas.silveira@lifeasier.com.br';
  const pixCode = '00020126580014br.gov.bcb.pix0136lucas.silveira@lifeasier.com.br5204000053039865406126.775802BR5914Lucas Silveira6009Sao Paulo62070503***6304E8A1';

  const handleCopy = () => {
    navigator.clipboard?.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmSettlement = () => {
    addTransaction({
      description: 'Acerto de Contas Casal (PIX Mariana → Lucas)',
      subtitle: 'Quitação automática da compensação proporcional do mês',
      amount: 126.77,
      type: 'INCOME',
      category: 'Renda',
      dueDate: new Date().toISOString().split('T')[0],
      paidAt: new Date().toISOString().split('T')[0],
      status: 'PAID',
      isShared: true,
      paidBy: 'Mariana',
      responsibleName: 'Casal',
      accountOrCard: 'PIX Direto Inter',
      splitRatio: '100/0',
    });

    setSettled(true);
    setTimeout(() => {
      setSettled(false);
      setIsPixModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0051D5]">
              Divisão Proporcional do Casal
            </span>
            <h2 className="text-base font-bold text-[#0F172A]">Liquidação PIX do Acerto</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsPixModalOpen(false)}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#E0E3E5] hover:text-[#0F172A] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-800 font-medium">Mariana transfere para Lucas</div>
              <div className="text-2xl font-black text-emerald-950">R$ 126,77</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-3">
            {/* Simulated QR Code SVG */}
            <div className="w-36 h-36 bg-white p-2.5 rounded-xl shadow-xs border border-[#CBD5E1] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,20 h10 v10 h-10 z M10,40 h10 v10 h-10 z M25,45 h10 v10 h-10 z M40,40 h20 v20 h-20 z M45,45 h10 v10 h-10 z M70,40 h10 v10 h-10 z M85,50 h10 v10 h-10 z M40,70 h10 v20 h-10 z M60,70 h20 v10 h-20 z M80,85 h20 v15 h-20 z M60,90 h10 v10 h-10 z"
                  fill="#0F172A"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#0F172A] block">Chave PIX (E-mail):</span>
              <span className="text-xs font-mono text-[#0051D5] bg-blue-50 px-2 py-0.5 rounded">
                {pixKey}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Código Copia e Cola
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={pixCode}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-mono text-[#64748B] select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 h-9 rounded-xl bg-[#F2F4F6] text-[#0F172A] hover:bg-[#E0E3E5] font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Copy size={14} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F1F5F9]">
            <button
              type="button"
              onClick={() => setIsPixModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleConfirmSettlement}
              className="px-5 py-2.5 rounded-xl bg-[#10B981] text-white hover:bg-emerald-600 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              {settled ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Acerto Liquidado!</span>
                </>
              ) : (
                <span>Confirmar Quitação</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
