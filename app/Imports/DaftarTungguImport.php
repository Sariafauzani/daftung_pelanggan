<?php

namespace App\Imports;

use App\Models\DaftarTunggu;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class DaftarTungguImport implements
    ToModel,
    WithHeadingRow,
    WithValidation
{
    public function model(array $row)
    {
        Log::info('ROW KEYS DARI EXCEL', array_keys($row));

        if (empty($row['noagenda'])) {
            return null;
        }

        /*
        |--------------------------------------------------------------------------
        | Cari berdasarkan NOAGENDA
        |--------------------------------------------------------------------------
        |
        | Jika sudah ada:
        | - data Excel diperbarui
        | - status monitoring TIDAK diubah
        | - progres monitoring TIDAK diubah
        |
        | Jika belum ada:
        | - dibuat sebagai data baru
        | - status default = Belum
        |
        */

        $data = [
            'no_registrasi' => $this->value($row, 'no_registrasi'),
            'tgl_mohon' => $this->date($row, 'tglmohon'),

            'idpel' => $this->value($row, 'idpel'),
            'nama' => $this->value($row, 'nama'),
            'alamat' => $this->value($row, 'alamat'),

            'notelp_pemohon' =>
            $this->value($row, 'notelp_pemohon'),

            'notelp_hp_pemohon' =>
            $this->value($row, 'notelp_hp_pemohon'),

            'asalmohon' => $this->value($row, 'asalmohon'),
            'upientri' => $this->value($row, 'upientri'),
            'petugascatat' =>
            $this->value($row, 'petugascatat'),

            'tarif_lama' =>
            $this->value($row, 'tarif_lama'),

            'daya_lama' =>
            $this->value($row, 'daya_lama'),

            'tarif' => $this->value($row, 'tarif'),
            'daya' => $this->value($row, 'daya'),

            'jenis_transaksi' =>
            $this->value($row, 'jenis_transaksi'),

            'paket_sar' =>
            $this->value($row, 'paket_sar'),

            'totalbiaya' =>
            $this->number($row, 'totalbiaya'),

            'tglbayar' =>
            $this->date($row, 'tglbayar'),

            'durasi_hari_kerja' =>
            $this->number($row, 'durasi_hari_kerja'),

            'durasi_hari_kalender' =>
            $this->number($row, 'durasi_hari_kalender'),

            'kriteria_tmp' =>
            $this->value($row, 'kriteria_tmp'),

            'alasan_kriteria_tmp' =>
            $this->value($row, 'alasan_kriteria_tmp'),

            'keterangan_alasan_kriteria_tmp' =>
            $this->value(
                $row,
                'keterangan_alasan_kriteria_tmp'
            ),

            'estimasi_durasi_hari_layanan' =>
            $this->number(
                $row,
                'estimasi_durasi_hari_layanan'
            ),

            'status_penangguhan' =>
            $this->value($row, 'status_penangguhan'),

            'alasan_penangguhan' =>
            $this->value($row, 'alasan_penangguhan'),

            'keterangan_alasan_penangguhan' =>
            $this->value(
                $row,
                'keterangan_alasan_penangguhan'
            ),

            'tglpenangguhan' =>
            $this->date($row, 'tglpenangguhan'),

            'tglsiapsambung' =>
            $this->date($row, 'tglsiapsambung'),

            'status_restitusi_atau_titipan' =>
            $this->value(
                $row,
                'status_restitusi_atau_titipan'
            ),

            'tglrestitusi' =>
            $this->date($row, 'tglrestitusi'),

            'tglbptitipan' =>
            $this->date($row, 'tglbptitipan'),

            'status_permohonan' =>
            $this->value($row, 'status_permohonan'),

            'tgl_update_permohonan' =>
            $this->date($row, 'tgl_update_permohonan'),

            'tglpk' =>
            $this->date($row, 'tglpk'),

            'tglnyala' =>
            $this->date($row, 'tglnyala'),

            'tglperemajaan' =>
            $this->date($row, 'tglperemajaan'),

            'namaupi' =>
            $this->value($row, 'namaupi'),

            'namaap' =>
            $this->value($row, 'namaap'),

            'namaup' =>
            $this->value($row, 'namaup'),

            'unittujuan' =>
            $this->value($row, 'unittujuan'),

            'paketslo' =>
            $this->value($row, 'paketslo'),

            'plts_atap' =>
            $this->value($row, 'plts_atap'),
        ];

        /*
        |--------------------------------------------------------------------------
        | UPDATE DATA LAMA / CREATE DATA BARU
        |--------------------------------------------------------------------------
        */

        $daftarTunggu = DaftarTunggu::updateOrCreate(
            [
                'no_agenda' => trim($row['noagenda']),
            ],
            $data
        );

        /*
        |--------------------------------------------------------------------------
        | Untuk data baru, beri status default.
        |
        | updateOrCreate tidak mengubah status/progres lama karena
        | keduanya tidak dimasukkan ke $data.
        |--------------------------------------------------------------------------
        */

        return $daftarTunggu;
    }

    /**
     * Nama kolom Excel sudah dibaca sebagai lowercase
     * oleh WithHeadingRow.
     */
    private function value(array $row, string $key): ?string
    {
        if (!isset($row[$key])) {
            return null;
        }

        $value = trim((string) $row[$key]);

        return $value === '' ? null : $value;
    }

    /**
     * Konversi angka.
     */
    private function number(array $row, string $key): mixed
    {
        if (!isset($row[$key]) || $row[$key] === '') {
            return null;
        }

        return is_numeric($row[$key])
            ? $row[$key]
            : null;
    }

    /**
     * Konversi tanggal Excel.
     */
    private function date(array $row, string $key): ?string
    {
        if (!isset($row[$key]) || $row[$key] === '') {
            return null;
        }

        try {
            if (is_numeric($row[$key])) {
                return Carbon::create(
                    1899,
                    12,
                    30
                )->addDays(
                    (int) $row[$key]
                )->format('Y-m-d');
            }

            return Carbon::parse($row[$key])
                ->format('Y-m-d');
        } catch (\Throwable $e) {
            Log::warning(
                "Tanggal {$key} tidak valid",
                ['value' => $row[$key]]
            );

            return null;
        }
    }

    public function rules(): array
    {
        return [
            'noagenda' => [
                'required',
            ],
        ];
    }
}
