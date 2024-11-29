import React from 'react';
import { Check, Bookmark, Image } from 'lucide-react';

interface QuestionNavProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, string>;
  onQuestionSelect: (index: number) => void;
  isTestMode: boolean;
  bookmarkedQuestions: Set<number>;
  questions: Array<{ id: number; imageUrl?: string; correctAnswer?: string }>;
}

const QuestionNav: React.FC<QuestionNavProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  onQuestionSelect,
  isTestMode,
  bookmarkedQuestions,
  questions
}) => {
  const isAnswerCorrect = (questionId: number) => {
    return userAnswers[questionId]?.trim().toLowerCase() === questions.find(q => q.id === questionId)?.correctAnswer?.toLowerCase();
  };

  const isAnswerIncorrect = (questionId: number) => {
    return userAnswers[questionId] && !isAnswerCorrect(questionId);
  };

  return (
    <div className="w-24 flex-shrink-0">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const question = questions[i];
          const questionId = question.id;
          const isAnswered = userAnswers[questionId] !== undefined;
          const isCurrent = i === currentIndex;
          const isBookmarked = bookmarkedQuestions.has(questionId);
          const hasImage = !!question.imageUrl;
          const correct = !isTestMode && isAnswerCorrect(questionId);
          const incorrect = !isTestMode && isAnswerIncorrect(questionId);

          return (
            <button
              key={i}
              onClick={() => onQuestionSelect(i)}
              className={`
                relative aspect-square rounded-lg font-medium text-sm
                transition-colors
                ${
                  isCurrent
                    ? isTestMode
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-900 text-white'
                    : isAnswered
                    ? isTestMode
                      ? 'bg-red-100 text-red-900'
                      : correct
                        ? 'bg-green-100 text-green-900'
                        : incorrect
                          ? 'bg-red-100 text-red-900'
                          : 'bg-gray-200 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <span className="relative z-10">{i + 1}</span>
              
              {hasImage && (
                <div className="absolute bottom-1 left-1">
                  <Image className="w-3 h-3" />
                </div>
              )}

              {isAnswered && !isCurrent && (
                <div className="absolute -top-1 -right-1">
                  <Check className={`w-3 h-3 ${correct ? 'text-green-500' : incorrect ? 'text-red-500' : ''}`} />
                </div>
              )}
              
              {isBookmarked && (
                <div className="absolute -bottom-1 -right-1">
                  <Bookmark className="w-3 h-3" fill="currentColor" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionNav;