"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useToast, Toast as ToastType } from '@/hooks/useToast';
import { ToastContainer } from '@/components/molecules/Toast';

interface ToastContextType {
    toast: (options: Omit<ToastType, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const { toast, toasts, removeToast } = useToast();

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};