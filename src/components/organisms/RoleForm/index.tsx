"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import { PermissionMatrix } from '@/components/molecules/PermissionMatrix';
import { useRouter } from 'next/navigation';

interface PermissionEntry {
    module: string;
    permissions: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
}

interface RoleFormValues {
    name: string;
    description: string;
    permissions: PermissionEntry[];
}

interface RoleFormProps {
    initialData?: {
        name: string;
        description: string;
        permissions: PermissionEntry[];
    };
    isEditMode?: boolean;
    roleId?: string;
}

const DEFAULT_MODULES = [
    'Users',
    'Tenants',
    'Roles',
    'Schedule',
    'Settings'
];

const INITIAL_PERMISSIONS: PermissionEntry[] = DEFAULT_MODULES.map(module => ({
    module,
    permissions: {
        view: false,
        create: false,
        edit: false,
        delete: false
    }
}));

export const RoleForm: React.FC<RoleFormProps> = ({
    initialData,
    isEditMode = false,
    roleId
}) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, register, handleSubmit, formState: { errors } } = useForm<RoleFormValues>({
        defaultValues: initialData || {
            name: '',
            description: '',
            permissions: INITIAL_PERMISSIONS
        }
    });

    const onSubmit = async (data: RoleFormValues) => {
        setIsSubmitting(true);
        console.log('Submitting Role Data:', data);

        if (isEditMode && roleId) {
            console.log('Updating role with ID:', roleId);
            // Simulate API call for update
            await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
            console.log('Creating new role');
            // Simulate API call for create
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        setIsSubmitting(false);
        router.push('/roles');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    id="role-name"
                    label="Role Name"
                    required
                    error={errors.name}
                    inputProps={{
                        ...register('name', { required: 'Role name is required' }),
                        placeholder: 'e.g. Senior Manager'
                    }}
                />
                <FormField
                    id="role-description"
                    label="Description"
                    required
                    error={errors.description}
                    inputProps={{
                        ...register('description', { required: 'Description is required' }),
                        placeholder: 'Briefly describe the purpose of this role'
                    }}
                />
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                        Permissions
                    </label>
                    <p className="text-sm text-slate-500">
                        Define what actions this role can perform across different system modules.
                    </p>
                </div>

                <Controller
                    control={control}
                    name="permissions"
                    render={({ field }) => (
                        <PermissionMatrix
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.push('/roles')}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                >
                    {isEditMode ? 'Update Role' : 'Create Role'}
                </Button>
            </div>
        </form>
    );
};
