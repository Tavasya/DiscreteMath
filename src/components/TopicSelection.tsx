import React from 'react';
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

const TopicSelection: React.FC<TopicSelectionProps> = ({ selectedTopics, onTopicToggle, isTestMode = false }) => {
  const categories = Array.from(new Set(topics.map(topic => topic.category)));

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category} className={`${isTestMode ? 'bg-gray-800 border border-rose-500/20' : 'bg-gray-800'} rounded-xl p-6`}>
          <h3 className={`text-xl font-semibold mb-4 ${isTestMode ? 'text-rose-400' : 'text-white'}`}>{category}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics
              .filter(topic => topic.category === category)
              .map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onTopicToggle(topic.id)}
                  className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedTopics.includes(topic.id)
                      ? isTestMode
                        ? 'bg-rose-600 hover:bg-rose-700'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                      : isTestMode
                        ? 'bg-gray-700 border border-rose-500/20 hover:bg-gray-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div>
                    <span className="block font-medium">{topic.name}</span>
                    {topic.description && (
                      <span className="text-sm text-gray-300">{topic.description}</span>
                    )}
                  </div>
                  {selectedTopics.includes(topic.id) && (
                    <Check className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicSelection;