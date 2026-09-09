import { Head } from '@inertiajs/react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product, User as UserType } from '@/types';

interface ReportsIndexProps {
    stats: {
        revenue: number;
        orders: number;
        avgOrderValue: number;
        newCustomers: number;
    };
    topProducts: (Product & { sold_count: number })[];
    topCustomers: (UserType & { total_spent: number })[];
}

export default function ReportsIndex({ stats, topProducts, topCustomers }: ReportsIndexProps) {
    return (
        <>
            <Head title="Reports - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                        <p className="text-muted-foreground">Sales performance and customer insights.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Number(stats.revenue).toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Total revenue</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.orders}</div>
                            <p className="text-xs text-muted-foreground">Total orders</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Number(stats.avgOrderValue).toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Average order value</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.newCustomers}</div>
                            <p className="text-xs text-muted-foreground">Total customers</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Selling Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 font-medium">Product</th>
                                            <th className="pb-3 font-medium text-right">Sold</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topProducts.length === 0 ? (
                                            <tr>
                                                <td colSpan={2} className="py-8 text-center text-muted-foreground">
                                                    No data available.
                                                </td>
                                            </tr>
                                        ) : (
                                            topProducts.map((product) => (
                                                <tr key={product.id} className="border-b last:border-0">
                                                    <td className="py-3">{product.name}</td>
                                                    <td className="py-3 text-right">{product.sold_count}</td>
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
                            <CardTitle>Top Customers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 font-medium">Customer</th>
                                            <th className="pb-3 font-medium text-right">Total Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topCustomers.length === 0 ? (
                                            <tr>
                                                <td colSpan={2} className="py-8 text-center text-muted-foreground">
                                                    No data available.
                                                </td>
                                            </tr>
                                        ) : (
                                            topCustomers.map((customer) => (
                                                <tr key={customer.id} className="border-b last:border-0">
                                                    <td className="py-3">{customer.name}</td>
                                                    <td className="py-3 text-right">${Number(customer.total_spent).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
