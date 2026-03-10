import React from 'react';

type ChartColumnProps = {
    month: string;
    percentage: number;
    isActive?: boolean;
};

export const ChartColumn: React.FC<ChartColumnProps> = ({
    month,
    percentage,
    isActive = false
}) => {
    const barColor = isActive ? 'bg-primary' : 'bg-primary/20 hover:bg-primary transition-all';
    const textColor = isActive ? 'text-primary font-bold' : 'text-slate-500';

    return (
        <div className="flex flex-col items-center flex-1 gap-2">
            <div
                className={`w-full rounded-t-lg ${barColor}`}
                style={{ height: `${percentage}%` }}
            ></div>
            <span className={`text-xs ${textColor}`}>{month}</span>
        </div>
    );
};
