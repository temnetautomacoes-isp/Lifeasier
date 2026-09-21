/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './features/dashboard/DashboardView';
import { FinancesView } from './features/finances/FinancesView';
import { StudiesView } from './features/studies/StudiesView';
import { MarketView } from './features/market/MarketView';
import { GoalsView } from './features/goals/GoalsView';
import { HabitsView } from './features/habits/HabitsView';
import { ScheduleView } from './features/schedule/ScheduleView';
import { SettingsView } from './features/settings/SettingsView';
import { OtherViews } from './features/other/OtherViews';
import { NewRecordModal } from './components/modals/NewRecordModal';
import { PixSettlementModal } from './components/modals/PixSettlementModal';
import { SqlSchemaModal } from './components/modals/SqlSchemaModal';
import { LoginView } from './features/auth/LoginView';

export default function App() {
  const store = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Se o usuário não estiver autenticado, exibe a tela de login com seleção de painel
  if (!store.isAuthenticated) {
    return <LoginView store={store} />;
  }

  const renderActiveView = () => {
    switch (store.activePage) {
      case 'dashboard':
        return <DashboardView store={store} />;
      case 'financas':
        return <FinancesView store={store} />;
      case 'mercado':
        return <MarketView store={store} />;
      case 'concurso':
      case 'plano-de-estudos':
        return <StudiesView store={store} />;
      case 'objetivos':
        return <GoalsView store={store} />;
      case 'saude':
        return <HabitsView store={store} />;
      case 'programacoes':
        return <ScheduleView store={store} />;
      case 'configuracoes':
        return <SettingsView store={store} />;
      default:
        return <OtherViews store={store} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#0F172A] font-sans antialiased flex">
      {/* Permanent Left Sidebar (with mobile drawer toggle) */}
      <Sidebar
        store={store}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <Header
          store={store}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 pt-20 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <NewRecordModal store={store} />
      <PixSettlementModal store={store} />
      <SqlSchemaModal store={store} />
    </div>
  );
}

