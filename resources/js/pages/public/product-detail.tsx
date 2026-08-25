import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function ProductDetail() {
    const [openSection, setOpenSection] = useState<string | null>('description');

    return (
        <>
            <Head title="Product Detail - TechParts" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <Link
                    href="/products"
                    className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <Card className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((img) => (
                                <Card key={img} className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge>In Stock</Badge>
                                <Badge variant="secondary">New</Badge>
                            </div>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Product Name Example
                            </h1>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                High-performance component designed for gaming and professional workloads.
                                Built with premium materials and advanced technology.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">(128 reviews)</span>
                        </div>

                        <Separator />

                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold">$299.99</span>
                            <span className="text-xl text-neutral-500 line-through">$399.99</span>
                            <Badge variant="destructive">Save 25%</Badge>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Quantity</Label>
                                <div className="mt-1 flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-10 w-10">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center text-lg font-medium">1</span>
                                    <Button variant="outline" size="icon" className="h-10 w-10">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button size="lg" className="flex-1 gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Heart className="h-5 w-5" />
                                    Wishlist
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-2 text-neutral-600">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                                <div>
                                    <p className="text-sm font-medium">Free Shipping</p>
                                    <p className="text-xs text-neutral-500">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                                <div>
                                    <p className="text-sm font-medium">2 Year Warranty</p>
                                    <p className="text-xs text-neutral-500">Full coverage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                                <div>
                                    <p className="text-sm font-medium">30-Day Returns</p>
                                    <p className="text-xs text-neutral-500">No questions asked</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-4">
                    <Collapsible
                        open={openSection === 'description'}
                        onOpenChange={(isOpen) => setOpenSection(isOpen ? 'description' : null)}
                    >
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left">
                            <span className="font-semibold">Description</span>
                            <span className="text-sm text-neutral-500">Product description and overview</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 rounded-lg border p-4">
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Detailed product description goes here. This component features cutting-edge
                                technology, exceptional performance, and reliable durability. Perfect for
                                gamers, content creators, and professionals who demand the best.
                            </p>
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible
                        open={openSection === 'specifications'}
                        onOpenChange={(isOpen) => setOpenSection(isOpen ? 'specifications' : null)}
                    >
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left">
                            <span className="font-semibold">Specifications</span>
                            <span className="text-sm text-neutral-500">Technical details and specs</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 rounded-lg border p-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[
                                    ['Brand', 'Brand Name'],
                                    ['Model', 'Model XYZ'],
                                    ['Warranty', '2 Years'],
                                    ['Weight', '500g'],
                                    ['Dimensions', '10 x 10 x 5 cm'],
                                    ['Color', 'Black'],
                                ].map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b py-2 dark:border-neutral-800">
                                        <span className="font-medium">{key}</span>
                                        <span className="text-neutral-600 dark:text-neutral-400">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible
                        open={openSection === 'reviews'}
                        onOpenChange={(isOpen) => setOpenSection(isOpen ? 'reviews' : null)}
                    >
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left">
                            <span className="font-semibold">Reviews (128)</span>
                            <span className="text-sm text-neutral-500">Customer feedback and ratings</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-4 rounded-lg border p-4">
                            {[1, 2, 3].map((review) => (
                                <div key={review} className="border-b pb-4 last:border-0 last:pb-0 dark:border-neutral-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Customer Name {review}</p>
                                            <div className="mt-1 flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm text-neutral-500">2 days ago</span>
                                    </div>
                                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        Great product! Exactly what I was looking for. Fast shipping and excellent
                                        quality. Would definitely recommend to others.
                                    </p>
                                </div>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </>
    );
}

ProductDetail.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Product Detail',
            href: '/products/1',
        },
    ],
};
