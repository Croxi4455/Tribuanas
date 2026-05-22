import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { usePage } from '@inertiajs/react';

type Profil = {
    nama_perusahaan?: string;
    logo_url?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
} | null;

type Props = {
    profil?: Profil;
    children: React.ReactNode;
    /** Page title shown in the hero banner */
    title: string;
    /** Breadcrumb label */
    subtitle?: string;
    /** Background image URL — defaults to a relevant picsum photo */
    image?: string;
};

export default function CompanyLayout({ profil, children, title, subtitle, image }: Props) {
    const bgImage = image ?? 'https://picsum.photos/1920/600?grayscale&random=20';

    return (
        <div className="min-h-screen bg-[#111111]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Navbar logo={profil?.logo_url} />

            {/* ── Page Hero Banner ── */}
            <div className="relative overflow-hidden pt-32 pb-24">

                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt=""
                        loading="lazy" decoding="async" className="h-full w-full object-cover object-center"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#181819]/80" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#181819]/70 via-[#181819]/40 to-transparent" />
                    {/* Gold tint */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.07)_0%,_transparent_60%)]" />
                </div>

                {/* Grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-5 flex items-center gap-2 text-xs text-white/35">
                        <a href="/" className="transition-colors hover:text-[#F5B800]">Beranda</a>
                        <span className="text-white/20">/</span>
                        <span className="text-[#F5B800]">{subtitle || title}</span>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                        <div className="h-px w-10 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">
                            {subtitle || title}
                        </span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white uppercase lg:text-6xl">
                        {title}
                    </h1>
                </div>

                {/* Bottom fade into page bg */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#111111] to-transparent" />
            </div>

            {/* Page Content */}
            <main>{children}</main>

            <Footer
                nama={profil?.nama_perusahaan}
                logo={profil?.logo_url}
                facebook={profil?.facebook}
                instagram={profil?.instagram}
                twitter={profil?.twitter}
                layanan={(usePage().props as any).footerData?.layanan}
                pelatihan={(usePage().props as any).footerData?.pelatihan}
            />
        </div>
    );
}
