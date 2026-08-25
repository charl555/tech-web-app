import { Head, Link } from '@inertiajs/react';
import { Cpu, Zap, HardDrive, Monitor, Keyboard, Mouse, Headphones } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Categories() {
    return (
        <>
            <Head title="Categories - TechParts" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shop by Category
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Browse our categories to find the perfect components for your build.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: 'CPUs & Processors',
                            count: 42,
                            icon: Cpu,
                            description: 'Intel and AMD processors for every budget and use case.',
                        },
                        {
                            name: 'Graphics Cards',
                            count: 38,
                            icon: Zap,
                            description: 'NVIDIA and AMD GPUs for gaming and professional workloads.',
                        },
                        {
                            name: 'Motherboards',
                            count: 35,
                            icon: Monitor,
                            description: 'ATX, Micro-ATX, and Mini-ITX boards from top brands.',
                        },
                        {
                            name: 'Memory (RAM)',
                            count: 56,
                            icon: HardDrive,
                            description: 'DDR4 and DDR5 RAM modules in various speeds and capacities.',
                        },
                        {
                            name: 'Storage',
                            count: 64,
                            icon: HardDrive,
                            description: 'NVMe SSDs, SATA SSDs, and high-capacity HDDs.',
                        },
                        {
                            name: 'Power Supplies',
                            count: 28,
                            icon: Zap,
                            description: '80 Plus certified PSUs with reliable power delivery.',
                        },
                        {
                            name: 'Cases',
                            count: 31,
                            icon: Monitor,
                            description: 'ATX, Micro-ATX, and Mini-ITX cases with great airflow.',
                        },
                        {
                            name: 'Cooling',
                            count: 45,
                            icon: Cpu,
                            description: 'Air and liquid cooling solutions for optimal temperatures.',
                        },
                        {
                            name: 'Peripherals',
                            count: 72,
                            icon: Keyboard,
                            description: 'Keyboards, mice, monitors, and audio equipment.',
                        },
                    ].map((category) => (
                        <Link key={category.name} href="/products">
                            <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                                <category.icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{category.name}</CardTitle>
                                                <CardDescription className="text-sm">
                                                    {category.count} products
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">{category.count}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {category.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
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
