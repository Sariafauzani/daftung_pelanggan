<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RiwayatProgres extends Model
{
    use HasFactory;

    protected $table = 'riwayat_progres';

    protected $fillable = [
        'daftar_tunggu_id',
        'progres',
        'updated_by',
    ];

    public function daftarTunggu(): BelongsTo
    {
        return $this->belongsTo(
            DaftarTunggu::class,
            'daftar_tunggu_id'
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'updated_by'
        );
    }
}