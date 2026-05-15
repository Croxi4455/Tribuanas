import { Head } from '@inertiajs/react';
import { Briefcase, MapPin, Plus } from 'lucide-react';

type Karir = {
    id: number;
    posisi: string;
    deskripsi: string;
    syarat: string;
    lokasi: string;
    status: 'buka' | 'tutup';
    batas_daftar: string;
};

type Props = {
    karir: Karir[];
};

export default function KarirIndex({ karir }: Props) {
    return (
        <>
            <Head title="Manajemen Karir" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Karir</h1>
                        <p className="text-muted-foreground">
                            Kelola lowongan kerja dan rekrutmen perusahaan
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Lowongan
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Posisi</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lokasi</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Batas Daftar</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {karir.map((item, index) => {
                                    const isExpired = new Date(item.batas_daftar) < new Date();
                                    return (
                                        <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{index + 1}</td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                                                        <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{item.posisi}</p>
                                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-sm">{item.deskripsi}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5">
                                                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {item.lokasi}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    item.status === 'buka'
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                                }`}>
                                                    {item.status === 'buka' ? 'Buka' : 'Tutup'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5">
                                                <span className={`text-sm ${isExpired ? 'text-red-500' : 'text-muted-foreground'}`}>
                                                    {new Date(item.batas_daftar).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                    {isExpired && <span className="ml-1 text-xs">(Kadaluarsa)</span>}
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

                <p className="text-xs text-muted-foreground">Total: {karir.length} lowongan</p>
            </div>
        </>
    );
}

KarirIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Karir', href: '/admin/karir' },
    ],
};
