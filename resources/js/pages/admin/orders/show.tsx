import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Order, OrderItem, Payment, Address } from '@/types';

interface OrderShowProps {
    order: Order & {
        user?: { id: number; name: string; email: string };
        items: OrderItem[];
        payments: Payment[];
        shippingAddress?: Address;
        billingAddress?: Address;
    };
}

export default function OrderShow({ order }: OrderShowProps) {
    const statusForm = useForm({
        status: order.status,
    });

    const paymentStatusForm = useForm({
        payment_status: order.payment_status,
    });

    const updateStatus = () => {
        statusForm.post(`/admin/orders/${order.id}/status`, {
            onSuccess: () => statusForm.reset('status'),
        });
    };

    const updatePaymentStatus = () => {
        paymentStatusForm.post(`/admin/orders/${order.id}/payment`, {
            onSuccess: () => paymentStatusForm.reset('payment_status'),
        });
    };

    const subtotal = order.items.reduce((sum, item) => sum + Number(item.subtotal), 0);

    return (
        <>
            <Head title={`Order #${order.order_number} - Admin`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
                        <p className="text-muted-foreground">Order details and management.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div><span className="font-medium">Name:</span> {order.user?.name || 'Guest'}</div>
                            <div><span className="font-medium">Email:</span> {order.user?.email || 'N/A'}</div>
                            {order.shippingAddress && (
                                <>
                                    <div className="font-medium pt-2">Shipping Address</div>
                                    <div>{order.shippingAddress.first_name} {order.shippingAddress.last_name}</div>
                                    <div>{order.shippingAddress.address_line_1}</div>
                                    {order.shippingAddress.address_line_2 && <div>{order.shippingAddress.address_line_2}</div>}
                                    <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal_code}</div>
                                    <div>{order.shippingAddress.country}</div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Discount:</span><span>-${Number(order.discount_amount).toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Tax:</span><span>${Number(order.tax_amount).toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping:</span><span>${Number(order.shipping_amount).toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold pt-2 border-t"><span>Total:</span><span>${Number(order.total_amount).toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Payment Status:</span>
                                <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>{order.payment_status}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 font-medium">Product</th>
                                        <th className="pb-3 font-medium">Qty</th>
                                        <th className="pb-3 font-medium">Unit Price</th>
                                        <th className="pb-3 font-medium">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0">
                                            <td className="py-3">{item.product?.name || 'Product #' + item.product_id}</td>
                                            <td className="py-3">{item.quantity}</td>
                                            <td className="py-3">${Number(item.unit_price).toFixed(2)}</td>
                                            <td className="py-3">${Number(item.subtotal).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex items-end gap-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Order Status</Label>
                                    <Select value={statusForm.data.status} onValueChange={(value) => statusForm.setData('status', value)}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="delivered">Delivered</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={statusForm.errors.status} />
                                </div>
                                <Button type="button" onClick={updateStatus} disabled={statusForm.processing}>
                                    Update Status
                                </Button>
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="space-y-2">
                                    <Label htmlFor="payment_status">Payment Status</Label>
                                    <Select value={paymentStatusForm.data.payment_status} onValueChange={(value) => paymentStatusForm.setData('payment_status', value)}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={paymentStatusForm.errors.payment_status} />
                                </div>
                                <Button type="button" onClick={updatePaymentStatus} disabled={paymentStatusForm.processing}>
                                    Update Payment
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
