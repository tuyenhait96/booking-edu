"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { useForm, Controller } from 'react-hook-form';
import { Classroom } from '@/types';
import { Toggle } from '@/components/atoms/Toggle';
import Textarea from '@/components/atoms/Textarea';

interface ClassroomFormValues {
    name: string;
    code: string;
    capacity: number;
    description: string;
    isActive: boolean;
    centerId: string;
}

interface CreateClassroomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Partial<Classroom>) => void;
    centerId: string;
}

export const CreateClassroomModal: React.FC<CreateClassroomModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    centerId
}) => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ClassroomFormValues>({
        defaultValues: {
            centerId: centerId,
            isActive: true,
            capacity: 12,
        }
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                centerId: centerId,
                name: `Room ${new Date().getTime()}`,
                code: `ROOM_${new Date().getTime()}`,
                capacity: 12,
                description: '',
                isActive: true,
            });
        }
    }, [isOpen, centerId, reset]);

    const onSubmit = (data: ClassroomFormValues) => {
        onSuccess(data);
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Classroom"
            description="Fill in the details below to create a new classroom for this center."
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
                <div className="grid grid-cols-1 gap-6 pb-2">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Classroom Name</Label>
                        <Input
                            {...register('name', { required: "Classroom name is required" })}
                            placeholder="e.g. Room A1"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Room Code</Label>
                        <Input
                            {...register('code', { required: "Room code is required" })}
                            placeholder="e.g. ROOM_A1"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.code && <p className="text-red-500 text-xs">{errors.code.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Capacity</Label>
                        <Input
                            type="number"
                            {...register('capacity', { 
                                required: "Capacity is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Capacity must be at least 1" }
                            })}
                            placeholder="e.g. 12"
                            className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                        {errors.capacity && <p className="text-red-500 text-xs">{errors.capacity.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Description</Label>
                        <Textarea
                            {...register('description')}
                            placeholder="Optional description"
                            className="border-slate-200 dark:border-slate-800 focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 h-12 mt-auto">
                        <div className="flex flex-col gap-0">
                            <Label className="font-bold text-slate-700 dark:text-slate-300 text-sm">Active Status</Label>
                        </div>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <Toggle
                                    enabled={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="pt-2 flex gap-3">
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
                        Create Classroom
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
