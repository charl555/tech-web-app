import { Head, Link } from '@inertiajs/react';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Products() {
    return (
        <>
            <Head title="Products - TechParts" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        All Products
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Browse our complete catalog of computer components.
                    </p>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">Filters</CardTitle>
                                    <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Category</Label>
                                    <div className="space-y-2">
                                        {['CPUs', 'GPUs', 'Motherboards', 'RAM', 'Storage', 'Power Supplies'].map((cat) => (
                                            <div key={cat} className="flex items-center gap-2">
                                                <Checkbox id={`cat-${cat}`} />
                                                <Label htmlFor={`cat-${cat}`} className="text-sm font-normal">
                                                    {cat}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Brand</Label>
                                    <div className="space-y-2">
                                        {['Intel', 'AMD', 'NVIDIA', 'ASUS', 'Corsair', 'Samsung'].map((brand) => (
                                            <div key={brand} className="flex items-center gap-2">
                                                <Checkbox id={`brand-${brand}`} />
                                                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                                                    {brand}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Price Range</Label>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" placeholder="Min" className="h-9" />
                                        <span className="text-neutral-500">-</span>
                                        <Input type="number" placeholder="Max" className="h-9" />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Availability</Label>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="in-stock" />
                                        <Label htmlFor="in-stock" className="text-sm font-normal">
                                            In Stock Only
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Showing 1-8 of 24 results
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 rounded-md border p-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Select>
                                    <SelectTrigger className="h-9 w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Top Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <Card key={item} className="overflow-hidden transition-shadow hover:shadow-lg">
                                    <div className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
                                    <CardHeader className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <CardTitle className="line-clamp-1 text-base">Product Name {item}</CardTitle>
                                            <Badge variant="secondary" className="shrink-0">
                                                New
                                            </Badge>
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm">
                                            High-performance component designed for gaming and professional workloads.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold">${(item * 99 + 49).toFixed(2)}</span>
                                            {item % 3 === 0 && (
                                                <span className="text-sm text-neutral-500 line-through">
                                                    ${(item * 149 + 99).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <Button size="sm">Add to Cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                                1
                            </Button>
                            <Button variant="outline" size="sm">
                                2
                            </Button>
                            <Button variant="outline" size="sm">
                                3
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Products.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
    ],
};
