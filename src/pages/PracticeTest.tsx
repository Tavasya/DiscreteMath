import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import TopicSelection from '../components/TopicSelection';
import QuestionSlide from '../components/QuestionSlide';
import QuestionNav from '../components/QuestionNav';
import Timer from '../components/Timer';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const generateRandomQuestions = (topics: string[], questionsPerTopic: number): Question[] => {
  let questions: Question[] = [];
  let id = 1;

  topics.forEach(topic => {
    for (let i = 0; i < questionsPerTopic; i++) {
      questions.push({
        id: id++,
        topic,
        question: `Sample question ${i + 1} for ${topic}?`,
        options: [
          `Option A for ${topic}`,
          `Option B for ${topic}`,
          `Option C for ${topic}`,
          `Option D for ${topic}`,
        ],
        correctAnswer: Math.floor(Math.random() * 4),
      });
    }
  });

  return questions;
};

const PracticeTest = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleStart = (questionsPerTopic: number) => {
    if (selectedTopics.length > 0) {
      const generatedQuestions = generateRandomQuestions(selectedTopics, questionsPerTopic);
      setQuestions(generatedQuestions);
      setIsSelecting(false);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setBookmarkedQuestions(new Set());
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSlideDirection('right');
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('left');
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setSlideDirection(index > currentQuestionIndex ? 'right' : 'left');
    setCurrentQuestionIndex(index);
  };

  const toggleBookmark = () => {
    const questionId = questions[currentQuestionIndex].id;
    setBookmarkedQuestions(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(questionId)) {
        newBookmarks.delete(questionId);
      } else {
        newBookmarks.add(questionId);
      }
      return newBookmarks;
    });
  };

  if (!isSelecting && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const isBookmarked = bookmarkedQuestions.has(currentQuestion.id);

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isTestMode && (
            <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-900">Test Mode Active</h3>
                  <p className="mt-2 text-red-700">
                    Complete all questions in one sitting. Your progress will be saved upon completion.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-6">
            <QuestionNav
              totalQuestions={questions.length}
              currentIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              onQuestionSelect={handleQuestionSelect}
              isTestMode={isTestMode}
              bookmarkedQuestions={bookmarkedQuestions}
            />

            <div className={`flex-1 bg-gray-50 rounded-xl p-8 ${isTestMode ? 'border border-red-100' : ''}`}>
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setIsSelecting(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    isTestMode
                      ? 'bg-red-50 hover:bg-red-100 text-red-900'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Topics
                </button>
                <div className="flex items-center gap-4">
                  <Timer isTestMode={isTestMode} />
                  <button
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked
                        ? isTestMode
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-900 text-white'
                        : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <Bookmark className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <span className="text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <QuestionSlide
                  question={currentQuestion}
                  userAnswer={userAnswers[currentQuestion.id]}
                  onAnswer={handleAnswer}
                  isTestMode={isTestMode}
                  direction={slideDirection}
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isTestMode
                      ? 'bg-red-50 hover:bg-red-100 text-red-900'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    currentQuestionIndex === questions.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isTestMode
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isTestMode && (
          <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-900">Important Note</h3>
                <p className="mt-2 text-red-700">
                  Tests are timed and must be completed in one sitting. Make sure you have a stable internet connection
                  and enough time before starting. Your progress will be saved and added to your profile upon completion.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isTestMode ? 'text-red-900' : 'text-gray-900'}`}>
              {isTestMode ? 'Test Mode' : 'Practice Mode'}
            </h1>
            <p className="text-xl text-gray-600">
              Select topics to {isTestMode ? 'test' : 'practice'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className={`font-medium ${!isTestMode ? 'text-gray-900' : 'text-gray-400'}`}>
                Practice
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isTestMode}
                  onChange={() => setIsTestMode(!isTestMode)}
                />
                <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${
                  isTestMode 
                    ? 'peer-focus:ring-red-100' 
                    : 'peer-focus:ring-gray-100'
                } rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${
                  isTestMode ? 'peer-checked:bg-red-600' : 'peer-checked:bg-gray-900'
                }`}></div>
              </label>
              <span className={`font-medium ${isTestMode ? 'text-red-900' : 'text-gray-400'}`}>
                Test
              </span>
            </div>
          </div>
        </div>

        <TopicSelection
          selectedTopics={selectedTopics}
          onTopicToggle={handleTopicToggle}
          isTestMode={isTestMode}
          onStart={handleStart}
        />
      </div>
    </div>
  );
};

export default PracticeTest;