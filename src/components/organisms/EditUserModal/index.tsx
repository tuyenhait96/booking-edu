"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import AddUserStep1 from "@/components/molecules/AddUserStep1";
import AddUserStep2 from "@/components/molecules/AddUserStep2";

interface UserData {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: "Teacher" | "Parent" | "Student";
    organization: string;
    status: "active" | "inactive" | "pending";
    lastLogin: string;
    // Additional fields for form
    preferredName?: string;
    fullName?: string;
    parentName?: string;
    parentEmail?: string;
    parentContact?: string;
    password?: string;
}

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData | null;
}

export default function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
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

    // Initialize form data when user changes
    useEffect(() => {
        if (user) {
            // Extract preferred name from full name (first word)
            const preferredName = user.name.split(" ")[0] || "";

            // Only allow editing Student and Teacher roles
            // If somehow a parent is passed, default to Teacher
            const editableRole = user.role === "Student" ? "Student" : "Teacher";
            setRole(editableRole);
            setFormData({
                preferredName,
                fullName: user.name,
                email: user.email,
                parentName: "",
                parentEmail: "",
                parentContact: "",
                password: "",
            });
            setStep(1);
        }
    }, [user]);

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

    const handleSave = () => {
        // Here you would typically make an API call to update the user
        console.log("Saving user data:", { user, formData, role });

        // For now, just close the modal
        handleClose();
    };

    const totalSteps = role === "Student" ? 2 : 1;
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
                        Edit {role}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Update {role.toLowerCase()} information in the educational system.
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
                        <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary/25">
                            Save Changes
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}