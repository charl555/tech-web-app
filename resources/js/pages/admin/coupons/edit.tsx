import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
import type { Coupon } from '@/types';

interface CouponEditProps {
    coupon: Coupon;
}

export default function CouponEdit({ coupon }: CouponEditProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: String(coupon.discount_value),
        min_order_amount: coupon.min_order_amount ?? '',
        max_discount_amount: coupon.max_discount_amount ?? '',
        usage_limit: coupon.usage_limit ?? '',
        start_date: coupon.start_date ? new Date(coupon.start_date).toISOString().split('T')[0] : '',
        end_date: coupon.end_date ? new Date(coupon.end_date).toISOString().split('T')[0] : '',
        is_active: coupon.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/coupons/${coupon.id}`);
    };

    return (
        <>
            <Head title={`Edit ${coupon.code} - Admin`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/coupons">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Coupon</h1>
                        <p className="text-muted-foreground">Update coupon details and settings.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Coupon Information</CardTitle>
                        <CardDescription>Update the details for this coupon.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="code">Coupon Code</Label>
                                    <Input id="code" value={data.code} onChange={(e) => setData('code', e.target.value.toUpperCase())} required />
                                    <InputError message={errors.code} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discount_type">Discount Type</Label>
                                    <select
                                        id="discount_type"
                                        value={data.discount_type}
                                        onChange={(e) => setData('discount_type', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                    <InputError message={errors.discount_type} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="discount_value">Discount Value</Label>
                                    <Input id="discount_value" type="number" step="0.01" min="0" value={data.discount_value} onChange={(e) => setData('discount_value', e.target.value)} required />
                                    <InputError message={errors.discount_value} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="usage_limit">Usage Limit (optional)</Label>
                                    <Input id="usage_limit" type="number" min="1" value={data.usage_limit} onChange={(e) => setData('usage_limit', e.target.value)} />
                                    <InputError message={errors.usage_limit} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="min_order_amount">Min Order Amount (optional)</Label>
                                    <Input id="min_order_amount" type="number" step="0.01" min="0" value={data.min_order_amount} onChange={(e) => setData('min_order_amount', e.target.value)} />
                                    <InputError message={errors.min_order_amount} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="max_discount_amount">Max Discount Amount (optional)</Label>
                                    <Input id="max_discount_amount" type="number" step="0.01" min="0" value={data.max_discount_amount} onChange={(e) => setData('max_discount_amount', e.target.value)} />
                                    <InputError message={errors.max_discount_amount} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date (optional)</Label>
                                    <Input id="start_date" type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                                    <InputError message={errors.start_date} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date (optional)</Label>
                                    <Input id="end_date" type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                                    <InputError message={errors.end_date} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Link href="/admin/coupons">
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
                                    Delete Coupon
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Coupon</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete coupon <strong>{coupon.code}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <form method="post" action={`/admin/coupons/${coupon.id}`} onSubmit={() => setDeleteDialogOpen(false)}>
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
