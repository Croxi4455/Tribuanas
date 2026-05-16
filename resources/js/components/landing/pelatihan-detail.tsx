import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, BookOpen, Clock, Award, CheckCircle2 } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Pelatihan = {
    id: number;
    judul: string;
    jenis: 'kompetensi_dasar' | 'kompetensi_khusus';
    deskripsi: string;
    gambar: string | null;
    gambar_url: string | null;
    durasi: string;
    is_active: boolean;
};

type Props = {
    profil: any;
    pelatihan: Pelatihan;
    pelatihanLainnya: Pelatihan[];
};

export default function PelatihanDetailPage({ profil, pelatihan, pelatihanLainnya }: Props) {
    return (
        <>
            <Head title={`${pelatihan.judul} — Tribuana Security`} />
            <CompanyLayout profil={profil} title="Detail Pelatihan" subtitle="Program Pelatihan">
                <section className="relative pt-12 pb-24">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-linear-to-b from-[#C9A84C]/5 to-transparent pointer-events-none" />

                    <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
                        {/* Back button */}
                        <Link
                            href="/pelatihan"
                            className="group mb-12 inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-all hover:text-[#C9A84C]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/10">
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            </div>
                            Kembali ke Pelatihan
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Left Col: Main Info */}
                            <div className="lg:col-span-7 flex flex-col justify-center">
                                <div className="mb-6 flex flex-wrap gap-4">
                                    <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black tracking-[0.15em] uppercase ${pelatihan.jenis === 'kompetensi_dasar'
                                            ? 'border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                            : 'border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                        }`}>
                                        {pelatihan.jenis === 'kompetensi_dasar' ? <GraduationCap className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                                        {pelatihan.jenis === 'kompetensi_dasar' ? 'Kompetensi Dasar' : 'Kompetensi Khusus'}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-xs font-black tracking-[0.15em] text-[#C9A84C] uppercase shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                                        <Clock className="h-4 w-4" />
                                        {pelatihan.durasi}
                                    </span>
                                </div>

                                <h1 className="mb-8 text-4xl font-black leading-[1.1] tracking-tight text-white lg:text-5xl uppercase">
                                    {pelatihan.judul}
                                </h1>

                                <div className="mb-10 text-lg leading-relaxed text-white/70">
                                    <p>{pelatihan.deskripsi}</p>
                                </div>

                                <div>
                                    <Link
                                        href="/kontak"
                                        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase transition-transform active:scale-[0.98] hover:bg-[#C9A84C] hover:text-white"
                                    >
                                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                        Daftar Sekarang
                                        <ArrowLeft className="h-4 w-4 rotate-135" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Col: Image & Benefit Box */}
                            <div className="lg:col-span-5 relative">
                                {pelatihan.gambar_url ? (
                                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-[#0D1B2A] shadow-2xl lg:translate-y-8">
                                        <img
                                            src={pelatihan.gambar_url}
                                            alt={pelatihan.judul}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#111111]/80 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 shadow-2xl lg:translate-y-8 flex items-center justify-center">
                                        <GraduationCap className="h-32 w-32 text-white/10" />
                                    </div>
                                )}

                                {/* Floating Benefit Box */}
                                <div className="lg:absolute lg:-bottom-8 lg:-left-16 lg:w-[120%] mt-8 lg:mt-0 rounded-3xl border border-white/10 bg-[#181819]/95 p-8 backdrop-blur-xl shadow-2xl">
                                    <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white uppercase tracking-widest">
                                        <Award className="h-5 w-5 text-[#C9A84C]" />
                                        Materi & Benefit
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {['Instruktur Tersertifikasi Polri', 'Sertifikat Resmi Kelulusan', 'Modul Pelatihan Lengkap', 'Praktek Lapangan'].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                                                <span className="text-sm font-medium text-white/70 leading-snug">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </CompanyLayout>
        </>
    );
}
