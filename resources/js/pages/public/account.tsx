import { Head, Link, Form } from '@inertiajs/react';
import { User, Lock, Heart, ShoppingBag, Package } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Order, WishlistItem } from '@/types';

interface AccountProps {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
    orders: Order[];
    wishlistItems: (WishlistItem & {
        product: {
            id: number;
            name: string;
            price: number;
            sale_price?: number;
            is_active: boolean;
        };
    })[];
}

export default function Account({ user, orders, wishlistItems }: AccountProps) {
    const [activeTab, setActiveTab] = useState('profile');
    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });

    const tabs = [
        { key: 'profile', label: 'Profile', icon: User },
        { key: 'security', label: 'Security', icon: Lock },
        { key: 'wishlist', label: 'Wishlist', icon: Heart },
        { key: 'orders', label: 'Orders', icon: ShoppingBag },
    ];

    return (
        <>
            <Head title="My Account - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        My Account
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Manage your profile, orders, and preferences.
                    </p>
                </div>

                <div className="mt-6 w-full">
                    <div className="border-b border-neutral-200 dark:border-neutral-800">
                        <nav className="-mb-px flex gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`border-b-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeTab === tab.key
                                            ? 'border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100'
                                            : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-6">
                        {activeTab === 'profile' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>
                                        Your account details and membership
                                        info.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Full Name
                                            </Label>
                                            <div className="rounded-md border bg-neutral-50 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Email Address
                                            </Label>
                                            <div className="rounded-md border bg-neutral-50 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Member Since
                                            </Label>
                                            <div className="rounded-md border bg-neutral-50 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900">
                                                {memberSince}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'security' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                                    <CardDescription>
                                        Update your account password to keep it
                                        secure.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form
                                        action="/account/password"
                                        method="post"
                                        className="space-y-6"
                                    >
                                        {({ errors, processing }) => (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="current_password">
                                                        Current Password
                                                    </Label>
                                                    <Input
                                                        id="current_password"
                                                        type="password"
                                                        name="current_password"
                                                        required
                                                        autoComplete="current-password"
                                                        placeholder="Current password"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.current_password
                                                        }
                                                    />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="password">
                                                        New Password
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        required
                                                        autoComplete="new-password"
                                                        placeholder="New password"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="password_confirmation">
                                                        Confirm Password
                                                    </Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        name="password_confirmation"
                                                        required
                                                        autoComplete="new-password"
                                                        placeholder="Confirm password"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
                                                    />
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        disabled={processing}
                                                        type="submit"
                                                        variant="nitro-blue-solid"
                                                    >
                                                        {processing
                                                            ? 'Updating...'
                                                            : 'Update Password'}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'wishlist' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Wishlist</CardTitle>
                                    <CardDescription>
                                        Products you've saved for later.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {wishlistItems.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <Heart className="mx-auto h-12 w-12 text-neutral-400" />
                                            <p className="mt-4 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                                Your wishlist is empty
                                            </p>
                                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                                Save items you like by clicking
                                                the heart icon on any product.
                                            </p>
                                            <Link href="/products">
                                                <Button className="mt-4">
                                                    Browse Products
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {wishlistItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between rounded-lg border p-4 dark:border-neutral-800"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 shrink-0 bg-neutral-100 dark:bg-neutral-800" />
                                                        <div>
                                                            <Link
                                                                href={`/products/${item.product.id}/overview`}
                                                                className="font-medium hover:underline"
                                                            >
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </Link>
                                                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                                                $
                                                                {Number(
                                                                    item.product
                                                                        .sale_price ??
                                                                        item
                                                                            .product
                                                                            .price,
                                                                ).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {item.product
                                                            .is_active ? (
                                                            <Link
                                                                href={`/products/${item.product.id}/overview`}
                                                            >
                                                                <Button size="sm">
                                                                    View
                                                                </Button>
                                                            </Link>
                                                        ) : (
                                                            <Badge variant="secondary">
                                                                Unavailable
                                                            </Badge>
                                                        )}
                                                        <Form
                                                            action="/wishlist/toggle"
                                                            method="post"
                                                        >
                                                            <input
                                                                type="hidden"
                                                                name="product_id"
                                                                value={
                                                                    item.product
                                                                        .id
                                                                }
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-neutral-500 hover:text-red-500"
                                                            >
                                                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'orders' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order History</CardTitle>
                                    <CardDescription>
                                        View your recent orders and their
                                        status.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {orders.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <Package className="mx-auto h-12 w-12 text-neutral-400" />
                                            <p className="mt-4 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                                No orders yet
                                            </p>
                                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                                When you place an order, it will
                                                appear here.
                                            </p>
                                            <Link href="/products">
                                                <Button
                                                    className="mt-4"
                                                    variant="nitro-blue-solid"
                                                >
                                                    Start Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Link
                                                                href={`/orders/${order.id}`}
                                                                className="font-medium hover:underline"
                                                            >
                                                                Order #
                                                                {
                                                                    order.order_number
                                                                }
                                                            </Link>
                                                            <Badge
                                                                variant={
                                                                    order.status ===
                                                                    'delivered'
                                                                        ? 'default'
                                                                        : order.status ===
                                                                            'cancelled'
                                                                          ? 'destructive'
                                                                          : 'secondary'
                                                                }
                                                            >
                                                                {order.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                            Placed on{' '}
                                                            {new Date(
                                                                order.created_at,
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                                                        <span className="text-lg font-bold">
                                                            $
                                                            {Number(
                                                                order.total_amount,
                                                            ).toFixed(2)}
                                                        </span>
                                                        <Badge
                                                            variant={
                                                                order.payment_status ===
                                                                'paid'
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {
                                                                order.payment_status
                                                            }
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Account.layout = {
    breadcrumbs: [
        {
            title: 'Account',
            href: '/account',
        },
    ],
};
