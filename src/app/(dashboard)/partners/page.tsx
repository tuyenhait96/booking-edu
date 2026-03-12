"use client";

import React from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { PartnerModal } from '@/components/organisms/PartnerModal/PartnerModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

const MOCK_PARTNERS = [
    {
        id: '1',
        title: 'Science Centre Singapore',
        logo: 'https://img.logo.dev/science.edu.sg?token=pk_Yy_9Yy_9Yy_9Yy_9',
        tags: ['Exhibition', 'Workshops', '15% Off'],
        description: 'Enjoy exclusive discounts on annual passes and holiday science camps.'
    },
    {
        id: '2',
        title: 'Apple Education',
        logo: 'https://img.logo.dev/apple.com?token=pk_Yy_9Yy_9Yy_9Yy_9',
        tags: ['Hardware', 'Apps', 'Free Trial'],
        description: 'Special pricing on iPads and MacBooks for all registered students.'
    },
    {
        id: '3',
        title: 'Grab for Education',
        logo: 'https://img.logo.dev/grab.com?token=pk_Yy_9Yy_9Yy_9Yy_9',
        tags: ['Transport', 'Vouchers', 'Safety'],
        description: 'Discounted rides to and from tuition centres during weekends.'
    },
    {
        id: '4',
        title: 'National Library Board',
        logo: 'https://img.logo.dev/nlb.gov.sg?token=pk_Yy_9Yy_9Yy_9Yy_9',
        tags: ['e-Books', 'Resources', 'Free'],
        description: 'Curated reading lists and priority booking for study pods.'
    },
    {
        id: '5',
        title: 'Standard Chartered',
        logo: 'https://img.logo.dev/sc.com?token=pk_Yy_9Yy_9Yy_9Yy_9',
        tags: ['Savings', 'Rewards', 'Financial Literacy'],
        description: 'Junior Savings Account with bonus points for good grades.'
    },
];

export default function PartnersPage() {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedPartner, setSelectedPartner] = React.useState<any>(null);

    const handleAddPartner = (data: any) => {
        console.log('Adding partner:', data);
        // In a real app, this would refresh the data
    };

    const handleEditPartner = (data: any) => {
        console.log('Editing partner:', data);
    };

    const handleDeletePartner = async () => {
        console.log('Deleting partner:', selectedPartner?.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const openEditModal = (partner: any) => {
        setSelectedPartner({
            ...partner,
            tags: partner.tags.join(', ')
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (partner: any) => {
        setSelectedPartner(partner);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Partner Perks</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Exclusive benefits for our students and partners.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                    >
                        <Icon name="handshake" className="text-lg text-white" />
                        <span>Add Partner</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MOCK_PARTNERS.map((partner) => (
                        <div key={partner.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-4 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform shadow-sm">
                                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse flex items-center justify-center">
                                        <Icon name="business" className="text-2xl text-slate-300" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => openEditModal(partner)}
                                        className="p-2 text-slate-300 hover:text-primary transition-all"
                                    >
                                        <Icon name="edit" />
                                    </button>
                                    <button 
                                        onClick={() => openDeleteModal(partner)}
                                        className="p-2 text-slate-300 hover:text-rose-500 transition-all"
                                    >
                                        <Icon name="delete" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{partner.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                    {partner.description}
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {partner.tags.map((tag, i) => (
                                    <Badge key={i} variant="primary" className="bg-primary/5 text-primary border-primary/10 text-xs font-black uppercase">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">Valid until 31 Dec 2024</span>
                                <Button variant="ghost" className="text-sm font-black text-primary hover:underline flex items-center gap-2">
                                    View Details
                                    <Icon name="arrow_forward" className="text-base" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PartnerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddPartner}
                mode="add"
            />

            <PartnerModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditPartner}
                initialData={selectedPartner}
                mode="edit"
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeletePartner}
                title="Delete Partner"
                description="Are you sure you want to remove the partner perk for"
                itemName={selectedPartner?.title}
            />
        </div>
    );
}
