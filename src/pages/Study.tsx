import React, { useState } from 'react';
import { BookOpen, Video, FileText, MessageCircle } from 'lucide-react';
import TopicSelection from '../components/TopicSelection';

const Study = () => {
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
          <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
          <p className="text-gray-400">
            Study materials for {selectedTopics.length} selected topics will appear here
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
          <h1 className="text-4xl font-bold text-white mb-2">Study Mode</h1>
          <p className="text-xl text-gray-400">Select topics to study</p>
        </div>
        <button
          onClick={handleStart}
          disabled={selectedTopics.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedTopics.length > 0
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          Access Materials
        </button>
      </div>

      <TopicSelection
        selectedTopics={selectedTopics}
        onTopicToggle={handleTopicToggle}
      />
    </div>
  );
};

export default Study;