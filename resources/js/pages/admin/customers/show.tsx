import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User, Order, Address, WishlistItem } from '@/types';

interface CustomerShowProps {
    customer: User;
    orders: Order[];
    addresses: Address[];
    wishlistItems: WishlistItem[];
}

export default function CustomerShow({ customer, orders, addresses, wishlistItems }: CustomerShowProps) {
    return (
        <>
            <Head title={`${customer.name} - Admin`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/customers">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{customer.name}</h1>
                        <p className="text-muted-foreground">{customer.email}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div><span className="font-medium">Name:</span> {customer.name}</div>
                            <div><span className="font-medium">Email:</span> {customer.email}</div>
                            <div><span className="font-medium">Role:</span> {customer.role}</div>
                            <div><span className="font-medium">Phone:</span> {customer.phone || 'N/A'}</div>
                            <div><span className="font-medium">Joined:</span> {new Date(customer.created_at).toLocaleDateString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Addresses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {addresses.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No addresses on file.</p>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {addresses.map((address) => (
                                        <div key={address.id} className="rounded-md border p-3 text-sm">
                                            <div className="font-medium">{address.type}</div>
                                            <div>{address.first_name} {address.last_name}</div>
                                            <div>{address.address_line_1}</div>
                                            {address.address_line_2 && <div>{address.address_line_2}</div>}
                                            <div>{address.city}, {address.state} {address.postal_code}</div>
                                            <div>{address.country}</div>
                                            {address.phone && <div>{address.phone}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 font-medium">Order #</th>
                                        <th className="pb-3 font-medium">Total</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Payment</th>
                                        <th className="pb-3 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="border-b last:border-0">
                                                <td className="py-3">#{order.order_number}</td>
                                                <td className="py-3">${Number(order.total_amount).toFixed(2)}</td>
                                                <td className="py-3">
                                                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>{order.payment_status}</Badge>
                                                </td>
                                                <td className="py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {wishlistItems.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No wishlist items.</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-3">
                                {wishlistItems.map((item) => (
                                    <div key={item.id} className="rounded-md border p-3 text-sm">
                                        <div className="font-medium">{item.product.name}</div>
                                        <div>${Number(item.product.price).toFixed(2)}</div>
                                        {item.product.sale_price && <div className="text-red-600">${Number(item.product.sale_price).toFixed(2)}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
