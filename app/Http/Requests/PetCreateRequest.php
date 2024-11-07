<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PetCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'category.name' => 'required|string',
            'status' => 'required|in:available,pending,sold',
            'photoUrls' => 'array',
            'tags' => 'array',
        ];
    }
}
