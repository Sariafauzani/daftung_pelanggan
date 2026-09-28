<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daftar_tunggu', function (Blueprint $table) {
            $table->id();

            // =========================
            // DATA DARI EXCEL
            // =========================

            $table->string('no_agenda', 50)->unique();
            $table->string('no_registrasi', 50)->nullable();
            $table->date('tgl_mohon')->nullable();

            $table->string('idpel', 30)->nullable();
            $table->string('nama', 150)->nullable();
            $table->text('alamat')->nullable();

            $table->string('notelp_pemohon', 30)->nullable();
            $table->string('notelp_hp_pemohon', 30)->nullable();

            $table->string('asalmohon', 100)->nullable();
            $table->string('upientri', 100)->nullable();
            $table->string('petugascatat', 100)->nullable();

            $table->string('tarif_lama', 30)->nullable();
            $table->string('daya_lama', 30)->nullable();

            $table->string('tarif', 30)->nullable();
            $table->string('daya', 30)->nullable();

            $table->string('jenis_transaksi', 100)->nullable();
            $table->string('paket_sar', 100)->nullable();

            $table->decimal('totalbiaya', 18, 2)->nullable();
            $table->date('tglbayar')->nullable();

            $table->integer('durasi_hari_kerja')->nullable();
            $table->integer('durasi_hari_kalender')->nullable();

            $table->string('kriteria_tmp', 100)->nullable();
            $table->string('alasan_kriteria_tmp', 255)->nullable();
            $table->text('keterangan_alasan_kriteria_tmp')->nullable();

            $table->integer('estimasi_durasi_hari_layanan')->nullable();

            $table->string('status_penangguhan', 100)->nullable();
            $table->string('alasan_penangguhan', 255)->nullable();
            $table->text('keterangan_alasan_penangguhan')->nullable();

            $table->date('tglpenangguhan')->nullable();
            $table->date('tglsiapsambung')->nullable();

            $table->string('status_restitusi_atau_titipan', 100)->nullable();
            $table->date('tglrestitusi')->nullable();
            $table->date('tglbptitipan')->nullable();

            // Status yang berasal dari Excel
            $table->string('status_permohonan', 100)->nullable();
            $table->date('tgl_update_permohonan')->nullable();

            $table->date('tglpk')->nullable();
            $table->date('tglnyala')->nullable();
            $table->date('tglperemajaan')->nullable();

            $table->string('namaupi', 150)->nullable();
            $table->string('namaap', 150)->nullable();
            $table->string('namaup', 150)->nullable();
            $table->string('unittujuan', 150)->nullable();

            $table->string('paketslo', 100)->nullable();
            $table->string('plts_atap', 100)->nullable();

            // =========================
            // DATA MONITORING SISTEM
            // =========================

            $table->text('progres')->nullable();

            $table->timestamps();

            // Index untuk filter
            $table->index('jenis_transaksi');
            $table->index('idpel');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daftar_tunggu');
    }
};