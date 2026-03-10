"use client";

import React from 'react';
import { IntegrationCard } from '@/components/molecules/IntegrationCard';

const INTEGRATIONS = [
    {
        iconName: 'hub',
        title: 'REST API',
        subtitle: 'Active - 12 endpoints used',
    },
    {
        iconName: 'mail',
        title: 'SendGrid SMTP',
        subtitle: 'Connected',
    },
];

export const IntegrationsList: React.FC = () => {
    return (
        <section>
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">External Integrations</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Connect with external services and manage API keys.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTEGRATIONS.map((integration, idx) => (
                    <IntegrationCard
                        key={idx}
                        iconName={integration.iconName}
                        title={integration.title}
                        subtitle={integration.subtitle}
                        onManage={() => console.log(`Manage ${integration.title}`)}
                    />
                ))}
            </div>
        </section>
    );
};
