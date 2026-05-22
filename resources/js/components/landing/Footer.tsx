import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

type FooterLink = { label: string; href: string };

type Props = {
    nama?: string;
    logo?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    layanan?: FooterLink[];
    pelatihan?: FooterLink[];
};

const COMPANY = [
    { label: 'Tentang Kami', href: '/#tentang' },
    { label: 'Mitra', href: '/mitra' },
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/kontak' },
];

export default function Footer({ nama, logo, facebook, instagram, twitter, layanan, pelatihan }: Props) {
    const layananLinks = layanan && layanan.length > 0 ? layanan : [
        { label: 'Security Guard', href: '/layanan' },
        { label: 'Security Escort', href: '/layanan' },
        { label: 'Security Event', href: '/layanan' },
    ];
    const pelatihanLinks = pelatihan && pelatihan.length > 0 ? pelatihan : [
        { label: 'Gada Pratama', href: '/pelatihan' },
        { label: 'Gada Madya', href: '/pelatihan' },
        { label: 'Gada Utama', href: '/pelatihan' },
    ];

    return (
        <footer className="relative bg-[#0E0E0F] overflow-hidden">

            {/* ── Background Image ── */}
            <div className="absolute inset-0">
                <img
                    src="https://picsum.photos/1920/1080?grayscale&random=20"
                    alt=""
                    loading="lazy" decoding="async" className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#0E0E0F]/85" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0E0E0F] via-[#0E0E0F]/60 to-[#0E0E0F]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
            </div>

            {/* Top gold line */}
            <div className="relative h-[2px] bg-linear-to-r from-transparent via-[#F5B800]/50 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* ── Brand ── */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3">
                            <img src={logo || "/assets/logo.png"} alt="Tribuana Security" className="h-10 w-auto" />
                            <div className="flex flex-col leading-none">
                                <span className="text-base font-black tracking-[0.15em] text-white uppercase">
                                    {nama || 'Tribuana'}
                                </span>
                                <span className="text-[9px] font-medium tracking-[0.3em] text-[#F5B800]/60 uppercase">
                                    Security
                                </span>
                            </div>
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/35">
                            Penyedia jasa pengamanan profesional dan terpercaya. Melindungi aset, fasilitas, dan kepentingan Anda dengan standar keamanan internasional.
                        </p>

                        {/* Contact quick info */}
                        <div className="mt-6 space-y-3">
                            {[
                                { icon: MapPin, text: 'Jawa Barat, Kota Bandung' },
                                { icon: Phone, text: '(021) 1234-5678' },
                                { icon: Mail, text: 'info@tribuana.co.id' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.text} className="flex items-center gap-2.5 text-xs text-white/35">
                                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#F5B800]/50" />
                                        {item.text}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Social */}
                        <div className="mt-6 flex gap-2.5">
                            {[
                                { href: facebook, Icon: Facebook },
                                { href: instagram, Icon: Instagram },
                                { href: twitter, Icon: Twitter },
                            ].map(({ href, Icon }, i) =>
                                href ? (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/35 transition-all hover:border-[#F5B800]/30 hover:bg-[#F5B800]/10 hover:text-[#F5B800]"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ) : null
                            )}
                        </div>
                    </div>

                    {/* ── Links ── */}
                    <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
                        <FooterCol title="Layanan" items={layananLinks} />
                        <FooterCol title="Pelatihan" items={pelatihanLinks} />
                        <FooterCol title="Perusahaan" items={COMPANY} />
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} {nama || 'PT Tribuana'}. Hak cipta dilindungi.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/25 uppercase transition-all hover:text-[#F5B800]"
                    >
                        Kembali ke Atas
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({
    title,
    items,
}: {
    title: string;
    items: { label: string; href: string }[];
}) {
    return (
        <div>
            <h4 className="mb-5 text-xs font-black tracking-[0.25em] text-white/50 uppercase">{title}</h4>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            className="group flex items-center gap-1.5 text-sm text-white/30 transition-all hover:text-[#F5B800]"
                        >
                            <span className="h-px w-0 bg-[#F5B800] transition-all group-hover:w-3" />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
