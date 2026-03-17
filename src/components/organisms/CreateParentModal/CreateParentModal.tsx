"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { useForm } from 'react-hook-form';

interface ParentFormValues {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

interface CreateParentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: ParentFormValues) => void;
}

export const CreateParentModal: React.FC<CreateParentModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ParentFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ fullName: '', email: '', phone: '', address: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: ParentFormValues) => {
        onSuccess(data);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Parent Account"
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                    <Input
                        {...register('fullName', { required: "Full Name is required" })}
                        placeholder="e.g. Sarah Connor"
                        className="h-12"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            placeholder="e.g. parent@example.com"
                            className="h-12"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                        <Input
                            {...register('phone', { required: "Phone is required" })}
                            placeholder="e.g. 0987654321"
                            className="h-12"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Address</Label>
                    <Input
                        {...register('address', { required: "Address is required" })}
                        placeholder="e.g. 123 Main St, Singapore"
                        className="h-12"
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
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
                        Create Parent
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
