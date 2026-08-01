import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingCart, CalendarCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'Restaurants', href: '/restaurants' },
        ...(auth.user ? [{ title: 'My Reservations', href: '/customer/reservations' }] : []),
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <header className="sticky top-0 z-50 w-full border-b bg-background">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <span className="text-primary">Restaurant</span>
                            <span>App</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                        {auth.user ? (
                            <Link href="/customer/reservations">
                                <Button variant="outline" size="sm">
                                    <CalendarCheck className="mr-2 h-4 w-4" />
                                    My Reservations
                                </Button>
                            </Link>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">Register</Button>
                                </Link>
                            </div>
                        )}

                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-2 mt-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    ))}
                                    <Separator className="my-2" />
                                    {auth.user ? (
                                        <Link href="/customer/reservations" onClick={() => setOpen(false)}>
                                            <Button className="w-full" variant="outline">
                                                <CalendarCheck className="mr-2 h-4 w-4" />
                                                My Reservations
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setOpen(false)}>
                                                <Button className="w-full" variant="ghost">Log in</Button>
                                            </Link>
                                            <Link href="/register" onClick={() => setOpen(false)}>
                                                <Button className="w-full">Register</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} RestaurantApp. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                            <Link href="/restaurants" className="hover:text-foreground transition-colors">Restaurants</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
