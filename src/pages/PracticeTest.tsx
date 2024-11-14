import React, { useState } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import TopicSelection from '../components/TopicSelection';

const PracticeTest = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleStart = () => {
    if (selectedTopics.length > 0) {
      setIsSelecting(false);
    }
  };

  const themeColor = isTestMode ? 'rose' : 'emerald';

  if (!isSelecting) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`${isTestMode ? 'bg-gray-800 border border-rose-500/20' : 'bg-gray-800'} rounded-xl p-6`}>
            <h2 className={`text-2xl font-semibold mb-4 ${isTestMode ? 'text-rose-400' : 'text-white'}`}>
              {isTestMode ? 'Test Session' : 'Practice Session'}
            </h2>
            <p className="text-gray-300">
              {isTestMode ? 'Test' : 'Practice'} session with {selectedTopics.length} selected topics will appear here
            </p>
            <button
              onClick={() => setIsSelecting(true)}
              className={`mt-4 ${isTestMode ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'} px-4 py-2 rounded-md`}
            >
              Change Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isTestMode ? 'text-rose-400' : 'text-white'}`}>
              {isTestMode ? 'Test Mode' : 'Practice Mode'}
            </h1>
            <p className="text-xl text-gray-300">
              Select topics to {isTestMode ? 'test' : 'practice'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className={`font-medium ${!isTestMode ? 'text-emerald-500' : 'text-gray-400'}`}>
                Practice
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isTestMode}
                  onChange={() => setIsTestMode(!isTestMode)}
                />
                <div className={`w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${themeColor}-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${isTestMode ? 'peer-checked:bg-rose-600' : 'peer-checked:bg-emerald-600'}`}></div>
              </label>
              <span className={`font-medium ${isTestMode ? 'text-rose-500' : 'text-gray-400'}`}>
                Test
              </span>
            </div>

            <button
              onClick={handleStart}
              disabled={selectedTopics.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold ${
                selectedTopics.length > 0
                  ? isTestMode
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Start {isTestMode ? 'Test' : 'Practice'}
            </button>
          </div>
        </div>

        <TopicSelection
          selectedTopics={selectedTopics}
          onTopicToggle={handleTopicToggle}
          isTestMode={isTestMode}
        />

        {isTestMode && (
          <div className="mt-8 bg-gray-800 border border-rose-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-rose-400 mt-1" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-rose-400">Important Note</h3>
                <p className="mt-2 text-gray-300">
                  Tests are timed and must be completed in one sitting. Make sure you have a stable internet connection
                  and enough time before starting. Your progress will be saved and added to your profile upon completion.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeTest;