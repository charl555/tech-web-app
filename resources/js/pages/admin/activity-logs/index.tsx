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
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { ActivityLog } from '@/types';

interface ActivityLogsIndexProps {
    logs: {
        data: ActivityLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        action: string;
    };
}

export default function ActivityLogsIndex({ logs, filters }: ActivityLogsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [actionFilter, setActionFilter] = useState(filters.action || 'all');

    return (
        <>
            <Head title="Activity Logs - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Activity Logs</h1>
                        <p className="text-muted-foreground">Track admin and user actions.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Logs</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search logs..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="h-9 w-full pl-9 md:w-64"
                                    />
                                </div>
                                <Select value={actionFilter} onValueChange={setActionFilter}>
                                    <SelectTrigger className="h-9 w-full md:w-40">
                                        <SelectValue placeholder="Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Actions</SelectItem>
                                        <SelectItem value="created">Created</SelectItem>
                                        <SelectItem value="updated">Updated</SelectItem>
                                        <SelectItem value="deleted">Deleted</SelectItem>
                                        <SelectItem value="login">Login</SelectItem>
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
                                        <th className="pb-3 font-medium">User</th>
                                        <th className="pb-3 font-medium">Action</th>
                                        <th className="pb-3 font-medium">Description</th>
                                        <th className="pb-3 font-medium">IP Address</th>
                                        <th className="pb-3 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                                No logs found.
                                            </td>
                                        </tr>
                                    ) : (
                                        logs.data.map((log) => (
                                            <tr key={log.id} className="border-b last:border-0">
                                                <td className="py-3">{log.user?.name || 'System'}</td>
                                                <td className="py-3">
                                                    <Badge variant="outline">{log.action}</Badge>
                                                </td>
                                                <td className="py-3">{log.description}</td>
                                                <td className="py-3 text-muted-foreground">{log.ip_address || 'N/A'}</td>
                                                <td className="py-3 text-muted-foreground">{new Date(log.created_at).toLocaleString()}</td>
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
