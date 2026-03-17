"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select, Option } from '@/components/atoms/Select';
import { useForm, Controller } from 'react-hook-form';

interface ScheduleFormValues {
    classId: string;
    teacherId: string;
    startTime: string;
    endTime: string;
    days: string[];
}

interface CreateScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: ScheduleFormValues) => void;
}

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ScheduleFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ classId: '', teacherId: '', startTime: '', endTime: '', days: [] });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: ScheduleFormValues) => {
        onSuccess(data);
        onClose();
    };

    const daysOptions: Option[] = [
        { value: 'Mon', label: 'Monday' },
        { value: 'Tue', label: 'Tuesday' },
        { value: 'Wed', label: 'Wednesday' },
        { value: 'Thu', label: 'Thursday' },
        { value: 'Fri', label: 'Friday' },
        { value: 'Sat', label: 'Saturday' },
        { value: 'Sun', label: 'Sunday' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Class Schedule"
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Select Class</Label>
                        <Controller
                            name="classId"
                            control={control}
                            rules={{ required: "Class is required" }}
                            render={({ field }) => (
                                <Select
                                    options={[]} // Should be populated from classService
                                    placeholder="Select class"
                                    onChange={(val) => field.onChange((val as Option)?.value)}
                                    error={errors.classId?.message}
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Select Teacher</Label>
                        <Controller
                            name="teacherId"
                            control={control}
                            rules={{ required: "Teacher is required" }}
                            render={({ field }) => (
                                <Select
                                    options={[]} // Should be populated from teacherService
                                    placeholder="Select teacher"
                                    onChange={(val) => field.onChange((val as Option)?.value)}
                                    error={errors.teacherId?.message}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">Start Time</Label>
                        <Controller
                            name="startTime"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="time" className="h-12" />
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 dark:text-slate-300">End Time</Label>
                        <Controller
                            name="endTime"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="time" className="h-12" />
                            )}
                        />
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
                        className="flex-[2] bg-primary text-white font-bold h-12 shadow-lg"
                    >
                        Create Schedule
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
