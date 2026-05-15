import { Head } from '@inertiajs/react';
import { GraduationCap, Plus } from 'lucide-react';

type Pelatihan = {
    id: number;
    judul: string;
    jenis: 'kompetensi_dasar' | 'kompetensi_khusus';
    deskripsi: string;
    gambar: string | null;
    durasi: string;
    is_active: boolean;
};

type Props = {
    pelatihan: Pelatihan[];
};

const JENIS_LABELS: Record<string, { label: string; color: string }> = {
    kompetensi_dasar: { label: 'Kompetensi Dasar', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    kompetensi_khusus: { label: 'Kompetensi Khusus', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
};

export default function PelatihanIndex({ pelatihan }: Props) {
    return (
        <>
            <Head title="Manajemen Pelatihan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Pelatihan</h1>
                        <p className="text-muted-foreground">
                            Kelola program pelatihan security dan kompetensi
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Pelatihan
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Judul</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Jenis</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Durasi</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {pelatihan.map((item, index) => {
                                    const jenisConfig = JENIS_LABELS[item.jenis];
                                    return (
                                        <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{index + 1}</td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                                                        <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{item.judul}</p>
                                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-sm">{item.deskripsi}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${jenisConfig.color}`}>
                                                    {jenisConfig.label}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{item.durasi}</td>
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">Total: {pelatihan.length} program pelatihan</p>
            </div>
        </>
    );
}

PelatihanIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Pelatihan', href: '/admin/pelatihan' },
    ],
};
