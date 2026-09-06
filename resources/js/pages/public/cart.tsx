import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Form } from '@inertiajs/react';

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    discount: number;
}

interface CartProps {
    cartItems: CartItem[];
}

export default function Cart({ cartItems }: CartProps) {
    const [coupon, setCoupon] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountTotal = cartItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal - discountTotal + shipping + tax).toFixed(2);

    return (
        <>
            <Head title="Shopping Cart - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Shopping Cart
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Review your items before checkout.
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="rounded-lg border border-dashed py-16 text-center dark:border-neutral-800">
                        <ShoppingBag className="mx-auto h-12 w-12 text-neutral-400" />
                        <p className="mt-4 text-lg font-medium text-neutral-900 dark:text-neutral-100">Your cart is empty</p>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Looks like you haven't added anything yet.</p>
                        <Link href="/products">
                            <Button className="mt-6">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            <div className="h-24 w-24 shrink-0 bg-neutral-100 dark:bg-neutral-800 sm:h-32 sm:w-32" />
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h3 className="font-medium">{item.name}</h3>
                                                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Form action="/cart/remove" method="post">
                                                            <input type="hidden" name="product_id" value={item.id} />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 shrink-0 text-neutral-500 hover:text-red-500"
                                                                type="submit"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                    <div className="mt-3 flex items-center gap-2">
                                                        <Form action="/cart/update" method="post" className="flex items-center gap-2">
                                                            <input type="hidden" name="product_id" value={item.id} />
                                                            <input type="hidden" name="quantity" value={Math.max(1, item.quantity - 1)} />
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                type="submit"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                        </Form>
                                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                        <Form action="/cart/update" method="post" className="flex items-center gap-2">
                                                            <input type="hidden" name="product_id" value={item.id} />
                                                            <input type="hidden" name="quantity" value={item.quantity + 1} />
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                type="submit"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </Form>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                    {item.discount > 0 && (
                                                        <Badge variant="secondary" className="gap-1">
                                                            <Tag className="h-3 w-3" />
                                                            -${(item.discount * item.quantity).toFixed(2)}
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
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                                        <span className={shipping === 0 ? 'text-green-600' : undefined}>
                                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                                        <span>${tax}</span>
                                    </div>
                                    {discountTotal > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-neutral-600 dark:text-neutral-400">Discount</span>
                                            <span className="text-green-600">-${discountTotal.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Coupon Code</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                className="h-10"
                                            />
                                            <Button variant="outline" size="sm">
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" size="lg" disabled>
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
                )}
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
