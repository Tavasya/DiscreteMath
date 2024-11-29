// Activity data for the performance chart
export const activityData = [
  { date: '2024-03-01', score: 85 },
  { date: '2024-03-05', score: 92 },
  { date: '2024-03-10', score: 78 },
  { date: '2024-03-15', score: 88 },
  { date: '2024-03-20', score: 95 },
];

// Daily assignments from admin
export const assignments = [
  {
    id: 1,
    type: 'daily',
    topics: ['Set Theory - Basic Set Operations', 'Logic - Truth Tables'],
    questions: 15,
    dateAssigned: '2024-03-20',
    dateDue: '2024-03-22',
    studentsCompleted: 12,
    totalStudents: 25,
    status: 'pending',
    completedQuestions: 0
  }
];

// Topic tests with their status
export const topicTests = [
  {
    topic: 'Set Theory',
    status: 'locked',
    requiredScore: 80,
    prerequisites: ['Basic Set Operations', 'Venn Diagrams']
  },
  {
    topic: 'Logic',
    status: 'available',
    requiredScore: 80,
    prerequisites: []
  },
  {
    topic: 'Counting & Probability',
    status: 'failed',
    lastAttemptScore: 65,
    requiredScore: 80,
    nextAttemptDate: '2024-03-25'
  }
];

// Completed items (both tests and daily practice)
export const completedItems = [
  {
    id: 1,
    type: 'daily',
    title: 'Daily Practice - March 15',
    topics: ['Set Theory - Venn Diagrams', 'Logic - Propositional Logic'],
    questions: 20,
    dateCompleted: '2024-03-15',
    score: 92,
    timeSpent: '45:30'
  },
  {
    id: 2,
    type: 'test',
    topic: 'Graph Theory',
    section: 'Basic Concepts',
    dateCompleted: '2024-03-10',
    score: 100,
    timeSpent: '58:20'
  }
];