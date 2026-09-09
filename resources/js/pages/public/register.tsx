import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { ShoppingCart } from 'lucide-react';

export default function Register({
    passwordRules = '',
}: {
    passwordRules?: string;
}) {
    return (
        <>
            <Head title="Create Account - PCForge" />
            <div className="mx-auto max-w-md px-4 py-8">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                        <ShoppingCart className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Create Your Account
                    </h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Join PCForge and start building your dream PC today.
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <Form
                        action="/account/register"
                        method="post"
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="John Doe"
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Password"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Confirm password"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                        variant="nitro-blue-solid"
                                    >
                                        {processing && <Spinner />}
                                        Create Account
                                    </Button>
                                </div>

                                <div className="text-center text-sm text-muted-foreground">
                                    Already have an account?{' '}
                                    <TextLink
                                        href="/account/login"
                                        tabIndex={6}
                                    >
                                        Sign in
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
