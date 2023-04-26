<?php

namespace App\Http\Controllers\FuelStations;

use App\Http\Controllers\Controller;
use App\Models\FuelStation;
use Illuminate\Http\Request;

class FuelStationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fuelStations = FuelStation::with("state", "city", "Owner")->get();
        return $fuelStations;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'NameStation' => 'required',
            'LocationStation' => 'required',
            'State_id' => 'required|numeric',
            'City_id' => 'required|numeric',
            'Owner_id' => 'required|numeric'
        ]);

        FuelStation::create([
            'NameStation' => $request->NameStation,
            'LocationStation' => $request->LocationStation,
            'State_id' => $request->State_id,
            'City_id' => $request->City_id,
            'Owner_id' => $request->Owner_id
        ]);
        // return $request;
        return response()->json([
            'message' => "data added"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $fuel_st = FuelStation::findOrFail($id);
        return $fuel_st;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FuelStation $fuelStation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $fuelStation = FuelStation::FindOrFail($id);
        $fuelStation->NameStation = $request->NameStation;
        $fuelStation->LocationStation = $request->LocationStation;
        $fuelStation->State_id = $request->State_id;
        $fuelStation->City_id = $request->City_id;
        $fuelStation->save();

        return response()->json([
            'message' => "data updated"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        FuelStation::destroy($id);

        return response()->json([
            'message' => "data deleted"
        ]);
    }
}
