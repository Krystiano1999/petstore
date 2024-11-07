<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PetService
{
    private const API_URL = 'https://petstore.swagger.io/v2/pet';
    private const HEADERS = [
        'api_key' => 'special-key',
    ];

    
}