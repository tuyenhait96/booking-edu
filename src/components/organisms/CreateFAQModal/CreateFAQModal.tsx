"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Textarea from '@/components/atoms/Textarea';
import { useForm } from 'react-hook-form';

interface FAQFormValues {
    question: string;
    answer: string;
}

interface CreateFAQModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: FAQFormValues) => void;
}

export const CreateFAQModal: React.FC<CreateFAQModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FAQFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ question: '', answer: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: FAQFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New FAQ"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Question</Label>
                    <Input
                        {...register('question', { required: "Question is required" })}
                        placeholder="e.g. What is the fee structure?"
                        className="h-12"
                    />
                    {errors.question && <p className="text-red-500 text-xs">{errors.question.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Answer</Label>
                    <Textarea
                        {...register('answer', { required: "Answer is required" })}
                        placeholder="Answer details..."
                        className="min-h-[120px]"
                    />
                    {errors.answer && <p className="text-red-500 text-xs">{errors.answer.message}</p>}
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
                        Save FAQ
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
