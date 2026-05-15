import { Shield, Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

type Props = {
    nama?: string;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
};

const SERVICES = [
    { label: 'Security Guard', href: '/layanan' },
    { label: 'Security Escort', href: '/layanan' },
    { label: 'Security Event', href: '/layanan' },
    { label: 'Pengamanan Perbankan', href: '/layanan' },
    { label: 'Pengawalan VIP', href: '/layanan' },
];
const TRAINING = [
    { label: 'Gada Pratama', href: '/pelatihan' },
    { label: 'Gada Madya', href: '/pelatihan' },
    { label: 'Gada Utama', href: '/pelatihan' },
    { label: 'Penjinakan Bom', href: '/pelatihan' },
    { label: 'Pengawalan VIP', href: '/pelatihan' },
];
const COMPANY = [
    { label: 'Tentang Kami', href: '/' },
    { label: 'Mitra', href: '/mitra' },
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/kontak' },
];

export default function Footer({ nama, facebook, instagram, twitter }: Props) {

    return (
        <footer className="relative bg-[#060E1B] overflow-hidden">

            {/* ── Background Image ── */}
            <div className="absolute inset-0">
                <img
                    src="https://picsum.photos/1920/1080?grayscale&random=20"
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#060E1B]/85" />
                <div className="absolute inset-0 bg-linear-to-t from-[#060E1B] via-[#060E1B]/60 to-[#060E1B]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
            </div>

            {/* Top gold line */}
            <div className="relative h-[2px] bg-linear-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* ── Brand ── */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-linear-to-br from-[#C9A84C] to-[#A88B3A] shadow-lg shadow-[#C9A84C]/20">
                                <Shield className="h-6 w-6 text-[#0D1B2A]" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-base font-black tracking-[0.15em] text-white uppercase">
                                    {nama || 'Tribuana'}
                                </span>
                                <span className="text-[9px] font-medium tracking-[0.3em] text-[#C9A84C]/60 uppercase">
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
                                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#C9A84C]/50" />
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
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/35 transition-all hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ) : null
                            )}
                        </div>
                    </div>

                    {/* ── Links ── */}
                    <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
                        <FooterCol title="Layanan" items={SERVICES} />
                        <FooterCol title="Pelatihan" items={TRAINING} />
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
                        className="group flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/25 uppercase transition-all hover:text-[#C9A84C]"
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
                            className="group flex items-center gap-1.5 text-sm text-white/30 transition-all hover:text-[#C9A84C]"
                        >
                            <span className="h-px w-0 bg-[#C9A84C] transition-all group-hover:w-3" />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
