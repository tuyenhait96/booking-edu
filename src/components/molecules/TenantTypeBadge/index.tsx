import React from 'react';
import Badge from '@/components/atoms/Badge';

type TenantType = 'Higher Ed' | 'K-12' | string;

interface TenantTypeBadgeProps {
    type: TenantType;
    className?: string;
}

export const TenantTypeBadge: React.FC<TenantTypeBadgeProps> = ({ type, className }) => {
    let variant: 'info' | 'orange' | 'default' = 'default';

    if (type === 'Higher Ed') variant = 'info';
    if (type === 'K-12') variant = 'orange';

    return (
        <Badge variant={variant} className={className}>
            {type}
        </Badge>
    );
};
