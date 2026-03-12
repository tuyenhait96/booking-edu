"use client";

import Checkbox from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";
import PasswordInput from "@/components/molecules/PasswordInput";
import Link from "next/link";
import { FormEvent } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

interface LoginCardProps {
    onSubmit?: (e: FormEvent) => void;
    className?: string;
}

export default function LoginCard({ onSubmit, className }: LoginCardProps) {
    return (
        <div className={cn("w-full max-w-md", className)}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Please enter your credentials to access your account
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            Email Address
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@university.edu"
                            required
                            className="py-3 bg-background-light dark:bg-slate-800 border-slate-200 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-500"
                            leftIcon={
                                <Icon name="mail" className="text-slate-400 text-lg" />
                            }
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Password
                            </label>
                            <Link
                                href="#"
                                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Remember Me */}
                    <Checkbox id="remember-me" name="remember-me" label="Remember me on this device" />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        className="py-3 shadow-sm rounded-lg h-auto"
                    >
                        Sign In
                        <Icon name="login" className="text-lg" />
                    </Button>
                </form>
            </div>

            {/* Footer Links */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link href="#" className="font-semibold text-primary hover:underline">
                    Request access
                </Link>
            </p>
        </div>
    );
}
