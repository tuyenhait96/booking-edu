"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select } from '@/components/atoms/Select';
import { useForm } from 'react-hook-form';

interface ResourceFormValues {
    name: string;
    type: string;
    capacity: number;
    equipment: string;
    status: string;
}

interface ResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: ResourceFormValues) => void;
    initialData?: ResourceFormValues;
    mode: 'add' | 'edit';
}

const ROOM_TYPES = [
    { label: 'Science Lab', value: 'Science Lab' },
    { label: 'Lecture Hall', value: 'Lecture Hall' },
    { label: 'Computer Lab', value: 'Computer Lab' },
    { label: 'Art Studio', value: 'Art Studio' },
    { label: 'Classroom', value: 'Classroom' },
];

const STATUS_OPTIONS = [
    { label: 'Available', value: 'Available' },
    { label: 'Occupied', value: 'Occupied' },
    { label: 'Maintenance', value: 'Maintenance' },
];

export const ResourceModal: React.FC<ResourceModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    mode
}) => {
    const { register, handleSubmit, reset, setValue } = useForm<ResourceFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '', type: 'Science Lab', capacity: 30, equipment: '', status: 'Available' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: ResourceFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'add' ? 'Add New Classroom' : 'Edit Classroom'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Room Name</Label>
                        <Input
                            {...register('name', { required: true })}
                            placeholder="e.g. Curie, Newton"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Room Type</Label>
                        <Select
                            defaultValue={ROOM_TYPES.find(t => t.value === (initialData?.type || 'Science Lab'))}
                            options={ROOM_TYPES}
                            onChange={(val) => val && setValue('type', val.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Capacity</Label>
                        <Input
                            type="number"
                            {...register('capacity', { required: true, min: 1 })}
                            placeholder="e.g. 30"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Status</Label>
                        <Select
                            defaultValue={STATUS_OPTIONS.find(s => s.value === (initialData?.status || 'Available'))}
                            options={STATUS_OPTIONS}
                            onChange={(val) => val && setValue('status', val.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Equipment (comma separated)</Label>
                    <textarea
                        {...register('equipment')}
                        className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="e.g. Projector, Whiteboard, 30x Workstations..."
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
                        {mode === 'add' ? 'Create Classroom' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
