import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { User } from '@/types';

interface CustomersIndexProps {
    customers: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
    };
}

export default function CustomersIndex({ customers, filters }: CustomersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    return (
        <>
            <Head title="Customers - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Customers</h1>
                        <p className="text-muted-foreground">Manage registered customers.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Customers</CardTitle>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search customers..."
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
                                        <th className="pb-3 font-medium">Email</th>
                                        <th className="pb-3 font-medium">Registered</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-muted-foreground">
                                                No customers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        customers.data.map((customer) => (
                                            <tr key={customer.id} className="border-b last:border-0">
                                                <td className="py-3">
                                                    <div className="font-medium">{customer.name}</div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">{customer.email}</td>
                                                <td className="py-3">{new Date(customer.created_at).toLocaleDateString()}</td>
                                                <td className="py-3 text-right">
                                                    <Link href={`/admin/customers/${customer.id}`}>
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
