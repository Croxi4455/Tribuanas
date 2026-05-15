import { Head } from '@inertiajs/react';
import { Plus, Star } from 'lucide-react';

type Testimoni = {
    id: number;
    nama: string;
    jabatan: string;
    perusahaan: string;
    foto: string | null;
    isi: string;
    rating: number;
    is_active: boolean;
};

type Props = {
    testimoni: Testimoni[];
};

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                        i < rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-muted text-muted'
                    }`}
                />
            ))}
        </div>
    );
}

export default function TestimoniIndex({ testimoni }: Props) {
    return (
        <>
            <Head title="Manajemen Testimoni" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Testimoni</h1>
                        <p className="text-muted-foreground">
                            Kelola testimoni dari klien dan mitra perusahaan
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Testimoni
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nama</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Perusahaan</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {testimoni.map((item, index) => (
                                    <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div>
                                                <p className="text-sm font-medium">{item.nama}</p>
                                                <p className="text-xs text-muted-foreground">{item.jabatan}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm">{item.perusahaan}</td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <RatingStars rating={item.rating} />
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                item.is_active
                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                            }`}>
                                                {item.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Edit</button>
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">Total: {testimoni.length} testimoni</p>
            </div>
        </>
    );
}

TestimoniIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Testimoni', href: '/admin/testimoni' },
    ],
};
