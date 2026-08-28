import { Head, Link, Form } from '@inertiajs/react';
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from 'lucide-react';
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
import { useState, useMemo } from 'react';
import type { Product, Category, Brand } from '@/types';

interface ProductsProps {
    products: Product[];
    categories: Category[];
    brands: Brand[];
}

export default function Products({ products, categories, brands }: ProductsProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sort, setSort] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const toggleFilter = (value: string, list: string[], setList: (items: string[]) => void) => {
        setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinPrice('');
        setMaxPrice('');
        setInStockOnly(false);
        setSort('featured');
        setCurrentPage(1);
    };

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const category = categories.find((c) => c.id === product.category_id);
            const brand = brands.find((b) => b.id === product.brand_id);
            const matchesCategory = selectedCategories.length === 0 || (category && selectedCategories.includes(category.slug));
            const matchesBrand = selectedBrands.length === 0 || (brand && selectedBrands.includes(brand.slug));
            const matchesMin = minPrice === '' || Number(product.price) >= Number(minPrice);
            const matchesMax = maxPrice === '' || Number(product.price) <= Number(maxPrice);
            const matchesStock = !inStockOnly || product.quantity > 0;
            return matchesCategory && matchesBrand && matchesMin && matchesMax && matchesStock;
        });

        result = [...result].sort((a, b) => {
            if (sort === 'price-low') return Number(a.price) - Number(b.price);
            if (sort === 'price-high') return Number(b.price) - Number(a.price);
            if (sort === 'newest') return a.id - b.id;
            if (sort === 'rating') return Number(b.average_rating) - Number(a.average_rating);
            return 0;
        });

        return result;
    }, [products, categories, brands, selectedCategories, selectedBrands, minPrice, maxPrice, inStockOnly, sort]);

    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice !== '' || maxPrice !== '' || inStockOnly;

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
                                    {hasActiveFilters && (
                                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={clearFilters}>
                                            Clear all
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Category</Label>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <div key={cat.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`cat-${cat.id}`}
                                                    checked={selectedCategories.includes(cat.slug)}
                                                    onCheckedChange={() => toggleFilter(cat.slug, selectedCategories, setSelectedCategories)}
                                                />
                                                <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal">
                                                    {cat.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Brand</Label>
                                    <div className="space-y-2">
                                        {brands.map((brand) => (
                                            <div key={brand.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`brand-${brand.id}`}
                                                    checked={selectedBrands.includes(brand.slug)}
                                                    onCheckedChange={() => toggleFilter(brand.slug, selectedBrands, setSelectedBrands)}
                                                />
                                                <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal">
                                                    {brand.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Price Range</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={minPrice}
                                            onChange={(e) => {
                                                setMinPrice(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="h-9"
                                        />
                                        <span className="text-neutral-500">-</span>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={maxPrice}
                                            onChange={(e) => {
                                                setMaxPrice(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="h-9"
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Availability</Label>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="in-stock"
                                            checked={inStockOnly}
                                            onCheckedChange={(checked) => {
                                                setInStockOnly(Boolean(checked));
                                                setCurrentPage(1);
                                            }}
                                        />
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
                                {filteredProducts.length === 0
                                    ? 'No results'
                                    : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of ${filteredProducts.length} results`}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 rounded-md border p-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-8 w-8 ${view === 'grid' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                                        onClick={() => setView('grid')}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-8 w-8 ${view === 'list' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                                        onClick={() => setView('list')}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Select value={sort} onValueChange={setSort}>
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

                        {paginatedProducts.length === 0 ? (
                            <div className="rounded-lg border border-dashed py-16 text-center dark:border-neutral-800">
                                <p className="text-neutral-600 dark:text-neutral-400">No products match your filters.</p>
                                <Button className="mt-4" variant="outline" onClick={clearFilters}>
                                    Clear filters
                                </Button>
                            </div>
                        ) : view === 'grid' ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {paginatedProducts.map((product) => (
                                    <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                        <div className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
                                        <CardHeader className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                                                <Badge variant="secondary" className="shrink-0">
                                                    {product.is_featured ? 'Featured' : 'New'}
                                                </Badge>
                                            </div>
                                            <CardDescription className="line-clamp-2 text-sm">
                                                {product.short_description ?? product.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="flex items-center justify-between p-4 pt-0">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">${(Number(product.sale_price ?? product.price)).toFixed(2)}</span>
                                                {product.quantity === 0 && (
                                                    <span className="text-sm text-neutral-500">Out of stock</span>
                                                )}
                                            </div>
                                            <Form action="/cart/add" method="post">
                                                <input type="hidden" name="product_id" value={product.id} />
                                                <input type="hidden" name="quantity" value="1" />
                                                <Button size="sm" type="submit" disabled={product.quantity === 0}>
                                                    {product.quantity === 0 ? 'Unavailable' : 'Add to Cart'}
                                                </Button>
                                            </Form>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {paginatedProducts.map((product) => (
                                    <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                        <CardContent className="p-4">
                                            <div className="flex gap-4">
                                                <div className="h-32 w-32 shrink-0 bg-neutral-100 dark:bg-neutral-800" />
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div>
                                                                <CardTitle className="text-base">{product.name}</CardTitle>
                                                                <CardDescription className="line-clamp-2 text-sm">
                                                                    {product.short_description ?? product.description}
                                                                </CardDescription>
                                                            </div>
                                                            <Badge variant="secondary" className="shrink-0">
                                                                {product.is_featured ? 'Featured' : 'New'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <span className="text-lg font-bold">${(Number(product.sale_price ?? product.price)).toFixed(2)}</span>
                                                        <Form action="/cart/add" method="post">
                                                            <input type="hidden" name="product_id" value={product.id} />
                                                            <input type="hidden" name="quantity" value="1" />
                                                            <Button size="sm" type="submit" disabled={product.quantity === 0}>
                                                                {product.quantity === 0 ? 'Unavailable' : 'Add to Cart'}
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                >
                                    Previous
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant="outline"
                                        size="sm"
                                        className={currentPage === page ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : ''}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
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
