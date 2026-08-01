<?php

namespace App\Http\Requests\Branding;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'app_name' => ['nullable', 'string', 'max:100'],
            'logo' => ['nullable', 'file', 'image', 'max:2048'],
            'favicon' => ['nullable', 'file', 'mimes:png,svg,ico,jpg,jpeg,webp', 'max:2048'],
            'login_logo' => ['nullable', 'file', 'image', 'max:2048'],
        ];
    }
}
