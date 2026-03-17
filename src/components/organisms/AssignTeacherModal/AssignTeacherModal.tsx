"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Label from '@/components/atoms/Label';
import { Select, Option } from '@/components/atoms/Select';
import { useForm, Controller } from 'react-hook-form';
import { Center } from '@/types';

interface AssignTeacherFormValues {
    centerId: string;
}

interface AssignTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: AssignTeacherFormValues) => void;
    centers: Center[];
    teacherName: string;
}

export const AssignTeacherModal: React.FC<AssignTeacherModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    centers,
    teacherName
}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<AssignTeacherFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset({ centerId: '' });
        }
    }, [isOpen, reset]);

    const onSubmit = (data: AssignTeacherFormValues) => {
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
            title={`Assign Center to ${teacherName}`}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-700 dark:text-slate-300">Select Center</Label>
                    <Controller
                        name="centerId"
                        control={control}
                        rules={{ required: "Center is required" }}
                        render={({ field }) => (
                            <Select
                                options={centerOptions}
                                placeholder="Choose a center"
                                value={centerOptions.find(opt => opt.value === field.value)}
                                onChange={(val) => field.onChange((val as Option)?.value)}
                                error={errors.centerId?.message}
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
                        className="flex-[2] bg-primary text-white font-bold h-12 shadow-lg"
                    >
                        Assign Center
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
