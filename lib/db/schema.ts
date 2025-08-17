import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  json,
  decimal,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('student'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  // SAT-specific fields
  targetScore: integer('target_score'),
  currentScore: integer('current_score'),
  diagnosticCompleted: boolean('diagnostic_completed').default(false),
  studyPlanGenerated: boolean('study_plan_generated').default(false),
  subscriptionStatus: varchar('subscription_status', { length: 20 }).default('free'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  trialEndsAt: timestamp('trial_ends_at'),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  questionType: varchar('question_type', { length: 50 }).notNull(), // 'math', 'reading', 'writing'
  subject: varchar('subject', { length: 100 }).notNull(), // 'algebra', 'geometry', 'grammar', etc.
  difficulty: integer('difficulty').notNull(), // 1-5 scale
  correctAnswer: varchar('correct_answer', { length: 10 }).notNull(),
  options: json('options').notNull(), // JSON array of answer choices
  explanation: text('explanation').notNull(),
  hints: json('hints'), // JSON array of progressive hints
  tags: json('tags'), // JSON array of topic tags
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  typeIdx: index('question_type_idx').on(table.questionType),
  subjectIdx: index('question_subject_idx').on(table.subject),
  difficultyIdx: index('question_difficulty_idx').on(table.difficulty),
}));

export const practiceSessions = pgTable('practice_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  sessionType: varchar('session_type', { length: 50 }).notNull(), // 'diagnostic', 'practice', 'full_exam'
  questionType: varchar('question_type', { length: 50 }),
  subject: varchar('subject', { length: 100 }),
  difficulty: integer('difficulty'),
  timeLimit: integer('time_limit'), // in minutes
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  score: integer('score'),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').default(0),
  isTimed: boolean('is_timed').default(true),
}, (table) => ({
  userIdIdx: index('session_user_idx').on(table.userId),
  sessionTypeIdx: index('session_type_idx').on(table.sessionType),
}));

export const sessionQuestions = pgTable('session_questions', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id')
    .notNull()
    .references(() => practiceSessions.id),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id),
  userAnswer: varchar('user_answer', { length: 10 }),
  isCorrect: boolean('is_correct'),
  timeSpent: integer('time_spent'), // in seconds
  hintsUsed: integer('hints_used').default(0),
  answeredAt: timestamp('answered_at'),
  orderInSession: integer('order_in_session').notNull(),
}, (table) => ({
  sessionIdIdx: index('session_question_session_idx').on(table.sessionId),
  questionIdIdx: index('session_question_question_idx').on(table.questionId),
}));

export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  subject: varchar('subject', { length: 100 }).notNull(),
  topic: varchar('topic', { length: 100 }).notNull(),
  questionsAttempted: integer('questions_attempted').default(0),
  questionsCorrect: integer('questions_correct').default(0),
  averageTime: decimal('average_time', { precision: 5, scale: 2 }),
  masteryLevel: decimal('mastery_level', { precision: 3, scale: 2 }).default('0.00'), // 0.00 to 1.00
  lastPracticed: timestamp('last_practiced'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('progress_user_idx').on(table.userId),
  subjectIdx: index('progress_subject_idx').on(table.subject),
  uniqueUserSubject: index('unique_user_subject').on(table.userId, table.subject),
}));

export const studyPlans = pgTable('study_plans', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  targetScore: integer('target_score').notNull(),
  currentScore: integer('current_score').notNull(),
  duration: integer('duration').notNull(), // in days
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('study_plan_user_idx').on(table.userId),
}));

export const studyPlanItems = pgTable('study_plan_items', {
  id: serial('id').primaryKey(),
  studyPlanId: integer('study_plan_id')
    .notNull()
    .references(() => studyPlans.id),
  day: integer('day').notNull(),
  subject: varchar('subject', { length: 100 }).notNull(),
  topic: varchar('topic', { length: 100 }).notNull(),
  questionCount: integer('question_count').notNull(),
  difficulty: integer('difficulty').notNull(),
  isCompleted: boolean('is_completed').default(false),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  studyPlanIdIdx: index('study_plan_item_plan_idx').on(table.studyPlanId),
}));

