import { Head, Link } from '@inertiajs/react';
import { Shield, Home, ArrowLeft, RefreshCw, Lock, ServerCrash, AlertTriangle } from 'lucide-react';

type Props = {
    status: number;
};

const ERRORS: Record<number, { icon: typeof Shield; title: string; desc: string }> = {
    404: {
        icon: AlertTriangle,
        title: 'Halaman Tidak Ditemukan',
        desc: 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
    },
    403: {
        icon: Lock,
        title: 'Akses Ditolak',
        desc: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
    },
    500: {
        icon: ServerCrash,
        title: 'Kesalahan Server',
        desc: 'Terjadi kesalahan pada server kami. Silakan coba beberapa saat lagi.',
    },
    503: {
        icon: RefreshCw,
        title: 'Layanan Tidak Tersedia',
        desc: 'Server sedang dalam pemeliharaan. Kami akan segera kembali.',
    },
    419: {
        icon: RefreshCw,
        title: 'Sesi Kedaluwarsa',
        desc: 'Sesi Anda telah berakhir. Silakan muat ulang halaman.',
    },
};

export default function ErrorPage({ status }: Props) {
    const error = ERRORS[status] ?? {
        icon: AlertTriangle,
        title: 'Terjadi Kesalahan',
        desc: 'Sesuatu yang tidak terduga terjadi. Silakan coba lagi.',
    };

    const Icon = error.icon;
    const isServerError = status >= 500;

    return (
        <>
            <Head title={`${status} — ${error.title}`} />

            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111111]">

                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://picsum.photos/1920/1080?grayscale&random=99"
                        alt=""
                        className="h-full w-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-[#111111]/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,184,0,0.06)_0%,transparent_70%)]" />
                </div>

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(245,184,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.5) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative z-10 mx-auto max-w-lg px-6 text-center">

                    {/* Logo */}
                    <Link href="/" className="mb-12 inline-flex items-center gap-3">
                        <img src="/assets/logo.png" alt="Tribuana Security" className="h-10 w-auto" />
                        <div className="flex flex-col leading-none text-left">
                            <span className="text-sm font-black tracking-[0.15em] text-white uppercase">Tribuana</span>
                            <span className="text-[9px] tracking-[0.3em] text-[#F5B800]/60 uppercase">Security</span>
                        </div>
                    </Link>

                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/8">
                        <Icon className="h-10 w-10 text-[#F5B800]" />
                    </div>

                    {/* Status code */}
                    <p className="mb-2 text-8xl font-black text-[#F5B800]/20 leading-none">{status}</p>

                    {/* Title */}
                    <h1 className="mb-4 text-2xl font-black tracking-tight text-white uppercase lg:text-3xl">
                        {error.title}
                    </h1>

                    {/* Desc */}
                    <p className="mb-10 text-base leading-relaxed text-white/50">
                        {error.desc}
                    </p>

                    {/* Divider */}
                    <div className="mx-auto mb-10 h-px w-16 bg-[#F5B800]/30" />

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#F5B800] to-[#E0A800] px-7 py-3.5 text-sm font-bold tracking-widest text-[#111111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95"
                        >
                            <Home className="h-4 w-4" />
                            Ke Beranda
                        </Link>

                        {isServerError ? (
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800] active:scale-95"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Coba Lagi
                            </button>
                        ) : (
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800] active:scale-95"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </button>
                        )}
                    </div>

                    {/* Contact hint */}
                    <p className="mt-10 text-xs text-white/25">
                        Butuh bantuan?{' '}
                        <Link href="/kontak" className="text-[#F5B800]/50 transition-colors hover:text-[#F5B800]">
                            Hubungi kami
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
