"use client";

import React from 'react';
import { cn } from '@/utils/cn';
import Pagination from '@/components/molecules/Pagination';

// Low-level building blocks
interface TableBaseProps {
    children: React.ReactNode;
    className?: string;
}

export const TableContainer: React.FC<TableBaseProps> = ({ children, className }) => {
    return (
        <div className={cn("overflow-x-auto", className)}>
            <table className="w-full text-left border-collapse">
                {children}
            </table>
        </div>
    );
};

export const THead: React.FC<TableBaseProps> = ({ children, className }) => {
    return (
        <thead>
            <tr className={cn(
                "bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800",
                className
            )}>
                {children}
            </tr>
        </thead>
    );
};

export const TBody: React.FC<TableBaseProps> = ({ children, className }) => {
    return (
        <tbody className={cn("divide-y divide-slate-100 dark:divide-slate-800", className)}>
            {children}
        </tbody>
    );
};

interface TRProps extends TableBaseProps {
    onClick?: () => void;
}

export const TR: React.FC<TRProps> = ({ children, className, onClick }) => {
    return (
        <tr
            onClick={onClick}
            className={cn(
                "hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors",
                onClick && "cursor-pointer",
                className
            )}
        >
            {children}
        </tr>
    );
};

interface THProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    children: React.ReactNode;
}

export const TH: React.FC<THProps> = ({ children, className, ...props }) => {
    return (
        <th className={cn("px-6 py-4", className)} {...props}>
            {children}
        </th>
    );
};

interface TDProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}

export const TD: React.FC<TDProps> = ({ children, className, ...props }) => {
    return (
        <td className={cn("px-6 py-4", className)} {...props}>
            {children}
        </td>
    );
};

// Data-driven Table Component
export interface Column<T> {
    header: string;
    render: (item: T, index: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
        totalItems: number;
        itemsPerPage: number;
        unit?: string;
    };
    className?: string;
    containerClassName?: string;
    onRowClick?: (item: T) => void;
}

export function DataTable<T>({
    data,
    columns,
    isLoading,
    pagination,
    className,
    containerClassName,
    onRowClick
}: DataTableProps<T>) {
    return (
        <div className={cn("bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden", containerClassName)}>
            <TableContainer className={className}>
                <THead>
                    {columns.map((col, idx) => (
                        <TH key={idx} className={col.headerClassName}>
                            {col.header}
                        </TH>
                    ))}
                </THead>
                <TBody>
                    {isLoading ? (
                        <TR>
                            <TD colSpan={columns.length} className="text-center py-20">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <p className="text-sm text-slate-500 font-medium">Loading data...</p>
                                </div>
                            </TD>
                        </TR>
                    ) : data.length > 0 ? (
                        data.map((item, rowIdx) => (
                            <TR
                                key={rowIdx}
                                onClick={onRowClick ? () => onRowClick(item) : undefined}
                            >
                                {columns.map((col, colIdx) => (
                                    <TD key={colIdx} className={col.className}>
                                        {col.render(item, rowIdx)}
                                    </TD>
                                ))}
                            </TR>
                        ))
                    ) : (
                        <TR>
                            <TD colSpan={columns.length} className="text-center py-10 text-slate-500">
                                No data available
                            </TD>
                        </TR>
                    )}
                </TBody>
            </TableContainer>

            {pagination && (
                <div className="px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 font-display">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} {pagination.unit || 'items'}
                    </p>
                    <Pagination
                        page={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={pagination.onPageChange}
                    />
                </div>
            )}
        </div>
    );
}
