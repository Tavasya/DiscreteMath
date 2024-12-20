import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  category: string;
  description?: string;
}

interface TopicSelectionProps {
  selectedTopics: string[];
  onTopicToggle: (topicId: string) => void;
  isTestMode?: boolean;
  onStart: (questionsPerTopic: number) => void;
}

const topics: Topic[] = [
  // Set Theory
  {
    id: 'venn-bit-stream',
    name: 'Identify the Venn Bit Stream',
    category: 'Set Theory'
  },
  {
    id: 'venn-dnf',
    name: 'Identify the Venn Disjunctive Normal Form',
    category: 'Set Theory'
  },
  {
    id: 'bit-stream-to-dnf',
    name: 'Bit Stream to Disjunctive Normal Form',
    category: 'Set Theory'
  },
  {
    id: 'dnf-to-bit-stream',
    name: 'Disjunctive Normal Form to Bit Stream',
    category: 'Set Theory'
  },
  {
    id: 'set-operators',
    name: 'Set Operators',
    description: 'Union, intersection, complement',
    category: 'Set Theory'
  },
  {
    id: 'roster-notation',
    name: 'Roster Notation',
    category: 'Set Theory'
  },
  {
    id: 'cardinality',
    name: 'Cardinality',
    category: 'Set Theory'
  },
  {
    id: 'power-sets',
    name: 'Power Sets',
    category: 'Set Theory'
  },
  {
    id: 'demorgans-law',
    name: "DeMorgan's Law",
    category: 'Set Theory'
  },
  {
    id: 'set-builder',
    name: 'Set Builder Notation',
    category: 'Set Theory'
  },
  {
    id: 'subsets',
    name: 'Subsets & Proper Subsets',
    category: 'Set Theory'
  },
  {
    id: 'venn-2-sets',
    name: 'Venn Diagram with 2 Sets',
    category: 'Set Theory'
  },
  {
    id: 'venn-3-sets',
    name: 'Venn Diagram with 3 Sets',
    category: 'Set Theory'
  },

  // Logic
  {
    id: 'logic-symbols',
    name: 'Logic Symbols',
    category: 'Logic'
  },
  {
    id: 'prop-to-truth',
    name: 'Propositional Logic to Truth Table',
    category: 'Logic'
  },
  {
    id: 'kmap-to-prop',
    name: 'Karnaugh Map to Propositional Logic',
    category: 'Logic'
  },
  {
    id: 'prop-to-kmap',
    name: 'Propositional Logic to Karnaugh Map',
    category: 'Logic'
  },
  {
    id: 'circuit-to-prop',
    name: 'Circuit to Propositional Logic',
    category: 'Logic'
  },

  // Proofs
  {
    id: 'proof-equivalence',
    name: 'Proof by Equivalence',
    description: 'Testing',
    category: 'Proofs'
  },

  // Algorithms
  {
    id: 'analyze-tables',
    name: 'Analyze Tables',
    description: 'Testing',
    category: 'Algorithms'
  },
  {
    id: 'big-o',
    name: 'Big O Notation',
    category: 'Algorithms'
  },

  // Counting
  {
    id: 'perm-comb-facts',
    name: 'Permutations and Combinations Facts',
    description: 'Testing',
    category: 'Counting'
  },
  {
    id: 'permutations',
    name: 'Permutations',
    description: 'Testing',
    category: 'Counting'
  },
  {
    id: 'combinations',
    name: 'Combinations',
    description: 'Testing',
    category: 'Counting'
  },
  {
    id: 'counting-word',
    name: 'Counting Word Problems',
    category: 'Counting'
  }
];

const TopicSelection: React.FC<TopicSelectionProps> = ({ selectedTopics, onTopicToggle, isTestMode = false, onStart }) => {
  const [totalQuestions, setTotalQuestions] = useState(30);
  const categories = Array.from(new Set(topics.map(topic => topic.category)));

  const handleSelectAllTopics = () => {
    const allTopicIds = topics.map(topic => topic.id);
    const allSelected = allTopicIds.every(id => selectedTopics.includes(id));
    
    if (allSelected) {
      // Deselect all topics
      allTopicIds.forEach(id => onTopicToggle(id));
    } else {
      // Select all unselected topics
      allTopicIds.forEach(id => {
        if (!selectedTopics.includes(id)) {
          onTopicToggle(id);
        }
      });
    }
  };

  const handleSelectCategory = (category: string) => {
    const categoryTopicIds = topics
      .filter(topic => topic.category === category)
      .map(topic => topic.id);
    
    const allCategorySelected = categoryTopicIds.every(id => selectedTopics.includes(id));
    
    if (allCategorySelected) {
      // Deselect all topics in category
      categoryTopicIds.forEach(id => onTopicToggle(id));
    } else {
      // Select all unselected topics in category
      categoryTopicIds.forEach(id => {
        if (!selectedTopics.includes(id)) {
          onTopicToggle(id);
        }
      });
    }
  };

  const getQuestionsPerTopic = () => {
    if (selectedTopics.length === 0) return 0;
    return Math.max(1, Math.floor(totalQuestions / selectedTopics.length));
  };

  const questionsPerTopic = getQuestionsPerTopic();
  const actualTotalQuestions = questionsPerTopic * selectedTopics.length;

  return (
    <div className="space-y-8">
      <div className={`bg-gray-50 rounded-xl p-6 ${isTestMode ? 'border border-red-100' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSelectAllTopics}
              className={`px-4 py-2 rounded-lg font-medium ${
                isTestMode 
                  ? 'bg-red-50 hover:bg-red-100 text-red-900'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              {topics.every(topic => selectedTopics.includes(topic.id))
                ? 'Deselect All Topics'
                : 'Select All Topics'}
            </button>

            <div className="flex items-center gap-4">
              <label className="text-gray-700">Total Questions:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className={`w-20 px-3 py-2 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 ${
                  isTestMode 
                    ? 'border-red-200 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-gray-200'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedTopics.length > 0 && (
              <span className="text-sm text-gray-600">
                ({questionsPerTopic} questions per topic, {actualTotalQuestions} total)
              </span>
            )}
            <button
              onClick={() => onStart(questionsPerTopic)}
              disabled={selectedTopics.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                selectedTopics.length > 0
                  ? isTestMode
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Start {isTestMode ? 'Test' : 'Practice'}
            </button>
          </div>
        </div>
      </div>

      {categories.map(category => {
        const categoryTopics = topics.filter(topic => topic.category === category);
        const allCategorySelected = categoryTopics.every(topic => 
          selectedTopics.includes(topic.id)
        );

        return (
          <div 
            key={category} 
            className={`bg-gray-50 rounded-xl p-6 ${isTestMode ? 'border border-red-100' : ''}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
              <button
                onClick={() => handleSelectCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isTestMode 
                    ? 'bg-red-50 hover:bg-red-100 text-red-900'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                {allCategorySelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onTopicToggle(topic.id)}
                  className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedTopics.includes(topic.id)
                      ? isTestMode
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                      : isTestMode
                        ? 'bg-red-50 hover:bg-red-100 text-gray-900'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{topic.name}</span>
                    {topic.description && (
                      <span className={`text-sm ${
                        selectedTopics.includes(topic.id)
                          ? 'text-gray-300'
                          : isTestMode
                            ? 'text-red-700'
                            : 'text-gray-600'
                      }`}>
                        {topic.description}
                      </span>
                    )}
                  </div>
                  {selectedTopics.includes(topic.id) && (
                    <Check className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopicSelection;