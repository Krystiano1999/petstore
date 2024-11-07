<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetController;


Route::get('/', function () {
    return view('pets.index');
});

Route::prefix('pets')->group(function () {
    Route::get('/status', [PetController::class, 'findByStatus']);
    Route::get('/{petId}', [PetController::class, 'findById'])->where('petId', '[0-9]+');
});