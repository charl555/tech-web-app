import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CouponCreate() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        discount_type: 'percentage',
        discount_value: '',
        min_order_amount: '',
        max_discount_amount: '',
        usage_limit: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/coupons');
    };

    return (
        <>
            <Head title="Add Coupon - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/coupons">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Add Coupon</h1>
                        <p className="text-muted-foreground">Create a new discount coupon.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Coupon Information</CardTitle>
                        <CardDescription>Fill in the details for the new coupon.</CardDescription>
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
                                    {processing ? 'Creating...' : 'Create Coupon'}
                                </Button>
                                <Link href="/admin/coupons">
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
