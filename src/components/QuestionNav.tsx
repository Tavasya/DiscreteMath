import React from 'react';
import { Check, Bookmark } from 'lucide-react';

interface QuestionNavProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, number>;
  onQuestionSelect: (index: number) => void;
  isTestMode: boolean;
  bookmarkedQuestions: Set<number>;
}

const QuestionNav: React.FC<QuestionNavProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  onQuestionSelect,
  isTestMode,
  bookmarkedQuestions,
}) => {
  return (
    <div className="w-24 flex-shrink-0">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const questionId = i + 1;
          const isAnswered = userAnswers[questionId] !== undefined;
          const isCurrent = i === currentIndex;
          const isBookmarked = bookmarkedQuestions.has(questionId);

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
                      ? 'bg-rose-600 text-white'
                      : 'bg-emerald-600 text-white'
                    : isAnswered
                    ? isTestMode
                      ? 'bg-rose-600/20 text-rose-400'
                      : 'bg-emerald-600/20 text-emerald-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {questionId}
              {isAnswered && !isCurrent && (
                <div className="absolute -top-1 -right-1">
                  <Check className="w-3 h-3" />
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