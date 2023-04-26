<?php

namespace App\Http\Controllers\Fuels;

use App\Http\Controllers\Controller;
use App\Models\Fuel;
use Illuminate\Http\Request;

class FuelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Fuels = Fuel::all();
        return $Fuels;
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
            'Name_Fuel' => 'required',
            'Price' => 'required|numeric'
        ]);

        Fuel::UpdateOrCreate([
            'Name_Fuel' => $request->Name_Fuel,
            'Price' => $request->Price
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
        $fuel = Fuel::FindOrFail($id);
        return $fuel;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fuel $fuel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $fuel = Fuel::FindOrFail($id);
        $fuel->Name_Fuel = $request->Name_Fuel;
        $fuel->Price = $request->Price;
        $fuel->save();

        return response()->json([
            'message' => 'data updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Fuel::destroy($id);

        return response()->json([
            'message' => 'data destroy'
        ]);
    }
}
