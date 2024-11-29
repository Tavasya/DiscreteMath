import React from 'react';
import { Clock, Trophy } from 'lucide-react';

interface CompletedItemProps {
  type: 'daily' | 'test';
  title: string;
  score: number;
  date: string;
  timeSpent: string;
  questions?: number;
  topic?: string;
  section?: string;
}

const CompletedItem: React.FC<CompletedItemProps> = ({
  type,
  title,
  score,
  date,
  timeSpent,
  questions,
  topic,
  section
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`w-1 h-12 rounded-full ${
          score === 100 ? 'bg-yellow-500' : 'bg-green-500'
        }`} />
        <div>
          <h3 className="font-medium text-gray-900">
            {type === 'daily' ? title : `${topic} - ${section}`}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
            <span>Completed: {date}</span>
            <span>Time: {timeSpent}</span>
            <span>Score: {score}%</span>
            {questions && <span>{questions} questions</span>}
          </div>
        </div>
      </div>
      {score === 100 && (
        <div className="px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded-lg text-sm font-medium">
          Perfect Score!
        </div>
      )}
    </div>
  );
};

export default CompletedItem;