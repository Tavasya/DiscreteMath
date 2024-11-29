import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LucideLineChart } from 'lucide-react';

interface ActivityData {
  date: string;
  score: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Activity</h2>
          <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
        </div>
        <LucideLineChart className="h-5 w-5 text-gray-400" />
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#111827"
              strokeWidth={2}
              dot={{ fill: '#111827', strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;