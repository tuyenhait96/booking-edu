"use client";

import React, { useEffect } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import { Select } from '@/components/atoms/Select';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi2';
import { Class, ClassType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import resourceService from '@/services/resourceService';
import { Toggle } from '@/components/atoms/Toggle';

interface ClassFormValues {
    name: string;
    centerId: string;
    subjectId: string;
    levelId: string;
    classroomId: string;
    topicId: string;
    packageId: string | null;
    academicTermId: string | null;
    classType: ClassType;
    classSize: number;
    splitThreshold: number;
    isActive: boolean;
    attributes: { key: string; value: string }[];
}

interface CreateClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Partial<Class>) => void;
    centerId: string;
}

const CLASS_TYPE_OPTIONS = Object.values(ClassType).map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
}));

export const CreateClassModal: React.FC<CreateClassModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    centerId
}) => {
    // ... (lookup queries)
    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res = await resourceService.getSubjects();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { data: levels = [] } = useQuery({
        queryKey: ['academic-levels'],
        queryFn: async () => {
            const res = await resourceService.getAcademicLevels();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { data: classrooms = [] } = useQuery({
        queryKey: ['classrooms'],
        queryFn: async () => {
            const res = await resourceService.getClassrooms();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { data: topics = [] } = useQuery({
        queryKey: ['topics'],
        queryFn: async () => {
            const res = await resourceService.getTopics();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await resourceService.getPackages();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { data: academicTerms = [] } = useQuery({
        queryKey: ['academic-terms'],
        queryFn: async () => {
            const res = await resourceService.getAcademicTerms();
            return res.data || [];
        },
        enabled: isOpen
    });

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ClassFormValues>({
        defaultValues: {
            centerId: centerId,
            classType: ClassType.REGULAR,
            classSize: 8,
            splitThreshold: 12,
            isActive: true,
            packageId: null,
            academicTermId: null,
            attributes: [{ key: 'source', value: 'postman' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes"
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                centerId: centerId,
                name: `Class ${new Date().getTime()}`,
                classType: ClassType.REGULAR,
                classSize: 8,
                splitThreshold: 12,
                isActive: true,
                packageId: null,
                academicTermId: null,
                attributes: [{ key: 'source', value: 'postman' }]
            });
        }
    }, [isOpen, centerId, reset]);

    const onSubmit = (data: ClassFormValues) => {
        // Convert attributes array to object
        const attributesObj = data.attributes.reduce((acc, curr) => {
            if (curr.key.trim()) {
                acc[curr.key] = curr.value;
            }
            return acc;
        }, {} as Record<string, string>);
 
        const payload = {
            ...data,
            attributes: attributesObj
        };

        console.log("Final Payload:", payload);

        onSuccess(payload);
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Class"
            description="Fill in the details below to create a new class for this center."
            size="xl"
            className="overflow-visible"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
                <div className="max-h-[60vh] overflow-y-auto px-1 -mx-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Class Name</Label>
                            <Input
                                {...register('name', { required: "Class name is required" })}
                                placeholder="e.g. Math Primary 1 - Mon/Wed/Fri"
                                className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Subject</Label>
                            <Controller
                                name="subjectId"
                                control={control}
                                rules={{ required: "Subject is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={subjects.map(s => ({ value: s.id, label: s.name }))}
                                        value={subjects.map(s => ({ value: s.id, label: s.name })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select subject"
                                        className="h-12"
                                    />
                                )}
                            />
                            {errors.subjectId && <p className="text-red-500 text-xs">{errors.subjectId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Level</Label>
                            <Controller
                                name="levelId"
                                control={control}
                                rules={{ required: "Level is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={levels.map(l => ({ value: l.id, label: l.name }))}
                                        value={levels.map(l => ({ value: l.id, label: l.name })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select level"
                                        className="h-12"
                                    />
                                )}
                            />
                            {errors.levelId && <p className="text-red-500 text-xs">{errors.levelId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Classroom</Label>
                            <Controller
                                name="classroomId"
                                control={control}
                                rules={{ required: "Classroom is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={classrooms.map(c => ({ value: c.id, label: c.name }))}
                                        value={classrooms.map(c => ({ value: c.id, label: c.name })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select classroom"
                                        className="h-12"
                                    />
                                )}
                            />
                            {errors.classroomId && <p className="text-red-500 text-xs">{errors.classroomId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Topic</Label>
                            <Controller
                                name="topicId"
                                control={control}
                                rules={{ required: "Topic is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={topics.map(t => ({ value: t.id, label: t.title }))}
                                        value={topics.map(t => ({ value: t.id, label: t.title })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select topic"
                                        className="h-12"
                                    />
                                )}
                            />
                            {errors.topicId && <p className="text-red-500 text-xs">{errors.topicId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Academic Term</Label>
                            <Controller
                                name="academicTermId"
                                control={control}
                                rules={{ required: "Academic term is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={academicTerms.map(t => ({ value: t.id, label: t.name }))}
                                        value={academicTerms.map(t => ({ value: t.id, label: t.name })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select academic term"
                                        className="h-12"
                                    />
                                )}
                            />
                            {errors.academicTermId && <p className="text-red-500 text-xs">{errors.academicTermId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Package</Label>
                            <Controller
                                name="packageId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={packages.map(p => ({ value: p.id, label: p.name }))}
                                        value={packages.map(p => ({ value: p.id, label: p.name })).find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        placeholder="Select package (optional)"
                                        className="h-12"
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Class Type</Label>
                            <Controller
                                name="classType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={CLASS_TYPE_OPTIONS}
                                        value={CLASS_TYPE_OPTIONS.find(opt => opt.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        className="h-12"
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Class Size</Label>
                            <Input
                                type="number"
                                {...register('classSize', { valueAsNumber: true })}
                                className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 dark:text-slate-300">Split Threshold</Label>
                            <Input
                                type="number"
                                {...register('splitThreshold', { valueAsNumber: true })}
                                className="h-12 border-slate-200 dark:border-slate-800 focus:ring-primary"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 h-12 self-end mt-auto">
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

                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="font-bold text-slate-700 dark:text-slate-300">Additional Attributes</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ key: '', value: '' })}
                                    className="h-8 border-dashed border-2 flex gap-2"
                                >
                                    <HiPlus className="w-4 h-4" />
                                    <span>Add Attribute</span>
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="flex-1 space-y-1">
                                            <Input
                                                {...register(`attributes.${index}.key` as const, { required: "Key is required" })}
                                                placeholder="Key"
                                                className="h-10 text-sm"
                                            />
                                            {errors.attributes?.[index]?.key && (
                                                <p className="text-red-500 text-[10px]">{errors.attributes[index]?.key?.message}</p>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                {...register(`attributes.${index}.value` as const)}
                                                placeholder="Value"
                                                className="h-10 text-sm"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => remove(index)}
                                            className="mt-1.5 h-7 w-7 p-0 text-slate-400 hover:text-red-500 rounded-full"
                                        >
                                            <HiOutlineTrash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                {fields.length === 0 && (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 text-sm">
                                        No additional attributes added.
                                    </div>
                                )}
                            </div>
                        </div>
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
                        Create Class
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
