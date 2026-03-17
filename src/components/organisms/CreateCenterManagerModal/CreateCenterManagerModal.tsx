"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select, Option } from '@/components/atoms/Select';
import { useForm, Controller } from 'react-hook-form';
import { Center } from '@/types';

interface CenterManagerFormValues {
    fullName: string;
    email: string;
    phone: string;
    centerIds: string[];
}

interface CreateCenterManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: CenterManagerFormValues) => void;
    centers: Center[];
    initialCenterId?: string;
}

export const CreateCenterManagerModal: React.FC<CreateCenterManagerModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    centers,
    initialCenterId
}) => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CenterManagerFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ 
                fullName: '', 
                email: '', 
                phone: '', 
                centerIds: initialCenterId ? [initialCenterId] : [] 
            });
        }
    }, [isOpen, reset, initialCenterId]);

    const onSubmit = (data: CenterManagerFormValues) => {
        onSuccess(data);
        onClose();
    };

    const centerOptions: Option[] = centers.map(c => ({
        value: c.id,
        label: c.name
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Center Manager Account"
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                    <Input
                        {...register('fullName', { required: "Full Name is required" })}
                        placeholder="e.g. John Doe"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
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
                        placeholder="e.g. manager@center.com"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                    <Input
                        {...register('phone', { required: "Phone is required" })}
                        placeholder="e.g. 0901234567"
                        className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Assign Centers</Label>
                    <Controller
                        name="centerIds"
                        control={control}
                        rules={{ required: "At least one center is required" }}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={centerOptions}
                                placeholder="Select centers"
                                value={centerOptions.filter(opt => field.value?.includes(opt.value))}
                                onChange={(val) => field.onChange((val as Option[])?.map(opt => opt.value) || [])}
                                error={errors.centerIds?.message}
                            />
                        )}
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
                        Create Account
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
