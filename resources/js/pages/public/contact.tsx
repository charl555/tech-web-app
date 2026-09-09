import { Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us - PCForge" />

            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Contact Us
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                        Have a question or need assistance? We are here to help.
                        Reach out to our team and we will get back to you as
                        soon as possible.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">
                                                First name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">
                                                Last name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <textarea
                                            id="message"
                                            placeholder="Tell us more about your inquiry..."
                                            rows={6}
                                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-100"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="nitro-blue-solid"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Email
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            support@PCForge.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Phone
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Address
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            123 Tech Street
                                            <br />
                                            San Francisco, CA 94105
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600 dark:text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Business Hours
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                            <br />
                                            Sat: 10:00 AM - 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>FAQ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        What is your return policy?
                                    </p>
                                    <p className="mt-1">
                                        30-day hassle-free returns on all
                                        unopened products.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        How long does shipping take?
                                    </p>
                                    <p className="mt-1">
                                        Standard shipping: 3-5 business days.
                                        Express: 1-2 days.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        Do you offer international shipping?
                                    </p>
                                    <p className="mt-1">
                                        Yes, we ship to over 50 countries
                                        worldwide.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = {
    breadcrumbs: [
        {
            title: 'Contact',
            href: '/contact',
        },
    ],
};
