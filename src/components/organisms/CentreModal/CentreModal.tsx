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
    phone: string;
    email: string;
    address: string;
}

interface CentreModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: CentreFormValues) => void;
    initialData?: CentreFormValues;
    mode?: 'create' | 'edit';
}

export const CentreModal: React.FC<CentreModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    mode = 'edit'
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CentreFormValues>();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '', code: '', phone: '', email: '', address: '' });
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
            title={mode === 'create' ? "Create New Center" : "Edit Centre Settings"}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Centre Name</Label>
                        <Input
                            {...register('name', { required: "Name is required" })}
                            placeholder="e.g. Jurong East Hub"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Centre Code</Label>
                        <Input
                            {...register('code', { required: "Code is required" })}
                            placeholder="e.g. JEH-01"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.code && <p className="text-red-500 text-xs">{errors.code.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                        <Input
                            {...register('phone', { required: "Phone is required" })}
                            placeholder="e.g. 0281111111"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
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
                            placeholder="e.g. contact@center.com"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Address</Label>
                    <Input
                        {...register('address', { required: "Address is required" })}
                        placeholder="e.g. 123 Street Name, Building"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
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
                        {mode === 'create' ? "Create Center" : "Save Center Settings"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
