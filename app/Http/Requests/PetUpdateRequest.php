<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PetUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'name' => 'required|string',
            'category.name' => 'required|string',
            'status' => 'required|in:available,pending,sold',
            'photoUrls' => 'array',
            'tags' => 'array',
        ];
    }
}
