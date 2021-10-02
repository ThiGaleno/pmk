<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $table = 'donors';

    protected $fillable = [
        'id',
        'name',
        'email',
        'cpf',
        'phone',
        'birth_date',
        'donors_interval',
        'donors_value',
        'address_id',
    ];
}

