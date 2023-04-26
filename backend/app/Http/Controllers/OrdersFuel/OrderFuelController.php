<?php

namespace App\Http\Controllers\OrdersFuel;

use App\Http\Controllers\Controller;
use App\Models\OrderFuel;
use Illuminate\Http\Request;
use Nette\Utils\Random;

class OrderFuelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $OrdersFuel = OrderFuel::with("state", "city", "fuelStation", "fuel", "user")->get();
        return $OrdersFuel;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'State_id' => 'required|numeric',
            'City_id' => 'required|numeric',
            'FuelStation_id' => 'required|numeric',
            'Fuel_id' => 'required|numeric',
            'PriceFuel' => 'required|numeric',
            'QuantityFuel' => 'required|numeric',
            'AdressFuel' => 'required',
            'Date' => 'required',
            'Time' => 'required',
        ]);

        OrderFuel::create([
            'user_id' => $request->user_id,
            'Order_Number' => rand(0, 9999),
            'State_id' => $request->State_id,
            'City_id' => $request->City_id,
            'FuelStation_id' => $request->FuelStation_id,
            'Fuel_id' => $request->Fuel_id,
            'PriceFuel' => $request->PriceFuel,
            'QuantityFuel' => $request->QuantityFuel,
            'AdressFuel' => $request->AdressFuel,
            'Statuts' => 0,
            'Date' => $request->Date,
            'Time' => $request->Time
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        // $order = OrderFuel::with("state", "city", "fuelStation", "fuel", "user")->where("user_id", $id)->get();
        // return $order;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderFuel $orderFuel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $orderFuel = OrderFuel::FindOrFail($id);
        $orderFuel->Statuts = $request->Statuts;
        $orderFuel->save();

        return response()->json([
            'message' => 'data updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderFuel $orderFuel)
    {
        //
    }
}
