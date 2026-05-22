<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageHelper
{
    /**
     * Upload dan compress gambar menggunakan GD native
     */
    public static function upload(UploadedFile $file, string $folder, int $maxWidth = 1200, int $quality = 80): string
    {
        $filename = uniqid() . '_' . time() . '.webp';
        $path = $folder . '/' . $filename;

        // Baca gambar
        $mime = $file->getMimeType();
        $source = match (true) {
            str_contains($mime, 'jpeg'), str_contains($mime, 'jpg') => imagecreatefromjpeg($file->getPathname()),
            str_contains($mime, 'png') => imagecreatefrompng($file->getPathname()),
            str_contains($mime, 'webp') => imagecreatefromwebp($file->getPathname()),
            str_contains($mime, 'gif') => imagecreatefromgif($file->getPathname()),
            default => null,
        };

        // Fallback: simpan tanpa compress jika format tidak didukung
        if (!$source) {
            return $file->store($folder, 'public');
        }

        $origWidth = imagesx($source);
        $origHeight = imagesy($source);

        // Resize jika lebih besar dari maxWidth
        if ($origWidth > $maxWidth) {
            $ratio = $maxWidth / $origWidth;
            $newWidth = $maxWidth;
            $newHeight = (int) ($origHeight * $ratio);

            $resized = imagecreatetruecolor($newWidth, $newHeight);
            // Preserve transparency
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
            imagecopyresampled($resized, $source, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
            imagedestroy($source);
            $source = $resized;
        }

        // Encode ke WebP dan simpan
        ob_start();
        imagewebp($source, null, $quality);
        $webpData = ob_get_clean();
        imagedestroy($source);

        Storage::disk('public')->put($path, $webpData);

        return $path;
    }
}
