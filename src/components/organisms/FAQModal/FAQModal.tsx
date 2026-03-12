"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select } from '@/components/atoms/Select';
import { useForm } from 'react-hook-form';

interface FAQFormValues {
    category: string;
    question_en: string;
    question_zh: string;
    answer_en: string;
    answer_zh: string;
}

interface FAQModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: FAQFormValues) => void;
    initialData?: FAQFormValues;
    mode: 'add' | 'edit';
}

const CATEGORIES = [
    { label: 'Tuition', value: 'Tuition' },
    { label: 'App', value: 'App' },
    { label: 'Payment', value: 'Payment' },
    { label: 'Center Policy', value: 'Center Policy' },
];

export const FAQModal: React.FC<FAQModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    mode
}) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm<FAQFormValues>();
    const selectedCategory = watch('category');

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ category: 'Tuition', question_en: '', question_zh: '', answer_en: '', answer_zh: '' });
        }
    }, [initialData, reset, isOpen]);

    const onSubmit = (data: FAQFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'add' ? 'Add New FAQ' : 'Edit FAQ'}
            size="xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Category</Label>
                    <Select
                        defaultValue={CATEGORIES.find(c => c.value === (initialData?.category || 'Tuition'))}
                        options={CATEGORIES}
                        onChange={(val) => val && setValue('category', val.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">English Version</Label>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Question (EN)</Label>
                            <Input
                                {...register('question_en', { required: true })}
                                placeholder="Enter question in English..."
                                className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Answer (EN)</Label>
                            <textarea
                                {...register('answer_en', { required: true })}
                                className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Enter answer in English..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Chinese Version</Label>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Question (ZH)</Label>
                            <Input
                                {...register('question_zh', { required: true })}
                                placeholder="输入中文问题..."
                                className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary font-noto-sans-sc"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Answer (ZH)</Label>
                            <textarea
                                {...register('answer_zh', { required: true })}
                                className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-noto-sans-sc"
                                placeholder="输入中文回答..."
                            />
                        </div>
                    </div>
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
                        {mode === 'add' ? 'Create FAQ' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
