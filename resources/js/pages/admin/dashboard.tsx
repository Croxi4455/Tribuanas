import { Head } from '@inertiajs/react';
import {
    Briefcase, GraduationCap, Handshake, ImageIcon,
    Mail, MessageSquareQuote, Newspaper, ShieldCheck,
    TrendingUp, Eye, Clock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Stats = {
    berita: number;
    layanan: number;
    mitra: number;
    galeri: number;
    testimoni: number;
    pelatihan: number;
    karir_aktif: number;
    kontak_belum_dibaca: number;
};

type BeritaTerbaru = {
    id: number;
    judul: string;
    slug: string;
    tanggal_publish: string;
    is_published: boolean;
};

type KontakTerbaru = {
    id: number;
    nama: string;
    subjek: string | null;
    is_read: boolean;
    created_at: string;
};

type Props = {
    stats: Stats;
    berita_terbaru: BeritaTerbaru[];
    kontak_terbaru: KontakTerbaru[];
};

function StatCard({ label, value, icon: Icon, trend }: {
    label: string; value: number; icon: LucideIcon; trend?: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-6 transition-all duration-300 hover:border-[#C9A84C]/25 hover:bg-white/5">
            {/* Gold left accent */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-linear-to-b from-[#C9A84C]/0 via-[#C9A84C]/50 to-[#C9A84C]/0 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">{label}</p>
                    <p className="mt-2 text-4xl font-black text-white">{value}</p>
                    {trend && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-[#C9A84C]/70">
                            <TrendingUp className="h-3 w-3" />
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/8 transition-colors group-hover:border-[#C9A84C]/35 group-hover:bg-[#C9A84C]/15">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#C9A84C]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    );
}

function AlertCard({ label, value, icon: Icon, variant }: {
    label: string; value: number; icon: LucideIcon; variant: 'gold' | 'green' | 'muted';
}) {
    const styles = {
        gold:  { wrap: 'border-[#C9A84C]/20 bg-[#C9A84C]/5',  icon: 'border-[#C9A84C]/25 bg-[#C9A84C]/10 text-[#C9A84C]',  val: 'text-[#C9A84C]' },
        green: { wrap: 'border-emerald-500/15 bg-emerald-500/5', icon: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400', val: 'text-emerald-400' },
        muted: { wrap: 'border-white/6 bg-white/3',             icon: 'border-white/10 bg-white/5 text-white/50',             val: 'text-white' },
    };
    const s = styles[variant];
    return (
        <div className={`flex items-center gap-4 rounded-xl border p-5 ${s.wrap}`}>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${s.icon}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className={`text-2xl font-black ${s.val}`}>{value}</p>
                <p className="text-xs font-medium text-white/40">{label}</p>
            </div>
        </div>
    );
}

export default function AdminDashboard({ stats, berita_terbaru, kontak_terbaru }: Props) {
    const statCards = [
        { label: 'Total Berita',  value: stats.berita,  icon: Newspaper,  trend: 'Artikel dipublikasi' },
        { label: 'Total Layanan', value: stats.layanan, icon: ShieldCheck, trend: 'Layanan aktif' },
        { label: 'Total Mitra',   value: stats.mitra,   icon: Handshake,  trend: 'Institusi terdaftar' },
        { label: 'Total Galeri',  value: stats.galeri,  icon: ImageIcon,  trend: 'Foto tersimpan' },
    ];

    return (
        <>
            <Head title="Dashboard Admin" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 md:p-8">

                {/* ── Page Header ── */}
                <div className="flex items-end justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C]/70 uppercase">Admin Panel</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-white uppercase">Dashboard</h1>
                        <p className="mt-1 text-sm text-white/40">Selamat datang kembali di panel admin Tribuana Security</p>
                    </div>
                    <div className="hidden items-center gap-2 text-xs text-white/30 sm:flex">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="h-px bg-linear-to-r from-[#C9A84C]/30 via-[#C9A84C]/10 to-transparent" />

                {/* ── Main Stat Cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((s) => <StatCard key={s.label} {...s} />)}
                </div>

                {/* ── Alert Stats ── */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <AlertCard label="Kontak Belum Dibaca" value={stats.kontak_belum_dibaca} icon={Mail}               variant="gold" />
                    <AlertCard label="Lowongan Aktif"      value={stats.karir_aktif}          icon={Briefcase}          variant="green" />
                    <AlertCard label="Testimoni Aktif"     value={stats.testimoni}            icon={MessageSquareQuote} variant="muted" />
                </div>

                {/* ── Recent Data ── */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Berita Terbaru */}
                    <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                        <div className="flex items-center gap-3 border-b border-white/6 px-6 py-4">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                                <Newspaper className="h-3.5 w-3.5 text-[#C9A84C]" />
                            </div>
                            <h3 className="text-sm font-black tracking-wide text-white uppercase">Berita Terbaru</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {berita_terbaru.map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/2">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-white/80">{item.judul}</p>
                                        <p className="mt-0.5 text-xs text-white/35">
                                            {new Date(item.tanggal_publish).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <span className="ml-4 shrink-0 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                                        Live
                                    </span>
                                </div>
                            ))}
                            {berita_terbaru.length === 0 && (
                                <div className="px-6 py-10 text-center text-sm text-white/25">Belum ada berita</div>
                            )}
                        </div>
                    </div>

                    {/* Kontak Masuk */}
                    <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                        <div className="flex items-center gap-3 border-b border-white/6 px-6 py-4">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                                <Mail className="h-3.5 w-3.5 text-[#C9A84C]" />
                            </div>
                            <h3 className="text-sm font-black tracking-wide text-white uppercase">Kontak Masuk</h3>
                            {stats.kontak_belum_dibaca > 0 && (
                                <span className="ml-auto rounded-full bg-[#C9A84C] px-2 py-0.5 text-[10px] font-black text-[#0D1B2A]">
                                    {stats.kontak_belum_dibaca} baru
                                </span>
                            )}
                        </div>
                        <div className="divide-y divide-white/5">
                            {kontak_terbaru.map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/2">
                                    <div className="flex min-w-0 flex-1 items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-black text-white/50">
                                            {item.nama.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-white/80">{item.nama}</p>
                                            <p className="truncate text-xs text-white/35">{item.subjek || '(Tanpa subjek)'}</p>
                                        </div>
                                    </div>
                                    <span className={`ml-4 shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                        item.is_read
                                            ? 'border-white/8 bg-white/4 text-white/30'
                                            : 'border-[#C9A84C]/25 bg-[#C9A84C]/10 text-[#C9A84C]'
                                    }`}>
                                        {item.is_read ? 'Dibaca' : 'Baru'}
                                    </span>
                                </div>
                            ))}
                            {kontak_terbaru.length === 0 && (
                                <div className="px-6 py-10 text-center text-sm text-white/25">Belum ada pesan masuk</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Bottom Stats ── */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <AlertCard label="Program Pelatihan Aktif" value={stats.pelatihan} icon={GraduationCap} variant="green" />
                    <AlertCard label="Total Galeri Foto"       value={stats.galeri}    icon={Eye}           variant="muted" />
                </div>

            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Dashboard', href: '/admin/dashboard' },
    ],
};
