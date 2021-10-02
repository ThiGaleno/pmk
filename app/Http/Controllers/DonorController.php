<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donor;
use App\Http\Requests\StoreDonorsRequest;
use App\Models\Address;
use App\Models\Card;

class DonorController extends Controller
{
    public function index()
    {
        $donors = Donor::all();
        return response()->json($donors, 200);
    }

    public function store(StoreDonorsRequest $request)
    {
        $payload_donor = $request->only('name', 'email', 'cpf', 'phone', 'donors_interval', 'donors_value', 'birth_date');
        $donor = Donor::create($payload_donor);

        if($donor){
            $payload_address = $request->only('state', 'city', 'neighborhood', 'street', 'number');
            $payload_address['donors_id'] = $donor->id;

            $address = Address::create($payload_address);
        }

        if($address){
            if($request->payment_method == 'credit'){
                $payload_card['first_numbers'] = substr($request->card_number, 0, 6);
                $payload_card['last_numbers'] = substr($request->card_number, -6, 6);
                $payload_card['flag_card'] = getCardBrand($payload_card['first_numbers']);

            }else{
                $payload_card = $request->only('card_number', 'secury_code', 'due_date', 'password_card');
                $payload_card['password_card'] = bcrypt($payload_card['password_card']);
            }

            $payload_card['donors_id'] = $donor->id;
            $card = Card::create($payload_card);
        }

        if(!$card){
            return response()->json(["status" => "error"], 500);
        }

        return response()->json(["status" => "ok"], 200);





    }
}
