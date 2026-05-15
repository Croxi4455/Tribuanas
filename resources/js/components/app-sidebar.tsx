import { Link } from '@inertiajs/react';
import {
    Briefcase,
    Building2,
    GraduationCap,
    Handshake,
    ImageIcon,
    LayoutGrid,
    Mail,
    MessageSquareQuote,
    Newspaper,
    Shield,
    ShieldCheck,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard',     href: '/admin/dashboard',       icon: LayoutGrid },
    { title: 'Berita',        href: '/admin/berita',          icon: Newspaper },
    { title: 'Layanan',       href: '/admin/layanan',         icon: ShieldCheck },
    { title: 'Mitra',         href: '/admin/mitra',           icon: Handshake },
    { title: 'Galeri',        href: '/admin/galeri',          icon: ImageIcon },
    { title: 'Testimoni',     href: '/admin/testimoni',       icon: MessageSquareQuote },
    { title: 'Pelatihan',     href: '/admin/pelatihan',       icon: GraduationCap },
    { title: 'Karir',         href: '/admin/karir',           icon: Briefcase },
    { title: 'Kontak Masuk',  href: '/admin/kontak-masuk',    icon: Mail },
];

const footerNavItems: NavItem[] = [
    { title: 'Profil Perusahaan', href: '/admin/profil-perusahaan', icon: Building2 },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-[#C9A84C]/10 pb-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                {/* Logo icon */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#C9A84C] to-[#A88B3A] shadow-lg shadow-[#C9A84C]/20">
                                    <Shield className="h-5 w-5 text-[#0D1B2A]" strokeWidth={2.5} />
                                </div>
                                {/* Logo text */}
                                <div className="flex flex-col leading-none">
                                    <span className="text-sm font-black tracking-[0.12em] text-white uppercase">
                                        Tribuana
                                    </span>
                                    <span className="text-[9px] font-medium tracking-[0.3em] text-[#C9A84C]/60 uppercase">
                                        Admin Panel
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-[#C9A84C]/10 pt-2">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
