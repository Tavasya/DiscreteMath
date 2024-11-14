import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, CheckCircle, PlusCircle, XCircle, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete Set Theory practice', done: false },
    { id: 2, text: 'Review Graph Theory notes', done: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8">
        {/* Main Study Section */}
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Continue Learning</h2>
              <p className="text-gray-400 mt-1">Pick up where you left off</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/practice"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold"
              >
                <Brain className="h-5 w-5" />
                <span>Practice & Test</span>
              </Link>
              <Link
                to="/study"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
              >
                <BookOpen className="h-5 w-5" />
                <span>Study</span>
              </Link>
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Set Theory', progress: 80, color: 'emerald' },
              { name: 'Logic', progress: 65, color: 'blue' },
              { name: 'Graph Theory', progress: 45, color: 'purple' },
              { name: 'Proofs', progress: 30, color: 'yellow' },
              { name: 'Algorithms', progress: 20, color: 'pink' },
              { name: 'Counting', progress: 15, color: 'indigo' },
            ].map(subject => (
              <div key={subject.name} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span>{subject.name}</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div
                    className={`h-2 bg-${subject.color}-500 rounded-full`}
                    style={{width: `${subject.progress}%`}}
                  ></div>
                </div>
                <Link
                  to="/practice"
                  className="flex items-center justify-between mt-3 text-sm text-gray-300 hover:text-white"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Todo List</h2>
          <form onSubmit={addTodo} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTodo(todo.id)}>
                    {todo.done ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-400 rounded-full" />
                    )}
                  </button>
                  <span className={todo.done ? 'line-through text-gray-400' : ''}>
                    {todo.text}
                  </span>
                </div>
                <button onClick={() => deleteTodo(todo.id)}>
                  <XCircle className="h-5 w-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;