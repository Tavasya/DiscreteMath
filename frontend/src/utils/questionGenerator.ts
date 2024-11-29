export const generateRandomQuestions = (topics: string[], questionsPerTopic: number) => {
  let questions = [];
  let id = 1;

  // Sample graph theory visual
  const graphTheoryImage = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800&h=600";

  topics.forEach(topic => {
    for (let i = 0; i < questionsPerTopic; i++) {
      let question = {
        id: id++,
        topic,
        question: '',
        correctAnswer: 'admin' // All answers set to "admin" for testing
      };

      // Set question based on topic
      switch (true) {
        case topic.includes('Graph Theory'):
          question.question = 'Given the graph above, write the adjacency matrix for this graph:';
          question.imageUrl = graphTheoryImage;
          question.imageAlt = 'A directed graph with vertices A through E and weighted edges';
          break;
        case topic.includes('Set Theory'):
          question.question = 'Express the following set in roster notation: The set of all even numbers less than 10';
          break;
        case topic.includes('Logic'):
          question.question = 'Write the negation of the statement: "For all x, if x is prime, then x is odd"';
          break;
        case topic.includes('Proofs'):
          question.question = 'Prove by contradiction that √2 is irrational';
          break;
        case topic.includes('Counting'):
          question.question = 'How many different 4-digit numbers can be formed using the digits 1, 2, 3, 4, 5 without repetition?';
          break;
        default:
          question.question = `Write a detailed answer for ${topic}`;
      }

      questions.push(question);
    }
  });

  return questions;
};