"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Textarea from '@/components/atoms/Textarea';
import { useForm } from 'react-hook-form';

interface TeacherFormValues {
    fullName: string;
    email: string;
    phone: string;
    specialization: string;
    bio: string;
}

interface CreateTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: TeacherFormValues) => void;
}

export const CreateTeacherModal: React.FC<CreateTeacherModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TeacherFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ fullName: '', email: '', phone: '', specialization: '', bio: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: TeacherFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Teacher Account"
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                        <Input
                            {...register('fullName', { required: "Full Name is required" })}
                            placeholder="e.g. John Doe"
                            className="h-12"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Email Address</Label>
                        <Input
                            {...register('email', { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            placeholder="e.g. teacher@edu.com"
                            className="h-12"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                        <Input
                            {...register('phone', { required: "Phone is required" })}
                            placeholder="e.g. 0123456789"
                            className="h-12"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Specialization</Label>
                        <Input
                            {...register('specialization', { required: "Specialization is required" })}
                            placeholder="e.g. Mathematics"
                            className="h-12"
                        />
                        {errors.specialization && <p className="text-red-500 text-xs">{errors.specialization.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Biography</Label>
                    <Textarea
                        {...register('bio')}
                        placeholder="Brief teacher bio..."
                        className="min-h-[100px]"
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
                        className="flex-[2] bg-primary text-white font-bold h-12 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Create Teacher
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
