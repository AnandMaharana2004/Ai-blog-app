// components/StatCard.tsx
import React from 'react';
interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  description: string;
  iconColorClass: string;
}
export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, description, iconColorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${iconColorClass} bg-opacity-20`}>
      <Icon className={`w-6 h-6 ${iconColorClass}`} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);