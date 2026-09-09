import { Head, Link } from '@inertiajs/react';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Brand } from '@/types';

interface BrandsIndexProps {
    brands: Brand[];
}

export default function BrandsIndex({ brands }: BrandsIndexProps) {
    const [search, setSearch] = useState('');

    const filteredBrands = brands.filter(
        (brand) =>
            brand.name.toLowerCase().includes(search.toLowerCase()) ||
            brand.slug.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="Brands - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Brands</h1>
                        <p className="text-muted-foreground">
                            Manage product brands.
                        </p>
                    </div>
                    <Link href="/admin/brands/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Brand
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Brands</CardTitle>
                            <div className="relative">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search brands..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-9 w-full pl-9 md:w-64"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 font-medium">
                                            Name
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Slug
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Status
                                        </th>
                                        <th className="pb-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBrands.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No brands found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredBrands.map((brand) => (
                                            <tr
                                                key={brand.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-3">
                                                    <div className="font-medium">
                                                        {brand.name}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">
                                                    {brand.slug}
                                                </td>
                                                <td className="py-3">
                                                    <Badge
                                                        variant={
                                                            brand.is_active
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {brand.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <Link
                                                        href={`/admin/brands/${brand.id}/edit`}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
