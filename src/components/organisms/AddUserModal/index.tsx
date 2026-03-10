"use client";

import { useState } from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import AddUserStep1 from "@/components/molecules/AddUserStep1";
import AddUserStep2 from "@/components/molecules/AddUserStep2";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"Student" | "Teacher">("Student");
    const [formData, setFormData] = useState({
        preferredName: "",
        fullName: "",
        email: "",
        parentName: "",
        parentEmail: "",
        parentContact: "",
        password: "",
    });

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleClose = () => {
        onClose();
        // Reset state on close
        setTimeout(() => {
            setStep(1);
            setRole("Student");
            setFormData({
                preferredName: "",
                fullName: "",
                email: "",
                parentName: "",
                parentEmail: "",
                parentContact: "",
                password: "",
            });
        }, 300);
    };

    const totalSteps = role === "Student" ? 2 : 1; // Assuming Teacher only has 1 step for now
    const progress = (step / totalSteps) * 100;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="xl"
            className="p-0 overflow-hidden"
        >
            {/* Custom Header within Modal Body to match HTML design */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Add New User
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Register a new person into the educational system.
                    </p>
                </div>
            </div>

            {/* Step Indicators & Progress */}
            <div className="px-8 py-4 space-y-2">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-slate-900 dark:text-white text-sm font-bold leading-normal uppercase tracking-wider">
                            Step {step} of {totalSteps}
                        </p>
                        <p className="text-primary text-base font-semibold">
                            {step === 1 ? "Personal Information" : "Parent Information"}
                        </p>
                    </div>
                    <span className="text-slate-400 text-sm font-medium">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-6">
                {step === 1 && (
                    <AddUserStep1
                        role={role}
                        setRole={setRole}
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                )}
                {step === 2 && (
                    <AddUserStep2
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" onClick={handleClose}>
                    Cancel
                </Button>
                <div className="flex gap-3">
                    {step > 1 && (
                        <Button variant="secondary" onClick={handleBack}>
                            Previous
                        </Button>
                    )}
                    {step < totalSteps ? (
                        <Button onClick={handleNext} className="px-8">
                            Next Step
                            <Icon name="arrow_forward_ios" className="text-xs ml-1" />
                        </Button>
                    ) : (
                        <Button onClick={handleClose} className="px-8 shadow-lg shadow-primary/25">
                            {role === "Student" ? "Create Student" : "Create Teacher"}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
