<?php

namespace App\Http\Controllers;

use App\Imports\DaftarTungguImport;
use App\Models\DaftarTunggu;
use App\Models\RiwayatProgres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class DaftungController extends Controller
{
    public function index(Request $request)
    {
        $query = DaftarTunggu::query();

        if ($request->filled('jenis_transaksi')) {
            $query->where(
                'jenis_transaksi',
                $request->jenis_transaksi
            );
        }

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('idpel', 'like', "%{$search}%")
                    ->orWhere('no_agenda', 'like', "%{$search}%");
            });
        }

        $data = $query
            ->latest('id')
            ->get();

        return view(
            'dashboard.index',
            compact('data')
        );
    }

    public function apiData()
    {
        $data = DaftarTunggu::orderByDesc('id')->get();

        return response()->json($data);
    }

    public function import(Request $request)
    {
        set_time_limit(0);              // ✅ ini sudah benar (hapus limit PHP)
        ini_set('memory_limit', '1024M');    // ⚠️ ini cuma naikkan sampai 512 MB
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:xlsx,xls,csv',
                'max:10240',
            ],
        ]);

        try {
            Excel::import(
                new DaftarTungguImport,
                $request->file('file')
            );

            return response()->json([
                'success' => true,
                'message' => 'Data daftar tunggu berhasil diimport.',
            ]);
        } catch (\Throwable $e) {

            Log::error('IMPORT DAFTAR TUNGGU GAGAL', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Import gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function updateProgres(Request $request, $id)
    {
        $request->validate([
            'progres' => ['nullable', 'string'],
        ]);

        $daftarTunggu = DaftarTunggu::findOrFail($id);

        DB::beginTransaction();
        try {
            // ✅ Simpan riwayat
            $riwayat = $daftarTunggu->riwayatProgres()->create([
                'progres'    => $request->progres,
                'updated_by' => auth()->id(),
            ]);

            // ✅ (Opsional) Update kolom progres di tabel utama
            //    supaya dashboard tetap menampilkan progres terbaru.
            $daftarTunggu->progres = $request->progres;
            $daftarTunggu->tgl_update_permohonan = now();
            $daftarTunggu->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Progres berhasil diperbarui.',
                'data' => [
                    'id'                    => $daftarTunggu->id,
                    'progres'               => $daftarTunggu->progres,
                    'tgl_update_permohonan' => $daftarTunggu->tgl_update_permohonan,
                    'riwayat_id'            => $riwayat->id,
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan: ' . $e->getMessage(),
            ], 500);
        }
    }

    // ✅ Endpoint baru untuk ambil riwayat
    public function getRiwayat($id)
    {
        $riwayat = RiwayatProgres::with('user:id,name')
            ->where('daftar_tunggu_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($r) {
                return [
                    'id'         => $r->id,
                    'progres'    => $r->progres,
                    'user_name'  => $r->user->name ?? 'System',
                    'created_at' => optional($r->created_at)->toIso8601String(),
                ];
            });

        return response()->json([
            'success' => true,
            'data'    => $riwayat,
        ]);
    }
}
