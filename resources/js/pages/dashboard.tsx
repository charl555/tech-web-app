import { Head, Link } from '@inertiajs/react';
import { Package, ShoppingBag, Users, DollarSign, AlertTriangle, Tag, ShoppingCart, TicketPercent, BarChart3, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface DashboardProps {
    stats: {
        totalRevenue: number;
        totalOrders: number;
        totalCustomers: number;
        totalProducts: number;
        lowStockCount: number;
    };
    recentOrders: Array<{
        id: number;
        order_number: string;
        total_amount: number;
        status: string;
        payment_status: string;
        created_at: string;
    }>;
    recentCustomers: Array<{
        id: number;
        name: string;
        email: string;
        created_at: string;
    }>;
}

export default function Dashboard({ stats, recentOrders, recentCustomers }: DashboardProps) {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.lowStockCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders and Customers */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No orders yet.</p>
                                ) : (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Order #{order.order_number}</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{formatCurrency(order.total_amount)}</span>
                                                <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Customers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentCustomers.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No customers yet.</p>
                                ) : (
                                    recentCustomers.map((customer) => (
                                        <div key={customer.id} className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{customer.name}</p>
                                                <p className="text-xs text-muted-foreground">{customer.email}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{formatDate(customer.created_at)}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                            <Link href="/admin/products/create" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <Package className="h-6 w-6" />
                                <span className="text-xs font-medium">Add Product</span>
                            </Link>
                            <Link href="/admin/categories/create" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <Tag className="h-6 w-6" />
                                <span className="text-xs font-medium">Add Category</span>
                            </Link>
                            <Link href="/admin/brands/create" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <ShoppingBag className="h-6 w-6" />
                                <span className="text-xs font-medium">Add Brand</span>
                            </Link>
                            <Link href="/admin/coupons/create" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <TicketPercent className="h-6 w-6" />
                                <span className="text-xs font-medium">Add Coupon</span>
                            </Link>
                            <Link href="/admin/orders" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="text-xs font-medium">Orders</span>
                            </Link>
                            <Link href="/admin/customers" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <Users className="h-6 w-6" />
                                <span className="text-xs font-medium">Customers</span>
                            </Link>
                            <Link href="/admin/reports" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <BarChart3 className="h-6 w-6" />
                                <span className="text-xs font-medium">Reports</span>
                            </Link>
                            <Link href="/admin/settings" className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                                <Settings className="h-6 w-6" />
                                <span className="text-xs font-medium">Settings</span>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
