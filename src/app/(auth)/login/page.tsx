"use client";

import LoginCard from "@/components/organisms/LoginCard";
import LoginFooter from "@/components/organisms/LoginFooter";
import LoginHeader from "@/components/organisms/LoginHeader";
import { FormEvent } from "react";

export default function EduCMSLoginPage() {
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // In a real app, wire up the form data to an auth service here
        console.log("Login submitted");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            <LoginHeader />

            <main className="flex-1 flex items-center justify-center p-6">
                <LoginCard onSubmit={handleLogin} />
            </main>

            <LoginFooter />
        </div>
    );
}
