"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { useForm } from 'react-hook-form';

interface CentreFormValues {
    name: string;
    code: string;
}

interface CentreModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: CentreFormValues) => void;
    initialData?: CentreFormValues;
}

export const CentreModal: React.FC<CentreModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData
}) => {
    const { register, handleSubmit, reset } = useForm<CentreFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '', code: '' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: CentreFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Centre Settings"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Centre Name</Label>
                    <Input
                        {...register('name', { required: true })}
                        placeholder="e.g. Jurong East Hub"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Centre Code</Label>
                    <Input
                        {...register('code', { required: true })}
                        placeholder="e.g. JEH-01"
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
                        Save Center Settings
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
