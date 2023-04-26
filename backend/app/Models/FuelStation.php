<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelStation extends Model
{
    use HasFactory;
    protected $fillable = ['NameStation', 'LocationStation', 'State_id', 'City_id', 'Owner_id'];

    //get City

    public function city()
    {
        return $this->belongsTo("\App\Models\City", "City_id");
    }
    //get state

    public function state()
    {
        return $this->belongsTo("\App\Models\State", "State_id");
    }
    //get owner

    public function owner()
    {
        return $this->belongsTo("\App\Models\FuelStationOwner", "Owner_id");
    }
}
