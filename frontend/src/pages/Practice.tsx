import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import TopicSelection from '../components/TopicSelection';

const Practice = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);

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

  if (!isSelecting) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Practice Session</h2>
          <p className="text-gray-400">
            Practice session with {selectedTopics.length} selected topics will appear here
          </p>
          <button
            onClick={() => setIsSelecting(true)}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
          >
            Change Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Practice Mode</h1>
          <p className="text-xl text-gray-400">Select topics to practice</p>
        </div>
        <button
          onClick={handleStart}
          disabled={selectedTopics.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedTopics.length > 0
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          Start Practice
        </button>
      </div>

      <TopicSelection
        selectedTopics={selectedTopics}
        onTopicToggle={handleTopicToggle}
      />
    </div>
  );
};

export default Practice;