import { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Beranda', href: '/' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Pelatihan', href: '/pelatihan' },
    { label: 'Mitra', href: '/mitra' },
    { label: 'Berita', href: '/berita' },
    { label: 'Karir', href: '/karir' },
    { label: 'Kontak', href: '/kontak' },
];

export default function Navbar({ logo }: { logo?: string | null }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [url]);

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    // Hover indicator pill
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = e.currentTarget;
        const parent = navRef.current;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        setIndicatorStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
            opacity: 1,
        });
    };

    const handleMouseLeave = () => {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        setHovered(null);
    };

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-[#181819]/90 backdrop-blur-2xl'
                        : 'bg-transparent'
                }`}
            >
                {/* Scrolled border bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F5B800]/20 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                    {/* ── Logo ── */}
                    <Link href="/" className="group flex items-center gap-3">
                        <img
                            src={logo || "/assets/logo.png"}
                            alt="Tribuana Security"
                            className="h-10 w-auto transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                        />
                        <div className="flex flex-col leading-none">
                            <span className="text-base font-black tracking-[0.15em] text-white uppercase">Tribuana</span>
                            <span className="text-[9px] font-medium tracking-[0.35em] text-[#F5B800]/60 uppercase">Security</span>
                        </div>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <div
                        ref={navRef}
                        className="relative hidden items-center lg:flex"
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Hover background pill */}
                        <div
                            className="absolute top-0 h-full rounded-lg bg-white/5 transition-all duration-200 ease-out"
                            style={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width,
                                opacity: indicatorStyle.opacity,
                            }}
                        />

                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={(e) => { setHovered(link.href); handleMouseEnter(e as unknown as React.MouseEvent<HTMLAnchorElement>); }}
                                className={`relative z-10 px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-150 ${
                                    isActive(link.href)
                                        ? 'text-[#F5B800]'
                                        : hovered === link.href
                                            ? 'text-white'
                                            : 'text-white/55'
                                }`}
                            >
                                {link.label}
                                {/* Active dot */}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#F5B800]" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* ── CTA ── */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="/kontak"
                            className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-[#F5B800]/35 px-5 py-2.5 text-sm font-bold tracking-wide text-[#F5B800] transition-all duration-300 hover:border-[#F5B800]/70 hover:text-white active:scale-95"
                        >
                            {/* Fill on hover */}
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-[#F5B800] to-[#E0A800] transition-transform duration-300 group-hover:translate-x-0" />
                            <Phone className="relative h-3.5 w-3.5 transition-colors" />
                            <span className="relative">Hubungi Kami</span>
                        </Link>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-all hover:border-[#F5B800]/30 hover:text-white lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className={`absolute transition-all duration-200 ${mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                            <Menu className="h-5 w-5" />
                        </span>
                        <span className={`absolute transition-all duration-200 ${mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                            <X className="h-5 w-5" />
                        </span>
                    </button>
                </div>
            </nav>

            {/* ── Mobile Menu ── */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
                    mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-[#0E0E0F]/80 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Drawer */}
                <div className={`absolute right-0 top-0 flex h-full w-80 flex-col bg-[#181819] shadow-2xl transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* Drawer header */}
                    <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                        <div className="flex items-center gap-2.5">
                            <img src={logo || "/assets/logo.png"} alt="Tribuana Security" className="h-8 w-auto" />
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-black tracking-widest text-white uppercase">Tribuana</span>
                                <span className="text-[8px] tracking-[0.3em] text-[#F5B800]/50 uppercase">Security</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-white/40 transition-all hover:border-white/15 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <div className="flex-1 space-y-0.5 px-3 py-5">
                        {NAV_LINKS.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                                    isActive(link.href)
                                        ? 'bg-[#F5B800]/10 text-[#F5B800]'
                                        : 'text-white/50 hover:bg-white/4 hover:text-white'
                                }`}
                                style={{ transitionDelay: `${i * 30}ms` }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive(link.href) ? 'bg-[#F5B800]' : 'bg-white/15 group-hover:bg-white/40'}`} />
                                    {link.label}
                                </div>
                                <ChevronRight className={`h-3.5 w-3.5 transition-all ${isActive(link.href) ? 'text-[#F5B800]/60' : 'text-white/15 group-hover:translate-x-0.5 group-hover:text-white/30'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Drawer footer CTA */}
                    <div className="border-t border-white/5 p-4">
                        <Link
                            href="/kontak"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#F5B800] to-[#E0A800] py-3.5 text-sm font-black tracking-widest text-[#181819] uppercase shadow-lg shadow-[#F5B800]/20 active:scale-95 transition-transform"
                        >
                            <Phone className="h-4 w-4" />
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
