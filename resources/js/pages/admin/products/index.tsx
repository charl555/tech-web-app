import { Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Product, Category, Brand } from '@/types';

interface ProductsIndexProps {
    products: Product[];
    categories: Category[];
    brands: Brand[];
}

export default function ProductsIndex({
    products,
    categories,
    brands,
}: ProductsIndexProps) {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [brandFilter, setBrandFilter] = useState<string>('all');

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            categoryFilter === 'all' ||
            String(product.category_id) === categoryFilter;
        const matchesBrand =
            brandFilter === 'all' || String(product.brand_id) === brandFilter;

        return matchesSearch && matchesCategory && matchesBrand;
    });

    return (
        <>
            <Head title="Products - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-muted-foreground">
                            Manage your product catalog.
                        </p>
                    </div>
                    <Link href="/admin/products/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Products</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="h-9 w-full pl-9 md:w-64"
                                    />
                                </div>
                                <Select
                                    value={categoryFilter}
                                    onValueChange={setCategoryFilter}
                                >
                                    <SelectTrigger className="h-9 w-full md:w-40">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={brandFilter}
                                    onValueChange={setBrandFilter}
                                >
                                    <SelectTrigger className="h-9 w-full md:w-40">
                                        <SelectValue placeholder="Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Brands
                                        </SelectItem>
                                        {brands.map((brand) => (
                                            <SelectItem
                                                key={brand.id}
                                                value={String(brand.id)}
                                            >
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                            SKU
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Price
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Stock
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
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-3">
                                                    <div className="font-medium">
                                                        {product.name}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">
                                                    {product.sku}
                                                </td>
                                                <td className="py-3">
                                                    $
                                                    {Number(
                                                        product.price,
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-3">
                                                    <span
                                                        className={
                                                            product.quantity <
                                                            10
                                                                ? 'text-red-600'
                                                                : ''
                                                        }
                                                    >
                                                        {product.quantity}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex gap-1">
                                                        <Badge
                                                            variant={
                                                                product.is_active
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {product.is_active
                                                                ? 'Active'
                                                                : 'Inactive'}
                                                        </Badge>
                                                        {product.is_featured && (
                                                            <Badge variant="outline">
                                                                Featured
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/admin/products/${product.id}/edit`}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </div>
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
