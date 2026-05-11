<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('lowongan', function (Blueprint $table) {
            $table->id();
            $table->string('posisi'); // Contoh: Satpam Obvit
            $table->string('slug');   // Untuk URL: /karir/satpam-obvit
            $table->string('lokasi'); // Contoh: Bandung
            $table->text('kualifikasi'); // Syarat-syarat
            $table->text('deskripsi');   // Tugas & Tanggung Jawab
            $table->enum('tipe', ['Full-time', 'Part-time', 'Kontrak'])->default('Kontrak');
            $table->boolean('is_active')->default(true); // Lowongan dibuka atau tutup
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lowongan');
    }
};
