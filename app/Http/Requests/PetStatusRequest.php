<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PetStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:available,pending,sold',
        ];
    }
}
