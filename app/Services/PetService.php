<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PetService
{
    private string $apiUrl;
    private string $apiKey;

    public function __construct(string $apiUrl = null, string $apiKey = null)
    {
        $this->apiUrl = $apiUrl ?? config('services.petstore.api_url', 'https://petstore.swagger.io/v2/pet');
        $this->apiKey = $apiKey ?? config('services.petstore.api_key', 'special-key');
    }
    
}