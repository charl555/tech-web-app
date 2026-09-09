import { Head, Link } from '@inertiajs/react';
import { Truck, Shield, Headphones, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
    return (
        <>
            <Head title="About Us - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        About PCForge
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                        We are passionate about providing the highest quality computer components
                        to builders, gamers, and professionals worldwide.
                    </p>
                </div>

                <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Truck,
                            title: 'Fast Shipping',
                            description: 'Free shipping on orders over $50 with express delivery options.',
                        },
                        {
                            icon: Shield,
                            title: 'Quality Guaranteed',
                            description: 'All products are genuine and covered by manufacturer warranties.',
                        },
                        {
                            icon: Headphones,
                            title: 'Expert Support',
                            description: 'Our team of experts is here to help you 24/7.',
                        },
                        {
                            icon: Award,
                            title: 'Best Prices',
                            description: 'Competitive pricing with price match guarantee.',
                        },
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                    <item.icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                                </div>
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Story</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-neutral-600 dark:text-neutral-400">
                            <p>
                                Founded in 2020, PCForge started with a simple mission: to make
                                premium computer components accessible to everyone. What began as a small
                                online store has grown into a trusted destination for PC enthusiasts.
                            </p>
                            <p>
                                We carefully curate our inventory, partnering directly with manufacturers
                                to ensure authenticity and quality. Every product in our catalog undergoes
                                rigorous quality control before reaching our customers.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-neutral-600 dark:text-neutral-400">
                            <p>
                                We believe that building a PC should be an exciting and rewarding
                                experience. Our mission is to empower creators, gamers, and professionals
                                with the tools they need to bring their visions to life.
                            </p>
                            <p>
                                From budget-friendly builds to high-end workstations, we are committed
                                to providing expert guidance, competitive pricing, and exceptional
                                customer service at every step.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Ready to build your dream PC?
                    </h2>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Browse our catalog or get in touch with our experts for personalized recommendations.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link href="/products">
                            <Button variant="nitro-blue-solid">Shop Now</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

About.layout = {
    breadcrumbs: [
        {
            title: 'About',
            href: '/about',
        },
    ],
};
