import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Brands() {
    return (
        <>
            <Head title="Brands - TechParts" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shop by Brand
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Explore products from the world's leading technology brands.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                    {[
                        { name: 'Intel', products: 28, featured: true },
                        { name: 'AMD', products: 24, featured: true },
                        { name: 'NVIDIA', products: 18, featured: true },
                        { name: 'ASUS', products: 32, featured: false },
                        { name: 'Corsair', products: 45, featured: false },
                        { name: 'Samsung', products: 22, featured: false },
                        { name: 'Gigabyte', products: 19, featured: false },
                        { name: 'MSI', products: 21, featured: false },
                        { name: 'Kingston', products: 15, featured: false },
                        { name: 'Seagate', products: 12, featured: false },
                        { name: 'Cooler Master', products: 16, featured: false },
                        { name: 'EVGA', products: 14, featured: false },
                    ].map((brand) => (
                        <Link key={brand.name} href="/products">
                            <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                <CardHeader className="p-6 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                        <span className="text-xl font-bold text-neutral-600 dark:text-neutral-400">
                                            {brand.name.slice(0, 2)}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg">{brand.name}</CardTitle>
                                    <CardDescription>{brand.products} products</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 text-center">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Products
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

Brands.layout = {
    breadcrumbs: [
        {
            title: 'Brands',
            href: '/brands',
        },
    ],
};
