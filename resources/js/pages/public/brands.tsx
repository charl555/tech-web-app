import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { Brand } from '@/types';

interface BrandsProps {
    brands: Brand[];
}

export default function Brands({ brands }: BrandsProps) {
    const [search, setSearch] = useState('');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    const filteredBrands = brands.filter((brand) => {
        const matchesSearch = brand.name.toLowerCase().includes(search.toLowerCase());
        const matchesFeatured = showFeaturedOnly ? brand.is_active : true;

        return matchesSearch && matchesFeatured;
    });

    return (
        <>
            <Head title="Brands - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shop by Brand
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Explore products from the world's leading technology brands.
                    </p>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                        <Input
                            type="search"
                            placeholder="Search brands..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="featured-only"
                            type="checkbox"
                            checked={showFeaturedOnly}
                            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300"
                        />
                        <Label htmlFor="featured-only" className="text-sm font-medium">
                            Active brands only
                        </Label>
                    </div>
                </div>

                {filteredBrands.length === 0 ? (
                    <div className="rounded-lg border border-dashed py-12 text-center dark:border-neutral-800">
                        <p className="text-neutral-600 dark:text-neutral-400">No brands match your search.</p>
                        <Button
                            className="mt-4"
                            variant="outline"
                            onClick={() => {
                                setSearch('');
                                setShowFeaturedOnly(false);
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {filteredBrands.map((brand) => (
                            <Link key={brand.id} href="/products">
                                <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                    <CardHeader className="p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                            <span className="text-xl font-bold text-neutral-600 dark:text-neutral-400">
                                                {brand.name.slice(0, 2)}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg">{brand.name}</CardTitle>
                                        <CardDescription>{brand.description ?? 'Explore products'}</CardDescription>
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
                )}
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
