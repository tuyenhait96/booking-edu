import React from 'react';
import { Center } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import Badge from '@/components/atoms/Badge';

interface CenterOverviewProps {
    center?: Center;
}

export const CenterOverview: React.FC<CenterOverviewProps> = ({ center }) => {
    if (!center) return null;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Icon name="storefront" className="text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-2">{center.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{center.code}</span>
                            <Badge variant={center.isActive ? 'success' : 'default'} className="text-[10px] py-0.5 px-2">
                                {center.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
            {
                center.address && center.phone && center.email && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                        {center.address && (
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Icon name="location_on" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Location</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{center.address || '-'}</p>
                                </div>
                            </div>
                        )}
                        {center.phone && (
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <Icon name="call" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Contact</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{center.phone || '-'}</p>
                                </div>
                            </div>
                        )}
                        {center.email && (
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <Icon name="mail" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{center.email || '-'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                )
            }
        </div>
    );
};
