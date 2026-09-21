import { useState, useEffect } from 'react';
import {
  UserMode,
  NavigationPage,
  UserProfile,
  Transaction,
  GroceryItem,
  StudyCycleBlock,
  SpacedRepetitionItem,
  ExamSimulation,
  Goal,
  RoutineItem,
  HealthHabit,
} from '../types';

const INITIAL_PROFILE: UserProfile = {
  id: 'user-lucas-01',
  fullName: 'Lucas Silveira',
  email: 'lucas@lifeasier.com.br',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD7crwR9GeuBYC12bIUVDYgnPpprUDU87avxpIaoXTzyCMIXax2tZRKDzRfPeMdohTaAio_XXrWXOfyIziXhEKkVKNm17IxJLr-L8cAF2EE5TNmzUlzGs4nz4l-PDw3O9HyxzKJMLAmd-W_efBHWXE4ulcMoeTxdFJ_uuJ2wXE9rkD-cMvA5Xw7cxUzjmCcBXrPNjUWQf0-_POGE5VvMcRlSGl-8ihExm4I-zcK3MQpyIziHqHLgXTKeg',
  partnerId: 'user-mariana-02',
  partnerName: 'Mariana',
  partnerAvatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBTYnOvvBLcPfYUceRProyxVVZaTlyf7l6n88eEA78tyWbY0Sq2pz-6UomzN2-t6H7q4A9c5o7YfyxBz2MzTXsUIUUbKk07rM_SsZk98cwxVeIPWwfuUsUQkOFwTO9EmRo3bmnUQtKoXkuZLKtTHA5bgNnDLt0v9sHkNBU67ukz-hPFMUygPC7r3im_suz_AaGjjsiSyVvzLDYKAGJIeSMuExrSjNqfqYZOYYwd3oawJYhF3i72h3RgNw',
  level: 'Nível Pro',
  activeFocus: 'Concurso TRF / Auditor Fiscal',
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-01',
    description: 'Salário Tech Consultoria',
    subtitle: 'Provento CLT mensal - Lucas',
    amount: 12500.0,
    type: 'INCOME',
    category: 'Renda',
    dueDate: '2024-10-05',
    paidAt: '2024-10-05',
    status: 'PAID',
    isShared: false,
    paidBy: 'Lucas',
    responsibleName: 'Lucas',
    accountOrCard: 'Banco Inter (Conta CC)',
    splitRatio: '100/0',
  },
  {
    id: 'tx-02',
    description: 'Aluguel & Condomínio Ed. Jardins',
    subtitle: 'Boleto QuintoAndar (Taxa condomínio inclusa)',
    amount: 2219.0,
    type: 'EXPENSE',
    category: 'Moradia',
    dueDate: '2024-10-10',
    paidAt: '2024-10-10',
    status: 'PAID',
    isShared: true,
    paidBy: 'Lucas',
    responsibleName: 'Casal',
    accountOrCard: 'Nubank Conjunta',
    splitRatio: '50/50',
  },
  {
    id: 'tx-03',
    description: 'Supermercado Pão de Açúcar',
    subtitle: 'Compras da quinzena + hortifrúti',
    amount: 1240.15,
    type: 'EXPENSE',
    category: 'Alimentação',
    dueDate: '2024-10-14',
    paidAt: '2024-10-14',
    status: 'PAID',
    isShared: true,
    paidBy: 'Mariana',
    responsibleName: 'Casal',
    accountOrCard: 'Cartão XP Visa Infinite',
    splitRatio: '50/50',
  },
  {
    id: 'tx-04',
    description: 'Mensalidade Pós-Graduação FGV',
    subtitle: 'Parcela 08/18 - MBA Gestão de Produtos',
    amount: 951.0,
    type: 'EXPENSE',
    category: 'Estudos',
    dueDate: '2024-10-15',
    paidAt: '2024-10-15',
    status: 'PAID',
    isShared: false,
    paidBy: 'Lucas',
    responsibleName: 'Lucas',
    accountOrCard: 'Boleto Débito Inter',
    splitRatio: '100/0',
  },
  {
    id: 'tx-05',
    description: 'Jantar Restaurante Antonella',
    subtitle: 'Comemoração aniversário e drinks',
    amount: 634.15,
    type: 'EXPENSE',
    category: 'Lazer',
    dueDate: '2024-10-19',
    paidAt: '2024-10-19',
    status: 'PAID',
    isShared: true,
    paidBy: 'Mariana',
    responsibleName: 'Mariana',
    accountOrCard: 'Cartão C6 Carbon Black',
    splitRatio: '50/50',
  },
  {
    id: 'tx-06',
    description: 'Internet Fibra Óptica Vivo 600Mb',
    subtitle: 'Vencimento próximo em 2 dias (Débito aut.)',
    amount: 149.9,
    type: 'EXPENSE',
    category: 'Moradia',
    dueDate: '2024-10-26',
    status: 'PENDING',
    isShared: true,
    paidBy: 'Lucas',
    responsibleName: 'Casal',
    accountOrCard: 'Nubank Conjunta',
    splitRatio: '50/50',
  },
  {
    id: 'tx-07',
    description: 'Aporte Tesouro Selic 2029',
    subtitle: 'Reserva de Emergência e Oportunidade',
    amount: 951.0,
    type: 'INVESTMENT',
    category: 'Outros',
    dueDate: '2024-10-22',
    paidAt: '2024-10-22',
    status: 'PAID',
    isShared: true,
    paidBy: 'Lucas',
    responsibleName: 'Casal',
    accountOrCard: 'XP Investimentos',
    splitRatio: '50/50',
  },
  {
    id: 'tx-08',
    description: 'Plano de Saúde Unimed',
    subtitle: 'Coparticipação e mensalidade familiar',
    amount: 760.0,
    type: 'EXPENSE',
    category: 'Saúde',
    dueDate: '2024-10-28',
    status: 'PENDING',
    isShared: true,
    paidBy: 'Mariana',
    responsibleName: 'Casal',
    accountOrCard: 'Nubank Conjunta',
    splitRatio: '50/50',
  },
];

