<?php

namespace App\Models;
use App\Models\RiwayatProgres;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DaftarTunggu extends Model
{
    use HasFactory;

    protected $table = 'daftar_tunggu';

    protected $fillable = [
        'no_agenda',
        'no_registrasi',
        'tgl_mohon',
        'idpel',
        'nama',
        'alamat',
        'notelp_pemohon',
        'notelp_hp_pemohon',
        'asalmohon',
        'upientri',
        'petugascatat',
        'tarif_lama',
        'daya_lama',
        'tarif',
        'daya',
        'jenis_transaksi',
        'paket_sar',
        'totalbiaya',
        'tglbayar',
        'durasi_hari_kerja',
        'durasi_hari_kalender',
        'kriteria_tmp',
        'alasan_kriteria_tmp',
        'keterangan_alasan_kriteria_tmp',
        'estimasi_durasi_hari_layanan',
        'status_penangguhan',
        'alasan_penangguhan',
        'keterangan_alasan_penangguhan',
        'tglpenangguhan',
        'tglsiapsambung',
        'status_restitusi_atau_titipan',
        'tglrestitusi',
        'tglbptitipan',
        'status_permohonan',
        'tgl_update_permohonan',
        'tglpk',
        'tglnyala',
        'tglperemajaan',
        'namaupi',
        'namaap',
        'namaup',
        'unittujuan',
        'paketslo',
        'plts_atap',
    ];

    protected $casts = [
        'tgl_mohon' => 'date',
        'tglbayar' => 'date',
        'tglpenangguhan' => 'date',
        'tglsiapsambung' => 'date',
        'tglrestitusi' => 'date',
        'tglbptitipan' => 'date',
        'tgl_update_permohonan' => 'date',
        'tglpk' => 'date',
        'tglnyala' => 'date',
        'tglperemajaan' => 'date',

        'totalbiaya' => 'decimal:2',

        'durasi_hari_kerja' => 'integer',
        'durasi_hari_kalender' => 'integer',
        'estimasi_durasi_hari_layanan' => 'integer',
    ];

    /**
     * Satu daftar tunggu memiliki banyak riwayat progres.
     */
    public function RiwayatProgres(): HasMany
    {
        return $this->hasMany(
            RiwayatProgres::class,
            'daftar_tunggu_id'
        )->latest();
    }
}