<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\State;
use App\Models\City;
use App\Models\FuelStation;
use App\Models\Fuel;
use App\Models\User;

class OrderFuel extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function state()
    {
        return $this->belongsTo(State::class, "State_id");
    }
    public function city()
    {
        return $this->belongsTo(City::class, "City_id");
    }
    public function fuelStation()
    {
        return $this->belongsTo(FuelStation::class, "FuelStation_id");
    }
    public function fuel()
    {
        return $this->belongsTo(Fuel::class, "Fuel_id");
    }
}
