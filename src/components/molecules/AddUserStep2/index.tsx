"use client";

import FormField from "@/components/molecules/FormField";
import { Icon } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { useState } from "react";

interface AddUserStep2Props {
    formData: {
        parentName: string;
        parentEmail: string;
        parentContact: string;
        password: string;
    };
    updateFormData: (data: Partial<AddUserStep2Props["formData"]>) => void;
}

export default function AddUserStep2({
    formData,
    updateFormData,
}: AddUserStep2Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex">
                <Button
                    type="button"
                    variant="secondary"
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 h-10 px-4 text-xs"
                >
                    <Icon name="link" className="text-lg mr-2" />
                    Link existing parent
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    id="parentName"
                    label="Parent's Full Name"
                    inputProps={{
                        placeholder: "e.g. John Doe",
                        value: formData.parentName,
                        onChange: (e) => updateFormData({ parentName: e.target.value }),
                    }}
                />
                <FormField
                    id="parentEmail"
                    label="Parent's Email"
                    inputProps={{
                        type: "email",
                        placeholder: "parent@example.com",
                        value: formData.parentEmail,
                        onChange: (e) => updateFormData({ parentEmail: e.target.value }),
                    }}
                />
                <FormField
                    id="parentContact"
                    label="Parent's Contact"
                    inputProps={{
                        type: "tel",
                        placeholder: "+1 (555) 000-0000",
                        value: formData.parentContact,
                        onChange: (e) => updateFormData({ parentContact: e.target.value }),
                    }}
                />
                <FormField
                    id="password"
                    label="New Master Password"
                    inputProps={{
                        type: showPassword ? "text" : "password",
                        placeholder: "••••••••",
                        value: formData.password,
                        onChange: (e) => updateFormData({ password: e.target.value }),
                        rightIcon: (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-primary transition-colors"
                            >
                                <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-lg" />
                            </button>
                        ),
                    }}
                />
            </div>
        </div>
    );
}
