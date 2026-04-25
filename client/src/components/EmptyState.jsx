import React from 'react';
import { Layers } from 'lucide-react';

export const EmptyState = ({ 
  icon: Icon = Layers, 
  title = "No items found", 
  description = "There are no items to display here yet.", 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/50 mb-4">
        <Icon className="h-10 w-10 text-zinc-400" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-400 max-w-sm mb-6 pb-2">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
