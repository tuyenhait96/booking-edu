"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Textarea from '@/components/atoms/Textarea';
import { useForm } from 'react-hook-form';

interface BenefitFormValues {
    title: string;
    description: string;
}

interface CreateBenefitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: BenefitFormValues) => void;
}

export const CreateBenefitModal: React.FC<CreateBenefitModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BenefitFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ title: '', description: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: BenefitFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Benefit"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Title</Label>
                    <Input
                        {...register('title', { required: "Title is required" })}
                        placeholder="e.g. Free Trial Session"
                        className="h-12"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Description</Label>
                    <Textarea
                        {...register('description', { required: "Description is required" })}
                        placeholder="Details about the benefit..."
                        className="min-h-[100px]"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
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
                        className="flex-[2] bg-primary text-white font-bold h-12 shadow-lg"
                    >
                        Save Benefit
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
