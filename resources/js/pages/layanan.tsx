import { Head, Link } from '@inertiajs/react';
import { Shield, Eye, UserCheck, Car, Camera, Lock, Siren, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Layanan = {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    icon: string | null;
    urutan: number;
};

type Props = {
    profil: any;
    layanan: Layanan[];
};

const ICON_MAP: Record<string, LucideIcon> = {
    shield: Shield, eye: Eye, 'user-check': UserCheck,
    car: Car, camera: Camera, lock: Lock, siren: Siren,
};

const DUMMY: Layanan[] = [
    { id: 1, nama: 'Security Guard', slug: 'security-guard', deskripsi: 'Penjagaan profesional untuk aset, gedung, dan fasilitas instansi pemerintah maupun swasta. Personel kami bersertifikat Polri dan terlatih menghadapi berbagai situasi keamanan.', icon: 'shield', urutan: 1 },
    { id: 2, nama: 'Security Escort', slug: 'security-escort', deskripsi: 'Layanan pengawalan VIP, pejabat, dan kelompok dengan protokol keamanan ketat. Tim kami terlatih khusus untuk pengawalan darat dengan koordinasi yang solid.', icon: 'car', urutan: 2 },
    { id: 3, nama: 'Security Event', slug: 'security-event', deskripsi: 'Pengamanan acara, konser, seminar, dan kegiatan publik skala besar. Kami menyediakan tim terkoordinasi untuk memastikan kelancaran dan keamanan setiap event.', icon: 'eye', urutan: 3 },
    { id: 4, nama: 'Pengamanan Perbankan', slug: 'pengamanan-perbankan', deskripsi: 'Layanan keamanan khusus untuk lingkungan perbankan dan keuangan. Mencakup pengamanan gedung, brankas, dan pengawalan uang tunai.', icon: 'lock', urutan: 4 },
    { id: 5, nama: 'Pengamanan Industri', slug: 'pengamanan-industri', deskripsi: 'Solusi keamanan komprehensif untuk kawasan industri, pabrik, dan pergudangan. Termasuk patroli rutin, akses kontrol, dan monitoring CCTV.', icon: 'camera', urutan: 5 },
    { id: 6, nama: 'Pengamanan Residensial', slug: 'pengamanan-residensial', deskripsi: 'Layanan keamanan untuk perumahan, apartemen, dan kompleks hunian. Personel kami menjaga ketenangan dan keamanan lingkungan tempat tinggal Anda.', icon: 'user-check', urutan: 6 },
];

const KEUNGGULAN = [
    'Personel bersertifikat Polri',
    'Respons cepat 24/7',
    'Koordinasi dengan aparat keamanan',
    'Laporan berkala & transparan',
    'Peralatan keamanan modern',
    'Asuransi personel terjamin',
];

export default function LayananPage({ profil, layanan }: Props) {
    const data = layanan.length > 0 ? layanan : DUMMY;

    return (
        <>
            <Head title="Layanan — Tribuana Security" />
            <CompanyLayout profil={profil} title="Layanan Kami" subtitle="Layanan" image="https://picsum.photos/1920/600?grayscale&random=31">

                {/* ── Services Grid ── */}
                <section className="py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {data.map((item, i) => {
                                const Icon = ICON_MAP[item.icon?.toLowerCase() ?? ''] ?? ShieldCheck;
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/layanan/${item.slug}`}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/25 hover:shadow-2xl hover:shadow-[#C9A84C]/10 block"
                                    >
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 transition-all group-hover:border-[#C9A84C]/40">
                                                <Icon className="h-7 w-7 text-[#C9A84C]" />
                                            </div>
                                            <span className="text-5xl font-black text-white/5 group-hover:text-[#C9A84C]/10 transition-colors">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-black tracking-tight text-white uppercase">{item.nama}</h3>
                                        <p className="mb-8 text-sm leading-relaxed text-white/45">{item.deskripsi}</p>
                                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C9A84C]/50 uppercase transition-all group-hover:text-[#C9A84C]">
                                            Pelajari Lebih Lanjut
                                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#C9A84C]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Keunggulan ── */}
                <section className="bg-[#111827] py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-px w-10 bg-[#C9A84C]" />
                                    <span className="text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Mengapa Kami</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-white uppercase lg:text-5xl">
                                    Standar Keamanan
                                    <br />
                                    <span className="text-[#C9A84C]">Terbaik</span>
                                </h2>
                                <p className="mt-5 text-base leading-relaxed text-white/50">
                                    Setiap layanan kami dirancang dengan standar operasional yang ketat untuk memastikan keamanan optimal bagi klien.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {KEUNGGULAN.map((item) => (
                                    <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#C9A84C]" />
                                        <span className="text-sm font-medium text-white/70">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl border border-[#C9A84C]/15 bg-linear-to-r from-[#C9A84C]/8 via-[#C9A84C]/5 to-transparent p-10 lg:p-14">
                            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight text-white uppercase lg:text-4xl">
                                        Butuh Solusi Keamanan?
                                    </h3>
                                    <p className="mt-2 text-base text-white/50">Konsultasikan kebutuhan Anda dengan tim kami secara gratis</p>
                                </div>
                                <Link
                                    href="/kontak"
                                    className="shrink-0 rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl hover:shadow-[#C9A84C]/30 active:scale-95"
                                >
                                    Konsultasi Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