const INITIAL_GROCERIES: GroceryItem[] = [
  // Hortifrúti
  {
    id: 'g-01',
    listId: 'list-mensal',
    name: 'Bananas Prata',
    category: 'Hortifrúti',
    quantity: '1,5 kg',
    estimatedPrice: 9.0,
    actualPrice: 8.7,
    isPurchased: true,
    purchasedBy: 'Mariana',
    status: 'Comprado',
    assignedTo: 'Mariana',
  },
  {
    id: 'g-02',
    listId: 'list-mensal',
    name: 'Tomates Italianos',
    category: 'Hortifrúti',
    quantity: '1,2 kg',
    estimatedPrice: 11.5,
    actualPrice: 12.0,
    isPurchased: true,
    purchasedBy: 'Lucas',
    status: 'No Carrinho',
    assignedTo: 'Lucas',
  },
  {
    id: 'g-03',
    listId: 'list-mensal',
    name: 'Maçãs Gala',
    category: 'Hortifrúti',
    quantity: '2 kg',
    estimatedPrice: 22.0,
    isPurchased: false,
    status: 'Pendente',
    assignedTo: 'Lucas',
  },
  // Carnes & Proteínas
  {
    id: 'g-04',
    listId: 'list-mensal',
    name: 'Peito de Frango Congelado',
    category: 'Carnes & Proteínas',
    quantity: '2 kg',
    estimatedPrice: 42.0,
    actualPrice: 38.9,
    isPurchased: true,
    purchasedBy: 'Mariana',
    status: 'No Carrinho',
    assignedTo: 'Mariana',
  },
  {
    id: 'g-05',
    listId: 'list-mensal',
    name: 'Patinho Moído',
    category: 'Carnes & Proteínas',
    quantity: '1 kg',
    estimatedPrice: 56.0,
    actualPrice: 56.0,
    isPurchased: true,
    purchasedBy: 'Lucas',
    status: 'No Carrinho',
    assignedTo: 'Lucas',
  },
  // Mercearia
  {
    id: 'g-06',
    listId: 'list-mensal',
    name: 'Arroz Tipo 1 (5kg)',
    category: 'Mercearia',
    quantity: '1 pct',
    estimatedPrice: 28.0,
    actualPrice: 26.9,
    isPurchased: true,
    purchasedBy: 'Lucas',
    status: 'No Carrinho',
    assignedTo: 'Lucas',
  },
  {
    id: 'g-07',
    listId: 'list-mensal',
    name: 'Azeite de Oliva Extra Virgem',
    category: 'Mercearia',
    quantity: '1 garrafa',
    estimatedPrice: 42.0,
    actualPrice: 38.9,
    isPurchased: true,
    purchasedBy: 'Mariana',
    status: 'No Carrinho',
    assignedTo: 'Mariana',
  },
  {
    id: 'g-08',
    listId: 'list-mensal',
    name: 'Café em Grãos 500g',
    category: 'Mercearia',
    quantity: '2 pct',
    estimatedPrice: 36.0,
    isPurchased: false,
    status: 'Pendente',
    assignedTo: 'Lucas',
  },
  // Laticínios
  {
    id: 'g-09',
    listId: 'list-mensal',
    name: 'Leite Integral (cx com 12)',
    category: 'Laticínios',
    quantity: '1 cx',
    estimatedPrice: 54.0,
    actualPrice: 54.0,
    isPurchased: true,
    status: 'No Carrinho',
    assignedTo: 'Mariana',
  },
  {
    id: 'g-10',
    listId: 'list-mensal',
    name: 'Iogurte Grego Natural',
    category: 'Laticínios',
    quantity: '4 un',
    estimatedPrice: 16.0,
    actualPrice: 16.0,
    isPurchased: true,
    status: 'No Carrinho',
    assignedTo: 'Lucas',
  },
  // Limpeza
  {
    id: 'g-11',
    listId: 'list-mensal',
    name: 'Sabão Líquido 3L',
    category: 'Limpeza',
    quantity: '1 un',
    estimatedPrice: 41.5,
    actualPrice: 41.5,
    isPurchased: true,
    status: 'No Carrinho',
    assignedTo: 'Mariana',
  },
  {
    id: 'g-12',
    listId: 'list-mensal',
    name: 'Desinfetante Floral',
    category: 'Limpeza',
    quantity: '2 un',
    estimatedPrice: 11.2,
    actualPrice: 11.2,
    isPurchased: true,
    status: 'No Carrinho',
    assignedTo: 'Lucas',
  },
];

