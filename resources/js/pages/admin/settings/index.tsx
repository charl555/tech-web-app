import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

interface SettingsIndexProps {
    settings: {
        store_name: string;
        contact_email: string;
        phone: string;
        address: string;
        currency: string;
        timezone: string;
        free_shipping_threshold: number;
        stripe_enabled: boolean;
        paypal_enabled: boolean;
        email_from_name: string;
        email_from_address: string;
    };
}

export default function SettingsIndex({ settings }: SettingsIndexProps) {
    const { data, setData, post, processing, errors } = useForm({
        store_name: settings.store_name,
        contact_email: settings.contact_email,
        phone: settings.phone,
        address: settings.address,
        currency: settings.currency,
        timezone: settings.timezone,
        free_shipping_threshold: settings.free_shipping_threshold,
        stripe_enabled: settings.stripe_enabled,
        paypal_enabled: settings.paypal_enabled,
        email_from_name: settings.email_from_name,
        email_from_address: settings.email_from_address,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings');
    };

    return (
        <>
            <Head title="Settings - Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Site Settings</h1>
                        <p className="text-muted-foreground">Configure global store settings.</p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Basic store information and configuration.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="store_name">Store Name</Label>
                                    <Input id="store_name" value={data.store_name} onChange={(e) => setData('store_name', e.target.value)} required />
                                    <InputError message={errors.store_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact_email">Contact Email</Label>
                                    <Input id="contact_email" type="email" value={data.contact_email} onChange={(e) => setData('contact_email', e.target.value)} />
                                    <InputError message={errors.contact_email} />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    <InputError message={errors.phone} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <select
                                        id="currency"
                                        value={data.currency}
                                        onChange={(e) => setData('currency', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                    <InputError message={errors.currency} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <select
                                        id="timezone"
                                        value={data.timezone}
                                        onChange={(e) => setData('timezone', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="America/New_York">America/New_York</option>
                                        <option value="America/Los_Angeles">America/Los_Angeles</option>
                                        <option value="Europe/London">Europe/London</option>
                                    </select>
                                    <InputError message={errors.timezone} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="free_shipping_threshold">Free Shipping Threshold ($)</Label>
                                    <Input id="free_shipping_threshold" type="number" min="0" value={data.free_shipping_threshold} onChange={(e) => setData('free_shipping_threshold', parseFloat(e.target.value))} />
                                    <InputError message={errors.free_shipping_threshold} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Payment Settings</CardTitle>
                            <CardDescription>Configure payment methods.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="stripe_enabled"
                                    checked={data.stripe_enabled}
                                    onCheckedChange={(checked) => setData('stripe_enabled', Boolean(checked))}
                                />
                                <Label htmlFor="stripe_enabled">Enable Stripe</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="paypal_enabled"
                                    checked={data.paypal_enabled}
                                    onCheckedChange={(checked) => setData('paypal_enabled', Boolean(checked))}
                                />
                                <Label htmlFor="paypal_enabled">Enable PayPal</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Email Settings</CardTitle>
                            <CardDescription>Configure email sending preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email_from_name">From Name</Label>
                                    <Input id="email_from_name" value={data.email_from_name} onChange={(e) => setData('email_from_name', e.target.value)} required />
                                    <InputError message={errors.email_from_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email_from_address">From Address</Label>
                                    <Input id="email_from_address" type="email" value={data.email_from_address} onChange={(e) => setData('email_from_address', e.target.value)} />
                                    <InputError message={errors.email_from_address} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
