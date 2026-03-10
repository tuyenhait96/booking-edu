import * as yup from "yup";

// ── Login ───────────────────────────────────────────────────────────────────
export const loginSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

// ── Register ────────────────────────────────────────────────────────────────
export const registerSchema = yup.object({
    name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;

// ── Change Password ─────────────────────────────────────────────────────────
export const changePasswordSchema = yup.object({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
        .string()
        .min(8, "New password must be at least 8 characters")
        .required("New password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your new password"),
});

export type ChangePasswordFormValues = yup.InferType<
    typeof changePasswordSchema
>;
