import React, { useEffect, useState } from 'react';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionSlideProps {
  question: Question;
  userAnswer?: number;
  onAnswer: (index: number) => void;
  isTestMode: boolean;
  direction: 'left' | 'right';
}

const QuestionSlide: React.FC<QuestionSlideProps> = ({
  question,
  userAnswer,
  onAnswer,
  isTestMode,
  direction,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  return (
    <div
      className={`transform transition-all duration-300 ${
        isAnimating
          ? direction === 'right'
            ? '-translate-x-full opacity-0'
            : 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
        <p className="text-gray-400 text-sm">Topic: {question.topic}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              userAnswer === index
                ? isTestMode
                  ? 'bg-rose-600 text-white'
                  : 'bg-emerald-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSlide;