<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Branding extends Model
{
    protected $fillable = [
        'app_name',
        'logo',
        'favicon',
        'login_logo',
    ];

    /**
     * The single branding record for the application.
     */
    public static function current(): Branding
    {
        return self::query()->first() ?? new self;
    }

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? Storage::disk('public')->url($this->logo) : null;
    }

    public function getFaviconUrlAttribute(): ?string
    {
        return $this->favicon ? Storage::disk('public')->url($this->favicon) : null;
    }

    public function getLoginLogoUrlAttribute(): ?string
    {
        return $this->login_logo ? Storage::disk('public')->url($this->login_logo) : null;
    }
}
