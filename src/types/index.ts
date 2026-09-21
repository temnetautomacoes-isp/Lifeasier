export type UserMode = 'individual' | 'couple';

export type NavigationPage =
  | 'dashboard'
  | 'financas'
  | 'mercado'
  | 'objetivos'
  | 'programacoes'
  | 'saude'
  | 'concurso'
  | 'faculdade'
  | 'cursos'
  | 'banco-de-questoes'
  | 'anotacoes'
  | 'plano-de-estudos'
  | 'relatorios'
  | 'notificacoes'
  | 'configuracoes';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  partnerId?: string;
  partnerName?: string;
  partnerAvatarUrl?: string;
  level: string;
  activeFocus: string;
}

export type TransactionType = 'INCOME' | 'EXPENSE' | 'INVESTMENT';
export type TransactionCategory =
  | 'Moradia'
  | 'Alimentação'
  | 'Renda'
  | 'Estudos'
  | 'Lazer'
  | 'Saúde'
  | 'Transporte'
  | 'Outros';

export type TransactionStatus = 'PAID' | 'PENDING';
export type SplitRatio = '50/50' | '60/40' | '70/30' | '100/0';

export interface Transaction {
  id: string;
  description: string;
  subtitle?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  dueDate: string;
  paidAt?: string;
  status: TransactionStatus;
  isShared: boolean;
  paidBy: 'Lucas' | 'Mariana';
  responsibleName: string;
  accountOrCard: string;
  splitRatio: SplitRatio;
  notes?: string;
}

export type GroceryCategory =
  | 'Hortifrúti'
  | 'Carnes & Proteínas'
  | 'Mercearia'
  | 'Laticínios'
  | 'Limpeza'
  | 'Bebidas'
  | 'Padaria'
  | 'Outros';

export interface GroceryItem {
  id: string;
  listId: string;
  name: string;
  category: GroceryCategory;
  quantity: string;
  estimatedPrice: number;
  actualPrice?: number;
  isPurchased: boolean;
  purchasedBy?: 'Lucas' | 'Mariana';
  status: 'Comprado' | 'No Carrinho' | 'Pendente';
  assignedTo?: 'Lucas' | 'Mariana';
}

export interface GroceryList {
  id: string;
  title: string;
  itemCount: number;
  badgeColor?: string;
  isShared: boolean;
}

export interface StudyCycleBlock {
  id: string;
  timeRange: string;
  subject: string;
  topic: string;
  type: string;
  durationMinutes: number;
  status: 'Concluído' | 'Em Andamento' | 'Planejado';
  questionsCount?: number;
  institution?: string;
}

export interface SpacedRepetitionItem {
  id: string;
  stage: '24h' | '7d' | '30d';
  subject: string;
  topic: string;
  details: string;
  flashcardsCount: number;
  isCompleted: boolean;
  postponedDays?: number;
}

export interface ExamSimulation {
  id: string;
  name: string;
  date: string;
  board: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
  weakPoint: string;
  errorNotebookCount?: number;
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  targetAmount: number;
  currentAmount: number;
  monthlySuggested: number;
  status: 'Em dia' | 'Fase Final' | 'Atrasada';
  category: 'Viagem' | 'Reserva' | 'Investimento' | 'Pessoal';
  icon: string;
  isShared: boolean;
}

export interface RoutineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  tag: string;
  category: 'Saúde' | 'Estudos' | 'Finanças' | 'Trabalho' | 'Cursos';
  completed: boolean;
  priority?: boolean;
}

export interface HealthHabit {
  id: string;
  name: string;
  target: string;
  completed: boolean;
  streakDays: number;
}
