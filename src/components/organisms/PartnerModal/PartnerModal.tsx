"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { useForm } from 'react-hook-form';

interface PartnerFormValues {
    title: string;
    description: string;
    tags: string;
}

interface PartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: PartnerFormValues) => void;
    initialData?: PartnerFormValues;
    mode: 'add' | 'edit';
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    mode
}) => {
    const { register, handleSubmit, reset, setValue } = useForm<PartnerFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ title: '', description: '', tags: '' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: PartnerFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'add' ? 'Add New Partner' : 'Edit Partner'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Partner Title</Label>
                    <Input
                        {...register('title', { required: true })}
                        placeholder="e.g. Science Centre Singapore"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Description</Label>
                    <textarea
                        {...register('description', { required: true })}
                        className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="Briefly describe the partner and benefits..."
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</Label>
                    <Input
                        {...register('tags')}
                        placeholder="e.g. Exhibition, Workshops, 15% Off"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
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
                        {mode === 'add' ? 'Create Partner' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
