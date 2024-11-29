import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import CompletedItem from './CompletedItem';

interface CompletedItem {
  id: number;
  type: 'daily' | 'test';
  title?: string;
  topic?: string;
  section?: string;
  score: number;
  dateCompleted: string;
  timeSpent: string;
  questions?: number;
}

interface CompletedSectionProps {
  items: CompletedItem[];
}

const CompletedSection: React.FC<CompletedSectionProps> = ({ items }) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'test'>('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('daily')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'daily'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Daily Practice
          </button>
          <button
            onClick={() => setFilter('test')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'test'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Tests
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <CompletedItem
            key={item.id}
            type={item.type}
            title={item.title}
            topic={item.topic}
            section={item.section}
            score={item.score}
            date={item.dateCompleted}
            timeSpent={item.timeSpent}
            questions={item.questions}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedSection;