import { Head, Link } from '@inertiajs/react';
import { Cpu, Zap, HardDrive, Monitor, Keyboard, Mouse, Headphones } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Category } from '@/types';

interface CategoriesProps {
    categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
    const [search, setSearch] = useState('');

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()),
    );

    const iconMap: Record<string, typeof Cpu> = {
        'CPUs & Processors': Cpu,
        'Graphics Cards': Zap,
        Motherboards: Monitor,
        'Memory (RAM)': HardDrive,
        Storage: HardDrive,
        'Power Supplies': Zap,
        Cases: Monitor,
        Cooling: Cpu,
        Peripherals: Keyboard,
    };

    return (
        <>
            <Head title="Categories - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shop by Category
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Browse our categories to find the perfect components for your build.
                    </p>
                </div>

                <div className="mb-6">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input
                            type="search"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 pl-9"
                        />
                    </div>
                </div>

                {filteredCategories.length === 0 ? (
                    <div className="rounded-lg border border-dashed py-12 text-center dark:border-neutral-800">
                        <p className="text-neutral-600 dark:text-neutral-400">No categories match your search.</p>
                        <Button
                            className="mt-4"
                            variant="outline"
                            onClick={() => setSearch('')}
                        >
                            Clear search
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCategories.map((category) => {
                            const Icon = iconMap[category.name] ?? Cpu;
                            return (
                                <Link key={category.id} href="/products">
                                    <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                                        <Icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base">{category.name}</CardTitle>
                                                        <CardDescription className="text-sm">
                                                            {category.description ?? 'Browse products'}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary">0</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {category.description ?? 'Explore products in this category.'}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

Categories.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: '/categories',
        },
    ],
};
