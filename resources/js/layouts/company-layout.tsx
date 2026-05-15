import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

type Profil = {
    nama_perusahaan?: string;
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
        <div className="min-h-screen bg-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Navbar />

            {/* ── Page Hero Banner ── */}
            <div className="relative overflow-hidden pt-32 pb-24">

                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src={bgImage}
                        alt=""
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#0D1B2A]/80" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#0D1B2A]/70 via-[#0D1B2A]/40 to-transparent" />
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
                        <a href="/" className="transition-colors hover:text-[#C9A84C]">Beranda</a>
                        <span className="text-white/20">/</span>
                        <span className="text-[#C9A84C]">{subtitle || title}</span>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                        <div className="h-px w-10 bg-[#C9A84C]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase">
                            {subtitle || title}
                        </span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white uppercase lg:text-6xl">
                        {title}
                    </h1>
                </div>

                {/* Bottom fade into page bg */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#0A0A0A] to-transparent" />
            </div>

            {/* Page Content */}
            <main>{children}</main>

            <Footer
                nama={profil?.nama_perusahaan}
                facebook={profil?.facebook}
                instagram={profil?.instagram}
                twitter={profil?.twitter}
            />
        </div>
    );
}
