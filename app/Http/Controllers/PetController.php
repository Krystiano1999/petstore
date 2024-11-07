<?php

namespace App\Http\Controllers;

use App\Services\PetService;
use App\Http\Requests\PetCreateRequest;
use App\Http\Requests\PetUpdateRequest;
use App\Http\Requests\PetStatusRequest;
use App\Http\Requests\PetUploadImageRequest;
use Illuminate\Http\JsonResponse;

class PetController extends Controller
{
    private PetService $petService;

    public function __construct(PetService $petService)
    {
        $this->petService = $petService;
    }

    // Pobieranie wg ID
    public function findById(int $petId): JsonResponse
    {
        $response = $this->petService->findById($petId);
        return response()->json($response);
    }

    // Pobieranie wg statusu
    public function findByStatus(PetStatusRequest $request): JsonResponse
    {
        $response = $this->petService->findByStatus($request->validated()['status']);
        return response()->json($response);
    }

    // Usuwanie zwierzaka
    public function destroy(int $petId): JsonResponse
    {
        $response = $this->petService->deletePet($petId);
        return response()->json($response);
    }
}
