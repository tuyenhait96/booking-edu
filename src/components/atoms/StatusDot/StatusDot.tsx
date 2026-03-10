import React from 'react';

type Status = 'active' | 'inactive' | 'pending';

type StatusDotProps = {
    status: Status;
    className?: string;
};

export const StatusDot: React.FC<StatusDotProps> = ({ status, className = '' }) => {
    const colorClass =
        status === 'active' ? 'bg-emerald-500' :
            status === 'pending' ? 'bg-amber-500' :
                'bg-slate-300';

    return (
        <span className={`size-2 rounded-full ${colorClass} ${className}`}></span>
    );
};