const INITIAL_STUDY_BLOCKS: StudyCycleBlock[] = [
  {
    id: 'sc-01',
    timeRange: '07:00 - 08:30',
    subject: 'Direito Tributário',
    topic: 'Imunidades e Princípios Constitucionais',
    type: 'Teoria + Doutrina',
    durationMinutes: 90,
    status: 'Concluído',
  },
  {
    id: 'sc-02',
    timeRange: '10:00 - 11:45',
    subject: 'Contabilidade Geral',
    topic: 'DRE & Demonstrações de Fluxo de Caixa (DFC)',
    type: '25 Questões FGV',
    durationMinutes: 105,
    status: 'Em Andamento',
    questionsCount: 25,
    institution: 'FGV',
  },
  {
    id: 'sc-03',
    timeRange: '14:00 - 15:30',
    subject: 'Legislação Aduaneira',
    topic: 'Despacho Aduaneiro / Regulamento Aduaneiro',
    type: 'Leitura de Lei Seca',
    durationMinutes: 90,
    status: 'Planejado',
  },
  {
    id: 'sc-04',
    timeRange: '19:30 - 20:30',
    subject: 'Língua Portuguesa',
    topic: 'Sintaxe do Período & Regência Verbal',
    type: 'Revisão 7 Dias',
    durationMinutes: 60,
    status: 'Planejado',
  },
];

const INITIAL_SPACED_REPETITIONS: SpacedRepetitionItem[] = [
  {
    id: 'sr-01',
    stage: '24h',
    subject: 'Direito Tributário',
    topic: 'Crédito Tributário: Suspensão x Extinção',
    details: 'Art. 151 e 156 do CTN • 12 flashcards',
    flashcardsCount: 12,
    isCompleted: false,
  },
  {
    id: 'sr-02',
    stage: '7d',
    subject: 'Contabilidade Geral',
    topic: 'Método de Equivalência Patrimonial (MEP)',
    details: 'Coligadas e Controladas • 8 flashcards',
    flashcardsCount: 8,
    isCompleted: false,
  },
  {
    id: 'sr-03',
    stage: '30d',
    subject: 'Direito Constitucional',
    topic: 'Controle de Constitucionalidade Concentrado',
    details: 'Legitimados e Efeitos das Decisões • 15 flashcards',
    flashcardsCount: 15,
    isCompleted: false,
  },
];

