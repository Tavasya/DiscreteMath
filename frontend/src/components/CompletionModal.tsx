import React, { useEffect } from 'react';
import { Trophy, Clock, CheckCircle, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  score: number;
  timeSpent: string;
  totalQuestions: number;
  correctAnswers: number;
  isTestMode: boolean;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  score,
  timeSpent,
  totalQuestions,
  correctAnswers,
  isTestMode
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && score === 100) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isOpen, score]);

  const handleContinue = () => {
    onClose();
    navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          {score === 100 ? (
            <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="h-10 w-10 text-yellow-600" />
            </div>
          ) : score >= 80 ? (
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          ) : (
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {score === 100 ? 'Perfect Score!' : isTestMode ? 'Test Complete!' : 'Practice Session Complete!'}
          </h2>
          <p className="text-gray-600">
            {score === 100 
              ? 'Outstanding! You\'ve achieved perfection!' 
              : score >= 80 
                ? 'Great job! You\'ve mastered this topic.' 
                : 'Keep practicing to improve your score!'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`bg-gray-50 p-4 rounded-lg text-center ${
            score === 100 ? 'bg-yellow-50' : ''
          }`}>
            <div className={`text-3xl font-bold mb-1 ${
              score === 100 ? 'text-yellow-600' : 'text-gray-900'
            }`}>
              {score}%
            </div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{timeSpent}</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Questions</span>
            <span className="font-medium text-gray-900">{correctAnswers}/{totalQuestions}</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full transition-all ${
                score === 100 ? 'bg-yellow-500' : 'bg-gray-900'
              }`}
              style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4">
          {score !== 100 && (
            <button
              onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <RotateCw className="h-5 w-5" />
              Try Again
            </button>
          )}
          <button
            onClick={handleContinue}
            className={`flex-1 px-4 py-2 rounded-lg ${
              score === 100
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;