"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import Input from "@/components/atoms/Input";
import { Icon } from "@/components/atoms/Icon";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, error, ...props }, ref) => {
        const [visible, setVisible] = useState(false);

        return (
            <Input
                ref={ref}
                type={visible ? "text" : "password"}
                error={error}
                leftIcon={<Icon name="lock" />}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        <Icon name={visible ? "visibility_off" : "visibility"} />
                    </button>
                }
                className={className}
                {...props}
            />
        );
    }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