const INITIAL_EXAMS: ExamSimulation[] = [
  {
    id: 'ex-01',
    name: 'Simulado Nacional #04',
    date: '15/10/2024',
    board: 'FGV Padrão',
    correctCount: 118,
    totalCount: 140,
    percentage: 84.2,
    weakPoint: 'Pronomes Relativos & DFC Direto',
    errorNotebookCount: 22,
  },
  {
    id: 'ex-02',
    name: 'Simulado Especial Tributário & Aduana',
    date: '08/10/2024',
    board: 'Inéditas Lifeasier',
    correctCount: 63,
    totalCount: 80,
    percentage: 78.7,
    weakPoint: 'Regimes Aduaneiros Especiais',
    errorNotebookCount: 17,
  },
  {
    id: 'ex-03',
    name: 'Simulado Nacional #03',
    date: '28/09/2024',
    board: 'Cebraspe / C-E',
    correctCount: 94,
    totalCount: 120,
    percentage: 78.3,
    weakPoint: 'Direitos Sociais & Remuneração',
    errorNotebookCount: 26,
  },
];

const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-01',
    title: 'Viagem Casal Europa 2025',
    targetDate: 'Outubro/2025',
    targetAmount: 40000,
    currentAmount: 26000,
    monthlySuggested: 1166,
    status: 'Em dia',
    category: 'Viagem',
    icon: 'flight_takeoff',
    isShared: true,
  },
  {
    id: 'goal-02',
    title: 'Reserva de Emergência',
    targetDate: 'Dezembro/2024',
    targetAmount: 50000,
    currentAmount: 45000,
    monthlySuggested: 2500,
    status: 'Fase Final',
    category: 'Reserva',
    icon: 'shield',
    isShared: true,
  },
  {
    id: 'goal-03',
    title: 'Aprovação Concurso Público (Posse)',
    targetDate: 'Julho/2025',
    targetAmount: 100,
    currentAmount: 74,
    monthlySuggested: 10,
    status: 'Em dia',
    category: 'Pessoal',
    icon: 'military_tech',
    isShared: false,
  },
];

const INITIAL_ROUTINE: RoutineItem[] = [
  {
    id: 'r-01',
    time: '08:30',
    title: 'Treino Matinal & Aquecimento',
    subtitle: '45 minutos corrida leve + mobilidade de membros superiores.',
    tag: 'Saúde • Concluído',
    category: 'Saúde',
    completed: true,
  },
  {
    id: 'r-02',
    time: '10:00',
    title: 'Direito Constitucional – Revisão',
    subtitle: 'Capítulo: Direitos e Garantias Fundamentais + 20 questões comentadas.',
    tag: 'Estudos TRF',
    category: 'Estudos',
    completed: false,
    priority: true,
  },
  {
    id: 'r-03',
    time: '13:30',
    title: 'Reunião de Planejamento Financeiro',
    subtitle: 'Alinhar aportes da meta Europa e fechar fechamento mensal do cartão de crédito.',
    tag: 'Finanças Casal',
    category: 'Finanças',
    completed: false,
  },
  {
    id: 'r-04',
    time: '16:00',
    title: 'Consulta com Nutricionista',
    subtitle: 'Clínica Vitalità - Av. Paulista 1400, Cj 82. Levar exames de sangue recentes.',
    tag: 'Saúde • Presencial',
    category: 'Saúde',
    completed: false,
  },
  {
    id: 'r-05',
    time: '19:30',
    title: 'Aula de JavaScript Avançado',
    subtitle: 'Módulo 04: Concorrência, Event Loop, Web Workers e Performance.',
    tag: 'Cursos Tech',
    category: 'Cursos',
    completed: false,
  },
];

const INITIAL_HABITS: HealthHabit[] = [
  { id: 'h-1', name: 'Água (3L/dia)', target: '3 Litros', completed: true, streakDays: 14 },
  { id: 'h-2', name: 'Treino Funcional / Corrida', target: '45 min', completed: true, streakDays: 6 },
  { id: 'h-3', name: 'Leitura Técnica / Doutrina', target: '30 min', completed: true, streakDays: 22 },
  { id: 'h-4', name: 'Sono Reparador (8h)', target: '8 horas', completed: false, streakDays: 5 },
];

