"use client";

import FormField from "@/components/molecules/FormField";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";

interface AddUserStep1Props {
    role: "Student" | "Teacher";
    setRole: (role: "Student" | "Teacher") => void;
    formData: {
        preferredName: string;
        fullName: string;
        email: string;
    };
    updateFormData: (data: Partial<AddUserStep1Props["formData"]>) => void;
}

export default function AddUserStep1({
    role,
    setRole,
    formData,
    updateFormData,
}: AddUserStep1Props) {
    return (
        <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold block">
                    Select Account Role
                </label>
                <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                    <button
                        type="button"
                        onClick={() => setRole("Student")}
                        className={cn(
                            "flex h-full grow items-center justify-center rounded-lg px-2 transition-all gap-2 text-sm font-bold",
                            role === "Student"
                                ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        )}
                    >
                        <Icon name="person" className="text-lg" />
                        <span>Student</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("Teacher")}
                        className={cn(
                            "flex h-full grow items-center justify-center rounded-lg px-2 transition-all gap-2 text-sm font-bold",
                            role === "Teacher"
                                ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        )}
                    >
                        <Icon name="school" className="text-lg" />
                        <span>Teacher</span>
                    </button>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                    id="preferredName"
                    label="Preferred Name"
                    inputProps={{
                        placeholder: "e.g. Alex",
                        value: formData.preferredName,
                        onChange: (e) => updateFormData({ preferredName: e.target.value }),
                    }}
                />
                <FormField
                    id="fullName"
                    label="Full Legal Name"
                    inputProps={{
                        placeholder: "e.g. Alexander Smith",
                        value: formData.fullName,
                        onChange: (e) => updateFormData({ fullName: e.target.value }),
                    }}
                />
            </div>

            <FormField
                id="email"
                label="Email Address"
                hint="This will be used for account verification and communications."
                inputProps={{
                    type: "email",
                    placeholder: "alex.smith@example.edu",
                    leftIcon: <Icon name="mail" className="text-lg" />,
                    value: formData.email,
                    onChange: (e) => updateFormData({ email: e.target.value }),
                }}
            />
        </div>
    );
}
