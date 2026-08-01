import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { edit, update } from '@/routes/branding';

type BrandingProps = {
    app_name: string | null;
    logo_url: string | null;
    favicon_url: string | null;
    login_logo_url: string | null;
};

type Props = {
    branding: BrandingProps;
};

type Field = 'logo' | 'favicon' | 'login_logo';

function UploadField({
    title,
    description,
    preview,
    file,
    error,
    accept,
    onSelect,
}: {
    title: string;
    description: string;
    preview: string | null;
    file: File | null;
    error?: string;
    accept: string;
    onSelect: (file: File | null) => void;
}) {
    const [localPreview, setLocalPreview] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;

        if (localPreview && file) {
            URL.revokeObjectURL(localPreview);
        }

        setLocalPreview(file ? URL.createObjectURL(file) : null);
        onSelect(file);
    }

    const previewUrl = localPreview ?? preview;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted p-2">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt={title}
                            className="size-full object-contain"
                        />
                    ) : (
                        <AppLogoIcon className="size-10 fill-current text-muted-foreground" />
                    )}
                </div>
                <div className="grid flex-1 gap-2">
                    <Input
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                    />
                    {file && (
                        <p className="text-xs text-muted-foreground">
                            {file.name}
                        </p>
                    )}
                    <InputError message={error} />
                </div>
            </CardContent>
        </Card>
    );
}

export default function Branding({ branding }: Props) {
    return (
        <BrandingForm
            key={`${branding.app_name}-${branding.logo_url}-${branding.favicon_url}-${branding.login_logo_url}`}
            branding={branding}
        />
    );
}

function BrandingForm({ branding }: Props) {
    const { data, setData, processing, errors } = useForm({
        app_name: branding.app_name ?? '',
        logo: null as File | null,
        favicon: null as File | null,
        login_logo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload: Record<string, string | File> = {
            app_name: data.app_name,
        };

        if (data.logo) {
            payload.logo = data.logo;
        }

        if (data.favicon) {
            payload.favicon = data.favicon;
        }

        if (data.login_logo) {
            payload.login_logo = data.login_logo;
        }

        router.put(update.url(), payload, {
            preserveScroll: true,
        });
    }

    function selectFile(field: Field, file: File | null) {
        setData(field, file);
    }

    return (
        <>
            <Head title="Branding" />

            <h1 className="sr-only">Branding settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Branding"
                    description="Customize your app's logo, favicon and login page branding"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Application name
                            </CardTitle>
                            <CardDescription>
                                Displayed in the sidebar, header, login pages
                                and browser title.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid max-w-md gap-2">
                                <Label htmlFor="app_name">App name</Label>
                                <Input
                                    id="app_name"
                                    value={data.app_name}
                                    onChange={(e) =>
                                        setData('app_name', e.target.value)
                                    }
                                    placeholder="Restaurant App"
                                />
                                <InputError message={errors.app_name} />
                            </div>
                        </CardContent>
                    </Card>

                    <UploadField
                        title="Logo"
                        description="Used in the sidebar and header. Upload a PNG or SVG with a transparent background."
                        preview={branding.logo_url}
                        file={data.logo}
                        error={errors.logo}
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        onSelect={(file) => selectFile('logo', file)}
                    />

                    <UploadField
                        title="Favicon"
                        description="The small icon shown in the browser tab. Use a square PNG, SVG or ICO."
                        preview={branding.favicon_url}
                        file={data.favicon}
                        error={errors.favicon}
                        accept="image/png,image/svg+xml,image/x-icon,.ico"
                        onSelect={(file) => selectFile('favicon', file)}
                    />

                    <UploadField
                        title="Login / Register logo"
                        description="Shown on the login and register pages. Falls back to the main logo when not set."
                        preview={branding.login_logo_url}
                        file={data.login_logo}
                        error={errors.login_logo}
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        onSelect={(file) => selectFile('login_logo', file)}
                    />

                    <Separator />

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            Save changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Branding.layout = {
    breadcrumbs: [
        {
            title: 'Branding',
            href: edit(),
        },
    ],
};
