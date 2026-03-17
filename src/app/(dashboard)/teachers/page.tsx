"use client";

import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { DataTable, Column } from '@/components/molecules/Table';
import { useQuery } from '@tanstack/react-query';
import teacherService, { Teacher } from '@/services/teacherService';
import { PERMISSIONS } from '@/utils/permissions';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';
import { CreateTeacherModal } from '@/components/organisms/CreateTeacherModal/CreateTeacherModal';
import { AssignTeacherModal } from '@/components/organisms/AssignTeacherModal/AssignTeacherModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import centerService from '@/services/centerService';

export default function TeachersPage() {
    const queryClient = useQueryClient();
    const { toast, toasts, removeToast } = useToast();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [assigningTeacher, setAssigningTeacher] = useState<Teacher | null>(null);
    
    const { data: response, isLoading } = useQuery({
        queryKey: ['teachers'],
        queryFn: teacherService.getTeachers
    });

    const { data: centersResponse } = useQuery({
        queryKey: ['centers'],
        queryFn: centerService.getCenters
    });

    const teachers = response?.data || [];
    const centers = centersResponse?.data || [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const createMutation = useMutation({
        mutationFn: teacherService.createTeacher,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Teacher account created', variant: 'success' });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
        }
    });

    const assignMutation = useMutation({
        mutationFn: ({ id, centerId }: { id: string, centerId: string }) => 
            teacherService.assignToCenter(id, centerId),
        onSuccess: () => {
            toast({ title: 'Success', description: 'Teacher assigned to center', variant: 'success' });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
        }
    });

    const columns: Column<Teacher>[] = [
        {
            header: 'Teacher Name',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                        <Icon name="teacher" className="text-xl" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.fullName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Specialization',
            render: (item) => <span className="text-sm font-medium">{item.specialization}</span>
        },
        {
            header: 'Contact',
            render: (item) => <span className="text-sm">{item.phone}</span>
        },
        {
            header: 'Status',
            render: (item) => (
                <Badge variant={item.isActive ? 'success' : 'default'}>
                    {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
            )
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <button 
                        className="text-slate-400 hover:text-emerald-600 p-1" 
                        title="Assign Center"
                        onClick={() => setAssigningTeacher(item)}
                    >
                        <Icon name="add_business" />
                    </button>
                    <button className="text-slate-400 hover:text-blue-600 p-1" title="Edit">
                        <Icon name="edit" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <PermissionGuard requiredPermission={PERMISSIONS.TEACHER_MANAGE} showMessage={true}>
            <div className="flex-1 flex flex-col gap-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Teacher Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Create and manage teacher accounts and assignments.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            className="flex items-center gap-2"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Icon name="add" className="text-lg" />
                            <span>Create Teacher Account</span>
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                    <DataTable
                        data={teachers}
                        columns={columns}
                        isLoading={isLoading}
                        pagination={{
                            currentPage,
                            totalPages: Math.ceil(teachers.length / itemsPerPage) || 1,
                            onPageChange: setCurrentPage,
                            totalItems: teachers.length,
                            itemsPerPage,
                            unit: 'teachers'
                        }}
                    />
                </div>

                <CreateTeacherModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={(data) => createMutation.mutate(data)}
                />

                {assigningTeacher && (
                    <AssignTeacherModal 
                        isOpen={!!assigningTeacher}
                        onClose={() => setAssigningTeacher(null)}
                        centers={centers}
                        teacherName={assigningTeacher.fullName}
                        onSuccess={(data) => assignMutation.mutate({ id: assigningTeacher.id, centerId: data.centerId })}
                    />
                )}

                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        </PermissionGuard>
    );
}
