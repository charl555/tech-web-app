import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types';

interface CategoriesIndexProps {
    categories: Category[];
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const [search, setSearch] = useState('');

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="Categories - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Categories</h1>
                        <p className="text-muted-foreground">Manage product categories.</p>
                    </div>
                    <Link href="/admin/categories/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Category
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Categories</CardTitle>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search categories..."
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
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Slug</th>
                                        <th className="pb-3 font-medium">Sort Order</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                                No categories found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCategories.map((category) => (
                                            <tr key={category.id} className="border-b last:border-0">
                                                <td className="py-3">
                                                    <div className="font-medium">{category.name}</div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">{category.slug}</td>
                                                <td className="py-3">{category.sort_order ?? 0}</td>
                                                <td className="py-3">
                                                    <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                                        {category.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <Link href={`/admin/categories/${category.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
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
