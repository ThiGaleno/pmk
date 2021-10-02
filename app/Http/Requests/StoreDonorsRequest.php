<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonorsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|email',
            'cpf' => 'required|size:11',
            'phone' => 'required|numeric',
            'donors_interval' => 'required|in:unique,bimonthly,biannual,annual',
            'donors_value' => 'required|integer',
            'birth_date' => 'required|date',
            'state' => 'required',
            'city' => 'required',
            'neighborhood' => 'required',
            'street' => 'required',
            'card_number' => 'required',
            'secury_code' => 'required|size:3',
            'due_date' => 'required|date',
            'payment_method' => 'required',
            'password_card' => 'required',
        ];
    }
}
