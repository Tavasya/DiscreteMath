import React from 'react';
import { Link } from 'react-router-dom';

interface Assignment {
  id: number;
  type: string;
  topics: string[];
  questions: number;
  dateAssigned: string;
  dateDue: string;
  status: string;
  completedQuestions: number;
}

interface DailyAssignmentsProps {
  assignments: Assignment[];
}

const DailyAssignments: React.FC<DailyAssignmentsProps> = ({ assignments }) => {
  if (assignments.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Daily Assignments</h2>
      </div>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 rounded-full bg-blue-500" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Daily Practice - Due {new Date(assignment.dateDue).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>Topics: {assignment.topics.join(', ')}</span>
                  <span>{assignment.questions} questions</span>
                </div>
              </div>
            </div>
            <Link
              to="/practice"
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
            >
              Start
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyAssignments;