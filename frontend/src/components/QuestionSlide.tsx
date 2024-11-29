import React, { useEffect, useState } from 'react';
import { Check, X, Eye } from 'lucide-react';

interface Question {
  id: number;
  topic: string;
  question: string;
  imageUrl?: string;
  imageAlt?: string;
  correctAnswer?: string;
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isInputLocked, setIsInputLocked] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  useEffect(() => {
    setInputValue(userAnswer || '');
    setShowFeedback(false);
    setShowAnswer(false);
    setIsCorrect(false);
    setAttemptCount(0);
    setIsInputLocked(false);
  }, [userAnswer, question.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isInputLocked) return;
    const newValue = e.target.value;
    setInputValue(newValue);
    onAnswer(newValue);
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const correct = inputValue.trim().toLowerCase() === (question.correctAnswer || '').toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (!correct) {
      setAttemptCount(prev => prev + 1);
      if (attemptCount >= 1) {
        setIsInputLocked(true);
      }
    } else {
      setIsInputLocked(true);
    }
  };

  const handleShowAnswer = () => {
    if (isCorrect) return; // Prevent showing answer if already correct
    setShowAnswer(true);
    setIsInputLocked(true);
    setShowFeedback(true);
    setIsCorrect(false);
    // Mark as incorrect and update parent component
    setInputValue('');
    onAnswer('');
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

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isInputLocked ? "Answer locked" : "Enter your answer here..."}
            disabled={isInputLocked}
            className={`w-full h-48 p-4 rounded-lg transition-colors resize-none font-mono ${
              isTestMode
                ? 'bg-red-50 border-red-200 focus:border-red-300 focus:ring-red-200'
                : showAnswer
                ? 'bg-red-50 border-red-200 text-red-900'
                : isCorrect
                ? 'bg-green-50 border-green-200 text-green-900'
                : 'bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-gray-200'
            } border-2 focus:outline-none focus:ring-2 ${
              isInputLocked ? 'cursor-not-allowed opacity-75' : ''
            }`}
          />
          {!isTestMode && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {!isInputLocked && !isCorrect && !showAnswer && (
                <button
                  onClick={checkAnswer}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                >
                  Check Answer {attemptCount > 0 ? `(${2 - attemptCount} attempt left)` : ''}
                </button>
              )}
              {!isCorrect && !showAnswer && (
                <button
                  onClick={handleShowAnswer}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Show Answer
                </button>
              )}
            </div>
          )}
        </div>

        {showAnswer && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-medium text-yellow-800 mb-1">Correct Answer:</div>
            <div className="font-mono text-yellow-900">{question.correctAnswer}</div>
          </div>
        )}

        {showFeedback && !isTestMode && !showAnswer && (
          <div className={`flex items-center gap-2 p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {isCorrect ? (
              <>
                <Check className="h-5 w-5" />
                <span>Correct! Well done!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5" />
                <span>{attemptCount >= 2 ? "No more attempts left." : "Not quite right. Try again!"}</span>
              </>
            )}
          </div>
        )}

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