export const aiTutoringSessions = pgTable('ai_tutoring_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  sessionType: varchar('session_type', { length: 50 }).notNull(), // 'question_help', 'concept_explanation', 'strategy'
  subject: varchar('subject', { length: 100 }),
  topic: varchar('topic', { length: 100 }),
  questionId: integer('question_id').references(() => questions.id),
  userQuestion: text('user_question').notNull(),
  aiResponse: text('ai_response').notNull(),
  feedback: text('feedback'),
  rating: integer('rating'), // 1-5 scale
  startedAt: timestamp('started_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at'),
}, (table) => ({
  userIdIdx: index('tutoring_user_idx').on(table.userId),
}));

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  planName: varchar('plan_name', { length: 50 }).notNull(), // 'monthly', 'quarterly', 'annual', 'premium'
  status: varchar('status', { length: 20 }).notNull(), // 'active', 'canceled', 'past_due'
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId: text('stripe_price_id'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('subscription_user_idx').on(table.userId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  practiceSessions: many(practiceSessions),
  userProgress: many(userProgress),
  studyPlans: many(studyPlans),
  aiTutoringSessions: many(aiTutoringSessions),
  subscriptions: many(subscriptions),
}));

export const questionsRelations = relations(questions, ({ many }) => ({
  sessionQuestions: many(sessionQuestions),
  aiTutoringSessions: many(aiTutoringSessions),
}));

export const practiceSessionsRelations = relations(practiceSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [practiceSessions.userId],
    references: [users.id],
  }),
  sessionQuestions: many(sessionQuestions),
}));

export const sessionQuestionsRelations = relations(sessionQuestions, ({ one }) => ({
  session: one(practiceSessions, {
    fields: [sessionQuestions.sessionId],
    references: [practiceSessions.id],
  }),
  question: one(questions, {
    fields: [sessionQuestions.questionId],
    references: [questions.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
}));

export const studyPlansRelations = relations(studyPlans, ({ one, many }) => ({
  user: one(users, {
    fields: [studyPlans.userId],
    references: [users.id],
  }),
  studyPlanItems: many(studyPlanItems),
}));

export const studyPlanItemsRelations = relations(studyPlanItems, ({ one }) => ({
  studyPlan: one(studyPlans, {
    fields: [studyPlanItems.studyPlanId],
    references: [studyPlans.id],
  }),
}));

export const aiTutoringSessionsRelations = relations(aiTutoringSessions, ({ one }) => ({
  user: one(users, {
    fields: [aiTutoringSessions.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [aiTutoringSessions.questionId],
    references: [questions.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export type PracticeSession = typeof practiceSessions.$inferSelect;
export type NewPracticeSession = typeof practiceSessions.$inferInsert;
export type SessionQuestion = typeof sessionQuestions.$inferSelect;
export type NewSessionQuestion = typeof sessionQuestions.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
export type StudyPlan = typeof studyPlans.$inferSelect;
export type NewStudyPlan = typeof studyPlans.$inferInsert;
export type StudyPlanItem = typeof studyPlanItems.$inferSelect;
export type NewStudyPlanItem = typeof studyPlanItems.$inferInsert;
export type AiTutoringSession = typeof aiTutoringSessions.$inferSelect;
export type NewAiTutoringSession = typeof aiTutoringSessions.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

// Enums
export enum QuestionType {
  MATH = 'math',
  READING = 'reading',
  WRITING = 'writing',
}

export enum SessionType {
  DIAGNOSTIC = 'diagnostic',
  PRACTICE = 'practice',
  FULL_EXAM = 'full_exam',
}

export enum SubscriptionPlan {
  FREE = 'free',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  PREMIUM = 'premium',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAST_DUE = 'past_due',
  TRIAL = 'trial',
}
