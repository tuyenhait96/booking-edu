"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";

interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TenantFormData) => void;
    isSubmitting?: boolean;
    mode?: 'add' | 'edit';
    initialData?: TenantFormData;
}

export interface TenantFormData {
    name: string;
    domain: string;
    type: string;
    plan: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

const tenantTypes = [
    { value: "higher-ed", label: "Higher Education" },
    { value: "k12", label: "K-12 School" },
    { value: "corporate", label: "Corporate Training" },
    { value: "other", label: "Other" },
];

const tenantPlans = [
    { value: "basic", label: "Basic" },
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" },
    { value: "enterprise", label: "Enterprise" },
];

const validationSchema = yup.object({
    name: yup.string().required("Tenant name is required"),
    domain: yup
        .string()
        .required("Domain is required")
        .matches(
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
            "Please enter a valid domain (e.g., example.com)"
        ),
    type: yup.string().required("Please select a tenant type"),
    plan: yup.string().required("Please select a plan"),
    contactName: yup.string().required("Contact name is required"),
    contactEmail: yup
        .string()
        .email("Please enter a valid email")
        .required("Contact email is required"),
    contactPhone: yup
        .string()
        .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
        .required("Contact phone is required"),
});

export default function AddTenantModal({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting = false,
    mode = 'add',
    initialData,
}: AddTenantModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<TenantFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialData || {
            name: "",
            domain: "",
            type: "",
            plan: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
        },
    });

    const handleFormSubmit = (data: TenantFormData) => {
        onSubmit(data);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    // Reset form when modal opens/closes or mode changes
    React.useEffect(() => {
        if (isOpen && initialData) {
            reset(initialData);
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, initialData, reset]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={mode === 'add' ? "Add New Tenant" : "Edit Tenant"}
            description={mode === 'add' ? "Create a new tenant account" : "Update tenant information"}
            size="lg"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        id="name"
                        label="Tenant Name"
                        required
                        error={errors.name}
                    >
                        <Input
                            id="name"
                            placeholder="e.g., Stanford University"
                            {...register("name")}
                        />
                    </FormField>

                    <FormField
                        id="domain"
                        label="Domain"
                        required
                        error={errors.domain}
                        hint="e.g., stanford.educms.io"
                    >
                        <Input
                            id="domain"
                            placeholder="your-tenant.educms.io"
                            {...register("domain")}
                        />
                    </FormField>

                    <FormField
                        id="type"
                        label="Tenant Type"
                        required
                        error={errors.type}
                    >
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={tenantTypes}
                                    placeholder="Select tenant type"
                                    value={tenantTypes.find(opt => opt.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value || "")}
                                    isSearchable={false}
                                />
                            )}
                        />
                    </FormField>

                    <FormField
                        id="plan"
                        label="Plan"
                        required
                        error={errors.plan}
                    >
                        <Controller
                            name="plan"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={tenantPlans}
                                    placeholder="Select a plan"
                                    value={tenantPlans.find(opt => opt.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value || "")}
                                    isSearchable={false}
                                />
                            )}
                        />
                    </FormField>

                    <div className="col-span-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Contact Information
                        </h4>
                    </div>

                    <FormField
                        id="contactName"
                        label="Contact Name"
                        required
                        error={errors.contactName}
                    >
                        <Input
                            id="contactName"
                            placeholder="John Doe"
                            {...register("contactName")}
                        />
                    </FormField>

                    <FormField
                        id="contactEmail"
                        label="Contact Email"
                        required
                        error={errors.contactEmail}
                    >
                        <Input
                            id="contactEmail"
                            type="email"
                            placeholder="contact@example.com"
                            {...register("contactEmail")}
                        />
                    </FormField>

                    <FormField
                        id="contactPhone"
                        label="Contact Phone"
                        required
                        error={errors.contactPhone}
                    >
                        <Input
                            id="contactPhone"
                            placeholder="+1 (555) 123-4567"
                            {...register("contactPhone")}
                        />
                    </FormField>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (mode === 'add' ? "Creating..." : "Updating...") : (mode === 'add' ? "Create Tenant" : "Update Tenant")}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}