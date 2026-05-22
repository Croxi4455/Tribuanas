import { router } from '@inertiajs/react';
import { AlertTriangle, X } from 'lucide-react';

type Props = {
    show: boolean;
    onClose: () => void;
    url: string;
    title?: string;
    message?: string;
};

export default function DeleteModal({ show, onClose, url, title = 'Hapus Data', message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.' }: Props) {
    if (!show) return null;

    const handleDelete = () => {
        router.delete(url, { onSuccess: () => onClose() });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1C1C1E] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
                </div>

                <h3 className="mb-2 text-lg font-black text-white">{title}</h3>
                <p className="mb-8 text-sm text-white/50">{message}</p>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-3 text-xs font-bold tracking-widest text-white/60 uppercase transition-all hover:bg-white/5">
                        Batal
                    </button>
                    <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-red-600 active:scale-95">
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
