import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { users, questions, practiceSessions, userProgress, studyPlans } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getUserProgress(userId: number) {
  return await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .orderBy(desc(userProgress.updatedAt));
}

export async function getPracticeSessions(userId: number, limit = 10) {
  return await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.userId, userId))
    .orderBy(desc(practiceSessions.startedAt))
    .limit(limit);
}

export async function getStudyPlans(userId: number) {
  return await db
    .select()
    .from(studyPlans)
    .where(eq(studyPlans.userId, userId))
    .orderBy(desc(studyPlans.createdAt));
}

export async function getQuestionsByType(
  questionType: string,
  subject?: string,
  difficulty?: number,
  limit = 20
) {
  const conditions = [eq(questions.questionType, questionType)];
  
  if (subject) {
    conditions.push(eq(questions.subject, subject));
  }

  if (difficulty) {
    conditions.push(eq(questions.difficulty, difficulty));
  }

  return await db
    .select()
    .from(questions)
    .where(and(...conditions))
    .limit(limit);
}

export async function createPracticeSession(sessionData: {
  userId: number;
  sessionType: string;
  questionType?: string;
  subject?: string;
  difficulty?: number;
  timeLimit?: number;
  totalQuestions: number;
  isTimed?: boolean;
}) {
  const [session] = await db
    .insert(practiceSessions)
    .values({
      ...sessionData,
      startedAt: new Date(),
    })
    .returning();

  return session;
}

export async function updatePracticeSession(
  sessionId: number,
  updateData: {
    completedAt?: Date;
    score?: number;
    correctAnswers?: number;
  }
) {
  const [session] = await db
    .update(practiceSessions)
    .set(updateData)
    .where(eq(practiceSessions.id, sessionId))
    .returning();

  return session;
}

export async function updateUserProgress(
  userId: number,
  subject: string,
  topic: string,
  isCorrect: boolean,
  timeSpent: number
) {
  // Get existing progress or create new
  const existingProgress = await db
    .select()
    .from(userProgress)
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.subject, subject),
        eq(userProgress.topic, topic)
      )
    )
    .limit(1);

  if (existingProgress.length > 0) {
    const progress = existingProgress[0];
    const currentAttempted = progress.questionsAttempted || 0;
    const currentCorrect = progress.questionsCorrect || 0;
    const newAttempted = currentAttempted + 1;
    const newCorrect = currentCorrect + (isCorrect ? 1 : 0);
    const newMastery = newCorrect / newAttempted;
    
    // Calculate new average time
    const totalTime = (progress.averageTime || 0) * currentAttempted + timeSpent;
    const newAverageTime = totalTime / newAttempted;

    await db
      .update(userProgress)
      .set({
        questionsAttempted: newAttempted,
        questionsCorrect: newCorrect,
        masteryLevel: newMastery,
        averageTime: newAverageTime,
        lastPracticed: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(userProgress.id, progress.id));
  } else {
    await db.insert(userProgress).values({
      userId,
      subject,
      topic,
      questionsAttempted: 1,
      questionsCorrect: isCorrect ? 1 : 0,
      masteryLevel: isCorrect ? 1.0 : 0.0,
      averageTime: timeSpent,
      lastPracticed: new Date(),
    });
  }
}

export async function getUserStats(userId: number) {
  const progress = await getUserProgress(userId);
  const sessions = await getPracticeSessions(userId, 50);

  const totalQuestions = progress.reduce((sum, p) => sum + (p.questionsAttempted || 0), 0);
  const totalCorrect = progress.reduce((sum, p) => sum + (p.questionsCorrect || 0), 0);
  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  const totalStudyTime = sessions.reduce((sum, s) => {
    if (s.completedAt && s.startedAt) {
      return sum + (new Date(s.completedAt).getTime() - new Date(s.startedAt).getTime()) / (1000 * 60); // minutes
    }
    return sum;
  }, 0);

  return {
    totalQuestions,
    totalCorrect,
    overallAccuracy,
    totalStudyTime,
    totalSessions: sessions.length,
    averageScore: sessions.length > 0 
      ? sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length 
      : 0,
  };
}
