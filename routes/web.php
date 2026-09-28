<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\DaftungController;

Route::get('/', [DaftungController::class, 'index'])
    ->name('dashboard.index');

Route::post('/import', [DaftungController::class, 'import'])
    ->name('daftung.import');

Route::get('/api/daftar-tunggu', [DaftungController::class, 'apiData'])
    ->name('daftung.api-data');

Route::put('/daftar-tunggu/{id}/progres', [DaftungController::class, 'updateProgres'])
    ->name('daftung.update-progres');
Route::get('/daftar-tunggu/{id}/riwayat', [DaftungController::class, 'getRiwayat'])
    ->name('daftung.riwayat');