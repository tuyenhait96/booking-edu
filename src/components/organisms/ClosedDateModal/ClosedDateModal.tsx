"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { useForm } from 'react-hook-form';

interface ClosedDateFormValues {
    date: string;
    label: string;
}

interface ClosedDateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: ClosedDateFormValues) => void;
    initialData?: ClosedDateFormValues;
}

export const ClosedDateModal: React.FC<ClosedDateModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData
}) => {
    const { register, handleSubmit, reset } = useForm<ClosedDateFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ date: '', label: '' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: ClosedDateFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Edit Closed Date" : "Add Closed Date"}
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Date</Label>
                    <Input
                        type="date"
                        {...register('date', { required: true })}
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Description / Label</Label>
                    <Input
                        {...register('label', { required: true })}
                        placeholder="e.g. Public Holiday, Centre Renovation"
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
                        {initialData ? 'Save Changes' : 'Add Date'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
