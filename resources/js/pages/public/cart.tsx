import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export default function Cart() {
    return (
        <>
            <Head title="Shopping Cart - TechParts" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shopping Cart
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Review your items before checkout.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2, 3].map((item) => (
                            <Card key={item}>
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <div className="h-24 w-24 shrink-0 bg-neutral-100 dark:bg-neutral-800 sm:h-32 sm:w-32" />
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-medium">Product Name {item}</h3>
                                                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                                            High-performance component for gaming and productivity.
                                                        </p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-neutral-500 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item}</span>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-lg font-bold">${(item * 99 + 49).toFixed(2)}</span>
                                                {item === 1 && (
                                                    <Badge variant="secondary" className="gap-1">
                                                        <Tag className="h-3 w-3" />
                                                        -$20.00
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                                    <span>$548.97</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                                    <span>$43.92</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">Discount</span>
                                    <span className="text-green-600">-$20.00</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>$572.89</span>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Coupon Code</Label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Enter code" className="h-10" />
                                        <Button variant="outline" size="sm">
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg">
                                    Proceed to Checkout
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                    <ShoppingBag className="h-5 w-5" />
                                    <span>Secure checkout powered by Stripe</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Cart.layout = {
    breadcrumbs: [
        {
            title: 'Cart',
            href: '/cart',
        },
    ],
};
