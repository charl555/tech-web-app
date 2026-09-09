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
import type { Coupon } from '@/types';

interface CouponsIndexProps {
    coupons: {
        data: Coupon[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
    };
}

export default function CouponsIndex({ coupons, filters }: CouponsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    return (
        <>
            <Head title="Coupons - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Coupons</h1>
                        <p className="text-muted-foreground">Manage discount coupons.</p>
                    </div>
                    <Link href="/admin/coupons/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Coupon
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Coupons</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search coupons..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="h-9 w-full pl-9 md:w-64"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="h-9 w-full md:w-40">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
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
                                        <th className="pb-3 font-medium">Code</th>
                                        <th className="pb-3 font-medium">Type</th>
                                        <th className="pb-3 font-medium">Value</th>
                                        <th className="pb-3 font-medium">Usage</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                No coupons found.
                                            </td>
                                        </tr>
                                    ) : (
                                        coupons.data.map((coupon) => (
                                            <tr key={coupon.id} className="border-b last:border-0">
                                                <td className="py-3 font-medium">{coupon.code}</td>
                                                <td className="py-3 capitalize">{coupon.discount_type}</td>
                                                <td className="py-3">{coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `$${Number(coupon.discount_value).toFixed(2)}`}</td>
                                                <td className="py-3">{coupon.used_count} / {coupon.usage_limit || '∞'}</td>
                                                <td className="py-3">
                                                    <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
                                                        {coupon.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <Link href={`/admin/coupons/${coupon.id}/edit`}>
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
