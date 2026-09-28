<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('riwayat_progres', function (Blueprint $table) {
            $table->id();

            $table->foreignId('daftar_tunggu_id')
                ->constrained('daftar_tunggu')
                ->cascadeOnDelete();

            $table->text('progres')->nullable();

            $table->unsignedBigInteger('updated_by')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('riwayat_progres');
    }
};
