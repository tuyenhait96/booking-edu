"use client";

import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
    description: string;
    itemName?: string;
    warning?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    itemName,
    warning
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            console.error('Failed to delete:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="md"
        >
            <div className="flex flex-col items-center text-center py-2">
                <div className="size-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-4">
                    <Icon name="warning" className="text-3xl text-rose-500" />
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    {description} {itemName && <span className="font-bold text-slate-900 dark:text-white">"{itemName}"</span>}? 
                    This action cannot be undone.
                </p>

                {warning && (
                    <div className="w-full mb-8 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex gap-3 text-left">
                        <Icon name="error" className="text-rose-500 text-xl shrink-0" />
                        <div>
                            <h4 className="text-xs font-black text-rose-900 dark:text-rose-100 uppercase tracking-tight">Relational Warning</h4>
                            <p className="text-[10px] text-rose-700 dark:text-rose-400 mt-0.5 leading-relaxed">
                                {warning}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex gap-3 w-full">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 font-bold h-12"
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirm}
                        className="flex-[1.5] bg-rose-500 hover:bg-rose-600 text-white font-bold h-12 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                        isLoading={isDeleting}
                    >
                        <Icon name="delete" className="text-lg" />
                        <span>Delete {itemName || 'Item'}</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
