import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import type { Order } from '@/types';

interface OrdersIndexProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status: string;
        payment_status: string;
        search: string;
    };
}

export default function OrdersIndex({ orders, filters }: OrdersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(filters.payment_status || 'all');

    return (
        <>
            <Head title="Orders - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="text-muted-foreground">Manage customer orders.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Orders</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search orders..."
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
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                                    <SelectTrigger className="h-9 w-full md:w-40">
                                        <SelectValue placeholder="Payment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Payments</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                        <SelectItem value="refunded">Refunded</SelectItem>
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
                                        <th className="pb-3 font-medium">Order #</th>
                                        <th className="pb-3 font-medium">Customer</th>
                                        <th className="pb-3 font-medium">Total</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Payment</th>
                                        <th className="pb-3 font-medium">Date</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.data.map((order) => (
                                            <tr key={order.id} className="border-b last:border-0">
                                                <td className="py-3 font-medium">#{order.order_number}</td>
                                                <td className="py-3">{order.user?.name || 'Guest'}</td>
                                                <td className="py-3">${Number(order.total_amount).toFixed(2)}</td>
                                                <td className="py-3">
                                                    <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'cancelled' ? 'destructive' : 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant={order.payment_status === 'paid' ? 'default' : order.payment_status === 'failed' ? 'destructive' : 'secondary'}>
                                                        {order.payment_status}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="py-3 text-right">
                                                    <Link href={`/admin/orders/${order.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            View
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
