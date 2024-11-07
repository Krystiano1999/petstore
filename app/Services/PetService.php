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


    public function findById(int $petId): array
    {
        $response = Http::withHeaders(['api_key' => $this->apiKey])
                        ->get("{$this->apiUrl}/{$petId}");

        return [
            'status' => $response->status(),
            'data' => $response->json()
        ];
    }

    public function findByStatus(string $status): array
    {
        $response = Http::withHeaders(['api_key' => $this->apiKey])
                        ->get("{$this->apiUrl}/findByStatus", ['status' => $status]);

        return [
            'status' => $response->status(),
            'data' => $response->json()
        ];
    }

    public function deletePet(int $petId): array
    {
        $response = Http::withHeaders(['api_key' => $this->apiKey])
                        ->delete("{$this->apiUrl}/{$petId}");

        return [
            'status' => $response->status(),
            'data' => $response->json()
        ];
    }

    public function createPet(array $data): array
    {
        $response = Http::withHeaders(['api_key' => $this->apiKey])
                        ->post($this->apiUrl, $data);

        return [
            'status' => $response->status(),
            'data' => $response->json()
        ];
    }
}