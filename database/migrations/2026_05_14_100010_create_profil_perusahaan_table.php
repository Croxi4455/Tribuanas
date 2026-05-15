<?php

/**
 * Migration: Tabel profil_perusahaan
 * Menyimpan informasi utama perusahaan (nama, alamat, kontak, sosial media)
 * Tabel ini hanya berisi 1 baris data (konfigurasi global)
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profil_perusahaan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusahaan');
            $table->string('tagline')->nullable();
            $table->text('deskripsi');
            $table->text('alamat');
            $table->string('telepon');
            $table->string('email');
            $table->text('maps_embed')->nullable();
            $table->string('logo')->nullable();
            $table->year('tahun_berdiri');
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profil_perusahaan');
    }
};
