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
        Schema::create('layanan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_layanan');
            $table->string('ikon')->nullable(); // Simpan nama class FontAwesome (misal: fa-shield)
            $table->text('deskripsi_singkat');
            $table->text('detail_layanan'); // Penjelasan lengkap
            $table->string('gambar')->nullable(); // Foto layanan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan');
    }
};
