<?php

/**
 * Migration: Tabel testimoni
 * Menyimpan testimoni dari klien/mitra perusahaan pengamanan
 * Rating 1-5 untuk menunjukkan tingkat kepuasan
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimoni', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jabatan');
            $table->string('perusahaan');
            $table->string('foto')->nullable();
            $table->text('isi');
            $table->tinyInteger('rating')->default(5);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimoni');
    }
};
