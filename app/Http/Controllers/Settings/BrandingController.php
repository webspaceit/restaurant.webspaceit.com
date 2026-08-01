<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Branding\UpdateBrandingRequest;
use App\Models\Branding;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BrandingController extends Controller
{
    public function edit(): Response
    {
        $branding = Branding::current();

        return Inertia::render('settings/branding', [
            'branding' => [
                'app_name' => $branding->app_name,
                'logo_url' => $branding->logo_url,
                'favicon_url' => $branding->favicon_url,
                'login_logo_url' => $branding->login_logo_url,
            ],
        ]);
    }

    public function update(UpdateBrandingRequest $request): RedirectResponse
    {
        $branding = Branding::current();

        $data = $request->validated();

        foreach (['logo', 'favicon', 'login_logo'] as $field) {
            if ($request->hasFile($field)) {
                $this->deleteIfExists($branding->getAttribute($field));
                $data[$field] = $request->file($field)->store('branding', 'public');
            }
        }

        $branding->forceFill($data)->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Branding updated.')]);

        return back();
    }

    private function deleteIfExists(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
