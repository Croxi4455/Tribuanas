import { Head, Link } from '@inertiajs/react';
import CompanyLayout from '@/layouts/company-layout';

type Mitra = {
    id: number;
    nama: string;
    logo: string | null;
    kota: string;
    tahun: number;
};

type Props = {
    profil: any;
    mitra: Mitra[];
};

const DUMMY: Mitra[] = [
    { id: 1, nama: 'PT Kereta Api Indonesia', logo: null, kota: 'Jakarta', tahun: 2015 },
    { id: 2, nama: 'Universitas Indonesia', logo: null, kota: 'Depok', tahun: 2016 },
    { id: 3, nama: 'OJK', logo: null, kota: 'Jakarta', tahun: 2017 },
    { id: 4, nama: 'PDAM Tirta Jaya', logo: null, kota: 'Bandung', tahun: 2018 },
    { id: 5, nama: 'RS Cipto Mangunkusumo', logo: null, kota: 'Jakarta', tahun: 2019 },
    { id: 6, nama: 'BATAN', logo: null, kota: 'Serpong', tahun: 2020 },
    { id: 7, nama: 'Bank Mandiri', logo: null, kota: 'Jakarta', tahun: 2015 },
    { id: 8, nama: 'Pertamina', logo: null, kota: 'Jakarta', tahun: 2016 },
    { id: 9, nama: 'PLN', logo: null, kota: 'Jakarta', tahun: 2017 },
    { id: 10, nama: 'Telkom Indonesia', logo: null, kota: 'Bandung', tahun: 2018 },
    { id: 11, nama: 'BRI', logo: null, kota: 'Jakarta', tahun: 2019 },
    { id: 12, nama: 'Garuda Indonesia', logo: null, kota: 'Tangerang', tahun: 2020 },
];

// Group by sector for display
const SECTORS = [
    { label: 'Pemerintah & BUMN', ids: [1, 3, 6, 9] },
    { label: 'Perbankan & Keuangan', ids: [7, 11] },
    { label: 'Pendidikan & Kesehatan', ids: [2, 5] },
    { label: 'Industri & Infrastruktur', ids: [4, 8, 10, 12] },
];

export default function MitraPage({ profil, mitra }: Props) {
    const data = mitra.length > 0 ? mitra : DUMMY;

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
                                <div key={s.label} className="rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/5 p-8 text-center">
                                    <p className="text-4xl font-black text-[#C9A84C]">{s.val}</p>
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
                                    className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-6 py-5 transition-all hover:border-[#C9A84C]/20 hover:bg-[#C9A84C]/5"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10 text-base font-black text-[#C9A84C]">
                                        {item.nama.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-white/80 group-hover:text-white">{item.nama}</p>
                                        <p className="text-xs text-white/30">{item.kota} · Sejak {item.tahun}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#111827] py-20">
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
                                className="rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl active:scale-95"
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
