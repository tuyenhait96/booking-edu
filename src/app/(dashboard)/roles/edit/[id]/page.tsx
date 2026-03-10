"use client";

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/atoms/Icon';
import { RoleForm } from '@/components/organisms/RoleForm';
import { useParams } from 'next/navigation';

// Helper function to map simple string permissions to PermissionEntry format
function mapPermissions(permissionStrings: string[]) {
    // Default modules from RoleForm
    const DEFAULT_MODULES = [
        'Users',
        'Tenants',
        'Roles',
        'Schedule',
        'Settings'
    ];

    // Create initial permissions with all false
    const initialPermissions = DEFAULT_MODULES.map(module => ({
        module,
        permissions: {
            view: false,
            create: false,
            edit: false,
            delete: false
        }
    }));

    // Check if this is Super Admin (has "+12 more" in permissions)
    const isSuperAdmin = permissionStrings.some(perm => perm.includes('+') && perm.includes('more'));

    if (isSuperAdmin) {
        // Super Admin gets all permissions for all modules
        return initialPermissions.map(entry => ({
            ...entry,
            permissions: {
                view: true,
                create: true,
                edit: true,
                delete: true
            }
        }));
    }

    // Map the permission strings to the PermissionEntry format
    // This is a simple mapping - in a real app, you would have a more sophisticated mapping
    return initialPermissions.map(entry => {
        // Check if this module should have permissions based on the permission strings
        const hasPermission = permissionStrings.some(perm => {
            // Check for module matches
            const permLower = perm.toLowerCase();
            const moduleLower = entry.module.toLowerCase();

            // Direct match or contains match
            return permLower.includes(moduleLower) || moduleLower.includes(permLower) ||
                // Special mappings
                (permLower.includes('user') && moduleLower === 'users') ||
                (permLower.includes('setting') && moduleLower === 'settings') ||
                (permLower.includes('student') && moduleLower === 'users')
        });

        if (hasPermission) {
            // For simplicity, grant all permissions if the module is mentioned
            return {
                ...entry,
                permissions: {
                    view: true,
                    create: true,
                    edit: true,
                    delete: true
                }
            };
        }

        return entry;
    });
}

// Mock data - in a real app, this would come from an API
const ROLES_DATA = [
    {
        id: '1',
        name: 'Super Admin',
        description: 'Master access to all system modules, configurations, and logs.',
        activeUsers: 2,
        permissions: ['Users', 'Full User MGMT', '+12 more'],
        icon: 'security',
        color: 'red',
    },
    {
        id: '2',
        name: 'School Admin',
        description: 'Manage individual school operations, staff, and student enrollments.',
        activeUsers: 12,
        permissions: ['Users', 'Tenants'],
        icon: 'corporate_fare',
        color: 'blue',
    },
    {
        id: '3',
        name: 'Teacher',
        description: 'Access to classrooms, grading, attendance, and student progress reports.',
        activeUsers: 150,
        permissions: ['Schedule', 'Settings'],
        icon: 'person_pin',
        color: 'emerald',
    },
    {
        id: '4',
        name: 'Parent',
        description: "View child's academic performance, schedule, and school announcements.",
        activeUsers: 800,
        permissions: ['Users', 'Roles', 'Settings'],
        icon: 'family_restroom',
        color: 'amber',
    },
];

export default function EditRolePage() {
    const params = useParams();
    const roleId = params.id as string;

    // Find the role to edit
    const role = ROLES_DATA.find(r => r.id === roleId);

    if (!role) {
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1 group">
                            <Link href="/roles" className="flex items-center gap-1 hover:underline">
                                <Icon name="arrow_back" className="text-lg group-hover:-translate-x-1 transition-transform" />
                                Back to Roles
                            </Link>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Role Not Found</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                            The role you are trying to edit does not exist.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1 group">
                        <Link href="/roles" className="flex items-center gap-1 hover:underline">
                            <Icon name="arrow_back" className="text-lg group-hover:-translate-x-1 transition-transform" />
                            Back to Roles
                        </Link>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Edit Role: {role.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                        Update the security role details, description, and module permissions.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                <RoleForm
                    initialData={{
                        name: role.name,
                        description: role.description,
                        permissions: mapPermissions(role.permissions)
                    }}
                    isEditMode={true}
                    roleId={roleId}
                />
            </div>
        </div>
    );
}