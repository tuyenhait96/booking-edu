import React from 'react';

type GrowthInsightProps = {
    title: string;
    description: string;
};

export const GrowthInsight: React.FC<GrowthInsightProps> = ({ title, description }) => {
    return (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-xs font-medium text-primary uppercase">{title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
        </div>
    );
};
