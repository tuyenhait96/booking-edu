"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

interface UserData {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: 'Teacher' | 'Parent' | 'Student';
    organization: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string;
}

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    user: UserData | null;
}

export default function DeleteUserModal({ isOpen, onClose, onConfirm, user }: DeleteUserModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!user) return;

        setIsDeleting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would typically make an API call to delete the user
        console.log("Deleting user:", user);

        // Call the onConfirm callback
        onConfirm();
        setIsDeleting(false);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            className="p-0 overflow-hidden"
        >
            <div className="p-8 text-center">
                {/* Warning Icon */}
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50 mb-6">
                    <Icon name="warning" className="text-3xl text-red-500" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Delete User
                </h2>

                {/* Description */}
                <p className="text-slate-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{user?.name}</span>?
                    This action cannot be undone.
                </p>

                {/* User Details */}
                {user && (
                    <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left">
                        <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={user.avatarUrl}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                            <div>
                                <p className="font-medium text-slate-900">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-slate-500">Role:</span>
                                <span className="ml-2 font-medium">{user.role}</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Status:</span>
                                <span className="ml-2 font-medium capitalize">{user.status}</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Organization:</span>
                                <span className="ml-2 font-medium">{user.organization}</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Last Login:</span>
                                <span className="ml-2 font-medium">{user.lastLogin}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="px-8"
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="px-8"
                        isLoading={isDeleting}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : (
                            <>
                                <Icon name="delete" className="mr-2" />
                                Delete User
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}