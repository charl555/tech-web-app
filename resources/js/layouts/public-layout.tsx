import { Form, Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

type PublicLayoutProps = {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
};

const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'Categories', href: '/categories' },
    { title: 'Brands', href: '/brands' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
];

export default function PublicLayout({
    breadcrumbs = [],
    children,
}: PublicLayoutProps) {
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-950/95">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            prefetch
                            className="flex items-center gap-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                                <ShoppingCart className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">
                                PCForge
                            </span>
                        </Link>

                        <nav className="hidden lg:flex">
                            <NavigationMenu>
                                <NavigationMenuList className="gap-1">
                                    {navItems.map((item) => (
                                        <NavigationMenuItem key={item.title}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    'h-9 cursor-pointer px-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex">
                            <div className="relative">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-neutral-500" />
                                <Input
                                    type="search"
                                    placeholder="Search parts..."
                                    className="h-9 w-64 rounded-full pl-9 text-sm"
                                />
                            </div>
                        </div>

                        <Link href="/cart">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {Number(usePage().props.cartCount ?? 0) > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                                        {Number(usePage().props.cartCount ?? 0)}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {auth.user.name || 'Account'}
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Link
                                            href="/account"
                                            className="w-full"
                                        >
                                            Account
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Form
                                            action="/account/logout"
                                            method="post"
                                            className="w-full"
                                        >
                                            <button
                                                type="submit"
                                                className="w-full text-left"
                                            >
                                                Log out
                                            </button>
                                        </Form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/account/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        )}

                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon">
                                    {mobileOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <Menu className="h-5 w-5" />
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2 text-left">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                                            <ShoppingCart className="h-5 w-5" />
                                        </div>
                                        PCForge
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="mt-6 flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <div className="mt-4 border-t pt-4 dark:border-neutral-800">
                                        {auth.user ? (
                                            <Link
                                                href="/account"
                                                onClick={() =>
                                                    setMobileOpen(false)
                                                }
                                            >
                                                <Button className="w-full">
                                                    My Account
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/account/login"
                                                onClick={() =>
                                                    setMobileOpen(false)
                                                }
                                            >
                                                <Button className="w-full">
                                                    Sign in
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="md:col-span-1">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                <span className="text-lg font-bold">
                                    PCForge
                                </span>
                            </Link>
                            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                                Your one-stop shop for premium computer parts
                                and components.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                Shop
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {[
                                    'CPUs',
                                    'GPUs',
                                    'Motherboards',
                                    'RAM',
                                    'Storage',
                                    'Power Supplies',
                                ].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="/products"
                                            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                Support
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {[
                                    'Contact Us',
                                    'FAQ',
                                    'Shipping',
                                    'Returns',
                                    'Warranty',
                                    'Track Order',
                                ].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="/contact"
                                            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                                Company
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {[
                                    'About Us',
                                    'Careers',
                                    'Press',
                                    'Privacy Policy',
                                    'Terms of Service',
                                ].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="/about"
                                            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t pt-8 text-center text-sm text-neutral-500 dark:border-neutral-800">
                        © {new Date().getFullYear()} PCForge. All rights
                        reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
