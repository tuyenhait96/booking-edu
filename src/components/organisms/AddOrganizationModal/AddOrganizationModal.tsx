"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import { CreateOrganizationDto } from "@/services/organizationService";

interface AddOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateOrganizationDto) => void;
    isSubmitting?: boolean;
    mode?: 'add' | 'edit';
    initialData?: CreateOrganizationDto;
}

const validationSchema = yup.object({
    name: yup.string().required("Organization name is required"),
    phone: yup
        .string()
        .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
        .required("Phone number is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    address: yup.string().required("Address is required"),
    maxCenters: yup
        .number()
        .typeError("Max centers must be a number")
        .min(1, "At least 1 center is required")
        .required("Max centers is required"),
});

export default function AddOrganizationModal({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting = false,
    mode = 'add',
    initialData,
}: AddOrganizationModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateOrganizationDto>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialData || {
            name: "",
            phone: "",
            email: "",
            address: "",
            maxCenters: 1,
        },
    });

    const handleFormSubmit = (data: CreateOrganizationDto) => {
        console.log("AddOrganizationModal: Form submitted with data:", data);
        onSubmit(data);
    };

    const onFormError = (errors: any) => {
        console.log("AddOrganizationModal: Validation errors:", errors);
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
            title={mode === 'add' ? "Add New Organization" : "Edit Organization"}
            description={mode === 'add' ? "Create a new organization account" : "Update organization information"}
            size="lg"
        >
            <form onSubmit={handleSubmit(handleFormSubmit, onFormError)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        id="name"
                        label="Organization Name"
                        required
                        error={errors.name}
                    >
                        <Input
                            id="name"
                            placeholder="e.g., TEE Organization"
                            {...register("name")}
                        />
                    </FormField>

                    <FormField
                        id="phone"
                        label="Phone Number"
                        required
                        error={errors.phone}
                    >
                        <Input
                            id="phone"
                            placeholder="e.g., 0289999999"
                            {...register("phone")}
                        />
                    </FormField>

                    <FormField
                        id="email"
                        label="Email Address"
                        required
                        error={errors.email}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="e.g., tee-org@example.com"
                            {...register("email")}
                        />
                    </FormField>

                    <FormField
                        id="maxCenters"
                        label="Max Centers"
                        required
                        error={errors.maxCenters}
                    >
                        <Input
                            id="maxCenters"
                            type="number"
                            placeholder="e.g., 4"
                            {...register("maxCenters", { valueAsNumber: true })}
                        />
                    </FormField>

                    <FormField
                        id="address"
                        label="Address"
                        required
                        error={errors.address}
                        className="col-span-1 md:col-span-2"
                    >
                        <Input
                            id="address"
                            placeholder="e.g., Singapore"
                            {...register("address")}
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
                        {isSubmitting ? (mode === 'add' ? "Creating..." : "Updating...") : (mode === 'add' ? "Create Organization" : "Update Organization")}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
