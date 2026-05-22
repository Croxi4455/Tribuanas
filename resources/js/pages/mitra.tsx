import { Head, Link } from '@inertiajs/react';
import CompanyLayout from '@/layouts/company-layout';
import Pagination from '@/components/ui/pagination';

type Mitra = {
    id: number;
    nama: string;
    logo: string | null;
    logo_url: string | null;
    kota: string;
    tahun: number;
};

type PaginatedMitra = {
    data: Mitra[];
    links: { url: string | null; label: string; active: boolean }[];
};

type Props = {
    profil: any;
    mitra: PaginatedMitra | Mitra[];
};

const DUMMY: Mitra[] = [
    { id: 1, nama: 'PT Kereta Api Indonesia', logo: null, logo_url: null, kota: 'Jakarta', tahun: 2015 },
    { id: 2, nama: 'Universitas Indonesia', logo: null, logo_url: null, kota: 'Depok', tahun: 2016 },
    { id: 3, nama: 'OJK', logo: null, logo_url: null, kota: 'Jakarta', tahun: 2017 },
    { id: 4, nama: 'PDAM Tirta Jaya', logo: null, logo_url: null, kota: 'Bandung', tahun: 2018 },
    { id: 5, nama: 'RS Cipto Mangunkusumo', logo: null, logo_url: null, kota: 'Jakarta', tahun: 2019 },
    { id: 6, nama: 'BATAN', logo: null, logo_url: null, kota: 'Serpong', tahun: 2020 },
    { id: 7, nama: 'Bank Mandiri', logo: null, logo_url: null, kota: 'Jakarta', tahun: 2015 },
    { id: 8, nama: 'Pertamina', logo: null, logo_url: null, kota: 'Jakarta', tahun: 2016 },
];

export default function MitraPage({ profil, mitra }: Props) {
    const isPaginated = mitra && 'data' in mitra;
    const data = isPaginated ? mitra.data : (mitra?.length > 0 ? mitra as Mitra[] : DUMMY);
    const links = isPaginated ? mitra.links : [];

    return (
        <>
            <Head title="Mitra — Tribuana Security" />
            <CompanyLayout profil={profil} title="Mitra Kami" subtitle="Mitra" image="https://picsum.photos/1920/600?grayscale&random=33">

                {/* ── Intro ── */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {[
                                { val: `${data.length}+`, label: 'Total Mitra' },
                                { val: '15+', label: 'Tahun Kemitraan' },
                                { val: '100%', label: 'Kepuasan Klien' },
                            ].map((s) => (
                                <div key={s.label} className="rounded-2xl border border-[#F5B800]/15 bg-[#F5B800]/5 p-8 text-center">
                                    <p className="text-4xl font-black text-[#F5B800]">{s.val}</p>
                                    <p className="mt-2 text-sm font-bold tracking-widest text-white/40 uppercase">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Partners Grid ── */}
                <section className="pb-20 lg:pb-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 px-6 py-5 transition-all hover:border-[#F5B800]/20 hover:bg-[#F5B800]/5"
                                >
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg overflow-hidden text-base font-black text-[#F5B800] ${item.logo_url || item.logo ? '' : 'border border-[#F5B800]/20 bg-[#F5B800]/10'}`}>
                                        {item.logo_url || item.logo ? (
                                            <img
                                                src={item.logo_url || `/storage/${item.logo}`}
                                                alt={item.nama}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                                onError={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        e.currentTarget.remove();
                                                        parent.className = 'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg overflow-hidden text-base font-black text-[#F5B800] border border-[#F5B800]/20 bg-[#F5B800]/10';
                                                        parent.textContent = item.nama.charAt(0);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            item.nama.charAt(0)
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-white/80 group-hover:text-white">{item.nama}</p>
                                        <p className="text-xs text-white/30">{item.kota} · Sejak {item.tahun}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {links.length > 3 && <Pagination links={links} />}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#1C1C1E] py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase lg:text-4xl">
                                Jadilah Mitra Kami
                            </h3>
                            <p className="max-w-lg text-base text-white/50">
                                Bergabunglah dengan ratusan institusi yang telah mempercayakan keamanan mereka kepada kami
                            </p>
                            <Link
                                href="/kontak"
                                className="rounded-lg bg-linear-to-r from-[#F5B800] to-[#E0A800] px-8 py-4 text-sm font-bold tracking-widest text-[#181819] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
