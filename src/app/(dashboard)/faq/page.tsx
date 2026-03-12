"use client";

import React, { useState } from 'react';
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { FAQModal } from '@/components/organisms/FAQModal/FAQModal';
import { DeleteConfirmModal } from '@/components/molecules/DeleteConfirmModal/DeleteConfirmModal';

const MOCK_FAQS = [
    {
        id: '1',
        category: 'Tuition',
        question_en: 'What is the student-to-teacher ratio?',
        question_zh: '师生比例是多少？',
        answer_en: 'Our standard ratio is 1:12 for primary levels and 1:15 for secondary levels to ensure personalized attention.',
        answer_zh: '我们的标准比例是小学 1:12，中学 1:15，以确保每位学生都能得到个性化的关注。'
    },
    {
        id: '2',
        category: 'App',
        question_en: 'How do I reset my parent portal password?',
        question_zh: '如何重置家长门户网站密码？',
        answer_en: 'Click on "Forgot Password" on the login screen and follow the instructions sent to your registered email.',
        answer_zh: '点击登录屏幕上的“忘记密码”，然后按照发送到您注册邮箱的说明进行操作。'
    },
    {
        id: '3',
        category: 'Tuition',
        question_en: 'Are makeup classes available for missed sessions?',
        question_zh: '请假后的课程可以补课吗？',
        answer_en: 'Yes, students are entitled to 2 makeup classes per term, subject to slot availability.',
        answer_zh: '是的，学生每学期有权参加 2 场补课，具体取决于名额情况。'
    },
];

export default function FAQPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState<any>(null);

    const handleAddFAQ = (data: any) => {
        console.log('Adding FAQ:', data);
    };

    const handleEditFAQ = (data: any) => {
        console.log('Editing FAQ:', data);
    };

    const handleDeleteFAQ = async () => {
        console.log('Deleting FAQ:', selectedFAQ?.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const openEditModal = (faq: any) => {
        setSelectedFAQ(faq);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (faq: any) => {
        setSelectedFAQ(faq);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">FAQ Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            English and Chinese FAQs segmented by categories.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            <button
                                onClick={() => setLanguage('en')}
                                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", language === 'en' ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500")}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage('zh')}
                                className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-all", language === 'zh' ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500")}
                            >
                                中文
                            </button>
                        </div>
                        <Button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                        >
                            <Icon name="add" className="text-lg" />
                            <span>Add FAQ</span>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {['Tuition', 'App', 'Payment', 'Center Policy'].map((cat) => (
                        <div key={cat} className="space-y-3">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">{cat}</h2>
                            <div className="space-y-2">
                                {MOCK_FAQS.filter(f => f.category === cat).map((faq) => (
                                    <div key={faq.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
                                        <button
                                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                            className="w-full text-left px-6 py-5 flex items-center justify-between group"
                                        >
                                            <span className="text-base font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                                                {language === 'en' ? faq.question_en : faq.question_zh}
                                            </span>
                                            <div className={cn("p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 transition-all", openId === faq.id && "rotate-180 bg-primary/10 text-primary")}>
                                                <Icon name="expand_more" />
                                            </div>
                                        </button>

                                        {openId === faq.id && (
                                            <div className="px-6 pb-6 animate-slide-up">
                                                <div className="w-8 h-1 bg-primary/20 rounded-full mb-4" />
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                                    {language === 'en' ? faq.answer_en : faq.answer_zh}
                                                </p>
                                                <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-end gap-3">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); openEditModal(faq); }}
                                                        className="text-xs font-bold text-slate-400 hover:text-primary transition-all"
                                                    >
                                                        Edit FAQ
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); openDeleteModal(faq); }}
                                                        className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FAQModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddFAQ}
                mode="add"
            />

            <FAQModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditFAQ}
                initialData={selectedFAQ}
                mode="edit"
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteFAQ}
                title="Delete FAQ"
                description="Are you sure you want to remove this FAQ entry about"
                itemName={language === 'en' ? selectedFAQ?.question_en : selectedFAQ?.question_zh}
            />
        </div>
    );
}
