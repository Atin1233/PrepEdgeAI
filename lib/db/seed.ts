import { db } from './drizzle';
import { users, questions } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createSampleQuestions() {
  console.log('Creating sample SAT questions...');

  const sampleQuestions = [
    {
      content: 'If 2x + 3 = 11, what is the value of x?',
      questionType: 'math',
      subject: 'algebra',
      difficulty: 2,
      correctAnswer: 'C',
      options: JSON.stringify(['A) 2', 'B) 3', 'C) 4', 'D) 5']),
      explanation: 'Solve for x: 2x + 3 = 11, so 2x = 8, therefore x = 4.',
      hints: JSON.stringify(['Subtract 3 from both sides', 'Divide by 2']),
      tags: JSON.stringify(['linear equations', 'algebra']),
      isVerified: true,
    },
    {
      content: 'Which word best completes the sentence: "The scientist was _____ about the results of her experiment."',
      questionType: 'reading',
      subject: 'vocabulary',
      difficulty: 3,
      correctAnswer: 'B',
      options: JSON.stringify(['A) ambiguous', 'B) skeptical', 'C) enthusiastic', 'D) negligent']),
      explanation: 'Skeptical means having doubt or reservations, which fits the context of a scientist being cautious about results.',
      hints: JSON.stringify(['Consider the context of scientific research', 'Think about appropriate scientific attitudes']),
      tags: JSON.stringify(['vocabulary', 'context clues']),
      isVerified: true,
    },
    {
      content: 'Identify the error in this sentence: "Neither the students nor the teacher were prepared for the exam."',
      questionType: 'writing',
      subject: 'grammar',
      difficulty: 3,
      correctAnswer: 'A',
      options: JSON.stringify(['A) were should be was', 'B) Neither should be Either', 'C) nor should be or', 'D) No error']),
      explanation: 'With "neither...nor" constructions, the verb agrees with the subject closest to it. Since "teacher" is singular, use "was".',
      hints: JSON.stringify(['Check subject-verb agreement', 'Look at the subject closest to the verb']),
      tags: JSON.stringify(['grammar', 'subject-verb agreement']),
      isVerified: true,
    }
  ];

  await db.insert(questions).values(sampleQuestions);
  console.log('Sample SAT questions created successfully.');
}

async function seed() {
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        name: 'Test Student',
        email: email,
        passwordHash: passwordHash,
        role: 'student',
        targetScore: 1500,
        currentScore: 1200,
        diagnosticCompleted: false,
        studyPlanGenerated: false,
      },
    ])
    .returning();

  console.log('Initial test user created.');

  await createSampleQuestions();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
