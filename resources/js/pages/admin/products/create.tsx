import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Category, Brand } from '@/types';

interface ProductCreateProps {
    categories: Category[];
    brands: Brand[];
}

export default function ProductCreate({ categories, brands }: ProductCreateProps) {
    const [categoryId, setCategoryId] = useState<string>('');
    const [brandId, setBrandId] = useState<string>('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sku: '',
        slug: '',
        category_id: '',
        brand_id: '',
        quantity: 0,
        price: '',
        sale_price: '',
        cost_price: '',
        short_description: '',
        description: '',
        is_featured: false,
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('category_id', categoryId);
        setData('brand_id', brandId);
        setData('is_featured', isFeatured);
        setData('is_active', isActive);
        post('/admin/products');
    };

    return (
        <>
            <Head title="Add Product - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Add Product</h1>
                        <p className="text-muted-foreground">Create a new product in your catalog.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>Fill in the details for the new product.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" value={data.sku} onChange={(e) => setData('sku', e.target.value)} required />
                                    <InputError message={errors.sku} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />
                                    <InputError message={errors.slug} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select value={categoryId} onValueChange={setCategoryId} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="brand_id">Brand</Label>
                                    <Select value={brandId} onValueChange={setBrandId} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={String(brand.id)}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.brand_id} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input id="quantity" type="number" min="0" value={data.quantity} onChange={(e) => setData('quantity', parseInt(e.target.value) || 0)} required />
                                    <InputError message={errors.quantity} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} required />
                                    <InputError message={errors.price} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale_price">Sale Price (optional)</Label>
                                    <Input id="sale_price" type="number" step="0.01" min="0" value={data.sale_price} onChange={(e) => setData('sale_price', e.target.value)} />
                                    <InputError message={errors.sale_price} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cost_price">Cost Price (optional)</Label>
                                    <Input id="cost_price" type="number" step="0.01" min="0" value={data.cost_price} onChange={(e) => setData('cost_price', e.target.value)} />
                                    <InputError message={errors.cost_price} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Input id="short_description" value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} />
                                <InputError message={errors.short_description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="is_featured"
                                        checked={isFeatured}
                                        onCheckedChange={(checked) => setIsFeatured(Boolean(checked))}
                                    />
                                    <Label htmlFor="is_featured">Featured</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={isActive}
                                        onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Product'}
                                </Button>
                                <Link href="/admin/products">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
