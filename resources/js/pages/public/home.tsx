import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Cpu, HardDrive, Monitor, Zap, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface HomeProps {
    featuredProducts: Product[];
}

export default function Home({ featuredProducts }: HomeProps) {
    return (
        <>
            <Head title="PCForge - Premium Computer Parts" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Badge variant="secondary" className="w-fit">
                                New Arrivals
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl lg:text-6xl">
                                Build Your Dream PC with Premium Parts
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                Shop the latest CPUs, GPUs, motherboards, and more. Quality components
                                from top brands, delivered to your door.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/products">
                                    <Button size="lg" className="gap-2">
                                        Shop Now <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/categories">
                                    <Button size="lg" variant="outline">
                                        Browse Categories
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 pt-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    Free Shipping
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    2 Year Warranty
                                </div>
                                <div className="flex items-center gap-2">
                                    <Headphones className="h-4 w-4" />
                                    24/7 Support
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="border-t py-16 dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Shop by Category
                        </h2>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Find exactly what you need from our wide selection of components.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {[
                            { name: 'CPUs', icon: Cpu, href: '/products' },
                            { name: 'GPUs', icon: Zap, href: '/products' },
                            { name: 'Motherboards', icon: Monitor, href: '/products' },
                            { name: 'RAM', icon: HardDrive, href: '/products' },
                            { name: 'Storage', icon: HardDrive, href: '/products' },
                            { name: 'Power Supplies', icon: Zap, href: '/products' },
                        ].map((category) => (
                            <Link key={category.name} href={category.href}>
                                <Card className="h-full transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                        <category.icon className="mb-3 h-10 w-10 text-neutral-600 dark:text-neutral-400" />
                                        <span className="text-sm font-medium">{category.name}</span>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="border-t py-16 dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Featured Products
                            </h2>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                Top-rated components chosen by our customers.
                            </p>
                        </div>
                        <Link href="/products">
                            <Button variant="outline" className="gap-2">
                                View All <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    {featuredProducts.length === 0 ? (
                        <div className="rounded-lg border border-dashed py-12 text-center dark:border-neutral-800">
                            <p className="text-neutral-600 dark:text-neutral-400">No featured products available right now.</p>
                            <Link href="/products">
                                <Button className="mt-4" variant="outline">Browse All Products</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}/overview`}>
                                    <Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                                        <div className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
                                        <CardHeader className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                                                <Badge variant="secondary" className="shrink-0">
                                                    {product.is_featured ? 'Featured' : 'New'}
                                                </Badge>
                                            </div>
                                            <CardDescription className="line-clamp-2 text-sm">
                                                {product.short_description ?? product.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold">${Number(product.sale_price ?? product.price).toFixed(2)}</span>
                                                <Button size="sm">Add to Cart</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="border-t py-16 dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Card className="bg-neutral-900 text-neutral-50 dark:bg-neutral-800">
                        <CardContent className="flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Summer Sale Event</h3>
                                <p className="text-neutral-300">
                                    Get up to 30% off on selected GPUs and CPUs. Limited time offer.
                                </p>
                            </div>
                            <Link href="/products">
                                <Button size="lg" variant="secondary" className="shrink-0">
                                    Shop the Sale
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    );
}

Home.layout = {
    breadcrumbs: [
        {
            title: 'Home',
            href: '/',
        },
    ],
};
