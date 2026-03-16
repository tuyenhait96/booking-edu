"use client";

import React, { useState } from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { FilterSelect } from "@/components/molecules/FilterSelect";
import SearchBar from "@/components/molecules/SearchBar";
import { TableContainer, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import Badge from "@/components/atoms/Badge";
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/utils/permissions';
import { TopicModal } from '@/components/organisms/TopicModal/TopicModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

interface Topic {
    id: string;
    title: string;
    subject: string;
    level: string;
    status: string;
    resources: number;
}

const MOCK_TOPICS: Topic[] = [
    { id: '1', title: 'Revision on Water', subject: 'Science', level: 'Primary 5', status: 'Published', resources: 12 },
    { id: '2', title: 'Algebraic Expressions', subject: 'Mathematics', level: 'Secondary 2', status: 'Draft', resources: 8 },
    { id: '3', title: 'Shakespearean Sonnets', subject: 'English', level: 'Secondary 4', status: 'Published', resources: 15 },
    { id: '4', title: 'Photosynthesis Deep Dive', subject: 'Science', level: 'Primary 6', status: 'Published', resources: 10 },
    { id: '5', title: 'Probability Basics', subject: 'Mathematics', level: 'Secondary 1', status: 'Archived', resources: 5 },
];

export default function CurriculumPage() {
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    const handleAddTopic = (data: unknown) => {
        console.log('Adding topic:', data);
    };

    const handleEditTopic = (data: unknown) => {
        console.log('Editing topic:', data);
    };

    const handleDeleteTopic = async () => {
        console.log('Deleting topic:', selectedTopic?.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const openEditModal = (topic: Topic) => {
        setSelectedTopic(topic);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (topic: Topic) => {
        setSelectedTopic(topic);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Curriculum Mapping</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Manage lesson topics, subjects, and educational levels.
                        </p>
                    </div>
                    <PermissionGuard requiredPermission={PERMISSIONS.CURRICULUM_MANAGE}>
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                        >
                            <Icon name="add" className="text-lg text-white" />
                            <span>Add Topic</span>
                        </Button>
                    </PermissionGuard>
                </div>

                <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search topics by title..."
                            onSearch={() => {}}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Subject</span>
                            <FilterSelect
                                options={[
                                    { label: 'All Subjects', value: 'all' },
                                    { label: 'Mathematics', value: 'math' },
                                    { label: 'Science', value: 'science' },
                                    { label: 'English', value: 'english' },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Level</span>
                            <FilterSelect
                                options={[
                                    { label: 'All Levels', value: 'all' },
                                    { label: 'Primary 5', value: 'p5' },
                                    { label: 'Secondary 2', value: 's2' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <TableContainer className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <THead className="bg-slate-50/50 dark:bg-slate-800/50">
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Topic Title</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Subject</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Level</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Resources</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</TH>
                        <TH className="text-right px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</TH>
                    </THead>
                    <TBody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {MOCK_TOPICS.map((topic) => (
                            <TR key={topic.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                                <TD className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{topic.title}</p>
                                </TD>
                                <TD className="px-6 py-4">
                                    <Badge variant="primary" className="font-medium bg-transparent border border-primary/20 text-primary">{topic.subject}</Badge>
                                </TD>
                                <TD className="px-6 py-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{topic.level}</p>
                                </TD>
                                <TD className="px-6 py-4">
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="default" className="text-xs font-black uppercase tracking-widest">{topic.resources}</Badge>
                                        <span className="text-xs text-slate-500">Resources</span>
                                    </div>
                                </TD>
                                <TD className="px-6 py-4">
                                    <Badge
                                        variant={topic.status === 'Published' ? 'success' : topic.status === 'Draft' ? 'warning' : 'default'}
                                        className="text-xs"
                                    >
                                        {topic.status}
                                    </Badge>
                                </TD>
                                <TD className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <PermissionGuard requiredPermission={PERMISSIONS.CURRICULUM_MANAGE}>
                                            <button 
                                                onClick={() => openEditModal(topic)}
                                                className="p-2 text-slate-400 hover:text-primary transition-all"
                                            >
                                                <Icon name="edit" />
                                            </button>
                                        </PermissionGuard>
                                        <PermissionGuard requiredPermission={PERMISSIONS.CURRICULUM_MANAGE}>
                                            <button 
                                                onClick={() => openDeleteModal(topic)}
                                                className="p-2 text-slate-400 hover:text-rose-500 transition-all"
                                            >
                                                <Icon name="delete" />
                                            </button>
                                        </PermissionGuard>
                                    </div>
                                </TD>
                            </TR>
                        ))}
                    </TBody>
                </TableContainer>

                <div className="flex justify-between items-center px-2">
                    <p className="text-sm text-slate-500">Showing 1 to 5 of 24 results</p>
                    <div className="flex gap-2">
                        <Button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50" disabled>
                            <Icon name="chevron_left" />
                        </Button>
                        <Button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                            <Icon name="chevron_right" />
                        </Button>
                    </div>
                </div>
            </div>

            <TopicModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddTopic}
                mode="add"
            />

            <TopicModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditTopic}
                initialData={selectedTopic as Topic}
                mode="edit"
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteTopic}
                title="Delete Topic"
                description="Are you sure you want to remove the topic"
                itemName={selectedTopic?.title}
            />
        </div>
    );
}
