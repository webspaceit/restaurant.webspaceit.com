import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import BrandLogo from '@/components/brand-logo';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { home } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [registerErrors, setRegisterErrors] = useState<
        Record<string, string>
    >({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setRegisterErrors({});
        router.post(
            store.url(),
            {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            },
            {
                onError: (err) => {
                    setRegisterErrors(err);
                    setSubmitting(false);
                },
                onFinish: () => setSubmitting(false),
            },
        );
    }

    return (
        <>
            <Head title="Register" />

            <div className="flex h-dvh bg-gradient-to-br from-amber-600 to-orange-500">
                <div className="flex h-dvh w-full max-w-[1200px] flex-col overflow-hidden bg-white shadow-2xl md:mx-auto md:flex-row">
                    <div className="flex flex-col items-center overflow-y-auto p-8 md:w-1/2 md:p-10">
                        <div className="mb-6 flex flex-col items-center gap-3">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500">
                                    <BrandLogo className="size-10 fill-white" />
                                </div>
                            </Link>
                            <h2 className="text-xl font-bold text-gray-800">
                                Create Account
                            </h2>
                            <p className="text-sm text-gray-500">Sign Up</p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full flex-col gap-5"
                        >
                            <div className="grid gap-5">
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        placeholder="Full name"
                                        className="h-11 rounded-lg border-gray-300 text-black"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={registerErrors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="h-11 rounded-lg border-gray-300 text-black"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={registerErrors.email}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        className="h-11 rounded-lg border-gray-300 text-black"
                                        passwordrules={passwordRules}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={registerErrors.password}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        className="h-11 rounded-lg border-gray-300 text-black"
                                        passwordrules={passwordRules}
                                        value={passwordConfirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            registerErrors.password_confirmation
                                        }
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 h-11 w-full rounded-lg bg-amber-500 text-base font-semibold hover:bg-amber-600"
                                    tabIndex={5}
                                    disabled={submitting}
                                    data-test="register-user-button"
                                >
                                    {submitting && <Spinner />}
                                    Create Account
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link
                                    href={login()}
                                    className="text-amber-600 hover:text-amber-700 hover:underline"
                                    data-test="team-invitation-login-link"
                                    tabIndex={6}
                                >
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="overflow-y-auto bg-gray-50 p-8 md:w-1/2 md:p-10">
                        <h3 className="mb-6 text-lg font-bold text-gray-800">
                            RestaurantApp
                        </h3>
                        <div className="space-y-5">
                            <p className="text-sm text-gray-600">
                                Join RestaurantApp to discover amazing
                                restaurants, book tables instantly, and enjoy
                                curated dining experiences.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-500" />
                                    Browse hundreds of restaurants and menus
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-500" />
                                    Reserve tables with real-time availability
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-500" />
                                    Manage reservations and preferences
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-500" />
                                    Restaurant owners can manage their business
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Register.layout = function PassThrough({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
};
