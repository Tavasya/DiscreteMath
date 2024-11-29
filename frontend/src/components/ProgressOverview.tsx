import React from 'react';

interface TopicProgress {
  topic: string;
  progress: number;
}

interface ProgressOverviewProps {
  topics: TopicProgress[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ topics }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h2>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{topic.topic}</span>
              <span className="text-gray-900">{topic.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-gray-900 rounded-full" 
                style={{width: `${topic.progress}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;