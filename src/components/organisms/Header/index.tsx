"use client";

import Avatar from "@/components/atoms/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className={cn(
                "sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm",
                className
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary-600">BookingEdu</span>
                </Link>

                {/* Nav links */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Courses
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Contact
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {isAuthenticated && user ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                className="flex items-center gap-2 rounded-full"
                            >
                                <Avatar src={user.avatar} name={user.name} size="sm" />
                                <span className="hidden text-sm font-medium text-gray-700 md:block">
                                    {user.name}
                                </span>
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setMenuOpen(false); }}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex h-8 items-center rounded-md bg-primary-600 px-3 text-sm font-medium text-white hover:bg-primary-700"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
