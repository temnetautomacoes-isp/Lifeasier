import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  ArrowRight,
  TrendingDown,
  Store,
  Receipt,
  Scan,
  Sparkles,
  Smartphone,
  Share2,
} from 'lucide-react';
import { AppStore } from '../../store/useAppStore';
import { GroceryCategory } from '../../types';

interface MarketViewProps {
  store: AppStore;
}

export const MarketView: React.FC<MarketViewProps> = ({ store }) => {
  const {
    groceries,
    toggleGroceryItem,
    addTransaction,
    setIsNewRecordOpen,
    setNewRecordDefaultTab,
    activeTabList,
    setActiveTabList,
    setActivePage,
  } = store;

  const [searchItem, setSearchItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [marketShoppingMode, setMarketShoppingMode] = useState(false);
  const [financesLaunched, setFinancesLaunched] = useState(false);

  // Group groceries by categories
  const filteredGroceries = useMemo(() => {
    return groceries.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchItem.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [groceries, searchItem, selectedCategory]);

  const categoriesOrder: GroceryCategory[] = [
    'Hortifrúti',
    'Carnes & Proteínas',
    'Mercearia',
    'Laticínios',
    'Limpeza',
    'Bebidas',
    'Padaria',
  ];

  // Calculations
  const purchasedCount = groceries.filter((g) => g.isPurchased).length;
  const totalCount = groceries.length;
  const progressPercent = totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0;

  const estimatedTotal = groceries.reduce((acc, g) => acc + g.estimatedPrice, 0);
  const actualTotal = groceries
    .filter((g) => g.isPurchased)
    .reduce((acc, g) => acc + (g.actualPrice || g.estimatedPrice), 0);

  const estimatedForPurchased = groceries
    .filter((g) => g.isPurchased)
    .reduce((acc, g) => acc + g.estimatedPrice, 0);

  const diffSavings = estimatedForPurchased - actualTotal;

  // Finalize and post to Finances
  const handleLaunchToFinances = () => {
    if (actualTotal <= 0) return;
    addTransaction({
      description: 'Compras de Mercado (Fechamento da Lista)',
      subtitle: `${purchasedCount} itens comprados • Supermercado Pão de Açúcar`,
      amount: actualTotal,
      type: 'EXPENSE',
      category: 'Alimentação',
      dueDate: new Date().toISOString().split('T')[0],
      paidAt: new Date().toISOString().split('T')[0],
      status: 'PAID',
      isShared: true,
      paidBy: 'Mariana',
      responsibleName: 'Casal',
      accountOrCard: 'Cartão XP Visa Infinite',
      splitRatio: '50/50',
    });

    setFinancesLaunched(true);
    setTimeout(() => {
      setFinancesLaunched(false);
      setActivePage('financas');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header with Mode & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Mercado &amp; Compras
            </h1>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              Sincronizado Casal
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Lista em tempo real da despensa • Atualizado simultaneamente com Mariana
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMarketShoppingMode((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              marketShoppingMode
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#F2F4F6] text-[#0F172A] hover:bg-[#E2E8F0]'
            }`}
          >
            <Smartphone size={15} />
            <span>{marketShoppingMode ? 'Modo Mercado Ativo' : 'Modo Celular no Mercado'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setNewRecordDefaultTab('grocery');
              setIsNewRecordOpen(true);
            }}
            className="bg-[#FFE600] text-[#0F172A] hover:bg-[#F59E0B] px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Adicionar Item</span>
          </button>
        </div>
      </div>

      {/* 2. 5 Bento KPIs Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B]">Total Gasto no Mês</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#0F172A]">R$ 1.840,50</div>
            <div className="text-[11px] text-[#64748B] mt-1">Estimado: R$ 1.950,00</div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B]">Compras no Mês</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#0F172A]">4 idas</div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1">
              Ritmo planejado semanal
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B]">Média por Compra</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#0F172A]">R$ 460,12</div>
            <div className="text-[11px] text-[#64748B] mt-1">Dividido 50/50 Casal</div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B]">Maior Categoria</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#0051D5]">Hortifrúti</div>
            <div className="text-[11px] text-[#64748B] mt-1">42% dos gastos mensais</div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 col-span-2 md:col-span-1 flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#64748B]">Economia em Ofertas</span>
          <div className="mt-2">
            <div className="text-2xl font-black text-[#10B981]">R$ 185,00</div>
            <div className="text-[11px] text-[#10B981] font-semibold mt-1">
              Economia em atacados
            </div>
          </div>
        </div>
      </div>

      {/* 3. List Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'list-mensal', label: 'Supermercado Mensal', count: totalCount },
          { id: 'list-feira', label: 'Feira da Semana', count: 6 },
          { id: 'list-farmacia', label: 'Farmácia & Cuidados', count: 4 },
          { id: 'list-casa', label: 'Itens para Casa', count: 3 },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTabList(tab.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTabList === tab.id
                ? 'bg-[#0F172A] text-white shadow-xs font-bold'
                : 'bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F2F4F6]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTabList === tab.id
                  ? 'bg-[#FFE600] text-[#0F172A]'
                  : 'bg-[#F2F4F6] text-[#64748B]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Filtrar item de mercado..."
            className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0051D5]/20 focus:border-[#0051D5]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 px-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
          >
            <option value="all">Todas as Seções</option>
            {categoriesOrder.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Main Split Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Categorized Items Checklist */}
        <div className="lg:col-span-8 space-y-6">
          {categoriesOrder.map((category) => {
            const itemsInCat = filteredGroceries.filter((g) => g.category === category);
            if (itemsInCat.length === 0) return null;

            return (
              <div
                key={category}
                className="bg-white rounded-2xl p-5 shadow-xs border border-[#E2E8F0]/70"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#0F172A]">{category}</h2>
                    <span className="text-[11px] font-bold text-[#64748B] bg-[#F2F4F6] px-2 py-0.5 rounded-full">
                      {itemsInCat.length} itens
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#64748B]">
                    Subtotal: R${' '}
                    {itemsInCat
                      .reduce((acc, i) => acc + (i.actualPrice || i.estimatedPrice), 0)
                      .toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  {itemsInCat.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        item.isPurchased
                          ? 'bg-emerald-50/40 border-emerald-200 opacity-80'
                          : marketShoppingMode
                          ? 'bg-amber-50/30 border-amber-200 py-3.5'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleGroceryItem(item.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            item.isPurchased
                              ? 'bg-[#10B981] border-[#10B981] text-white'
                              : 'border-[#CBD5E1] bg-white hover:border-[#10B981]'
                          }`}
                        >
                          {item.isPurchased && <CheckCircle2 size={15} />}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold text-[#0F172A] ${
                                item.isPurchased ? 'line-through text-[#64748B]' : ''
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.assignedTo && (
                              <span className="text-[10px] bg-blue-50 text-[#0051D5] font-bold px-1.5 py-0.2 rounded">
                                {item.assignedTo}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#64748B] block mt-0.5">
                            Qtd: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <div className="text-xs font-black text-[#0F172A]">
                            R$ {(item.actualPrice || item.estimatedPrice).toFixed(2)}
                          </div>
                          {item.actualPrice && item.actualPrice < item.estimatedPrice && (
                            <span className="text-[10px] text-[#10B981] font-bold">
                              Economia R$ {(item.estimatedPrice - item.actualPrice).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (4 cols): Carrinho Ao Vivo & Comparativo & Alertas */}
        <div className="lg:col-span-4 space-y-6">
          {/* Resumo do Carrinho Ao Vivo */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E2E8F0]/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-[#0051D5]" />
                  <h2 className="text-sm font-bold text-[#0F172A]">Resumo do Carrinho</h2>
                </div>
                <span className="text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">
                  Ao Vivo
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A] mb-1.5">
                  <span>
                    {purchasedCount} de {totalCount} itens no carrinho
                  </span>
                  <span className="font-bold text-[#0051D5]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Subtotal Cards */}
              <div className="mt-4 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Subtotal Estimado:</span>
                  <span className="font-semibold text-[#0F172A]">
                    R$ {estimatedTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Subtotal Real (Carrinho):</span>
                  <span className="text-base font-black text-[#0F172A]">
                    R$ {actualTotal.toFixed(2)}
                  </span>
                </div>
                {diffSavings > 0 && (
                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-emerald-600 font-bold text-[11px]">
                    <span className="flex items-center gap-1">
                      <TrendingDown size={14} />
                      Economia até agora:
                    </span>
                    <span>R$ {diffSavings.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLaunchToFinances}
              disabled={actualTotal === 0}
              className={`mt-5 w-full py-3 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                actualTotal === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#FFE600] hover:bg-[#F59E0B] text-[#0F172A]'
              }`}
            >
              <Receipt size={16} />
              <span>
                {financesLaunched
                  ? 'Lançado no Financeiro!'
                  : 'Finalizar & Lançar no Financeiro'}
              </span>
            </button>
          </div>

          {/* Comparativo de Redes na Região */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E2E8F0]/70">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Store size={16} className="text-[#0051D5]" />
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Comparativo na Região
                </h3>
              </div>
              <span className="text-[10px] text-[#64748B]">Cesta desta lista</span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div>
                  <span className="font-bold text-emerald-950 block">Atacadão Santo André</span>
                  <span className="text-[10px] text-emerald-700">Mais econômico (-5%)</span>
                </div>
                <span className="font-extrabold text-emerald-950">R$ 312,20</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC]">
                <div>
                  <span className="font-semibold text-[#0F172A] block">Carrefour Hiper</span>
                  <span className="text-[10px] text-[#64748B]">Preço de referência</span>
                </div>
                <span className="font-bold text-[#0F172A]">R$ 328,50</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC]">
                <div>
                  <span className="font-semibold text-[#0F172A] block">Pão de Açúcar Jardins</span>
                  <span className="text-[10px] text-[#64748B]">Maior sortimento</span>
                </div>
                <span className="font-bold text-[#0F172A]">R$ 364,80</span>
              </div>
            </div>
          </div>

          {/* Alerta de Reposição de Despensa */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
              <Sparkles size={14} className="text-[#F59E0B]" />
              <span>Previsão Inteligente de Despensa</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Pelo histórico de consumo do casal, o <strong>Azeite de Oliva</strong> e o <strong>Café em Grãos</strong> devem acabar em aproximadamente 3 dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
