"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggle } from "./ui/modeToggle";

interface NavProps {
    className?: string;
}

const mainNav = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Explore",
        href: "/explore",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];

export function Nav({ className }: NavProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const { setTheme, theme } = useTheme();

    return (
        <header className="mx-auto sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto container flex h-14 items-center">
                <div className="hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <span className="hidden font-bold sm:inline-block">
                            Blog-canva
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-foreground/60"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                            <Icons.logo className="h-6 w-6" />
                            <span className="font-bold">Blog-canva</span>
                        </Link>
                        <nav className=" mt-6 flex flex-col space-y-4">
                            {mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-foreground/80",
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-foreground/60"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                    <Icons.logo className="h-6 w-6" />
                    <span className="font-bold">Blog-canva</span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {/* Theme Toggle */}
                    <ModeToggle />

                    {/* Sign In/Up Buttons */}
                    <div className="hidden items-center space-x-2 sm:flex">
                        <Link href="/sign-in">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </div>

                    {/* Mobile Sign In Button */}
                    <Link href="/sign-in" className="sm:hidden">
                        <Button size="sm">Sign In</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}