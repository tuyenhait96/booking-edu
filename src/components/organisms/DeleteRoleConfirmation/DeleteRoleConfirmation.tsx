"use client";

import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

interface RoleData {
    id: string;
    name: string;
    description: string;
    activeUsers: number;
    permissions: string[];
    icon: string;
    color: 'red' | 'blue' | 'emerald' | 'amber';
}

interface DeleteRoleConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    role: RoleData | null;
    onDelete: (roleId: string) => void;
}

export const DeleteRoleConfirmation: React.FC<DeleteRoleConfirmationProps> = ({
    isOpen,
    onClose,
    role,
    onDelete
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!role) return;

        setIsDeleting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onDelete(role.id);
        setIsDeleting(false);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Delete Role"
            size="md"
        >
            <div className="space-y-6">
                {role ? (
                    <>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                                <Icon name="warning" className="text-2xl text-red-600 dark:text-red-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Delete &quot;{role.name}&quot;?
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                This action cannot be undone. The role will be permanently removed from the system.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                        <Icon name={role.icon as string} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-slate-900 dark:text-white">{role.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {role.activeUsers} active users
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={handleClose}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="button"
                                onClick={handleDelete}
                                isLoading={isDeleting}
                            >
                                Delete Role
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-500 dark:text-slate-400">No role selected</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};