import { Form, Head } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Login({
    status,
    canResetPassword = true,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    return (
        <>
            <Head title="Sign In - PCForge" />
            <div className="mx-auto max-w-md px-4 py-8">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                        <ShoppingCart className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Sign In to Your Account
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Welcome back! Please enter your details to sign in.
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <Form
                        action="/account/login"
                        method="post"
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href="/forgot-password"
                                                    className="ml-auto text-sm"
                                                    tabIndex={5}
                                                >
                                                    Forgot your password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                        variant="nitro-blue-solid"
                                    >
                                        {processing && <Spinner />}
                                        Sign In
                                    </Button>
                                </div>

                                <div className="text-center text-sm text-muted-foreground">
                                    Don&apos;t have an account?{' '}
                                    <TextLink
                                        href="/account/register"
                                        tabIndex={5}
                                    >
                                        Create an account
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}
