<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $table = "cards";

    protected $fillable = [
        'id',
        'first_numbers',
        'last_numbers',
        'donors_id',
        'card_number',
        'secury_code',
        'due_date',
        'flag_card',
        'password_card',
    ];
}