export function useAppStore() {
  // Global Mode: 'couple' by default (as seen in screenshots "Nosso (Casal)" active), or 'individual'
  const [userMode, setUserMode] = useState<UserMode>(() => {
    return (localStorage.getItem('lifeasier_user_mode') as UserMode) || 'couple';
  });

  const [activePage, setActivePage] = useState<NavigationPage>(() => {
    return (localStorage.getItem('lifeasier_active_page') as NavigationPage) || 'dashboard';
  });

  const [profile] = useState<UserProfile>(INITIAL_PROFILE);

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('lifeasier_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [groceries, setGroceries] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('lifeasier_groceries');
    return saved ? JSON.parse(saved) : INITIAL_GROCERIES;
  });

  const [studyBlocks, setStudyBlocks] = useState<StudyCycleBlock[]>(INITIAL_STUDY_BLOCKS);
  const [spacedRepetitions, setSpacedRepetitions] = useState<SpacedRepetitionItem[]>(INITIAL_SPACED_REPETITIONS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [routine, setRoutine] = useState<RoutineItem[]>(INITIAL_ROUTINE);
  const [habits, setHabits] = useState<HealthHabit[]>(INITIAL_HABITS);
  const [activeTabList, setActiveTabList] = useState<string>('list-mensal');

  // Search & Global filter
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [newRecordDefaultTab, setNewRecordDefaultTab] = useState<'transaction' | 'grocery' | 'study' | 'goal' | 'task'>('transaction');
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('lifeasier_user_mode', userMode);
  }, [userMode]);

  useEffect(() => {
    localStorage.setItem('lifeasier_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('lifeasier_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('lifeasier_groceries', JSON.stringify(groceries));
  }, [groceries]);

  // Actions
  const toggleGroceryItem = (id: string) => {
    setGroceries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextPurchased = !item.isPurchased;
          return {
            ...item,
            isPurchased: nextPurchased,
            status: nextPurchased ? 'Comprado' : 'Pendente',
            actualPrice: nextPurchased ? (item.actualPrice || item.estimatedPrice) : undefined,
          };
        }
        return item;
      })
    );
  };

  const addGroceryItem = (item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: 'g-' + Date.now(),
    };
    setGroceries((prev) => [newItem, ...prev]);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'tx-' + Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const toggleTransactionStatus = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'PAID' ? 'PENDING' : 'PAID';
          return {
            ...t,
            status: nextStatus,
            paidAt: nextStatus === 'PAID' ? new Date().toISOString().split('T')[0] : undefined,
          };
        }
        return t;
      })
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const markSpacedRepetitionCompleted = (id: string) => {
    setSpacedRepetitions((prev) =>
      prev.map((sr) => (sr.id === id ? { ...sr, isCompleted: true } : sr))
    );
  };

  const postponeSpacedRepetition = (id: string) => {
    setSpacedRepetitions((prev) =>
      prev.map((sr) =>
        sr.id === id ? { ...sr, postponedDays: (sr.postponedDays || 0) + 1 } : sr
      )
    );
  };

  const toggleRoutineItem = (id: string) => {
    setRoutine((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completed: !h.completed, streakDays: !h.completed ? h.streakDays + 1 : h.streakDays - 1 }
          : h
      )
    );
  };

  const contributeToGoal = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g))
    );
  };

  // Filtered by userMode if applicable
  const displayTransactions = transactions.filter((tx) => {
    if (userMode === 'individual') {
      return tx.paidBy === 'Lucas' || tx.responsibleName === 'Lucas';
    }
    return true; // in couple mode, show all transactions (individual + shared)
  });

  return {
    userMode,
    setUserMode,
    activePage,
    setActivePage,
    profile,
    transactions,
    displayTransactions,
    groceries,
    studyBlocks,
    spacedRepetitions,
    exams: INITIAL_EXAMS,
    goals,
    routine,
    habits,
    activeTabList,
    setActiveTabList,
    searchQuery,
    setSearchQuery,
    isNewRecordOpen,
    setIsNewRecordOpen,
    newRecordDefaultTab,
    setNewRecordDefaultTab,
    isPixModalOpen,
    setIsPixModalOpen,
    isSchemaModalOpen,
    setIsSchemaModalOpen,
    toggleGroceryItem,
    addGroceryItem,
    addTransaction,
    toggleTransactionStatus,
    deleteTransaction,
    markSpacedRepetitionCompleted,
    postponeSpacedRepetition,
    toggleRoutineItem,
    toggleHabit,
    contributeToGoal,
  };
}

export type AppStore = ReturnType<typeof useAppStore>;
