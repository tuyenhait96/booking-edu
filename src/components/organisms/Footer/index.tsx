import { cn } from "@/utils/cn";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

const footerLinks = [
    {
        heading: "Platform",
        links: [
            { label: "Courses", href: "/courses" },
            { label: "Instructors", href: "/instructors" },
            { label: "Pricing", href: "/pricing" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
        ],
    },
];

export default function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("border-t border-gray-200 bg-gray-50", className)}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-xl font-bold text-primary-600">BookingEdu</span>
                        <p className="mt-3 text-sm text-gray-500">
                            Learn from the best instructors and advance your career.
                        </p>
                    </div>

                    {/* Link groups */}
                    {footerLinks.map((group) => (
                        <div key={group.heading}>
                            <h4 className="text-sm font-semibold text-gray-900">{group.heading}</h4>
                            <ul className="mt-3 space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-gray-900"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} BookingEdu. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
