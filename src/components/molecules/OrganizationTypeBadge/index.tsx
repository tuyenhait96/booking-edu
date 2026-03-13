import React from 'react';
import Badge from '@/components/atoms/Badge';

type OrganizationType = 'Higher Ed' | 'K-12' | string;

interface OrganizationTypeBadgeProps {
    type: OrganizationType;
    className?: string;
}

export const OrganizationTypeBadge: React.FC<OrganizationTypeBadgeProps> = ({ type, className }) => {
    let variant: 'info' | 'orange' | 'default' = 'default';

    if (type === 'Higher Ed') variant = 'info';
    if (type === 'K-12') variant = 'orange';

    return (
        <Badge variant={variant} className={className}>
            {type}
        </Badge>
    );
};
