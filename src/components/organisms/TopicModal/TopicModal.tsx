"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select } from '@/components/atoms/Select';
import { useForm } from 'react-hook-form';

interface TopicFormValues {
    title: string;
    subject: string;
    level: string;
    status: string;
}

interface TopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: TopicFormValues) => void;
    initialData?: TopicFormValues;
    mode: 'add' | 'edit';
}

const SUBJECTS = [
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Science', value: 'Science' },
    { label: 'English', value: 'English' },
];

const LEVELS = [
    { label: 'Primary 5', value: 'Primary 5' },
    { label: 'Primary 6', value: 'Primary 6' },
    { label: 'Secondary 1', value: 'Secondary 1' },
    { label: 'Secondary 2', value: 'Secondary 2' },
    { label: 'Secondary 4', value: 'Secondary 4' },
];

const STATUS_OPTIONS = [
    { label: 'Published', value: 'Published' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Archived', value: 'Archived' },
];

export const TopicModal: React.FC<TopicModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    mode
}) => {
    const { register, handleSubmit, reset, setValue } = useForm<TopicFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ title: '', subject: 'Science', level: 'Primary 5', status: 'Published' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: TopicFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'add' ? 'Add New Topic' : 'Edit Topic'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Topic Title</Label>
                    <Input
                        {...register('title', { required: true })}
                        placeholder="e.g. Revision on Water, Algebraic Expressions"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Subject</Label>
                        <Select
                            defaultValue={SUBJECTS.find(s => s.value === (initialData?.subject || 'Science'))}
                            options={SUBJECTS}
                            onChange={(val) => val && setValue('subject', val.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Level</Label>
                        <Select
                            defaultValue={LEVELS.find(l => l.value === (initialData?.level || 'Primary 5'))}
                            options={LEVELS}
                            onChange={(val) => val && setValue('level', val.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Status</Label>
                    <Select
                        defaultValue={STATUS_OPTIONS.find(s => s.value === (initialData?.status || 'Published'))}
                        options={STATUS_OPTIONS}
                        onChange={(val) => val && setValue('status', val.value)}
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
                        {mode === 'add' ? 'Create Topic' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
