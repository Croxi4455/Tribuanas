<?php

/**
 * Migration: Tabel karir
 * Menyimpan lowongan kerja yang tersedia di perusahaan
 * Status buka/tutup untuk kontrol tampilan di frontend
 * Mendukung soft delete untuk arsip lowongan lama
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('karir', function (Blueprint $table) {
            $table->id();
            $table->string('posisi');
            $table->text('deskripsi');
            $table->text('syarat');
            $table->string('lokasi');
            $table->enum('status', ['buka', 'tutup'])->default('buka');
            $table->date('batas_daftar');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('karir');
    }
};
