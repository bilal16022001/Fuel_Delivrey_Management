<?php

namespace App\Http\Controllers\FuelStationOwners;

use App\Http\Controllers\Controller;
use App\Models\FuelStationOwner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FuelStationOwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Owners = FuelStationOwner::all();
        return $Owners;
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
            'Name' => 'required',
            'Email' => 'required|email',
            'Phone' => 'required|numeric',
            'Password' => 'required|min:5'
        ]);

        FuelStationOwner::create([
            'Name' => $request->Name,
            'Email' => $request->Email,
            'Phone' => $request->Phone,
            'Password' => Hash::make($request->Password)
        ]);

        return response()->json([
            'meesage' => 'data inserted successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(FuelStationOwner $fuelStationOwner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FuelStationOwner $fuelStationOwner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $FuelStationOwner = FuelStationOwner::findOrFail($id);
        $FuelStationOwner->Name = $request->Name;
        $FuelStationOwner->Email = $request->Email;
        $FuelStationOwner->Phone = $request->Phone;

        // $FuelStationOwner->save();
        if (Hash::needsRehash($request->Password)) {
            // return "ah m7taj";
            $hashed = Hash::make($request->Password);
        } else {
            // return "la";
            $hashed = $request->Password;
        }
        $FuelStationOwner->Password = $hashed;
        $FuelStationOwner->save();
        return response()->json([
            "message" => "profile updated"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FuelStationOwner $fuelStationOwner)
    {
        //
    }
}
