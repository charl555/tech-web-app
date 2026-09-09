import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Product, Category, Brand } from '@/types';

interface ProductEditProps {
    product: Product;
    categories: Category[];
    brands: Brand[];
}

export default function ProductEdit({ product, categories, brands }: ProductEditProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(String(product.category_id));
    const [brandId, setBrandId] = useState(String(product.brand_id));
    const [isFeatured, setIsFeatured] = useState(product.is_featured);
    const [isActive, setIsActive] = useState(product.is_active);

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        category_id: String(product.category_id),
        brand_id: String(product.brand_id),
        quantity: product.quantity,
        price: String(product.price),
        sale_price: product.sale_price ?? '',
        cost_price: product.cost_price ?? '',
        short_description: product.short_description ?? '',
        description: product.description,
        is_featured: product.is_featured,
        is_active: product.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('category_id', categoryId);
        setData('brand_id', brandId);
        setData('is_featured', isFeatured);
        setData('is_active', isActive);
        put(`/admin/products/${product.id}`);
    };

    return (
        <>
            <Head title={`Edit ${product.name} - Admin`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Product</h1>
                        <p className="text-muted-foreground">Update product details and settings.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>Update the details for this product.</CardDescription>
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
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Link href="/admin/products">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <form method="post" action={`/admin/products/${product.id}`} onSubmit={() => setDeleteDialogOpen(false)}>
                            <input type="hidden" name="_method" value="DELETE" />
                            <Button variant="destructive" type="submit">
                                Delete
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
