import { Head, Link, Form } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { Product } from '@/types';

interface ProductOverviewProps {
    product: Product;
    isWishlisted?: boolean;
}

export default function ProductOverview({ product, isWishlisted = false }: ProductOverviewProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [wishlisted, setWishlisted] = useState(isWishlisted);

    const addToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    const price = Number(product.sale_price ?? product.price);
    const originalPrice = Number(product.price);
    const inStock = product.quantity > 0;
    const images = Array.from({ length: 4 }, (_, i) => i + 1);
    const [activeTab, setActiveTab] = useState('description');

    return (
        <>
            <Head title={`${product.name} - TechParts`} />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Link href="/products" className="hover:text-neutral-900 dark:hover:text-neutral-100">Products</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/products" className="hover:text-neutral-900 dark:hover:text-neutral-100">{product.category?.name ?? 'Category'}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-neutral-900 dark:text-neutral-100">{product.name}</span>
                </nav>

                {!inStock ? (
                    <div className="rounded-lg border border-dashed py-16 text-center dark:border-neutral-800">
                        <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">This product is currently out of stock.</p>
                        <Link href="/products">
                            <Button className="mt-4" variant="outline">Browse Other Products</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Main Product Section */}
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <Card className="aspect-square bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-neutral-500">Product Image {selectedImage + 1}</span>
                                    </div>
                                </Card>
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((img) => (
                                        <Card
                                            key={img}
                                            className={`aspect-square cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${selectedImage === img - 1 ? 'ring-2 ring-neutral-900 dark:ring-neutral-100' : ''}`}
                                            onClick={() => setSelectedImage(img - 1)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="default">{inStock ? 'In Stock' : 'Out of Stock'}</Badge>
                                        {product.is_featured && <Badge variant="secondary">Featured</Badge>}
                                        {product.sale_price && <Badge variant="destructive">On Sale</Badge>}
                                    </div>
                                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                        {product.name}
                                    </h1>
                                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        SKU: {product.sku}
                                    </p>
                                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                        {product.short_description ?? product.description}
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {stars.map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-5 w-5 ${star <= Math.round(Number(product.average_rating)) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {Number(product.average_rating).toFixed(1)} ({product.total_reviews} reviews)
                                    </span>
                                </div>

                                <Separator />

                                {/* Price */}
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                                    {product.sale_price && (
                                        <>
                                            <span className="text-xl text-neutral-500 line-through">${originalPrice.toFixed(2)}</span>
                                            <Badge variant="destructive">Save {Math.round((1 - price / originalPrice) * 100)}%</Badge>
                                        </>
                                    )}
                                </div>

                                <Separator />

                                {/* Quantity and Actions */}
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
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {product.quantity} available
                                            </span>
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
                                            >
                                                <ShoppingCart className="h-5 w-5" />
                                                {addedToCart ? 'Added!' : 'Add to Cart'}
                                            </Button>
                                        </Form>
                                        <Form action="/wishlist/toggle" method="post" className="flex-1">
                                            <input type="hidden" name="product_id" value={product.id} />
                                            <Button
                                                size="lg"
                                                variant={wishlisted ? 'default' : 'outline'}
                                                className={`w-full gap-2 ${wishlisted ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900' : ''}`}
                                                type="submit"
                                                onClick={() => setWishlisted(!wishlisted)}
                                            >
                                                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                                                {wishlisted ? 'Wishlisted' : 'Wishlist'}
                                            </Button>
                                        </Form>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="sm" className="gap-2 text-neutral-600">
                                            <Share2 className="h-4 w-4" />
                                            Share
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Shipping and Returns */}
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

                        {/* Detailed Information Tabs */}
                        <div className="mt-12">
                            <div className="border-b border-neutral-200 dark:border-neutral-800">
                                <nav className="-mb-px flex gap-8">
                                    {[
                                        { key: 'description', label: 'Description' },
                                        { key: 'specifications', label: 'Specifications' },
                                        { key: 'reviews', label: `Reviews (${product.total_reviews})` },
                                    ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-colors ${
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
                                {activeTab === 'description' && (
                                    <Card>
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                                            <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                                                {product.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}

                                {activeTab === 'specifications' && (
                                    <Card>
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {[
                                                    ['Brand', product.brand?.name ?? 'N/A'],
                                                    ['Category', product.category?.name ?? 'N/A'],
                                                    ['Availability', inStock ? 'In Stock' : 'Out of Stock'],
                                                    ['SKU', product.sku],
                                                    ['Weight', '500g'],
                                                    ['Dimensions', '10 x 10 x 5 cm'],
                                                ].map(([key, value]) => (
                                                    <div key={key} className="flex justify-between border-b py-3 dark:border-neutral-800">
                                                        <span className="font-medium">{key}</span>
                                                        <span className="text-neutral-600 dark:text-neutral-400">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {activeTab === 'reviews' && (
                                    <Card>
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                                            {Number(product.total_reviews) === 0 ? (
                                                <p className="text-neutral-600 dark:text-neutral-400">No reviews yet. Be the first to review this product!</p>
                                            ) : (
                                                <div className="space-y-6">
                                                    {[1, 2, 3].map((review) => (
                                                        <div key={review} className="border-b pb-6 last:border-0 last:pb-0 dark:border-neutral-800">
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
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

ProductOverview.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Overview',
            href: `/products/${1}/overview`,
        },
    ],
};
