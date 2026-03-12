"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select } from '@/components/atoms/Select';
import { useForm } from 'react-hook-form';

interface StaffAssignmentFormValues {
    staffName: string;
    role: string;
}

interface StaffAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: StaffAssignmentFormValues) => void;
    initialData?: StaffAssignmentFormValues;
}

const STAFF_ROLES = [
    { label: 'Subject Head (Math)', value: 'Subject Head (Math)' },
    { label: 'Subject Head (Science)', value: 'Subject Head (Science)' },
    { label: 'Subject Head (English)', value: 'Subject Head (English)' },
    { label: 'Center Manager', value: 'Center Manager' },
];

export const StaffAssignmentModal: React.FC<StaffAssignmentModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData
}) => {
    const { register, handleSubmit, reset, setValue } = useForm<StaffAssignmentFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ staffName: '', role: 'Subject Head (Math)' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: StaffAssignmentFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Reassign Staff" : "Assign New Staff"}
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Staff Member Name</Label>
                    <Input
                        {...register('staffName', { required: true })}
                        placeholder="Search or enter name..."
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Role</Label>
                    <Select
                        defaultValue={STAFF_ROLES.find(r => r.value === (initialData?.role || 'Subject Head (Math)'))}
                        options={STAFF_ROLES}
                        onChange={(val) => val && setValue('role', val.value)}
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 font-bold h-12"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-[2] bg-primary text-white font-bold h-12 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        {initialData ? 'Update Assignment' : 'Assign Staff Member'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
