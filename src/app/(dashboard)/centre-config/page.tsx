"use client";

import React from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { CentreModal } from '@/components/organisms/CentreModal/CentreModal';
import { StaffAssignmentModal } from '@/components/organisms/StaffAssignmentModal/StaffAssignmentModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

const MOCK_CENTRES = [
    {
        id: '1',
        name: 'Jurong East Hub',
        code: 'JEH-01',
        staff: [
            { role: 'Subject Head (Math)', name: 'Dr. Sarah Chen', email: 'sarah.c@edu.sg', avatar: null },
            { role: 'Subject Head (Science)', name: 'Marcus Wong', email: 'marcus.w@edu.sg', avatar: null },
            { role: 'Center Manager', name: 'Linda Quek', email: 'linda.q@edu.sg', avatar: null },
        ]
    },
    {
        id: '2',
        name: 'Tampines Mall Center',
        code: 'TMC-02',
        staff: [
            { role: 'Subject Head (Math)', name: 'James Lim', email: 'james.l@edu.sg', avatar: null },
            { role: 'Subject Head (English)', name: 'Emily Rose', email: 'emily.r@edu.sg', avatar: null },
            { role: 'Center Manager', name: 'Kevin Tan', email: 'kevin.t@edu.sg', avatar: null },
        ]
    },
];

export default function CentreConfigPage() {
    const [isCentreModalOpen, setIsCentreModalOpen] = React.useState(false);
    const [isStaffModalOpen, setIsStaffModalOpen] = React.useState(false);
    const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] = React.useState(false);
    
    const [selectedCentre, setSelectedCentre] = React.useState<any>(null);
    const [selectedStaff, setSelectedStaff] = React.useState<any>(null);

    const handleCentreSuccess = (data: any) => {
        console.log('Centre updated:', data);
    };

    const handleStaffSuccess = (data: any) => {
        console.log('Staff assignment updated:', data);
    };

    const handleUnassignStaff = async () => {
        console.log('Unassigning staff:', selectedStaff?.name);
        await new Promise(resolve => setTimeout(resolve, 800));
    };

    const openEditCentre = (center: any) => {
        setSelectedCentre(center);
        setIsCentreModalOpen(true);
    };

    const openAssignStaff = (center: any, member?: any) => {
        setSelectedCentre(center);
        setSelectedStaff(member ? { staffName: member.name, role: member.role } : null);
        setIsStaffModalOpen(true);
    };

    const openUnassignStaff = (member: any) => {
        setSelectedStaff(member);
        setIsDeleteStaffModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-8 mx-auto w-full">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Centre Configuration</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Assign staff members and manage location-specific settings.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {MOCK_CENTRES.map((center) => (
                        <section key={center.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400">
                                        <Icon name="storefront" className="text-2xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{center.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="default" className="text-xs font-black uppercase tracking-widest">{center.code}</Badge>
                                            <span className="text-xs text-slate-500">Active Location</span>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => openEditCentre(center)}
                                    className="text-primary text-sm font-bold bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl transition-all"
                                >
                                    Edit Center Settings
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {center.staff.map((member, i) => (
                                    <div key={i} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 group hover:border-primary/50 transition-all">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{member.role}</p>
                                        <div className="flex items-center gap-4">
                                            <Avatar
                                                name={member.name}
                                                size="lg"
                                                className="border-2 border-white dark:border-slate-700 shadow-sm"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{member.email}</p>
                                            </div>
                                            <button 
                                                onClick={() => openAssignStaff(center, member)}
                                                className="p-2 text-slate-400 hover:text-primary transition-all"
                                            >
                                                <Icon name="swap_horiz" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button 
                                    onClick={() => openAssignStaff(center)}
                                    className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary group"
                                >
                                    <Icon name="add_circle" className="text-2xl" />
                                    <span className="text-sm font-bold">Assign Subject Head</span>
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <CentreModal
                isOpen={isCentreModalOpen}
                onClose={() => setIsCentreModalOpen(false)}
                onSuccess={handleCentreSuccess}
                initialData={selectedCentre}
            />

            <StaffAssignmentModal
                isOpen={isStaffModalOpen}
                onClose={() => setIsStaffModalOpen(false)}
                onSuccess={handleStaffSuccess}
                initialData={selectedStaff}
            />

            <DeleteConfirmModal
                isOpen={isDeleteStaffModalOpen}
                onClose={() => setIsDeleteStaffModalOpen(false)}
                onConfirm={handleUnassignStaff}
                title="Unassign Staff"
                description="Are you sure you want to remove the assignment for"
                itemName={selectedStaff?.name}
            />
        </div>
    );
}
