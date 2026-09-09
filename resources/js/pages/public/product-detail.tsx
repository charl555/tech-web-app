import { Head, Link, Form } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/types';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>('description');

    const addToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    const price = Number(product.sale_price ?? product.price);
    const originalPrice = Number(product.price);
    const inStock = product.quantity > 0;

    return (
        <>
            <Head title={`${product.name} - PCForge`} />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <Link
                    href="/products"
                    className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>

                {!inStock ? (
                    <div className="rounded-lg border border-dashed py-16 text-center dark:border-neutral-800">
                        <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">This product is currently out of stock.</p>
                        <Link href="/products">
                            <Button className="mt-4" variant="outline">Browse Other Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-4">
                            <Card className="aspect-square bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                <span className="text-neutral-500">Product Image {selectedImage + 1}</span>
                            </Card>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((_, img) => (
                                    <Card
                                        key={img}
                                        className={`aspect-square cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${selectedImage === img ? 'ring-2 ring-neutral-900 dark:ring-neutral-100' : ''}`}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge>{inStock ? 'In Stock' : 'Out of Stock'}</Badge>
                                    <Badge variant="secondary">{product.is_featured ? 'Featured' : 'New'}</Badge>
                                </div>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                    {product.name}
                                </h1>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                    {product.short_description ?? product.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {stars.map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.round(Number(product.average_rating)) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">({product.total_reviews} reviews)</span>
                            </div>

                            <Separator />

                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                                {product.sale_price && (
                                    <span className="text-xl text-neutral-500 line-through">${originalPrice.toFixed(2)}</span>
                                )}
                                {product.sale_price && (
                                    <Badge variant="destructive">Save {Math.round((1 - price / originalPrice) * 100)}%</Badge>
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Quantity</Label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                                            disabled={quantity >= product.quantity}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Form action="/cart/add" method="post" className="flex-1">
                                        <input type="hidden" name="product_id" value={product.id} />
                                        <input type="hidden" name="quantity" value={quantity} />
                                        <Button
                                            size="lg"
                                            className="w-full gap-2"
                                            type="submit"
                                            onClick={addToCart}
                                            variant="nitro-blue-solid"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            {addedToCart ? 'Added!' : 'Add to Cart'}
                                        </Button>
                                    </Form>
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
                )}

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
                                {product.description}
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
                                    ['Brand', product.brand?.name ?? 'Brand Name'],
                                    ['Model', product.name],
                                    ['Availability', inStock ? 'In Stock' : 'Out of Stock'],
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
                            <span className="font-semibold">Reviews ({product.total_reviews})</span>
                            <span className="text-sm text-neutral-500">Customer feedback and ratings</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-4 rounded-lg border p-4">
                            {Number(product.total_reviews) === 0 ? (
                                <p className="text-neutral-600 dark:text-neutral-400">No reviews yet.</p>
                            ) : (
                                <div className="space-y-4">
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
                                </div>
                            )}
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
            href: `/products/${1}`,
        },
    ],
};
