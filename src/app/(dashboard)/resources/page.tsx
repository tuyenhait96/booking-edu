"use client";

import React from 'react';
import { cn } from "@/utils/cn";
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { ResourceModal } from '@/components/organisms/ResourceModal/ResourceModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

interface Room {
    id: string;
    name: string;
    type: string;
    capacity: number;
    equipment: string[];
    status: string;
}

const MOCK_CLASSROOMS: Room[] = [
    { id: '1', name: 'Curie', type: 'Science Lab', capacity: 24, equipment: ['Microscopes', 'Gas Sockets', 'Projector'], status: 'Available' },
    { id: '2', name: 'Newton', type: 'Lecture Hall', capacity: 60, equipment: ['Sound System', 'Dual Projectors', 'Recording Gear'], status: 'Occupied' },
    { id: '3', name: 'Turing', type: 'Computer Lab', capacity: 30, equipment: ['30x Workstations', 'Fiber Internet', 'Smart Board'], status: 'Available' },
    { id: '4', name: 'da Vinci', type: 'Art Studio', capacity: 20, equipment: ['Easels', 'Sink', 'Natural Lighting'], status: 'Maintenance' },
    { id: '5', name: 'Einstein', type: 'Classroom', capacity: 32, equipment: ['Whiteboard', 'Projector'], status: 'Available' },
];

export default function ResourcesPage() {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
    const [deleteWarning, setDeleteWarning] = React.useState<string | undefined>(undefined);

    const handleAddRoom = (data: unknown) => {
        console.log('Adding room:', data);
    };

    const handleEditRoom = (data: unknown) => {
        console.log('Editing room:', data);
    };

    const handleDeleteRoom = async () => {
        console.log('Deleting room:', selectedRoom?.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const openEditModal = (room: Room) => {
        setSelectedRoom({
            ...room,
            equipment: room.equipment
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (room: Room) => {
        setSelectedRoom(room);
        // Mock appointment check: If room name is "Newton" or "Einstein", it has future classes
        if (room.name === 'Newton' || room.name === 'Einstein') {
            setDeleteWarning("This classroom is currently linked to 14 future sessions in the next 30 days. Deleting it will leave these sessions without a room.");
        } else {
            setDeleteWarning(undefined);
        }
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Resource Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Management of physical spaces and facilities.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                    >
                        <Icon name="add_home" className="text-lg text-white" />
                        <span>Add Classroom</span>
                    </Button>
                </div>

                {/* Classrooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_CLASSROOMS.map((room) => (
                        <div key={room.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                            {/* Status Ribbon */}
                            <div className={cn(
                                "absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl",
                                room.status === 'Available' ? "bg-emerald-500/10 text-emerald-500 text-xs" :
                                    room.status === 'Occupied' ? "bg-amber-500/10 text-amber-500 text-xs" :
                                        "bg-rose-500/10 text-rose-500 text-xs"
                            )}>
                                {room.status}
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Icon name="meeting_room" className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{room.name}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{room.type}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Capacity</span>
                                    <span className="text-lg font-black text-slate-700 dark:text-slate-300">{room.capacity}</span>
                                </div>
                                <div className="h-8 w-px bg-slate-100 dark:bg-slate-800" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Equipped</span>
                                    <span className="text-lg font-black text-slate-700 dark:text-slate-300">{room.equipment.length} items</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Key Equipment</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {room.equipment.map((item, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-700">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-2 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center px-1">
                                    <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                        <Icon name="calendar_today" className="text-sm" />
                                        Schedule
                                    </button>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => openEditModal(room)}
                                            className="p-1.5 text-slate-400 hover:text-primary transition-all"
                                        >
                                            <Icon name="edit" />
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(room)}
                                            className="p-1.5 text-slate-400 hover:text-rose-500 transition-all"
                                        >
                                            <Icon name="delete" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ResourceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddRoom}
                mode="add"
            />

            <ResourceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditRoom}
                initialData={selectedRoom ? {
                    name: selectedRoom.name,
                    type: selectedRoom.type,
                    capacity: selectedRoom.capacity,
                    equipment: selectedRoom.equipment.join(', '),
                    status: selectedRoom.status
                } : undefined}
                mode="edit"
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteRoom}
                title="Delete Classroom"
                description="Are you sure you want to permanently remove classroom"
                itemName={selectedRoom?.name}
                warning={deleteWarning}
            />
        </div>
    );
}
