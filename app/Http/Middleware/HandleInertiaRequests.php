<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $profil = \App\Models\ProfilPerusahaan::first();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'appLogo' => $profil && $profil->logo ? asset('storage/' . $profil->logo) : '/assets/logo.png',
            'footerData' => [
                'layanan' => \App\Models\Layanan::ordered()->take(5)->get(['nama', 'slug'])->map(fn ($l) => ['label' => $l->nama, 'href' => '/layanan/' . $l->slug]),
                'pelatihan' => \App\Models\Pelatihan::active()->take(5)->get(['id', 'judul'])->map(fn ($p) => ['label' => $p->judul, 'href' => '/pelatihan/' . $p->id]),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'info'    => fn () => $request->session()->get('info'),
            ],
        ];
    }
}
