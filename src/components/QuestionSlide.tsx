import React, { useEffect, useState } from 'react';

interface Question {
  id: number;
  topic: string;
  question: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface QuestionSlideProps {
  question: Question;
  userAnswer?: string;
  onAnswer: (answer: string) => void;
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
  const [inputValue, setInputValue] = useState(userAnswer || '');

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  useEffect(() => {
    setInputValue(userAnswer || '');
  }, [userAnswer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onAnswer(inputValue);
  };

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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{question.question}</h2>
        <p className="text-gray-600 text-sm">Topic: {question.topic}</p>
      </div>

      {question.imageUrl && (
        <div className="mb-6">
          <img
            src={question.imageUrl}
            alt={question.imageAlt || 'Question visual'}
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div className="space-y-2">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="Enter your answer here..."
          className={`w-full h-48 p-4 rounded-lg transition-colors resize-none font-mono ${
            isTestMode
              ? 'bg-red-50 border-red-200 focus:border-red-300 focus:ring-red-200'
              : 'bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-gray-200'
          } border-2 focus:outline-none focus:ring-2`}
        />
        <div className="text-sm text-gray-600 space-y-1">
          <p>Tips:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use mathematical notation (∪, ∩, ∈, ⊆, etc.)</li>
            <li>For matrices, use [ ] and separate rows with newlines</li>
            <li>For sets, use { } and separate elements with commas</li>
            <li>Show all your work and steps clearly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionSlide;