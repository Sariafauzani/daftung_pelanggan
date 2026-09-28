<?php

namespace Tests\Feature;

use App\Imports\DaftarTungguImport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Tests\TestCase;

class DaftarTungguImportTest extends TestCase
{
    use RefreshDatabase;

    public function test_import_route_accepts_csv_and_saves_data_to_database(): void
    {
        $csv = "noagenda,nama,idpel,jenis_transaksi\nAGD-001,Agus,123456789,PASANG BARU\n";

        $response = $this->postJson(route('daftung.import'), [
            'file' => UploadedFile::fake()->createWithContent('daftar-tunggu.csv', $csv),
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('daftar_tunggu', [
            'no_agenda' => 'AGD-001',
            'nama' => 'Agus',
            'idpel' => '123456789',
            'jenis_transaksi' => 'PASANG BARU',
        ]);
    }

    public function test_import_uses_chunked_processing_for_large_files(): void
    {
        $import = new DaftarTungguImport();

        $this->assertInstanceOf(WithChunkReading::class, $import);
        $this->assertSame(500, $import->chunkSize());
    }
}
