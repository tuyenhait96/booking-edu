"use client";

import React from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

interface DeleteOrganizationConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    organizationName: string;
    isDeleting?: boolean;
}

export const DeleteOrganizationConfirmationModal: React.FC<DeleteOrganizationConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    organizationName,
    isDeleting = false,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Organization"
            description="This action cannot be undone."
            size="md"
        >
            <div className="space-y-6">
                {/* Warning Icon and Message */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                        <Icon name="warning" className="text-3xl text-red-600" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Delete &quot;{organizationName}&quot;?
                        </h3>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this organization? All associated data will be permanently removed.
                        </p>
                    </div>
                </div>

                {/* Warning Details */}
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                        <Icon name="warning" className="text-red-500 mt-0.5" />
                        <div className="text-sm text-red-700">
                            <p className="font-medium">This action cannot be undone.</p>
                            <p className="mt-1">Deleting this organization will remove:</p>
                            <ul className="mt-1 list-disc list-inside space-y-1">
                                <li>All organization configuration and settings</li>
                                <li>Associated user accounts and permissions</li>
                                <li>Historical data and analytics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="min-w-[100px]"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        isLoading={isDeleting}
                        disabled={isDeleting}
                        className="min-w-[100px]"
                    >
                        {isDeleting ? "Deleting..." : "Delete Organization"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};